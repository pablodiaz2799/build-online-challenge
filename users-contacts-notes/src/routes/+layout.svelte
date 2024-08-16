<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { Toaster } from '$lib/components/ui/sonner'
	import { logout, user } from '$lib/stores/user'
	import NavLink from '$lib/components/atoms/NavLink.svelte'
	import Button from '$lib/components/atoms/Button.svelte'

	import '../app.css'
	import Logo from '$lib/components/atoms/Logo.svelte'

	//Loads authenticated user into store when re-rendering
	const { user: dataUser } = $page.data
	user.set(dataUser)

	$: currentUser = $user
	const onLogout = () => {
		logout()
		goto('/')
	}
</script>

<nav class="mx-6 mt-8 flex h-20 items-center justify-between rounded-3xl bg-white px-6">
	<div class="flex flex-1 items-center">
		<Logo />
	</div>
	{#if currentUser}
		<div class="flex flex-1 items-center justify-center gap-9">
			<NavLink to="/contacts" text="Contacts" />
			<NavLink to="/notes" text="Notes" />
			<!-- <a href="/contacts">Contacts</a>
			<a href="/notes">Notes</a> -->
		</div>
	{/if}
	<div class="flex flex-1 items-center justify-end">
		{#if currentUser}
			<!-- <button on:click={onLogout}>Logout</button> -->
			<Button onClick={onLogout} text="Logout" />
		{:else}
			<Button onClick={() => goto('/login')} text="Login" variant="secondary" />
			<Button onClick={() => goto('/register')} text="Register" />
		{/if}
	</div>
</nav>

<Toaster />

<slot></slot>
