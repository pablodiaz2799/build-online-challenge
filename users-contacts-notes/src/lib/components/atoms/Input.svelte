<script lang="ts">
	import searchIcon from '$lib/assets/icon/search-icon.svg'

	export let placeholder = ''
	export let type: 'text' | 'password' = 'text'
	export let variant: 'primary' | 'secondary' | 'tertiary' = 'primary'
	export let value: string = ''
	export let label: string = ''

	let backgroundColor = variant !== 'secondary' ? 'bg-input-dark' : 'bg-input-light'
	let placeholderColor =
		variant !== 'secondary' ? 'placeholder-holder-dark' : 'placeholder-holder-light'
	let textColor = variant !== 'secondary' ? 'text-white' : 'text-black'
</script>

<div class="flex flex-col gap-2">
	{#if label !== ''}
		<span class="font-redhat text-base font-bold text-white sm:text-xl">{label}</span>
	{/if}
	<div class="relative">
		<input
			{...{ type }}
			{placeholder}
			bind:value
			class="{`${textColor} ${backgroundColor} ${placeholderColor} font-public-sans h-14 w-full rounded-lg px-4 text-base `}}"
		/>
		{#if variant === 'tertiary'}
			<img src={searchIcon} alt="search icon" class="absolute right-4 top-4" />
		{/if}
	</div>
</div>
