<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte'
	import Heading from '$lib/components/atoms/Heading.svelte'
	import Input from '$lib/components/atoms/Input.svelte'
	import { createUser } from '$lib/stores/user'
	import { toast } from 'svelte-sonner'

	let name = ''
	let email = ''
	let password = ''

	const onSignup = async () => {
		if (email === '' || password === '' || name === '') {
			toast.error('Please fill in all fields')
			return
		}
		await createUser(name, email, password)
	}
</script>

<div class="mx-auto mt-16 flex w-full max-w-[720px] flex-col justify-center gap-8">
	<Heading text="Sign Up" textAlign={'text-center'} />
	<form on:submit|preventDefault={onSignup} class="flex flex-col items-center gap-10">
		<div class="flex w-full flex-col gap-6">
			<Input type="text" placeholder="John Doe" bind:value={name} />
			<Input type="text" placeholder="john@doe.com" bind:value={email} />
			<Input type="password" placeholder="********" bind:value={password} />
		</div>
		<Button type="submit" text="Sign up" width={'w-64'} />
	</form>
</div>
