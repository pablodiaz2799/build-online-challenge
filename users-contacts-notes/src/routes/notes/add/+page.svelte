<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import { add } from '$lib/stores/notes'
	import { getFilteredContacts } from '$lib/stores/contacts'
	import { toast } from 'svelte-sonner'
	import Button from '$lib/components/atoms/Button.svelte'
	import Heading from '$lib/components/atoms/Heading.svelte'
	import { type Contact } from '$lib/interfaces/contact'
	import ContactResult from '$lib/components/molecules/ContactResult.svelte'
	import Input from '$lib/components/atoms/Input.svelte'
	import deleteTrash from '$lib/assets/icon/delete-trash.svg'
	import NavigationButton from '$lib/components/atoms/NavigationButton.svelte'

	let { token } = $page.data

	let content: string | undefined = undefined
	let searchContent = ''
	let timeout: NodeJS.Timeout
	let contactList: Contact[] = []
	let selectedContact: Contact | undefined

	async function handleChange() {
		if (searchContent === '') {
			contactList = []
			return
		}
		contactList = await getFilteredContacts(searchContent, token)
	}

	$: watchInput(searchContent)

	function watchInput(value: string) {
		clearTimeout(timeout)

		timeout = setTimeout(async () => {
			await handleChange()
		}, 1000)
	}

	const handleSelect = (contact: Contact) => () => {
		selectedContact = contact
		contactList = []
		searchContent = ''
	}

	const handleAdd = async () => {
		if (content !== undefined && selectedContact !== undefined) {
			await add(content, selectedContact?._id, token)
			goto(`/notes`, { invalidateAll: true, replaceState: true })
		} else {
			toast.error('You need to select a contact and write a note')
		}
	}
</script>

<main class="mx-auto mt-8 w-full max-w-[1200px] sm:mt-16">
	<NavigationButton href="/notes" />
	<Heading text="Add New Note" />
	<div class="relative flex w-full flex-col gap-10 rounded-3xl p-4">
		<div class="relative w-full">
			<Input
				bind:value={searchContent}
				variant={'tertiary'}
				placeholder="Search contact by name or email..."
			/>
			{#if contactList.length > 0}
				<div
					class="top-13 border-holder-light absolute flex max-h-96 w-full flex-col gap-4 overflow-y-auto rounded-b-lg border bg-black py-3"
				>
					{#each contactList as contact}
						<ContactResult
							{contact}
							handleSelect={handleSelect(contact)}
							selected={selectedContact && selectedContact._id === contact._id}
						/>
					{/each}
				</div>
			{/if}
		</div>
		{#if selectedContact !== undefined}
			<div class="flex w-full items-center justify-between">
				<ContactResult contact={selectedContact} handleSelect={() => {}} />
				<button
					on:click={() => {
						selectedContact = undefined
					}}
				>
					<img src={deleteTrash} alt="delete trash" class="w-6" />
				</button>
			</div>
		{/if}
		<textarea
			bind:value={content}
			class="bg-input-dark font-public-sans placeholder-holder-dark h-64 resize-none rounded-xl p-3 text-white"
			placeholder="Type your note here..."
		/>
		<div class="flex w-full justify-center">
			<Button variant="primary" text="SAVE" width="sm:w-64" onClick={handleAdd} />
		</div>
	</div>
</main>
