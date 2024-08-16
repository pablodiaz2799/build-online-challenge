import { writable } from 'svelte/store'
import * as cookie from 'cookie'
import type { User } from '$lib/interfaces/user'
import { login } from '$lib/services/session-service'
import { toast } from 'svelte-sonner'
import { goto } from '$app/navigation'

export const user = writable<User | null>(null)

export const logout = (): void => {
	document.cookie = cookie.serialize('token', '', {
		path: '/',
		expires: new Date(0)
	})
	document.cookie = cookie.serialize('user', '', {
		path: '/',
		expires: new Date(0)
	})
	user.set(null)
}

export const logUserIn = async (email: string, password: string): Promise<void> => {
	const result = await login(email, password)
	user.set(result)
	if (result) {
		toast.success('Login successful')
		goto('/contacts')
	} else {
		toast.error('Invalid credentials')
	}
}
