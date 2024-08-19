import { NoteRepository } from "../../domain/note-repository"
import { NoteUserId } from "../../domain/value-objects/note-user-id"

export class NotesCounter {
  constructor(private readonly repository: NoteRepository) {}

  async run(userId: string): Promise<number> {
    const contactUserId = new NoteUserId(userId)
    return this.repository.countByUser(contactUserId)
  }
}
