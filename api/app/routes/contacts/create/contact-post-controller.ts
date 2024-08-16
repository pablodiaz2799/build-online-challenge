import { ContactCreator } from "../../../contexts/build-online-challenge/contacts/application/create/contact-creator"
import { ContactFileManagerRepository } from "../../../contexts/build-online-challenge/contacts/domain/contact-file-manager-repository"
import { ContactRepository } from "../../../contexts/build-online-challenge/contacts/domain/contact-repository"
import { IdGenerator } from "../../../contexts/shared/domain/id-generator"
import { Response, Router } from "express"
import multer from "multer"
import { IApiBase } from "../../../shared/interfaces/api-base.interface"
import { TypedAuthRequest } from "../../../shared/interfaces/express-types"
import { inject, injectable } from "tsyringe"
import { Auth } from "../../../middlewares/auth"

type ContactPostRequest = {
  name: string
  email: string
  address: string
  cellphoneNumber: string
}

const upload = multer()

@injectable()
export class ContactPostController implements IApiBase {
  router = Router()

  public readonly baseRoute = "/contacts"

  constructor(
    @inject("ContactRepository")
    private readonly contactRepository: ContactRepository,
    @inject("ContactFileManagerRepository")
    private readonly contactFileManagerRepository: ContactFileManagerRepository,
    @inject("IdGenerator") private readonly idGenerator: IdGenerator
  ) {
    this.router.post(
      "/",
      Auth,
      upload.single("file"),
      async (req: TypedAuthRequest<{}, ContactPostRequest>, res: Response) => {
        await this.run(req, res)
      }
    )
  }

  async run(
    req: TypedAuthRequest<{}, ContactPostRequest>,
    res: Response
  ): Promise<void> {
    try {
      if (req.file?.mimetype.split("/")[0] === "image") {
        const { name, email, address, cellphoneNumber } = req.body
        const file = req.file
        const id = this.idGenerator.generate()
        const contactCreator = new ContactCreator(
          this.contactRepository,
          this.contactFileManagerRepository
        )

        await contactCreator.run(
          id,
          name,
          email,
          address,
          cellphoneNumber,
          file.originalname,
          file.buffer.toJSON(),
          req.user.id
        )

        res.status(201).send()
      } else {
        res.status(400).send("Invalid or missing file")
      }
    } catch (error) {
      console.log(`Error creating contact ${error}`)
      res.status(500).send(`Error creating contact: ${error}`)
    }
  }
}
