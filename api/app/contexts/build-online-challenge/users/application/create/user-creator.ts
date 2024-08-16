import { User } from "../../domain/user"
import { UserRepository } from "../../domain/user-repository"

export class UserCreator {
  constructor(private readonly repository: UserRepository) {}

  async run(
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    const user = User.fromPrimitives({ _id: id, name, email, password })

    await this.repository.save(user)
  }
}
