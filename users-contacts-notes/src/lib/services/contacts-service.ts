import type { AddContact, Contact, UpdateContact } from '$lib/interfaces/contact'

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
			`http://localhost:7070/api/contacts?page=${page.toString()}&limit=${limit.toString()}&timestamp=${Date.now()}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
					'Cache-Control': 'no-cache, no-store, must-revalidate',
					Pragma: 'no-cache',
					Expires: '0'
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
		const response = await fetch(
			`http://localhost:7070/api/contacts/${id}?timestamp=${Date.now()}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
					'Cache-Control': 'no-cache, no-store, must-revalidate',
					Pragma: 'no-cache',
					Expires: '0'
				}
			}
		)

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

export const addContact = async (contact: AddContact, token: string): Promise<boolean> => {
	try {
		const formData = new FormData()

		for (const key in contact) {
			const value = contact[key as keyof AddContact]
			if (typeof value === 'string' && value !== '') {
				formData.append(key, value)
			} else if (value instanceof File && value !== undefined) {
				formData.append(key, value)
			}
		}

		const response = await fetch('http://localhost:7070/api/contacts', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`
			},
			body: formData
		})

		if (!response.ok) {
			throw new Error('Error adding contact')
		}
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const updateContact = async (contact: UpdateContact, token: string): Promise<boolean> => {
	try {
		const formData = new FormData()

		for (const key in contact) {
			const value = contact[key as keyof UpdateContact]
			if (typeof value === 'string' && value !== '') {
				formData.append(key, value)
			} else if (value instanceof File && value !== undefined) {
				formData.append(key, value)
			}
		}

		const response = await fetch(`http://localhost:7070/api/contacts/${contact._id}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${token}`
			},
			body: formData
		})
		if (!response.ok) {
			throw new Error('Error updating contact')
		}
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const deleteContact = async (id: string, token: string): Promise<boolean> => {
	try {
		const response = await fetch(`http://localhost:7070/api/contacts/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		debugger
		if (!response.ok) {
			throw new Error('Error deleting contact')
		}
		return true
		debugger
	} catch (error) {
		console.error(error)
		return false
		debugger
	}
}
