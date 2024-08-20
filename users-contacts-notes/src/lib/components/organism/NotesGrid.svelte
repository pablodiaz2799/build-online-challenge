<script lang="ts">
	import type { Note } from '$lib/interfaces/note'
	import { canLoadMore, loadingNotes, loadMoreNotes } from '$lib/stores/notes'

	import NoteCard from '../molecules/NoteCard.svelte'
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

<div class="mb-28 grid w-full grid-cols-1 gap-6 gap-x-8 sm:mb-20 md:grid-cols-2">
	{#each notes as item}
		<NoteCard note={item} />
	{/each}

	{#if !loading}
		<InfiniteLoading on:infinite={infiniteHandler} />
	{/if}
</div>
