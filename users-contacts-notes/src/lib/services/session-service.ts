import type { User } from '$lib/interfaces/user'
import * as cookie from 'cookie'

export const login = async (email: string, password: string): Promise<User | null> => {
	try {
		const response = await fetch('http://localhost:7070/api/login', {
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
				httpOnly: false, // Set to true for better security in production
				secure: false, // Set to true when using HTTPS
				maxAge: 60 * 60 * 24 * 7 // One week
			})
			document.cookie = cookie.serialize('user', JSON.stringify(authUser), {
				path: '/',
				httpOnly: false, // Set to true for better security in production
				secure: false, // Set to true when using HTTPS
				maxAge: 60 * 60 * 24 * 7 // One week
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
