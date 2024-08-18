import * as path from "path"
import sizeOf from "image-size"
import { ContactFileManagerRepository } from "../../domain/contact-file-manager-repository"
import { ContactRepository } from "../../domain/contact-repository"
import { InvalidArgumentError } from "../../../../../contexts/shared/domain/invalid-argument-error"
import { Contact } from "../../domain/contact"

export class ContactCreator {
  constructor(
    private readonly repository: ContactRepository,
    private readonly fileManager: ContactFileManagerRepository
  ) {}

  async run(
    id: string,
    name: string,
    title: string,
    email: string,
    address: string,
    cellphoneNumber: string,
    fileName: string,
    buffer: { type: "Buffer"; data: number[] },
    userId: string
  ): Promise<void> {
    const fileExtension = path.extname(fileName).replace(".", "")
    const dim = sizeOf(Buffer.from(buffer.data))
    const width = dim.width
    const height = dim.height

    if (width === undefined || height === undefined) {
      throw new InvalidArgumentError("Invalid image dimensions")
    }

    const contact = Contact.fromPrimitives({
      _id: id,
      name,
      title,
      email,
      address,
      cellphoneNumber,
      profilePictureUrl: `/${
        process.env.UPLOAD_FOLDER ?? "/uploads/contacts"
      }/${id}.${fileExtension}`,
      userId,
    })

    await this.repository.save(contact)
    await this.fileManager.save(id, fileExtension, buffer)
  }
}
