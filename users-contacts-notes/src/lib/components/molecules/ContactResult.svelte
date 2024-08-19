<script lang="ts">
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
	<ProfileImage src={`http://localhost:7070/${contact.profilePictureUrl}`} alt={contact.name} />
	<div>
		<p class="text-lg font-semibold text-white">{contact.name}</p>
	</div>
</button>
