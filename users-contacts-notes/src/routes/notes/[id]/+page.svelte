<script lang="ts">
	import { page } from '$app/stores'
	import { getNote, selectedNote } from '$lib/stores/notes'
	import { onMount } from 'svelte'
	import NoteDetail from '$lib/components/organism/NoteDetail.svelte'
	import NavigationButton from '$lib/components/atoms/NavigationButton.svelte'

	let { id } = $page.params
	let { token } = $page.data

	onMount(async () => {
		await getNote(id, token)
	})

	$: note = $selectedNote
</script>

<main class="mx-auto mt-8 w-full max-w-[920px] sm:mt-16">
	<NavigationButton href="/notes" />
	<NoteDetail {note} />
</main>
