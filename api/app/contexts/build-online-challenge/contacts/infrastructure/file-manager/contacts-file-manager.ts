import path from "path"
import * as fs from "fs/promises"
import { ContactFileManagerRepository } from "../../domain/contact-file-manager-repository"

export class ContactsFileManager implements ContactFileManagerRepository {
  private readonly storagePath = process.env.UPLOAD_FOLDER ?? "uploads/contacts"

  async save(
    id: string,
    fileExtension: string,
    buffer: { type: "Buffer"; data: number[] }
  ): Promise<void> {
    const folderPath = path.join("public", this.storagePath)

    const filePath = path.join(folderPath, `${id}.${fileExtension}`)

    await fs.mkdir(folderPath, { recursive: true })
    await fs.writeFile(filePath, Buffer.from(buffer.data))
  }

  async delete(id: string): Promise<void> {
    const folderPath = path.join("public", this.storagePath)

    const contacts = await fs.readdir(folderPath)
    for (const contact of contacts) {
      if (contact.includes(id)) {
        await fs.unlink(path.join(folderPath, contact))
      }
    }
  }
}
