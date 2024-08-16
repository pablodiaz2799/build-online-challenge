import { ContactFinder } from "../../../contexts/build-online-challenge/contacts/application/find/contact-finder"
import { Contact } from "../../../contexts/build-online-challenge/contacts/domain/contact"
import { ContactRepository } from "../../../contexts/build-online-challenge/contacts/domain/contact-repository"
import { NotesFinder } from "../../../contexts/build-online-challenge/notes/application/find/notes-finder"
import { NoteRepository } from "../../../contexts/build-online-challenge/notes/domain/note-repository"
import { Primitives } from "../../../contexts/shared/domain/primitives"
import { Response, Router } from "express"
import { Auth } from "../../../middlewares/auth"
import { IApiBase } from "../../../shared/interfaces/api-base.interface"
import { TypedAuthRequest } from "../../../shared/interfaces/express-types"
import { inject, injectable } from "tsyringe"

@injectable()
export class NotesGetController implements IApiBase {
  router = Router()
  public readonly baseRoute = "/notes"

  constructor(
    @inject("NoteRepository") private readonly repository: NoteRepository,
    @inject("ContactRepository")
    private readonly contactRepository: ContactRepository
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
      const notesFinder = new NotesFinder(this.repository)
      const contactFinder = new ContactFinder(this.contactRepository)

      const limit = req.query.limit ? Number(req.query.limit) : 10
      const offset = req.query.page ? (Number(req.query.page) - 1) * limit : 0

      const notes = await notesFinder.run(req.user.id, limit, offset)
      const contactIds = new Set(notes.map((note) => note.contactId.value))

      const contacts: Primitives<Contact>[] = []
      for (const contactId of contactIds.values()) {
        const contact = await contactFinder.run(contactId, req.user.id)
        contacts.push(contact.toPrimitives())
      }

      const mappedNotes = notes.map((note) => {
        const contact = contacts.find(
          (contact) => contact._id === note.contactId.value
        )
        return {
          ...note.toPrimitives(),
          contact: {
            name: contact?.name,
            profilePictureUrl: contact?.profilePictureUrl,
          },
        }
      })

      res.status(200).json(mappedNotes)
    } catch (error) {
      console.log(`Error getting notes ${error}`)
      res.status(500).send(`Error getting notes information: ${error}`)
    }
  }
}
