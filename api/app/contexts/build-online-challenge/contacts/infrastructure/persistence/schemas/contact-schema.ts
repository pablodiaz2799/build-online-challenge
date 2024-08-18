import { Contact } from "contexts/build-online-challenge/contacts/domain/contact"
import { Primitives } from "../../../../../shared/domain/primitives"
import mongoose from "mongoose"

const ContactSchema = new mongoose.Schema<Primitives<Contact>>(
  {
    _id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    email: {type: String, required: true},
    address: { type: String, required: true },
    cellphoneNumber: { type: String, required: true },
    profilePictureUrl: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    collection: "contacts",
  }
)

export const ContactModel = mongoose.model<Primitives<Contact>>(
  "Contact",
  ContactSchema
)
