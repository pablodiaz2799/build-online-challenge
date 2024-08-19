<script lang="ts">
	export let icon = ''
	export let active = false
	export let onClick = () => {}
	export let width = 'w-12'
	export let height = 'h-12'
	export let iconWidth = 'w-8'
	export let customIconClass = ''
	$: backgroundColor = active ? 'bg-build-green' : 'bg-transparent'
</script>

<button
	class={`${width} ${height} ${backgroundColor} flex items-center justify-center gap-10 rounded-full`}
	on:click={onClick}
>
	<img src={icon} alt="menu-button" class={`${iconWidth} ${customIconClass}`} />
</button>
