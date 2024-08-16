<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte'
	import Heading from '$lib/components/atoms/Heading.svelte'
	import Input from '$lib/components/atoms/Input.svelte'
	import { logUserIn } from '$lib/stores/user'

	let email = ''
	let password = ''

	const onLogin = async () => {
		await logUserIn(email, password)
	}
</script>

<Heading text="Welcome" />
<form on:submit|preventDefault={onLogin}>
	<Input type="text" placeholder="john@doe.com" bind:value={email} />
	<Input type="password" placeholder="********" bind:value={password} />
	<!-- <label>
		Password:
		<input type="password" bind:value={password} />
	</label> -->
	<!-- <button type="submit">Login</button> -->
	<Button type="submit" text="Login" />
</form>
