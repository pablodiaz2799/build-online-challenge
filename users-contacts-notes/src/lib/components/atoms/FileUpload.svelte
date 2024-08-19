<script lang="ts">
	import Dropzone from 'svelte-file-dropzone'
	import uploadArrow from '$lib/assets/icon/upload-arrow.svg'
	import deleteTrash from '$lib/assets/icon/delete-trash-dark.svg'

	export let file: File | undefined
	export let label = 'Profile Picture'

	const handleFilesSelect = (e: {
		detail: { acceptedFiles: File[]; fileRejections: File[] }
	}): void => {
		const { acceptedFiles } = e.detail
		file = acceptedFiles[0]
		console.log(file)
	}

	const handleRemove = (e: Event) => {
		e.stopPropagation()
		file = undefined
	}
</script>

<div class="flex flex-col gap-2">
	<span class="font-redhat text-xl font-bold text-white">{label}</span>
	<div class="bg-input-light flex h-14 items-center rounded-lg px-3">
		<Dropzone
			on:drop={handleFilesSelect}
			disableDefaultStyles
			multiple={false}
			containerStyles="width: 100%"
			accept={['image/*']}
		>
			<div class="flex w-full items-center justify-between">
				{#if file}
					<p class="text-holder-light">
						{file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}
					</p>
					<button on:click={handleRemove}>
						<img src={deleteTrash} alt="delete" class="w-6" />
					</button>
				{:else}
					<p class="text-holder-light">Upload File</p>
					<img src={uploadArrow} alt="upload" class="w-4" />
				{/if}
			</div>
		</Dropzone>
	</div>
</div>
