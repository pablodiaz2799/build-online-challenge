import { inject, injectable } from "tsyringe"
import { NoteRepository } from "../../domain/note-repository"
import { Model } from "mongoose"
import { Primitives } from "contexts/shared/domain/primitives"
import { Note } from "../../domain/note"
import { NoteUserId } from "../../domain/value-objects/note-user-id"
import { NoteId } from "../../domain/value-objects/note-id"
import { NoteContactId } from "../../domain/value-objects/note-contact-id"

@injectable()
export class NoteMongoRepository implements NoteRepository {
  constructor(
    @inject("Note") private readonly model: Model<Primitives<Note>>
  ) {}

  async findByUser(
    userId: NoteUserId,
    limit: number,
    offset: number
  ): Promise<Note[]> {
    const notes = await this.model.find(
      { userId: userId.value },
      {},
      { skip: offset, limit }
    )
    return notes.map((note) => Note.fromPrimitives(note))
  }

  async countByUser(userId: NoteUserId): Promise<number> {
    return this.model.countDocuments({ userId: userId.value })
  }

  async findById(id: NoteId): Promise<Note | null> {
    const note = await this.model.findById(id.value)
    return note ? Note.fromPrimitives(note) : null
  }

  async save(note: Note): Promise<void> {
    await this.model.create(note.toPrimitives())
  }

  async deleteByContactAndUser(
    contactId: NoteContactId,
    userId: NoteUserId
  ): Promise<void> {
    await this.model.deleteMany({
      contactId: contactId.value,
      userId: userId.value,
    })
  }
}
