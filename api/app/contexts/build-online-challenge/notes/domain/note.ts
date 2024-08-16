import { Primitives } from "contexts/shared/domain/primitives"
import { NoteContactId } from "./value-objects/note-contact-id"
import { NoteContent } from "./value-objects/note-content"
import { NoteId } from "./value-objects/note-id"
import { NoteUserId } from "./value-objects/note-user-id"

export class Note {
  constructor(
    public readonly _id: NoteId,
    public readonly content: NoteContent,
    public readonly contactId: NoteContactId,
    public readonly userId: NoteUserId
  ) {}

  static fromPrimitives(plainData: Primitives<Note>): Note {
    return new Note(
      new NoteId(plainData._id),
      new NoteContent(plainData.content),
      new NoteContactId(plainData.contactId),
      new NoteUserId(plainData.userId)
    )
  }

  toPrimitives(): Primitives<Note> {
    return {
      _id: this._id.value,
      content: this.content.value,
      contactId: this.contactId.value,
      userId: this.userId.value,
    }
  }
}
