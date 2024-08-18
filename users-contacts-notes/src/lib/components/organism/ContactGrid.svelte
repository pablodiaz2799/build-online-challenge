<script lang="ts">
	import type { Contact } from '$lib/interfaces/contact'
	import { canLoadMore, loadingContacts, loadMoreContacts } from '$lib/stores/contacts'
	import ContactCard from '../molecules/ContactCard.svelte'
	import InfiniteLoading from 'svelte-infinite-loading'

	export let contacts: Contact[] = []
	export let token: string = ''

	$: canLoad = $canLoadMore
	$: loading = $loadingContacts

	async function infiniteHandler({
		detail: { loaded, complete }
	}: {
		detail: { loaded: () => void; complete: () => void }
	}) {
		await loadMoreContacts(token)
		if (canLoad) {
			loaded()
		} else {
			complete()
		}
	}
</script>

<div class=" grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
	{#each contacts as item}
		<ContactCard contact={item} />
	{/each}

	{#if !loading}
		<InfiniteLoading on:infinite={infiniteHandler} />
	{/if}
</div>
