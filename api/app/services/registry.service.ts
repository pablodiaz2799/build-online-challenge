import { container, singleton } from "tsyringe"
import { IApiBase } from "../shared/interfaces/api-base.interface"
import { Model } from "mongoose"
import { type Express } from "express"
import { Primitives } from "../contexts/shared/domain/primitives"
import { User } from "../contexts/build-online-challenge/users/domain/user"
import { UserModel } from "../contexts/build-online-challenge/users/infrastructure/persistence/schemas/user-schema"
import { UserRepository } from "../contexts/build-online-challenge/users/domain/user-repository"
import { MongoIdGenerator } from "../contexts/shared/infrastructure/persistence/mongo-id-generator"
import { SignupPostController } from "../routes/signup/signup-post-controller"
import { LoginPostController } from "../routes/login/login-post-controller"
import { UserMongoRepository } from "../contexts/build-online-challenge/users/infrastructure/persistence/user-mongo-repository"
import { UserGetController } from "../routes/users/user-get-controller"
import { Contact } from "../contexts/build-online-challenge/contacts/domain/contact"
import { ContactModel } from "../contexts/build-online-challenge/contacts/infrastructure/persistence/schemas/contact-schema"
import { ContactRepository } from "../contexts/build-online-challenge/contacts/domain/contact-repository"
import { ContactMongoRepository } from "../contexts/build-online-challenge/contacts/infrastructure/persistence/contact-mongo-repository"
import { ContactFileManagerRepository } from "../contexts/build-online-challenge/contacts/domain/contact-file-manager-repository"
import { ContactsFileManager } from "../contexts/build-online-challenge/contacts/infrastructure/file-manager/contacts-file-manager"
import { ContactPostController } from "../routes/contacts/create/contact-post-controller"
import { ContactsGetController } from "../routes/contacts/find/contacts-get-controller"
import { ContactGetController } from "../routes/contacts/find/contact-get-controller"
import { Note } from "../contexts/build-online-challenge/notes/domain/note"
import { NoteModel } from "../contexts/build-online-challenge/notes/infrastructure/persistence/schemas/note-schema"
import { NoteRepository } from "../contexts/build-online-challenge/notes/domain/note-repository"
import { NoteMongoRepository } from "../contexts/build-online-challenge/notes/infrastructure/persistence/notes-mongo-repository"
import { NoteGetController } from "../routes/notes/find/note-get-controller"
import { NotesGetController } from "../routes/notes/find/notes-get-controller"
import { NotePostController } from "../routes/notes/create/note-post-controller"
import { ContactPutController } from "../routes/contacts/update/contact-put-controller"

@singleton()
export class RegistryService {
  private registry: IApiBase[]

  constructor() {
    this.registry = []
  }

  public init(): void {
    this.registry = [
      container.resolve(SignupPostController),
      container.resolve(LoginPostController),
      container.resolve(UserGetController),
      container.resolve(ContactPostController),
      container.resolve(ContactPutController),
      container.resolve(ContactsGetController),
      container.resolve(ContactGetController),
      container.resolve(NoteGetController),
      container.resolve(NotesGetController),
      container.resolve(NotePostController)
    ]
  }

  public registerDependencies(): void {
    //Models
    container.register<Model<Primitives<User>>>("User", { useValue: UserModel })
    container.register<Model<Primitives<Contact>>>("Contact", {
      useValue: ContactModel,
    })
    container.register<Model<Primitives<Note>>>("Note", { useValue: NoteModel })

    //Repositories
    container.register<UserRepository>("UserRepository", {
      useClass: UserMongoRepository,
    })
    container.register<ContactRepository>("ContactRepository", {
      useClass: ContactMongoRepository,
    })
    container.register<ContactFileManagerRepository>(
      "ContactFileManagerRepository",
      { useClass: ContactsFileManager }
    )
    container.register<NoteRepository>("NoteRepository", {useClass: NoteMongoRepository})

    container.register("IdGenerator", { useClass: MongoIdGenerator })
  }

  public connect(app: Express): void {
    for (const controller of this.registry) {
      app.use(`/api${controller.baseRoute}`, controller.router)
    }
  }
}
