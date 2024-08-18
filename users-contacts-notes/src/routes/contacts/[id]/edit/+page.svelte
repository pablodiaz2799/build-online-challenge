<script lang="ts">
	import { page } from '$app/stores'
	import { getContact, selectedContact, update } from '$lib/stores/contacts'
	import { onMount } from 'svelte'
	import ProfileImage from '$lib/components/atoms/ProfileImage.svelte'
	import Input from '$lib/components/atoms/Input.svelte'
	import FileUpload from '$lib/components/atoms/FileUpload.svelte'
	import Button from '$lib/components/atoms/Button.svelte'
	import { goto } from '$app/navigation'

	let { id } = $page.params
	let { token } = $page.data

	let name: string | undefined = undefined
	let title: string | undefined = undefined
	let address: string | undefined = undefined
	let cellphoneNumber: string | undefined = undefined
	let email: string | undefined = undefined
	let file: File | undefined = undefined

	onMount(async () => {
		await getContact(id, token)
	})

	const handleUpdate = () => {
		if (contact !== null) {
			update({ _id: contact._id, name, title, address, cellphoneNumber, email, file }, token)
			goto(`/contacts/${id}`, { replaceState: true })
		}
	}

	$: contact = $selectedContact
</script>

<main class="mx-auto mt-16 w-full max-w-[1200px]">
	<div class="bg-input-dark flex flex-col gap-10 rounded-2xl p-6">
		{#if contact !== null}
			<div class="flex items-center justify-start gap-10">
				<div class="border-build-green rounded-full border-2">
					<div class="border-input-dark rounded-full border-4">
						<ProfileImage
							src={`http://localhost:7070/${contact?.profilePictureUrl}`}
							alt={contact?.name}
							minWith="min-w-36"
						/>
					</div>
				</div>
				<div class="flex flex-col items-start justify-center gap-4">
					<span class="font-redhat text-3xl font-bold text-white">{contact?.name}</span>
					<span class="font-public-sans text-holder-dark text-xl font-normal">{contact?.title}</span
					>
				</div>
			</div>
			<div class=" grid w-full grid-cols-1 gap-4 md:grid-cols-2">
				<Input label="Name" placeholder={contact?.name} bind:value={name} variant="secondary" />
				<Input label="Title" placeholder={contact?.title} bind:value={title} variant="secondary" />
				<FileUpload label="Profile Picture" bind:file />
				<Input
					label="Address"
					placeholder={contact?.address}
					bind:value={address}
					variant="secondary"
				/>
				<Input
					label="Phone"
					placeholder={contact?.cellphoneNumber}
					value={cellphoneNumber}
					variant="secondary"
				/>
				<Input label="Email" placeholder={contact?.email} bind:value={email} variant="secondary" />
			</div>
			<div class="flex w-full justify-center">
				<Button variant="primary" text="SAVE" width="w-64" onClick={handleUpdate} />
			</div>
		{:else}
			<span>No contact found 🫤</span>
		{/if}
	</div>
</main>
