The official landing page for [The Modding Community](https://moddingcommunity.com) utilizing [Astro](https://astro.build/), [React](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/)!

This is a *work-in-progress*!

## Running
Here are commands you can use to run the web server through Astro (for developer use).

```bash
# Clone this repository.
git clone https://github.com/modcommunity/website-processing

# Change directory.
cd website-processing

# Install packages.
npm install

# Run Astro's dev server available on port 4321 by default.
# NOTE - You can pass `-- --host <address>` to listen on specific IP addresses (or all with 0.0.0.0).
# EX: npm astro dev -- --host 0.0.0.0
npx astro dev
```

If you want to run this application in production, I recommend looking into [Docker](https://docs.astro.build/en/recipes/docker/).

## Configuration (Env)
Here are supported environmental variables you can set typically in the `.env` file.

| Name | Default | Description |
| ---- | ------- | ----------- |
| `PUBLIC_GOOGLE_ANALYTICS_ID` | *N/A* | The Google Analytics ID to use. |
| `PUBLIC_TITLE_MAIN` | The Modding Community (In Development!) | The primary title used with meta data. |
| `PUBLIC_TITLE` | The Modding Community | The title used with meta data. |
| `PUBLIC_FAV_ICON` | /favicon.ico | The website's icon to use with meta data. |
| `PUBLIC_SOCIAL_MEDIA_IMAGE` | /icon-wrench02-200x201.png | The  image to use with social media meta data. |
| `PUBLIC_URL` | https://moddingcommunity.com | The URL to use with meta data. |
| `PUBLIC_DESCRIPTION` | ... | The description to use with social media and general meta data. |

## Contributions
Users are welcomed to create PRs if they see any improvements that can be made!

Users who help will be listed under credits below.

## Credits
* [Christian Deacon](https://github.com/gamemann)