import { Contact } from "./contact"
import { ContactId } from "./value-objects/contact-id"
import { ContactUserId } from "./value-objects/contact-user-id"

export interface ContactRepository {
  findByUser(
    userId: ContactUserId,
    limit: number,
    offset: number
  ): Promise<Contact[]>
  findById(id: ContactId): Promise<Contact | null>
  save(contact: Contact): Promise<void>
  countByUser(userId: ContactUserId): Promise<number>
  delete(id: ContactId): Promise<void>
}
