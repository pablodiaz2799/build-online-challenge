import { ContactDeleter } from "../../../contexts/build-online-challenge/contacts/application/delete/contact-deleter"
import { ContactFinder } from "../../../contexts/build-online-challenge/contacts/application/find/contact-finder"
import { ContactFileManagerRepository } from "../../../contexts/build-online-challenge/contacts/domain/contact-file-manager-repository"
import { ContactRepository } from "../../../contexts/build-online-challenge/contacts/domain/contact-repository"
import { NotesDeleter } from "../../../contexts/build-online-challenge/notes/application/delete/notes-deleter"
import { NoteRepository } from "../../../contexts/build-online-challenge/notes/domain/note-repository"
import { Response, Router } from "express"
import { Auth } from "../../../middlewares/auth"
import { IApiBase } from "../../../shared/interfaces/api-base.interface"
import { TypedAuthRequest } from "../../../shared/interfaces/express-types"
import { inject, injectable } from "tsyringe"

@injectable()
export class ContactDeleteController implements IApiBase {
  router = Router()
  public readonly baseRoute = "/contacts"

  constructor(
    @inject("ContactRepository") private readonly repository: ContactRepository,
    @inject("ContactFileManagerRepository")
    private readonly contactFileManagerRepository: ContactFileManagerRepository,
    @inject("NoteRepository") private readonly noteRepository: NoteRepository
  ) {
    this.router.delete(
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
      const contactDeleter = new ContactDeleter(
        this.repository,
        contactFinder,
        this.contactFileManagerRepository
      )
      const notesDeleter = new NotesDeleter(this.noteRepository)

      const { id } = req.params
      const userId = req.user.id

      await contactDeleter.run(id, userId)
      await notesDeleter.run(id, userId)
      res.status(200).send("Contact deleted")
    } catch (error) {
      console.log(`Error deleting contact ${error}`)
      res.status(500).send(`Error deleting contact: ${error}`)
    }
  }
}
