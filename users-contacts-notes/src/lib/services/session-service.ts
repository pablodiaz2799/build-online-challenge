import { PUBLIC_API_BASE_URL } from '$env/static/public'
import type { User } from '$lib/interfaces/user'
import * as cookie from 'cookie'

export const login = async (email: string, password: string): Promise<User | null> => {
	try {
		const response = await fetch(`${PUBLIC_API_BASE_URL}login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		})

		if (response.ok) {
			const { token, user: authUser }: { token: string; user: User } = await response.json()
			document.cookie = cookie.serialize('token', token, {
				path: '/',
				httpOnly: false,
				secure: false,
				maxAge: 60 * 60 * 24 * 7
			})
			document.cookie = cookie.serialize('user', JSON.stringify(authUser), {
				path: '/',
				httpOnly: false,
				secure: false,
				maxAge: 60 * 60 * 24 * 7
			})

			return authUser
		} else {
			throw new Error('Invalid credentials')
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

export const signup = async (name: string, email: string, password: string): Promise<boolean> => {
	try {
		const response = await fetch(`${PUBLIC_API_BASE_URL}signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, email, password })
		})

		if (response.ok) {
			return true
		} else {
			throw new Error('Error signing up')
		}
	} catch (error) {
		console.error(error)
		return false
	}
}
