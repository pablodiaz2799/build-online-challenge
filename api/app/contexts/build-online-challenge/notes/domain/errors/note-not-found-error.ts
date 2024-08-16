export class NoteNotFoundError extends Error {
  constructor(id: string) {
    super(`The note <${id}> was not found`)
  }
}
