<script lang="ts">
	export let gap = 'gap-4'
	export let title = ''
	export let content = ''
	export let textAlign = 'text-center'
</script>

<div class={`flex flex-col items-center justify-center ${gap}`}>
	<span class="font-redhat text-xl font-bold text-white">{title}</span>
	<span class={`font-public-sans text-holder-dark w-44 ${textAlign} text-base font-normal`}>
		{content}
	</span>
</div>
