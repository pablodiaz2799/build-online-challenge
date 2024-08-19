<script lang="ts">
	import { page } from '$app/stores'
	import { logout, user } from '$lib/stores/user'
	import IconButton from '$lib/components/atoms/IconButton.svelte'
	import Button from '$lib/components/atoms/Button.svelte'
	import contactsIcon from '$lib/assets/icon/contacts-icon.svg'
	import notesIcon from '$lib/assets/icon/notes-icon.svg'
	import logoutIcon from '$lib/assets/icon/logout-icon.svg'
	import { goto } from '$app/navigation'

	let contactsActive = false
	let notesActive = false

	$: contactsActive = $page.url.pathname.includes('/contacts')
	$: notesActive = $page.url.pathname.includes('/notes')

	let loginVariant: 'primary' | 'secondary'
	let signupVariant: 'primary' | 'secondary'

	$: loginVariant = $page.url.pathname === '/' ? 'primary' : 'secondary'
	$: signupVariant = $page.url.pathname === '/signup' ? 'primary' : 'secondary'

	$: currentUser = $user
	const onLogout = () => {
		logout()
		goto('/', { replaceState: true, invalidateAll: true })
	}
</script>

<nav
	class="bg-nav-dark fixed bottom-8 mx-auto flex h-16 w-11/12 items-center justify-center gap-10 rounded-full sm:hidden"
>
	{#if currentUser}
		<IconButton icon={contactsIcon} active={contactsActive} onClick={() => goto('/contacts')} />
		<IconButton
			icon={notesIcon}
			active={notesActive}
			onClick={() => goto('/notes')}
			customIconClass={'translate-x-[2px] -translate-y-px'}
		/>
		<IconButton icon={logoutIcon} onClick={onLogout} />
	{:else}
		<Button onClick={() => goto('/')} text="Login" variant={loginVariant} />
		<Button onClick={() => goto('/signup')} text="Register" variant={signupVariant} />
	{/if}
</nav>
