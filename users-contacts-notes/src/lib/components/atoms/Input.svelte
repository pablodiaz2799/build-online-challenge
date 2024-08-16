<script lang="ts">
	export let placeholder = ''
	export let type: 'text' | 'password' = 'text'
	export let variant: 'primary' | 'secondary' = 'primary'
	export let value: string = ''

	let backgroundColor = variant === 'primary' ? 'bg-input-dark' : 'bg-input-light'
	let placeholderColor =
		variant === 'primary' ? 'placeholder-holder-dark' : 'placeholder-holder-light'
	let textColor = variant === 'primary' ? 'text-white' : 'text-black'
</script>

<input
	{...{ type }}
	{placeholder}
	bind:value
	class="{`${textColor} ${backgroundColor} ${placeholderColor} font-public-sans h-14 w-full rounded-lg px-4 text-base `}}"
/>
