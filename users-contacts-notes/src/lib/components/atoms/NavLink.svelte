<script>
	export let to = ''
	export let text = ''
	export let color = 'text-black'
	export let hoverColor = 'hover:text-gray-600'
</script>

<div class="rounded px-2">
	<a href={to} class={`font-inter font-medium ${color} ${hoverColor}`}>
		{text}
	</a>
</div>
