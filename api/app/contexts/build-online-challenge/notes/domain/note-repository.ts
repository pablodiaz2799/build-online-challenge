import { Note } from "./note"
import { NoteId } from "./value-objects/note-id"
import { NoteUserId } from "./value-objects/note-user-id"

export interface NoteRepository {
  findByUser(userId: NoteUserId, limit: number, offset: number): Promise<Note[]>
  findById(id: NoteId): Promise<Note | null>
  save(note: Note): Promise<void>
}
