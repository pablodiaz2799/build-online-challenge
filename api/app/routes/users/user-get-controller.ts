import { UserRepository } from "../../contexts/build-online-challenge/users/domain/user-repository"
import { Response, Router } from "express"
import { Auth } from "../../middlewares/auth"
import { IApiBase } from "../../shared/interfaces/api-base.interface"
import { TypedAuthRequest } from "../../shared/interfaces/express-types"
import { inject, injectable } from "tsyringe"
import { UserFinder } from "../../contexts/build-online-challenge/users/application/find/user-finder"

@injectable()
export class UserGetController implements IApiBase {
  router = Router()

  public readonly baseRoute = "/user"

  constructor(
    @inject("UserRepository") private readonly userRepository: UserRepository
  ) {
    this.router.get(
      "/",
      Auth,
      async (req: TypedAuthRequest<{}, {}>, res: Response) => {
        await this.run(req, res)
      }
    )
  }

  async run(req: TypedAuthRequest<{}, {}>, res: Response): Promise<void> {
    try {
      const userFinder = new UserFinder(this.userRepository)
      const user = await userFinder.run(req.user.email)

      res.status(200).json(user.toPublicPrimitives())
    } catch (error) {
      console.log(`Error getting user ${error}`)
      res.status(500).send(`Error getting user information: ${error}`)
    }
  }
}
