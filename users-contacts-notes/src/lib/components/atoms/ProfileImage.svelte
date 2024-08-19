<script>
	export let src = ''
	export let alt = 'Profile Image'
	export let width = 'w-16'
	export let minWith = 'min-w-16'
</script>

<div class="hover:border-build-green">
	<img {src} {alt} class={`${width} ${minWith} rounded-full object-cover`} />
</div>
