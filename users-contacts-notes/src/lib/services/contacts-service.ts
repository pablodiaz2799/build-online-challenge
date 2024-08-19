import { PUBLIC_API_BASE_URL } from '$env/static/public'
import type {
	AddContact,
	Contact,
	GetContactsResponse,
	UpdateContact
} from '$lib/interfaces/contact'

export const fetchContacts = async (
	page: number,
	limit: number,
	token: string,
	filter?: string
): Promise<GetContactsResponse> => {
	try {
		let url = `${PUBLIC_API_BASE_URL}contacts?page=${page.toString()}&limit=${limit.toString()}`
		if (filter) {
			url += `&filter=${filter}`
		}
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Cache-Control': 'no-cache, no-store, must-revalidate',
				Pragma: 'no-cache',
				Expires: '0'
			}
		})

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
		const response = await fetch(`${PUBLIC_API_BASE_URL}contacts/${id}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Cache-Control': 'no-cache, no-store, must-revalidate',
				Pragma: 'no-cache',
				Expires: '0'
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

		const response = await fetch(`${PUBLIC_API_BASE_URL}contacts`, {
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

		const response = await fetch(`${PUBLIC_API_BASE_URL}contacts/${contact._id}`, {
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
		const response = await fetch(`${PUBLIC_API_BASE_URL}contacts/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		if (!response.ok) {
			throw new Error('Error deleting contact')
		}
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}
