import { User } from "./user"
import { UserEmail } from "./value-objects/user-email"

export interface UserRepository {
  findByEmail(email: UserEmail): Promise<User | null>
  save(user: User): Promise<void>
}
