import { ContactFileManagerRepository } from "../../domain/contact-file-manager-repository"
import { ContactRepository } from "../../domain/contact-repository"
import { ContactFinder } from "../find/contact-finder"
import * as path from "path"
import sizeOf from "image-size"
import { InvalidArgumentError } from "../../../../shared/domain/invalid-argument-error"

export class ContactUpdater {
  constructor(
    private readonly repository: ContactRepository,
    private readonly contactFinder: ContactFinder,
    private readonly fileManager: ContactFileManagerRepository
  ) {}

  async run(
    id: string,
    userId: string,
    name?: string,
    title?: string,
    email?: string,
    address?: string,
    cellphoneNumber?: string,
    file?: {
      fileName: string
      buffer: { type: "Buffer"; data: number[] }
    }
  ): Promise<void> {
    const contact = await this.contactFinder.run(id, userId)

    let plainDataToUpdate = {
      name,
      title,
      email,
      address,
      cellphoneNumber,
    }

    let profilePictureUrl: string | undefined = undefined

    if (file !== undefined) {
      const fileExtension = path.extname(file.fileName).replace(".", "")
      const dim = sizeOf(Buffer.from(file.buffer.data))
      const width = dim.width
      const height = dim.height

      if (width === undefined || height === undefined) {
        throw new InvalidArgumentError("Invalid image dimensions")
      }

      profilePictureUrl = `/${
        process.env.UPLOAD_FOLDER ?? "/uploads/contacts"
      }/${id}.${fileExtension}`

      await this.fileManager.delete(id)
      await this.fileManager.save(id, fileExtension, file.buffer)
    }

    const updatedContact = contact.update({
      ...plainDataToUpdate,
      profilePictureUrl,
    })

    await this.repository.save(updatedContact)
  }
}
