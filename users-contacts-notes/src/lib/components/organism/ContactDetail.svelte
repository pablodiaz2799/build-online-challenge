<script lang="ts">
	import type { Contact } from '$lib/interfaces/contact'
	import ProfileImage from '../atoms/ProfileImage.svelte'
	import editPencil from '$lib/assets/icon/edit-pencil.svg'
	import deleteTrash from '$lib/assets/icon/delete-trash.svg'
	import ContactDetailSection from '../molecules/ContactDetailSection.svelte'

	export let contact: Contact | null = null
	export let gap: string = 'gap-4'
</script>

<div class="bg-input-dark relative flex flex-col gap-4 rounded-3xl p-4">
	{#if contact === null}
		<p class="text-white">No contact found 🫤</p>
	{:else}
		<div class="absolute right-6 top-4 flex gap-4">
			<a href={`/contacts/${contact._id}/edit`}>
				<img src={editPencil} alt="Edit" class="w-6 cursor-pointer" />
			</a>
			<img src={deleteTrash} alt="Delete" class="w-6 cursor-pointer" />
		</div>
		<div class="flex flex-col items-center justify-between gap-10 py-4">
			<div class="border-build-green rounded-full border-2">
				<div class="border-input-dark rounded-full border-4">
					<ProfileImage
						src={`http://localhost:7070${contact?.profilePictureUrl}`}
						width="w-44"
						minWith="min-w-44"
					/>
				</div>
			</div>
			<div class={`flex flex-col items-center justify-center ${gap}`}>
				<span class="font-redhat text-3xl font-bold text-white">{contact?.name}</span>
				<span class="font-public-sans text-holder-dark text-xl font-normal">{contact?.title}</span>
			</div>
			<ContactDetailSection
				title="Address"
				content={contact?.address}
				textAlign="text-start"
				{gap}
			/>
			<ContactDetailSection title="Phone" content={contact?.cellphoneNumber} {gap} />
			<ContactDetailSection title="Email" content={contact?.email} {gap} />
		</div>
	{/if}
</div>
