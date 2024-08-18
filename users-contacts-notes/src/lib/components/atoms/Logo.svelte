<script>
	import logo from '$lib/assets/img/build-logo.png'

	export let url = ''
	export let alt = 'Build Online Logo'
	export let width = 'w-32'
	export let height = 'h-5'

	const src = url || logo
</script>

<img {src} {alt} class={`${width} ${height}`} />
