import { Primitives } from "contexts/shared/domain/primitives"
import { Model } from "mongoose"
import { inject, injectable } from "tsyringe"
import { User } from "../../domain/user"
import { UserRepository } from "../../domain/user-repository"
import { UserEmail } from "../../domain/value-objects/user-email"

@injectable()
export class UserMongoRepository implements UserRepository {
  constructor(
    @inject("User") private readonly model: Model<Primitives<User>>
  ) {}

  async findByEmail(email: UserEmail): Promise<User | null> {
    return await this.model.findOne({ email: email.value }).then((user) => {
      if (!user) return null
      return User.fromPrimitives(user)
    })
  }

  async save(user: User): Promise<void> {
    await this.model.create(user.toPrimitives())
  }
}
