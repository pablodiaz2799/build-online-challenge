import type { Note } from '$lib/interfaces/note'

type GetNotesResponse = {
	data: Note[]
	totalNotes: number
}

export const fetchNotes = async (
	page: number,
	limit: number,
	token: string
): Promise<GetNotesResponse> => {
	try {
		const response = await fetch(
			`http://localhost:7070/api/notes?page=${page.toString()}&limit=${limit.toString()}&timestamp=${Date.now()}`,
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
			return (await response.json()) as GetNotesResponse
		} else {
			throw new Error('Error fetching notes')
		}
	} catch (error) {
		console.error(error)
		return { data: [], totalNotes: 0 }
	}
}

export const fetchNote = async (id: string, token: string): Promise<Note | null> => {
	try {
		const response = await fetch(`http://localhost:7070/api/notes/${id}?timestamp=${Date.now()}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Cache-Control': 'no-cache, no-store, must-revalidate',
				Pragma: 'no-cache',
				Expires: '0'
			}
		})

		if (response.ok) {
			return (await response.json()) as Note
		} else {
			throw new Error('Error fetching note')
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

export const addNote = async (content: string, contactId: string, token: string): Promise<boolean> => {
	try {
		const response = await fetch(`http://localhost:7070/api/contacts/${contactId}/notes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ content })
		})

		if (response.ok) {
			return true
		} else {
			throw new Error('Error adding note')
		}
	} catch (error) {
		console.error(error)
        return false
	}
}
