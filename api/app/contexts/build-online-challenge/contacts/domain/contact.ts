import { Primitives } from "contexts/shared/domain/primitives"
import { ContactAddress } from "./value-objects/contact-address"
import { ContactId } from "./value-objects/contact-id"
import { ContactName } from "./value-objects/contact-name"
import { ContactCellphoneNumber } from "./value-objects/contact-cellphone-number"
import { ContactProfilePictureUrl } from "./value-objects/contact-profile-picture-url"
import { ContactUserId } from "./value-objects/contact-user-id"
import { ContactEmail } from "./value-objects/contact-email"
import { ContactTitle } from "./value-objects/contact-title"

export class Contact {
  constructor(
    public readonly _id: ContactId,
    public readonly name: ContactName,
    public readonly title: ContactTitle,
    public readonly email: ContactEmail,
    public readonly address: ContactAddress,
    public readonly cellphoneNumber: ContactCellphoneNumber,
    public readonly profilePictureUrl: ContactProfilePictureUrl,
    public readonly userId: ContactUserId
  ) {}

  update(plainData: Partial<Primitives<Contact>>): Contact {
    return new Contact(
      this._id,
      plainData.name !== undefined
        ? new ContactName(plainData.name)
        : this.name,
      plainData.title !== undefined
        ? new ContactTitle(plainData.title)
        : this.title,
      plainData.email !== undefined
        ? new ContactEmail(plainData.email)
        : this.email,
      plainData.address !== undefined
        ? new ContactAddress(plainData.address)
        : this.address,
      plainData.cellphoneNumber !== undefined
        ? new ContactCellphoneNumber(plainData.cellphoneNumber)
        : this.cellphoneNumber,
      plainData.profilePictureUrl !== undefined
        ? new ContactProfilePictureUrl(plainData.profilePictureUrl)
        : this.profilePictureUrl,
      this.userId
    )
  }

  static fromPrimitives(plainData: Primitives<Contact>): Contact {
    return new Contact(
      new ContactId(plainData._id),
      new ContactName(plainData.name),
      new ContactTitle(plainData.title),
      new ContactEmail(plainData.email),
      new ContactAddress(plainData.address),
      new ContactCellphoneNumber(plainData.cellphoneNumber),
      new ContactProfilePictureUrl(plainData.profilePictureUrl),
      new ContactUserId(plainData.userId)
    )
  }

  toPrimitives(): Primitives<Contact> {
    return {
      _id: this._id.value,
      name: this.name.value,
      title: this.title.value,
      email: this.email.value,
      address: this.address.value,
      cellphoneNumber: this.cellphoneNumber.value,
      profilePictureUrl: this.profilePictureUrl.value,
      userId: this.userId.value,
    }
  }
}
