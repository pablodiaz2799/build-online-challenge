import { Note } from "./note"
import { NoteContactId } from "./value-objects/note-contact-id"
import { NoteId } from "./value-objects/note-id"
import { NoteUserId } from "./value-objects/note-user-id"

export interface NoteRepository {
  findByUser(userId: NoteUserId, limit: number, offset: number): Promise<Note[]>
  findById(id: NoteId): Promise<Note | null>
  save(note: Note): Promise<void>
  deleteByContactAndUser(
    contactId: NoteContactId,
    userId: NoteUserId
  ): Promise<void>
  countByUser(userId: NoteUserId): Promise<number>

}
