import type { Contact } from '$lib/interfaces/contact'

type GetContactsResponse = {
	data: Contact[]
	totalContacts: number
}

export const fetchContacts = async (
	page: number,
	limit: number,
	token: string
): Promise<GetContactsResponse> => {
	try {
		const response = await fetch(
			`http://localhost:7070/api/contacts?page=${page.toString()}&limit=${limit.toString()}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)

		if (response.ok) {
			return (await response.json()) as GetContactsResponse
		} else {
			throw new Error('Error fetching contacts')
		}
	} catch (error) {
		console.error(error)
		return { data: [], totalContacts: 0 }
	}
}

export const fetchContact = async (id: string, token: string): Promise<Contact | null> => {
	try {
		const response = await fetch(`http://localhost:7070/api/contacts/${id}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		if (response.ok) {
			return (await response.json()) as Contact
		} else {
			throw new Error('Error fetching contact')
		}
	} catch (error) {
		console.error(error)
		return null
	}
}
