<script lang="ts">
	import { logUserIn } from '$lib/stores/user'

	let email = ''
	let password = ''

	const onLogin = async () => {
		await logUserIn(email, password)
	}
</script>

<form on:submit|preventDefault={onLogin}>
	<label>
		Email:
		<input type="text" bind:value={email} />
	</label>
	<label>
		Password:
		<input type="password" bind:value={password} />
	</label>
	<button type="submit">Login</button>
</form>
