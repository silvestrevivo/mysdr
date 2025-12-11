# mysdr

SDR for ChaseLabs

## How to run the project

Clone the repository

```sh
git clone git@github.com:silvestrevivo/mysdr.git
```

And then navigate to the project folder, install dependencies and run

```sh
# navigate
cd mysdr

# install dependencies
pnpm i

# run it in development mode
pnpm run dev -- --open
```

## Vercel deployment

On [`mysdr.vercel.app`](https://mysdr.vercel.app/) you can see a production example.


## Building

To create a production version of your app:

```sh
pnpm run build
```

You can preview the production build with `npm run preview`.


## About the project

I've worked round 2.5 hours on this repo to make a tiny version of the requirements, trying to show different things about Svelte and SvelteKit. This I found important to show:

    - Composition about components
    - File structure organization
    - Eslint/prettier configuration to organize the code correctly
    - Use of `+page.server.ts` to send POST request using actions
    - Use of 'use:enhance' to manage data before and after the request is triggered
    - Use of `+page.ts` to fetch data from client side to feed the datum from a runes store.
    - This allows to avoid the use of TanStack to cache data on the browser
    - A bit of style definition with tailwindcss, even in dark mode.

Things I've avoided because of running out of time:

    - Transitions to show between the calendar and the form
    - URL queries addition to share appointments just copying the URL
    - A modal of confirmation that the API request is correctly done (devtools to the rescue)

As conclusion, this could be consider as a small mockup of an idea having all necessary elements to discuss in a team before bringing to production.
