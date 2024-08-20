<script lang="ts">
    
	import type { Note } from '$lib/interfaces/note'
	import ProfileImage from '../atoms/ProfileImage.svelte'
	import chevronRight from '$lib/assets/icon/chevron-right.svg'
	import { PUBLIC_STATIC_FILES_URL } from '$env/static/public'

	export let note: Note
</script>

<div class="bg-input-dark flex h-24 items-center justify-between rounded-3xl px-4">
	<div class="flex flex-1 items-center gap-2">
		<ProfileImage src={`${PUBLIC_STATIC_FILES_URL}${note?.contact.profilePictureUrl}`} />
		<div class="flex flex-col items-start justify-center gap-2">
			<span class="font-redhat text-xl font-bold text-white">{note?.contact.name}</span>
			<span class="font-public-sans text-caption w-44 truncate text-xs">{note.content}</span>
		</div>
	</div>
	<div class="flex flex-1 items-center justify-end">
		<a href={`/notes/${note?._id}`} class="no-underline">
			<img src={chevronRight} alt="Chevron Right" class="w-2" />
		</a>
	</div>
</div>
