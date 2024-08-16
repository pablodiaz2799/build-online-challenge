import { ContactFinder } from "../../../contexts/build-online-challenge/contacts/application/find/contact-finder"
import { ContactRepository } from "../../../contexts/build-online-challenge/contacts/domain/contact-repository"
import { NoteCreator } from "../../../contexts/build-online-challenge/notes/application/create/note-creator"
import { NoteRepository } from "../../../contexts/build-online-challenge/notes/domain/note-repository"
import { IdGenerator } from "../../../contexts/shared/domain/id-generator"
import { Response, Router } from "express"
import { Auth } from "../../../middlewares/auth"
import { IApiBase } from "../../../shared/interfaces/api-base.interface"
import { TypedAuthRequest } from "../../../shared/interfaces/express-types"
import { inject, injectable } from "tsyringe"

@injectable()
export class NotePostController implements IApiBase {
  router = Router()
  public readonly baseRoute = "/contacts"

  constructor(
    @inject("NoteRepository") private readonly repository: NoteRepository,
    @inject("ContactRepository")
    private readonly contactRepository: ContactRepository,
    @inject("IdGenerator") private readonly idGenerator: IdGenerator
  ) {
    this.router.post(
      "/:contactId/notes",
      Auth,
      async (req: TypedAuthRequest<{}, { content: string }>, res: Response) => {
        await this.run(req, res)
      }
    )
  }

  async run(
    req: TypedAuthRequest<{}, { content: string }>,
    res: Response
  ): Promise<void> {
    try {
      const { content } = req.body
      const { contactId } = req.params
      const id = this.idGenerator.generate()

      const contactFinder = new ContactFinder(this.contactRepository)
      const noteCreator = new NoteCreator(this.repository, contactFinder)

      await noteCreator.run(id, content, contactId, req.user.id)

      res.status(201).send()
    } catch (error) {
      console.log(`Error creating note ${error}`)
      res.status(500).send(`Error creating note: ${error}`)
    }
  }
}
