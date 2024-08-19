export interface Note {
	_id: string
	content: string
	contactId: string
	userId: string
	contact: {
		name: string
		profilePictureUrl: string
		cellphoneNumber: string
	}
}

export interface GetNotesResponse {
	data: Note[]
	totalNotes: number
}
