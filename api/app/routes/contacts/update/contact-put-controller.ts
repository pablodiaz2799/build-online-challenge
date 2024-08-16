import { ContactFinder } from "../../../contexts/build-online-challenge/contacts/application/find/contact-finder"
import { ContactUpdater } from "../../../contexts/build-online-challenge/contacts/application/update/contact-updater"
import { Contact } from "../../../contexts/build-online-challenge/contacts/domain/contact"
import { ContactFileManagerRepository } from "../../../contexts/build-online-challenge/contacts/domain/contact-file-manager-repository"
import { ContactRepository } from "../../../contexts/build-online-challenge/contacts/domain/contact-repository"
import { Primitives } from "../../../contexts/shared/domain/primitives"
import { Response, Router } from "express"
import { Auth } from "../../../middlewares/auth"
import multer from "multer"
import { IApiBase } from "../../../shared/interfaces/api-base.interface"
import { TypedAuthRequest } from "../../../shared/interfaces/express-types"
import { inject, injectable } from "tsyringe"

const upload = multer()

interface FileType {
  fileName: string
  buffer: { type: "Buffer"; data: number[] }
}

@injectable()
export class ContactPutController implements IApiBase {
  router = Router()
  public readonly baseRoute = "/contacts"

  constructor(
    @inject("ContactRepository")
    private readonly repository: ContactRepository,
    @inject("ContactFileManagerRepository")
    private readonly fileManagerRepository: ContactFileManagerRepository
  ) {
    this.router.put(
      "/:id",
      Auth,
      upload.single("file"),
      async (
        req: TypedAuthRequest<{}, Partial<Primitives<Contact>>>,
        res: Response
      ) => {
        await this.run(req, res)
      }
    )
  }

  async run(
    req: TypedAuthRequest<{}, Partial<Primitives<Contact>>>,
    res: Response
  ): Promise<void> {
    try {
      const contactFinder = new ContactFinder(this.repository)
      const contactUpdater = new ContactUpdater(
        this.repository,
        contactFinder,
        this.fileManagerRepository
      )

      const { name, address, email, cellphoneNumber } = req.body
      let file: FileType | undefined

      if (req.file) {
        file = {
          fileName: req.file?.originalname,
          buffer: req.file?.buffer.toJSON(),
        }
      }

      await contactUpdater.run(
        req.params.id,
        req.user.id,
        name,
        email,
        address,
        cellphoneNumber,
        file
      )

      res.status(200).send()
    } catch (error) {
      console.log(`Error updating contact ${error}`)
      res.status(500).send(`Error updating contact: ${error}`)
    }
  }
}
