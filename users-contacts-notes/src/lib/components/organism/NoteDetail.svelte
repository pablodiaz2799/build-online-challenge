<script lang="ts">
	import { PUBLIC_STATIC_FILES_URL } from '$env/static/public'
	import type { Note } from '$lib/interfaces/note'
	import ProfileImage from '../atoms/ProfileImage.svelte'

	export let note: Note | null = null
	export let gap: string = 'gap-4'
</script>

<div class=" flex flex-col gap-4 p-4">
	{#if note === null}
		<p class="text-white">No note found 🫤</p>
	{:else}
		<div class="flex items-center justify-start gap-5 py-4">
			<ProfileImage
				src={`${PUBLIC_STATIC_FILES_URL}${note.contact.profilePictureUrl}`}
				minWith="min-w-44"
			/>

			<div class={`flex flex-col items-start justify-center ${gap}`}>
				<span class="font-redhat text-3xl font-bold text-white">{note.contact.name}</span>
				<span class="font-public-sans text-holder-dark text-xl font-normal">
					{note.contact.cellphoneNumber}
				</span>
			</div>
		</div>
		<div class="border-holder-dark rounded-xl border p-4 text-white">
			<p>{note.content}</p>
		</div>
	{/if}
</div>
