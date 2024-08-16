import { UnauthorizedOperationError } from "../../../../shared/domain/unauthorized-operation-error"
import { NoteNotFoundError } from "../../domain/errors/note-not-found-error"
import { Note } from "../../domain/note"
import { NoteRepository } from "../../domain/note-repository"
import { NoteId } from "../../domain/value-objects/note-id"
import { NoteUserId } from "../../domain/value-objects/note-user-id"

export class NoteFinder {
  constructor(private readonly repository: NoteRepository) {}

  async run(id: string, userId: string): Promise<Note> {
    const noteUserId = new NoteUserId(userId)
    const noteId = new NoteId(id)

    const note = await this.repository.findById(noteId)

    if (note === null) {
      throw new NoteNotFoundError(noteId.value)
    }

    if (note.userId.value !== noteUserId.value) {
      throw new UnauthorizedOperationError(
        `This note does not belong to the user with id ${userId}`
      )
    }

    return note
  }
}
