import { ContactsFinder } from "../../../contexts/build-online-challenge/contacts/application/find/contacts-finder"
import { ContactRepository } from "../../../contexts/build-online-challenge/contacts/domain/contact-repository"
import { Response, Router } from "express"
import { Auth } from "../../../middlewares/auth"
import { IApiBase } from "../../../shared/interfaces/api-base.interface"
import { TypedAuthRequest } from "../../../shared/interfaces/express-types"
import { inject, injectable } from "tsyringe"

@injectable()
export class ContactsGetController implements IApiBase {
  router = Router()
  public readonly baseRoute = "/contacts"

  constructor(
    @inject("ContactRepository") private readonly repository: ContactRepository
  ) {
    this.router.get(
      "/",
      Auth,
      async (
        req: TypedAuthRequest<{ limit: string; page: string }, {}>,
        res: Response
      ) => {
        await this.run(req, res)
      }
    )
  }

  async run(
    req: TypedAuthRequest<{ limit: string; page: string }, {}>,
    res: Response
  ): Promise<void> {
    try {
      const contactsFinder = new ContactsFinder(this.repository)
      const limit = req.query.limit ? Number(req.query.limit) : 10
      const offset = req.query.page ? (Number(req.query.page) - 1) * limit : 0
      const contacts = await contactsFinder.run(
        req.user.id,
        limit,
        offset
      )
      res.status(200).json(contacts.map((contact) => contact.toPrimitives()))
    } catch (error) {
      console.log(`Error getting contacts ${error}`)
      res.status(500).send(`Error getting contacts information: ${error}`)
    }
  }
}
