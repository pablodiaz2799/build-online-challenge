<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import { add } from '$lib/stores/contacts'
	import { toast } from 'svelte-sonner'
	import Input from '$lib/components/atoms/Input.svelte'
	import FileUpload from '$lib/components/atoms/FileUpload.svelte'
	import Button from '$lib/components/atoms/Button.svelte'
	import Heading from '$lib/components/atoms/Heading.svelte'

	let { token } = $page.data

	let name: string | undefined = undefined
	let title: string | undefined = undefined
	let address: string | undefined = undefined
	let cellphoneNumber: string | undefined = undefined
	let email: string | undefined = undefined
	let file: File | undefined = undefined

	const handleAdd = () => {
		if (
			name !== undefined &&
			title !== undefined &&
			address !== undefined &&
			cellphoneNumber !== undefined &&
			email !== undefined &&
			file !== undefined
		) {
			add({ name, title, address, cellphoneNumber, email, file }, token)
			invalidateAll()
			goto(`/contacts/`, { invalidateAll: true })
		} else {
			toast.error('All fields are required')
		}
	}
</script>

<main class="mx-auto mt-16 w-full max-w-[1200px]">
	<Heading text="Add New Contact" />
	<div class="bg-input-dark relative flex flex-col gap-10 rounded-3xl p-4">
		<div class=" grid w-full grid-cols-1 gap-4 md:grid-cols-2">
			<Input label="Name" placeholder={'Full Name'} bind:value={name} variant="secondary" />
			<Input label="Title" placeholder={'Title'} bind:value={title} variant="secondary" />
			<FileUpload label="Profile Picture" bind:file />
			<Input label="Address" placeholder={'Address'} bind:value={address} variant="secondary" />
			<Input
				label="Phone"
				placeholder={'Phone Number'}
				bind:value={cellphoneNumber}
				variant="secondary"
			/>
			<Input label="Email" placeholder={'Email'} bind:value={email} variant="secondary" />
		</div>
		<div class="flex w-full justify-center">
			<Button variant="primary" text="SAVE" width="w-64" onClick={handleAdd} />
		</div>
	</div>
</main>
