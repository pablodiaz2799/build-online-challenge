export class UserNotFoundError extends Error {
  constructor(email: string) {
    super(`The user <${email}> was not found`)
  }
}
