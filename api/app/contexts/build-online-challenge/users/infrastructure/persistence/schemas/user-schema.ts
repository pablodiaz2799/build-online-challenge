import mongoose from "mongoose"
import { Primitives } from "../../../../../shared/domain/primitives"
import { User } from "../../../domain/user"

const UserSchema = new mongoose.Schema<Primitives<User>>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    collection: "users",
  }
)

export const UserModel = mongoose.model<Primitives<User>>("User", UserSchema)
