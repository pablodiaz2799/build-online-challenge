// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
type AuthUser = {
	id: string
	email: string
}

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: AuthUser | null
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
