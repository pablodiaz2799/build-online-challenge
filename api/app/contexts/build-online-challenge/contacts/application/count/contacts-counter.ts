import { ContactRepository } from "../../domain/contact-repository"
import { ContactUserId } from "../../domain/value-objects/contact-user-id"

export class ContactsCounter {
  constructor(private readonly repository: ContactRepository) {}

  async run(userId: string): Promise<number> {
    const contactUserId = new ContactUserId(userId)
    return this.repository.countByUser(contactUserId)
  }
}
