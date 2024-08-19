import { MAPS_API_KEY } from '$env/static/private'
import type { PageServerLoad } from '../$types'

export const load: PageServerLoad = async ({ cookies }) => {
	return {
		token: cookies.get('token') ?? null,
		mapsApiKey: MAPS_API_KEY ?? ''
	}
}
