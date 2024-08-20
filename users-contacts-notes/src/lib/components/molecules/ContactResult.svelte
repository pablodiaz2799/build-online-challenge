<script lang="ts">
	import { PUBLIC_STATIC_FILES_URL } from '$env/static/public'
	import type { Contact } from '$lib/interfaces/contact'
	import ProfileImage from '../atoms/ProfileImage.svelte'

	export let contact: Contact
	export let handleSelect: () => void
	export let selected: boolean = false
</script>

<button
	class={`flex w-full items-center gap-4 px-4 ${selected ? 'bg-input-dark' : ''}`}
	on:click={handleSelect}
>
	<ProfileImage
		src={`${PUBLIC_STATIC_FILES_URL}${contact.profilePictureUrl}`}
		alt={contact.name}
	/>
	<div>
		<p class="text-lg font-semibold text-white">{contact.name}</p>
	</div>
</button>
