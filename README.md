# Build Online Challenge

## Init
### API
Inside the project folder
```sh
cd api
npm i
npm start
```

Ensure that your `.env` file has all the necessary credentials.

### Client
```sh
cd users-contacts-notes
npm i
npm run dev
```
Ensure that your `.env` file has all the necessary credentials.

## Dependencies
### Client
 - `@silintl/svelte-google-places-autocomplete` ( Used to integrate Google Places API )
 - `svelte-file-dropzone` (Used to implement a custom file drop component)
 - `svelte-infinite-loading` (Used to load and paginate contacts and notes)
 - `svelte-sonne` (Used to show toast notifications)
 - `tailwind` (Used as main style library)

### API
 - `bcrypt` (Used to encript user passwords when loggin in)
 - `jsonwebtoken` (Used to generate and decode auth tokens)
 - `tsyringe` (Used to implement dependency injection)
