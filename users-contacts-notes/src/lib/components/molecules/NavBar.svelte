<script lang="ts">
	import { goto } from '$app/navigation'
	import { logout, user } from '$lib/stores/user'
	import { page } from '$app/stores'
	import NavLink from '$lib/components/atoms/NavLink.svelte'
	import Button from '$lib/components/atoms/Button.svelte'

	import Logo from '$lib/components/atoms/Logo.svelte'

	$: currentUser = $user
	const onLogout = () => {
		logout()
		goto('/', { replaceState: true, invalidateAll: true })
	}

	let loginVariant: 'primary' | 'secondary'
	let signupVariant: 'primary' | 'secondary'

	$: loginVariant = $page.url.pathname === '/' ? 'primary' : 'secondary'
	$: signupVariant = $page.url.pathname === '/signup' ? 'primary' : 'secondary'
</script>

<nav class="mb-6 hidden h-20 w-full items-center justify-between rounded-3xl bg-white px-6 sm:flex">
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
			<Button onClick={() => goto('/')} text="Login" variant={loginVariant} />
			<Button onClick={() => goto('/signup')} text="Register" variant={signupVariant} />
		{/if}
	</div>
</nav>
