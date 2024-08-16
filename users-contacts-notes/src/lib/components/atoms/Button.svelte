<script lang="ts">
	export let text = ''
	export let variant = 'primary'
	export let type: 'button' | 'submit' = 'button'
	export let width = 'w-28'
	export let onClick = () => {}

	let backgroundColor = variant === 'primary' ? 'bg-build-green' : 'bg-white'
	let backgroundHoverColor =
		variant === 'primary' ? 'hover:bg-build-green-dark' : 'hover:bg-gray-200'
</script>

<button
	on:click={onClick}
	{type}
	class={`${backgroundColor} ${backgroundHoverColor} text-black ${width} h-12 rounded-3xl font-public-sans`}
>
	{text}
</button>
