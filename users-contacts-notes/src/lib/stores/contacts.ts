import { goto } from '$app/navigation'
import { type AddContact, type Contact, type UpdateContact } from '$lib/interfaces/contact'
import {
	addContact,
	deleteContact,
	fetchContact,
	fetchContacts,
	updateContact
} from '$lib/services/contacts-service'
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
	loadingContacts.set(true)
	canLoadMore.set(true)
	page.set(1)
	limit.set(10)
	const { data, totalContacts } = await fetchContacts(1, 10, token)
	console.log(data)
	contacts.set(data)
	if (get(contacts).length >= totalContacts) {
		canLoadMore.set(false)
	}
	loadingContacts.set(false)
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

export const add = async (
	{ name, title, email, address, cellphoneNumber, file }: AddContact,
	token: string
): Promise<void> => {
	const response = await addContact({ name, title, email, address, cellphoneNumber, file }, token)
	if (response) {
		toast.success('Contact added')
	} else {
		toast.error('Error adding contact')
	}
}

export const update = async (
	{ _id, name, title, email, address, cellphoneNumber, file }: UpdateContact,
	token: string
): Promise<void> => {
	const response = await updateContact(
		{ _id, name, title, email, address, cellphoneNumber, file },
		token
	)
	if (response) {
		toast.success('Contact updated')
		getContact(_id, token)
	} else {
		toast.error('Error updating contact')
	}
}

export const del = async (id: string, token: string): Promise<void> => {
	debugger
	const response = await deleteContact(id, token)
	if (response) {
		toast.success('Contact deleted')
		goto('/contacts', { replaceState: true, invalidateAll: true })
	} else {
		toast.error('Error deleting contact')
	}
	debugger
}
