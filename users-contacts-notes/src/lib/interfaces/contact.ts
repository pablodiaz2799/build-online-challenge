export interface Contact {
	_id: string
	name: string
	title: string
	email: string
	address: string
	cellphoneNumber: string
	profilePictureUrl: string
	userId: string
}

export interface UpdateContact {
	_id: string
	name?: string
	title?: string
	email?: string
	address?: string
	cellphoneNumber?: string
	file?: File
}

export interface AddContact {
	name: string
	title: string
	email: string
	address: string
	cellphoneNumber: string
	file: File
}

export interface GetContactsResponse {
	data: Contact[]
	totalContacts: number
}
