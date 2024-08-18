import { type Contact } from '$lib/interfaces/contact'
import { fetchContact, fetchContacts } from '$lib/services/contacts-service'
import { toast } from 'svelte-sonner'
import { get, writable } from 'svelte/store'

export const contacts = writable<Contact[]>([])
export const selectedContact = writable<Contact | null>(null)
export const page = writable<number>(1)
export const limit = writable<number>(10)
export const canLoadMore = writable<boolean>(true)
export const loadingContacts = writable<boolean>(true)

export const loadMoreContacts = async (token: string): Promise<void> => {
	loadingContacts.set(true)
	if (get(canLoadMore) === false) {
		toast.success('Loaded all contacts')
		return
	}
	page.update((p) => p + 1)
	const currentPage = get(page)
	const currentLimit = get(limit)
	const { data, totalContacts } = await fetchContacts(currentPage, currentLimit, token)
	contacts.update((items) => [...items, ...data])
	if (get(contacts).length >= totalContacts) {
		canLoadMore.set(false)
	}
	loadingContacts.set(false)
}

export const getContacts = async (token: string): Promise<void> => {
	if (get(contacts).length === 0) {
		loadingContacts.set(true)
		canLoadMore.set(true)
		page.set(1)
		limit.set(10)
		const { data, totalContacts } = await fetchContacts(1, 10, token)
		contacts.set(data)
		if (get(contacts).length >= totalContacts) {
			canLoadMore.set(false)
		}
		loadingContacts.set(false)
	}
}

export const getContact = async (id: string, token: string): Promise<void> => {
	const contact = get(contacts).find((c) => c._id === id)
	if (contact) {
		selectedContact.set(contact)
	} else {
		const data = await fetchContact(id, token)
		selectedContact.set(data)
	}
}
