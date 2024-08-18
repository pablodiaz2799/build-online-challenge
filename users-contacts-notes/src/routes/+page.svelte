<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte'
	import Heading from '$lib/components/atoms/Heading.svelte'
	import Input from '$lib/components/atoms/Input.svelte'
	import { logUserIn } from '$lib/stores/user'
	import { toast } from 'svelte-sonner'

	let email = ''
	let password = ''

	const onLogin = async () => {
		if (email === '' || password === '') {
			toast.error('Please fill in all fields')
			return
		}
		await logUserIn(email, password)
	}
</script>

<Heading text="Welcome" />
<form on:submit|preventDefault={onLogin}>
	<Input type="text" placeholder="john@doe.com" bind:value={email} />
	<Input type="password" placeholder="********" bind:value={password} />
	<Button type="submit" text="Login" />
</form>
