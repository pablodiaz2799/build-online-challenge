<script lang="ts">
	import Heading from '$lib/components/atoms/Heading.svelte'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import {
		canLoadMore,
		contacts,
		getContacts,
		page as contactsPage,
		limit,
		filter
	} from '$lib/stores/contacts'
	import ContactGrid from '$lib/components/organism/ContactGrid.svelte'
	import Button from '$lib/components/atoms/Button.svelte'
	import Input from '$lib/components/atoms/Input.svelte'
	import { goto } from '$app/navigation'

	const { token } = $page.data
	let searchContent = ''
	let timeout: NodeJS.Timeout

	async function handleChange() {
		contactsPage.set(1)
		limit.set(10)
		filter.set(searchContent)
		await getContacts(token)
	}

	$: watchInput(searchContent)

	function watchInput(value: string) {
		clearTimeout(timeout)

		timeout = setTimeout(async () => {
			await handleChange()
		}, 1000)
	}

	$: contactsList = $contacts
</script>

<main class="mx-auto max-w-[1200px]">
	<div class="flex items-center justify-between">
		<Heading text="Contacts" />
		<Button text="Add New" width={"w-52"} onClick={() => goto('/contacts/add')} />
	</div>
	<div class="my-6">
		<Input
			bind:value={searchContent}
			variant={'tertiary'}
			placeholder="Search contact by name, email or phone..."
		/>
	</div>
	{#if contactsList.length > 0}
		<ContactGrid bind:contacts={contactsList} {token} />
	{:else}
		<p>No contacts found</p>
	{/if}
</main>
