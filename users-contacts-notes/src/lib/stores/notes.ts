import type { Note } from '$lib/interfaces/note'
import { addNote, fetchNote, fetchNotes } from '$lib/services/notes-service'
import { toast } from 'svelte-sonner'
import { get, writable } from 'svelte/store'

export const notes = writable<Note[]>([])
export const selectedNote = writable<Note | null>(null)
export const page = writable<number>(1)
export const limit = writable<number>(10)
export const canLoadMore = writable<boolean>(true)
export const loadingNotes = writable<boolean>(true)

export const loadMoreNotes = async (token: string): Promise<void> => {
	loadingNotes.set(true)
	if (get(canLoadMore) === false) {
        toast.success('Loaded all notes')
		return
	}
	page.update((p) => p + 1)
	const currentPage = get(page)
	const currentLimit = get(limit)
	const { data, totalNotes } = await fetchNotes(currentPage, currentLimit, token)
	notes.update((items) => [...items, ...data])
	if (get(notes).length >= totalNotes) {
		canLoadMore.set(false)
	}
	loadingNotes.set(false)
}

export const getNotes = async (token: string): Promise<void> => {
	loadingNotes.set(true)
	canLoadMore.set(true)
	page.set(1)
	limit.set(10)
	const { data, totalNotes } = await fetchNotes(1, 10, token)
	notes.set(data)
	if (get(notes).length >= totalNotes) {
		canLoadMore.set(false)
	}
	loadingNotes.set(false)
}

export const getNote = async (id: string, token: string): Promise<void> => {
	const note = get(notes).find((n) => n._id === id)
	if (note) {
		selectedNote.set(note)
	} else {
		const data = await fetchNote(id, token)
		selectedNote.set(data)
	}
}

export const add = async (content: string, contactId: string, token: string): Promise<void> => {
	const response = await addNote(content, contactId, token)
	if (response) {
		toast.success('Note added')
	} else {
		toast.error('Error adding note')
	}
}
