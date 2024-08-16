import { NoteRepository } from "../../domain/note-repository"
import { NoteUserId } from "../../domain/value-objects/note-user-id"

export class NotesFinder {
  constructor(private readonly repository: NoteRepository) {}

  async run(userId: string, limit: number, offset: number) {
    const noteUserId = new NoteUserId(userId)

    const notes = await this.repository.findByUser(noteUserId, limit, offset)

    return notes
  }
}
