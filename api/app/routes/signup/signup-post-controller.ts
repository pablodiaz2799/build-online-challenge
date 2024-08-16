import { inject, injectable } from "tsyringe"
import bcrypt from "bcrypt"
import { Response, Router } from "express"
import { UserRepository } from "../../contexts/build-online-challenge/users/domain/user-repository"
import { IApiBase } from "../../shared/interfaces/api-base.interface"
import { TypedRequest } from "../../shared/interfaces/express-types"
import { IdGenerator } from "../../contexts/shared/domain/id-generator"
import { UserCreator } from "../../contexts/build-online-challenge/users/application/create/user-creator"

@injectable()
export class SignupPostController implements IApiBase {
  router = Router()

  public readonly baseRoute = "/signup"

  constructor(
    @inject("UserRepository") private readonly userRepository: UserRepository,
    @inject("IdGenerator") private readonly idGenerator: IdGenerator
  ) {
    this.router.post(
      "/",
      async (
        req: TypedRequest<
          {},
          { name: string; email: string; password: string }
        >,
        res: Response
      ) => {
        await this.run(req, res)
      }
    )
  }

  async run(
    req: TypedRequest<{}, { name: string; email: string; password: string }>,
    res: Response
  ): Promise<void> {
    try {
      const { name, email, password } = req.body

      const hashedPassword = await bcrypt.hash(password, 8)
      const id = this.idGenerator.generate()

      const userCreator = new UserCreator(this.userRepository)

      await userCreator.run(id, name, email, hashedPassword)

      res.status(201).send()
    } catch (error) {
      console.log(`Error creating user ${error}`)
      res.status(500).send("Error creating user")
    }
  }
}
