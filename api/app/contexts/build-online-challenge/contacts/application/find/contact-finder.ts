import { UnauthorizedOperationError } from "../../../../../contexts/shared/domain/unauthorized-operation-error"
import { Contact } from "../../domain/contact"
import { ContactRepository } from "../../domain/contact-repository"
import { ContactNotFoundError } from "../../domain/errors/contact-not-found-error"
import { ContactId } from "../../domain/value-objects/contact-id"
import { ContactUserId } from "../../domain/value-objects/contact-user-id"

export class ContactFinder {
  constructor(private readonly contactRepository: ContactRepository) {}

  async run(id: string, userId: string): Promise<Contact> {
    const contactUserId = new ContactUserId(userId)
    const contactId = new ContactId(id)

    const contact = await this.contactRepository.findById(contactId)

    if (contact === null) {
      throw new ContactNotFoundError(contactId.value)
    }

    if (contact.userId.value !== contactUserId.value) {
      throw new UnauthorizedOperationError(
        `This contact does not belong to the user with id ${userId}`
      )
    }

    return contact
  }
}
