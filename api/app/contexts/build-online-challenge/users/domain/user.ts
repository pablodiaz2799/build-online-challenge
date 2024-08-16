import { Primitives } from "../../../shared/domain/primitives"
import { UserEmail } from "./value-objects/user-email"
import { UserId } from "./value-objects/user-id"
import { UserName } from "./value-objects/user-name"
import { UserPassword } from "./value-objects/user-password"

export class User {
  constructor(
    public readonly _id: UserId,
    public readonly name: UserName,
    public readonly email: UserEmail,
    public readonly password: UserPassword
  ) {}

  static fromPrimitives(plainData: Primitives<User>): User {
    return new User(
      new UserId(plainData._id),
      new UserName(plainData.name),
      new UserEmail(plainData.email),
      new UserPassword(plainData.password)
    )
  }

  toPrimitives(): Primitives<User> {
    return {
      _id: this._id.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
    }
  }

  toPublicPrimitives(): Partial<Primitives<User>> {
    return {
      _id: this._id.value,
      name: this.name.value,
      email: this.email.value,
    }
  }
}
