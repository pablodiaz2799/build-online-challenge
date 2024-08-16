<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { Toaster } from '$lib/components/ui/sonner'
	import { logout, user } from '$lib/stores/user'
	import '../app.css'

	//Loads authenticated user into store when re-rendering
	const { user: dataUser } = $page.data
	user.set(dataUser)

	$: currentUser = $user
	const onLogout = () => {
		logout()
		goto('/')
	}
</script>

<nav class="flex items-center justify-between">
	<div class="flex flex-1 items-center">Logo</div>
	{#if currentUser}
		<div class="flex flex-1 items-center justify-center">
			<a href="/contacts">Contacts</a>
			<a href="/notes">Notes</a>
		</div>
	{/if}
	<div class="flex flex-1 items-center justify-end">
		{#if currentUser}
			<button on:click={onLogout}>Logout</button>
		{:else}
			<a href="/login">Login</a>
			<a href="/register">Register</a>
		{/if}
	</div>
</nav>

<Toaster />

<slot></slot>
