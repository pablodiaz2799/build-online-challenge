<script lang="ts">
	import Heading from '$lib/components/atoms/Heading.svelte'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import { canLoadMore, contacts, getContacts, loadingContacts } from '$lib/stores/contacts'
	import ContactGrid from '$lib/components/organism/ContactGrid.svelte'
	import Button from '$lib/components/atoms/Button.svelte'
	import { goto } from '$app/navigation'

	const { token } = $page.data

	onMount(async () => {
		await getContacts(token)
	})

	$: contactsList = $contacts
</script>

<main>
	<div class="flex items-center justify-between">
		<Heading text="Contacts" />
		<Button text="Add New" width="w-36" onClick={() => goto('/contacts/add')} />
	</div>
	{#if contactsList.length > 0}
		<ContactGrid contacts={contactsList} {token} />
	{:else}
		<p>No contacts found</p>
	{/if}
</main>
