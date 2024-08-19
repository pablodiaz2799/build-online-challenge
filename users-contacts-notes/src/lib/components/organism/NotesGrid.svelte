<script lang="ts">
	import type { Contact } from '$lib/interfaces/contact'
	import type { Note } from '$lib/interfaces/note'
	import { canLoadMore, loadingNotes, loadMoreNotes } from '$lib/stores/notes'
	// import ContactCard from '$lib/components/molecules/ContactCard.svelte'
    import NoteCard from '../molecules/NoteCard.svelte';
	import InfiniteLoading from 'svelte-infinite-loading'

	export let notes: Note[] = []
	export let token: string = ''

	$: canLoad = $canLoadMore
	$: loading = $loadingNotes

	async function infiniteHandler({
		detail: { loaded, complete }
	}: {
		detail: { loaded: () => void; complete: () => void }
	}) {
		await loadMoreNotes(token)
		if (canLoad) {
			loaded()
		} else {
			complete()
		}
	}
</script>

<div class=" grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
	{#each notes as item}
		<NoteCard note={item} />
	{/each}

	{#if !loading}
		<InfiniteLoading on:infinite={infiniteHandler} />
	{/if}
</div>
