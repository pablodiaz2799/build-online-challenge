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

<div class="mx-auto mt-16 flex w-full max-w-[720px] flex-col justify-center gap-8">
	<Heading text="Welcome" textAlign={'text-center'} />
	<form on:submit|preventDefault={onLogin} class="flex flex-col items-center gap-10">
		<div class="w-full flex flex-col gap-6">
			<Input type="text" placeholder="john@doe.com" bind:value={email} />
			<Input type="password" placeholder="********" bind:value={password} />
		</div>
		<Button type="submit" text="Login" width={"sm:w-64"} />
	</form>
</div>
