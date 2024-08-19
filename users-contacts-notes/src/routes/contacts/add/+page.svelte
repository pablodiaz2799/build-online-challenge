<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import { add } from '$lib/stores/contacts'
	import { toast } from 'svelte-sonner'
	import Input from '$lib/components/atoms/Input.svelte'
	import FileUpload from '$lib/components/atoms/FileUpload.svelte'
	import Button from '$lib/components/atoms/Button.svelte'
	import Heading from '$lib/components/atoms/Heading.svelte'
	// @ts-ignore
	import GooglePlacesAutocomplete from '@silintl/svelte-google-places-autocomplete'
	import type { PlaceDetailEvent } from '$lib/interfaces/places'
	import NavigationButton from '$lib/components/atoms/NavigationButton.svelte'

	let { token, mapsApiKey } = $page.data

	let name: string | undefined = undefined
	let title: string | undefined = undefined
	let address: string | undefined = undefined
	let cellphoneNumber: string | undefined = undefined
	let email: string | undefined = undefined
	let file: File | undefined = undefined

	const onPlaceChanged = (e: PlaceDetailEvent) => {
		address = e.detail.text
	}

	const handleAdd = async () => {
		if (
			name !== undefined &&
			title !== undefined &&
			address !== undefined &&
			cellphoneNumber !== undefined &&
			email !== undefined &&
			file !== undefined
		) {
			await add({ name, title, address, cellphoneNumber, email, file }, token)
		} else {
			toast.error('All fields are required')
		}
	}
</script>

<main class="mx-auto mb-16 mt-8 h-screen w-full max-w-[1200px] sm:mb-0 sm:mt-16 sm:h-auto">
	<NavigationButton href="/contacts" />
	<Heading text="Add New Contact" />
	<div class="bg-input-dark relative mt-10 flex flex-col gap-10 rounded-3xl p-4">
		<div class=" grid w-full grid-cols-1 gap-4 md:grid-cols-2">
			<Input label="Name" placeholder={'Full Name'} bind:value={name} variant="secondary" />
			<Input label="Title" placeholder={'Title'} bind:value={title} variant="secondary" />
			<FileUpload label={'Profile Picture'} bind:file />
			<div class="flex w-full flex-col gap-2">
				<span class="font-redhat text-xl font-bold text-white">Address</span>
				<GooglePlacesAutocomplete
					apiKey={mapsApiKey}
					bind:value={address}
					placeholder={'Enter your address'}
					on:place_changed={onPlaceChanged}
					class={'bg-input-light placeholder-holder-light h-14 rounded-lg px-3 text-black'}
				/>
			</div>
			<Input
				label="Phone"
				placeholder={'Phone Number'}
				bind:value={cellphoneNumber}
				variant="secondary"
			/>
			<Input label="Email" placeholder={'Email'} bind:value={email} variant="secondary" />
		</div>
		<div class="flex w-full justify-center">
			<Button variant="primary" text="SAVE" width="sm:w-64" onClick={handleAdd} />
		</div>
	</div>
</main>

<style>
</style>
