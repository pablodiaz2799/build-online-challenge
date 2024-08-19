<script lang="ts">
	import backArrow from '$lib/assets/icon/back-arrow.svg'

	export let label = 'Back'
	export let href = '/'
</script>

<a {href} class="flex gap-2 mb-4">
	<img src={backArrow} alt={label} class="w-4 cursor-pointer" />
	<span class="text-nav-mobile-text font-redhat text-xl font-light">{label}</span>
</a>
