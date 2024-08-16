import { ContactRepository } from "../../domain/contact-repository"
import { ContactUserId } from "../../domain/value-objects/contact-user-id"

export class ContactsFinder {
  constructor(private readonly contactRepository: ContactRepository) {}

  async run(userId: string, limit: number, offset: number) {
    const contactUserId = new ContactUserId(userId)

    const contacts = await this.contactRepository.findByUser(
      contactUserId,
      limit,
      offset
    )

    return contacts
  }
}
