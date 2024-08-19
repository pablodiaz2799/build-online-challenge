import { inject, injectable } from "tsyringe"
import { ContactRepository } from "../../domain/contact-repository"
import { Model } from "mongoose"
import { Primitives } from "contexts/shared/domain/primitives"
import { Contact } from "../../domain/contact"
import { ContactUserId } from "../../domain/value-objects/contact-user-id"
import { ContactId } from "../../domain/value-objects/contact-id"

@injectable()
export class ContactMongoRepository implements ContactRepository {
  constructor(
    @inject("Contact") private readonly model: Model<Primitives<Contact>>
  ) {}

  async save(contact: Contact): Promise<void> {
    const contactPrimitives = contact.toPrimitives()
    await this.model.findOneAndUpdate(
      { _id: contactPrimitives._id },
      contactPrimitives,
      { upsert: true }
    )
  }

  async countByUser(userId: ContactUserId): Promise<number> {
    return this.model.countDocuments({ userId: userId.value })
  }

  async findById(id: ContactId): Promise<Contact | null> {
    const contact = await this.model.findById(id.value)
    return contact ? Contact.fromPrimitives(contact) : null
  }

  async findByUser(
    userId: ContactUserId,
    limit: number,
    offset: number,
    filter?: string
  ): Promise<Contact[]> {
    const query = { userId: userId.value }
    if (filter !== undefined) {
      const regex = `.*${filter}.*`
      query["$or"] = [
        { name: { $regex: regex } },
        { email: { $regex: regex } },
        { cellphoneNumber: { $regex: regex } },
      ]
    }

    return await this.model
      .find(query, {}, { skip: offset, limit })
      .then((contacts) => {
        return contacts.map((contact) => Contact.fromPrimitives(contact))
      })
  }

  async delete(id: ContactId): Promise<void> {
    await this.model.findOneAndDelete({ _id: id.value })
  }
}
