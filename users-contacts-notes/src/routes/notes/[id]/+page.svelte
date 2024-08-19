<script lang="ts">
	import { page } from '$app/stores'
	import { getNote, selectedNote } from '$lib/stores/notes'
	import { onMount } from 'svelte'
	import NoteDetail from '$lib/components/organism/NoteDetail.svelte'

	let { id } = $page.params
	let { token } = $page.data

	onMount(async () => {
		await getNote(id, token)
	})

	$: note = $selectedNote
</script>

<main class="mx-auto mt-16 w-full max-w-[920px]">
	<NoteDetail {note} />
	<!-- {#if contact}
		<h1>{contact.name}</h1>
		<p>{contact.email}</p>
		<p>{contact.cellphoneNumber}</p>
	{:else}
		<p>No contact found 🫤</p>
	{/if} -->
</main>
