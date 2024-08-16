export interface ContactFileManagerRepository {
  save: (
    id: string,
    fileExtension: string,
    buffer: { type: "Buffer"; data: number[] }
  ) => Promise<void>

  delete: (id: string) => Promise<void>
}
