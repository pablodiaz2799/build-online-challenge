<script lang="ts">
	import type { Contact } from '$lib/interfaces/contact'
	import { canLoadMore, loadingContacts, loadMoreContacts } from '$lib/stores/contacts'
	import ContactCard from '$lib/components/molecules/ContactCard.svelte'
	import InfiniteLoading from 'svelte-infinite-loading'

	export let contacts: Contact[] = []
	export let token: string = ''

	$: contactsList = contacts

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

<div class="mb-28 grid w-full grid-cols-1 gap-6 gap-x-8 sm:mb-20 md:grid-cols-2">
	{#each contactsList as item}
		<ContactCard contact={item} />
	{/each}

	{#if !loading}
		<InfiniteLoading on:infinite={infiniteHandler} />
	{/if}
</div>
