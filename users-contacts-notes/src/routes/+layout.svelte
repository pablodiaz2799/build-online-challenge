<script lang="ts">
	import { page } from '$app/stores'
	import { Toaster } from '$lib/components/ui/sonner'
	import { user } from '$lib/stores/user'

	import '../app.css'
	import NavBar from '$lib/components/molecules/NavBar.svelte'

	//Loads authenticated user into store when re-rendering
	const { user: dataUser } = $page.data
	user.set(dataUser)
</script>

<Toaster />

<main class="mx-auto mt-8 w-full max-w-[1200px] px-6">
	<NavBar />
	<slot></slot>
</main>
