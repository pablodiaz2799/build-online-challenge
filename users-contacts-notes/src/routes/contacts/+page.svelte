<script lang="ts">
	import Heading from '$lib/components/atoms/Heading.svelte'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import { canLoadMore, contacts, getContacts, loadingContacts } from '$lib/stores/contacts'
	import ContactGrid from '$lib/components/organism/ContactGrid.svelte'

	const { token } = $page.data

	onMount(async () => {
		await getContacts(token)
	})

	$: contactsList = $contacts

	
</script>

<main>
	<Heading text="Contacts" />
	{#if contactsList.length > 0}
		<ContactGrid contacts={contactsList} {token} />
	{:else}
		<p>No contacts found</p>
	{/if}
</main>
