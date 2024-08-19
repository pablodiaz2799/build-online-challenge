<script lang="ts">
	export let text = ''
	export let variant: 'primary' | 'secondary' = 'primary'
	export let type: 'button' | 'submit' = 'button'
	export let width = 'sm:w-28'
	export let onClick = () => {}
	export let disabled = false

	$: backgroundColor = variant === 'primary' ? 'bg-build-green' : 'bg-white'
	$: backgroundHoverColor =
		variant === 'primary' ? 'hover:bg-build-green-dark' : 'hover:bg-gray-200'
</script>

<button
	on:click={onClick}
	{type}
	{disabled}
	class={`${backgroundColor} ${backgroundHoverColor} text-black ${width} font-public-sans h-12 w-28 rounded-3xl`}
>
	{text}
</button>
