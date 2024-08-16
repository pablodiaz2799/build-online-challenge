import { UserFinder } from "../../contexts/build-online-challenge/users/application/find/user-finder"
import { UserRepository } from "../../contexts/build-online-challenge/users/domain/user-repository"
import { Response, Router } from "express"
import { IApiBase } from "../../shared/interfaces/api-base.interface"
import { TypedRequest } from "../../shared/interfaces/express-types"
import { inject, injectable } from "tsyringe"
import bcrypt from "bcrypt"
import jwt, { Secret } from "jsonwebtoken"

@injectable()
export class LoginPostController implements IApiBase {
  router = Router()

  public readonly baseRoute = "/login"

  constructor(
    @inject("UserRepository") private readonly userRepository: UserRepository
  ) {
    this.router.post(
      "/",
      async (
        req: TypedRequest<{}, { email: string; password: string }>,
        res: Response
      ) => {
        await this.run(req, res)
      }
    )
  }

  async run(
    req: TypedRequest<{}, { email: string; password: string }>,
    res: Response
  ): Promise<void> {
    try {
      const { email, password } = req.body
      const userFinder = new UserFinder(this.userRepository)

      const user = await userFinder.run(email)

      const isMatch = bcrypt.compareSync(password, user.password.value)
      if (!isMatch) {
        res.status(401).send("Invalid email or password")
      }

      const token = jwt.sign(
        { id: user._id.value, email: user.email.value },
        process.env.JWT_SECRET as Secret,
        {
          expiresIn: "2 days",
        }
      )

      res
        .status(200)
        .json({ token, user: { id: user._id.value, email: user.email.value } })
    } catch (error) {
      console.log(`Error loggin in ${error}`)
      res.status(500).send("Error loggin in")
    }
  }
}
