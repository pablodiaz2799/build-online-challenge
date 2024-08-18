import { ContactFileManagerRepository } from "../../domain/contact-file-manager-repository"
import { ContactRepository } from "../../domain/contact-repository"
import { ContactFinder } from "../find/contact-finder"

export class ContactDeleter {
  constructor(
    private readonly repository: ContactRepository,
    private readonly contactFinder: ContactFinder,
    private readonly contactFileManagerRepository: ContactFileManagerRepository
  ) {}

  async run(id: string, userId: string): Promise<void> {
    const contact = await this.contactFinder.run(id, userId)

    await this.contactFileManagerRepository.delete(contact._id.value)
    await this.repository.delete(contact._id)
  }
}
