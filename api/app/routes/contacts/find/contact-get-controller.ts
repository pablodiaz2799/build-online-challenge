import { ContactFinder } from "../../../contexts/build-online-challenge/contacts/application/find/contact-finder"
import { ContactRepository } from "../../../contexts/build-online-challenge/contacts/domain/contact-repository"
import { Response, Router } from "express"
import { Auth } from "../../../middlewares/auth"
import { IApiBase } from "../../../shared/interfaces/api-base.interface"
import { TypedAuthRequest } from "../../../shared/interfaces/express-types"
import { inject, injectable } from "tsyringe"

@injectable()
export class ContactGetController implements IApiBase {
  router = Router()
  public readonly baseRoute = "/contacts"

  constructor(
    @inject("ContactRepository") private readonly repository: ContactRepository
  ) {
    this.router.get(
      "/:id",
      Auth,
      async (req: TypedAuthRequest<{}, {}>, res: Response) => {
        await this.run(req, res)
      }
    )
  }

  async run(req: TypedAuthRequest<{}, {}>, res: Response): Promise<void> {
    try {
      const contactFinder = new ContactFinder(this.repository)

      const contact = await contactFinder.run(req.params.id, req.user.id)

      res.status(200).json(contact.toPrimitives())
    } catch (error) {
      console.log(`Error getting contact ${error}`)
      res.status(500).send(`Error getting contact information: ${error}`)
    }
  }
}
