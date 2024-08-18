<script lang="ts">
	import { page } from '$app/stores'
	import { getContact, selectedContact } from '$lib/stores/contacts'
	import { onMount } from 'svelte'
	import ContactDetail from '$lib/components/organism/ContactDetail.svelte'

	let { id } = $page.params
	let { token } = $page.data

	onMount(async () => {
		await getContact(id, token)
	})

	$: contact = $selectedContact
</script>

<main class="mx-auto mt-16 w-full max-w-[920px]">
	<ContactDetail {contact} {token} />
	<!-- {#if contact}
		<h1>{contact.name}</h1>
		<p>{contact.email}</p>
		<p>{contact.cellphoneNumber}</p>
	{:else}
		<p>No contact found 🫤</p>
	{/if} -->
</main>
