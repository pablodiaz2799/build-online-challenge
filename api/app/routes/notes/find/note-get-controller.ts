import { NoteFinder } from "../../../contexts/build-online-challenge/notes/application/find/note-finder"
import { NoteRepository } from "../../../contexts/build-online-challenge/notes/domain/note-repository"
import { Response, Router } from "express"
import { Auth } from "../../../middlewares/auth"
import { IApiBase } from "../../../shared/interfaces/api-base.interface"
import { TypedAuthRequest } from "../../../shared/interfaces/express-types"
import { inject, injectable } from "tsyringe"
import { ContactRepository } from "../../../contexts/build-online-challenge/contacts/domain/contact-repository"
import { ContactFinder } from "../../../contexts/build-online-challenge/contacts/application/find/contact-finder"

@injectable()
export class NoteGetController implements IApiBase {
  router = Router()
  public readonly baseRoute = "/notes"

  constructor(
    @inject("NoteRepository") private readonly repository: NoteRepository,
    @inject("ContactRepository")
    private readonly contactRepository: ContactRepository
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
      const noteFinder = new NoteFinder(this.repository)
      const contactFinder = new ContactFinder(this.contactRepository)

      const note = await noteFinder.run(req.params.id, req.user.id)
      const contact = await contactFinder.run(note.contactId.value, req.user.id)

      const primitiveNote = {
        ...note.toPrimitives(),
        contact: {
          name: contact.name.value,
          profilePictureUrl: contact.profilePictureUrl.value,
        },
      }

      res.status(200).json(primitiveNote)
    } catch (error) {
      console.log(`Error getting note ${error}`)
      res.status(500).send(`Error getting note information: ${error}`)
    }
  }
}
