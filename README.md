# Maroof portfolio

index.html (the site) + api/contact.js (Vercel function that sends the contact email with Resend).

## Deploy on Vercel (the form only works this way)
1. In Resend, delete the old API key (it was shared in chat) and create a new one.
2. Upload THIS WHOLE FOLDER to a GitHub repo. index.html, api/ and package.json must be at the repo root.
3. In Vercel: Add New > Project > import the repo (Framework: Other).
4. Project Settings > Environment Variables: add RESEND_API_KEY = your new key. Then Redeploy.
5. Open your vercel.app link and send a test message.

## If email still does not arrive
- Vercel > your project > Logs > filter by /api/contact. The real Resend error is printed there.
- Resend free sender (onboarding@resend.dev) only delivers to the email you signed up to Resend with. If that is not marooflone74@gmail.com, either sign in with that Gmail or verify your own domain in Resend and set CONTACT_FROM (e.g. Portfolio <hello@yourdomain.com>).
- Check the Gmail spam folder.
- Optional env vars: CONTACT_TO (receiver), CONTACT_FROM (sender).

## Not done yet
Inner pages, sitemap/robots, social image, real project screenshots, Lighthouse audit.
