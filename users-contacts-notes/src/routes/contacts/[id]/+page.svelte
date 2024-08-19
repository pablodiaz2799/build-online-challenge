<script lang="ts">
	import { page } from '$app/stores'
	import { getContact, selectedContact } from '$lib/stores/contacts'
	import { onMount } from 'svelte'
	import ContactDetail from '$lib/components/organism/ContactDetail.svelte'
	import NavigationButton from '$lib/components/atoms/NavigationButton.svelte'

	let { id } = $page.params
	let { token } = $page.data

	onMount(async () => {
		await getContact(id, token)
	})

	$: contact = $selectedContact
</script>

<main class="mx-auto mt-8 w-full max-w-[920px] sm:mt-16">
	<NavigationButton href="/contacts" />
	<ContactDetail {contact} {token} />
</main>
