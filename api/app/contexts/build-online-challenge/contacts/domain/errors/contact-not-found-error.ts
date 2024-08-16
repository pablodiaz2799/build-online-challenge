export class ContactNotFoundError extends Error {
  constructor(id: string) {
    super(`The contact <${id}> was not found`)
  }
}
