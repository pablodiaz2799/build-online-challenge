import { UserNotFoundError } from "../../domain/errors/user-not-found-error"
import { User } from "../../domain/user"
import { UserRepository } from "../../domain/user-repository"
import { UserEmail } from "../../domain/value-objects/user-email"

export class UserFinder {
  constructor(private readonly userRepository: UserRepository) {}

  async run(email: string): Promise<User> {
    const userEmail = new UserEmail(email)

    const user = await this.userRepository.findByEmail(userEmail)

    if (!user) {
      throw new UserNotFoundError(userEmail.value)
    }

    return user
  }
}
