import { authenticateUser } from '$lib/server/auth'
import { redirect, type Handle } from '@sveltejs/kit'

const protectedRoutes = ['contacts', 'notes']

export const handle: Handle = async ({ event, resolve }) => {
	const authUser = authenticateUser(event)

	if (protectedRoutes.some((route) => event.url.pathname.includes(route)) && authUser === null) {
		throw redirect(303, '/')
	}

	return await resolve(event)
}
