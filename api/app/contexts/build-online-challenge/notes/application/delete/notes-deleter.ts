import { NoteRepository } from "../../domain/note-repository"
import { NoteContactId } from "../../domain/value-objects/note-contact-id"
import { NoteUserId } from "../../domain/value-objects/note-user-id"

export class NotesDeleter {
  constructor(private readonly repository: NoteRepository) {}

  async run(contactId: string, userId: string): Promise<void> {
    const noteContactId = new NoteContactId(contactId)
    const noteUserId = new NoteUserId(userId)
    await this.repository.deleteByContactAndUser(noteContactId, noteUserId)
  }
}
