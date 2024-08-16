import mongoose from "mongoose"
import { Primitives } from "../../../../../shared/domain/primitives"
import { Note } from "../../../../../../contexts/build-online-challenge/notes/domain/note"

const NoteSchema = new mongoose.Schema<Primitives<Note>>(
  {
    content: { type: String, required: true },
    contactId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    collection: "notes",
  }
)

export const NoteModel = mongoose.model<Primitives<Note>>("Note", NoteSchema)
