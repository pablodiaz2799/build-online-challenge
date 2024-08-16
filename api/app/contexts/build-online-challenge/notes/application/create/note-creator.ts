import { ContactFinder } from "contexts/build-online-challenge/contacts/application/find/contact-finder"
import { NoteRepository } from "../../domain/note-repository"
import { Note } from "../../domain/note"

export class NoteCreator {
  constructor(
    private readonly repository: NoteRepository,
    private readonly contactFinder: ContactFinder
  ) {}

  async run(id: string, content: string, contactId: string, userId: string) {
    const contact = await this.contactFinder.run(contactId, userId)

    const note = Note.fromPrimitives({
      _id: id,
      content,
      contactId: contact._id.value,
      userId,
    })

    await this.repository.save(note)
  }
}
