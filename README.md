This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Video Hit Counter (Private)

This project includes a private hit counter for the main video page, using Upstash Redis for atomic event counting.

### API Endpoints

- `POST /api/hit` — accepts `{ event: 'play'|'ended'|'progress', videoId?: string }` and increments a counter.
- `GET /api/hit` — returns the play count for the main video. Requires `Authorization: Bearer <ADMIN_SECRET>` header.

### Admin Usage

To fetch the current play count, run:

```bash
ADMIN_SECRET=your_secret ./tools/fetch-count.sh
# or for deployed site:
ADMIN_SECRET=your_secret ./tools/fetch-count.sh https://YOUR_DOMAIN/api/hit
```

#### Example curl

```bash
curl -H "Authorization: Bearer $ADMIN_SECRET" http://localhost:3000/api/hit
```

### Environment Variables

Set these in your Vercel dashboard or `.env.local` (do NOT commit secrets):

- `ADMIN_SECRET` — a long random string for admin access
- `UPSTASH_REDIS_REST_URL` — from Upstash dashboard
- `UPSTASH_REDIS_REST_TOKEN` — from Upstash dashboard

#### Vercel CLI setup

```bash
vercel env add ADMIN_SECRET
vercel env add UPSTASH_REDIS_REST_URL
vercel env add UPSTASH_REDIS_REST_TOKEN
```

See: [Vercel Environment Variables Docs](https://vercel.com/docs/projects/environment-variables)

### Local Development

1. Set env vars in `.env.local` (not committed):
   ```
   ADMIN_SECRET=your_secret
   UPSTASH_REDIS_REST_URL=...
   UPSTASH_REDIS_REST_TOKEN=...
   ```
2. Start dev server:
   ```bash
   npm run dev
   # or
   vercel dev
   ```
3. Open the video page and play the video.
4. Run the admin fetch script to verify the count increases.

### Security Notes

- Never expose `ADMIN_SECRET` in client code or UI.
- For site-wide access lock, consider [Vercel Deployment Protection](https://vercel.com/docs/projects/deployment-protection) or [Edge Middleware Basic Auth](https://vercel.com/guides/edge-middleware-basic-auth-password-protection).

### Test Steps

1. Start the dev server.
2. Open the video page and trigger play.
3. Run:
   ```bash
   ADMIN_SECRET=your_secret curl -H "Authorization: Bearer $ADMIN_SECRET" http://localhost:3000/api/hit
   ```
4. Confirm the count increases.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
