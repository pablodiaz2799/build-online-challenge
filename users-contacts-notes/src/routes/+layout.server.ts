import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ cookies }) => {
	return {
		user: cookies.get('user') ?? null
	}
}
