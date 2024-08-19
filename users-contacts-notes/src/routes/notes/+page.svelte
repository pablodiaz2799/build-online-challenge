<script lang="ts">
	import Heading from '$lib/components/atoms/Heading.svelte'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import { notes, getNotes } from '$lib/stores/notes'
    import NotesGrid from '$lib/components/organism/NotesGrid.svelte'
	import Button from '$lib/components/atoms/Button.svelte'
	import { goto } from '$app/navigation'

	const { token } = $page.data

	onMount(async () => {
		await getNotes(token)
	})

	$: notesList = $notes
</script>

<main>
	<div class="flex items-center justify-between">
		<Heading text="Notes" />
		<Button text="Add New" width="w-36" onClick={() => goto('/notes/add')} />
	</div>
	{#if notesList.length > 0}
		<NotesGrid notes={notesList} {token} />
	{:else}
		<p>No notes found</p>
	{/if}
</main>
