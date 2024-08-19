<script lang="ts">
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
			<!-- <div class="border-build-green rounded-full border-2">
				<div class="border-input-dark rounded-full border-4"> -->
			<ProfileImage
				src={`http://localhost:7070${note.contact.profilePictureUrl}`}
				minWith="min-w-44"
			/>
			<!-- </div>
			</div> -->
			<div class={`flex flex-col items-start justify-center ${gap}`}>
				<span class="font-redhat text-3xl font-bold text-white">{note.contact.name}</span>
				<span class="font-public-sans text-holder-dark text-xl font-normal">
					{note.contact.cellphoneNumber}
				</span>
			</div>
		</div>
		<div class="rounded-xl border border-holder-dark p-4">
			<p>{note.content}</p>
		</div>
	{/if}
</div>
