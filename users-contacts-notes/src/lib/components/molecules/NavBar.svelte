<script lang="ts">
	import { goto } from '$app/navigation'
	import { logout, user } from '$lib/stores/user'
	import NavLink from '$lib/components/atoms/NavLink.svelte'
	import Button from '$lib/components/atoms/Button.svelte'

	import Logo from '$lib/components/atoms/Logo.svelte'

	$: currentUser = $user
	const onLogout = () => {
		logout()
		goto('/')
	}
</script>

<nav class="flex h-20 w-full items-center justify-between rounded-3xl bg-white px-6 mb-6">
	<div class="flex flex-1 items-center">
		<Logo />
	</div>
	{#if currentUser}
		<div class="flex flex-1 items-center justify-center gap-9">
			<NavLink to="/contacts" text="Contacts" />
			<NavLink to="/notes" text="Notes" />
		</div>
	{/if}
	<div class="flex flex-1 items-center justify-end gap-2">
		{#if currentUser}
			<Button onClick={onLogout} text="Logout" />
		{:else}
			<!-- TODO: Make this change forms -->
			<Button onClick={() => goto('/login')} text="Login" variant="secondary" />
			<Button onClick={() => goto('/register')} text="Register" />
		{/if}
	</div>
</nav>
