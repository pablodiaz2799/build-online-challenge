import { JWT_SECRET } from '$env/static/private'
import type { RequestEvent } from '@sveltejs/kit'
import jwt from 'jsonwebtoken'

export const authenticateUser = (event: RequestEvent) => {
	const { cookies } = event
	const token = cookies.get('token')

	if (token) {
		try {
			const { id, email } = jwt.verify(token, JWT_SECRET) as { id: string; email: string }
			return { id, email }
		} catch (error) {
			console.error(error)
			return null
		}
	}
	return null
}
