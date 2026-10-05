# Montana Institute of Sport website: handoff

The site is plain HTML, CSS and a little JavaScript, hosted free on GitHub
Pages. There is no WordPress, no database, no server and no admin login, so
there is nothing to patch or keep running. It is built to sit untouched for years.

## Where things live

| What | Where |
|---|---|
| Website files | GitHub repo `bengfreund-web/mis-website` (branch `main`) |
| Hosting | GitHub Pages, free. HTTPS certificate renews automatically. |
| Domain | montanainstituteofsport.org, registered at Squarespace Domains (renews May 2027) |
| DNS | Squarespace: four `A` records to `185.199.108-111.153`, `www` CNAME to `bengfreund-web.github.io` |
| Email | Google Workspace (the `MX`, SPF, DMARC and DKIM records in Squarespace DNS). Don't remove these. |
| Donations | GiveLively: https://secure.givelively.org/donate/montana-institute-of-sport |
| Contact form | Web3Forms, which emails each submission to the inbox its access key was made with |

## Things a person must do

1. **Renew the domain.** Keep auto-renew on at Squarespace with a current card. This is the one thing that can take the site down.
2. **Keep access to the GitHub account** that owns the repo.

## Still to set up

- [ ] Create a Web3Forms access key at web3forms.com using the inbox that should receive messages, and replace `WEB3FORMS_ACCESS_KEY` in `index.html` and `contact.html`.
- [ ] Add a free UptimeRobot monitor for https://montanainstituteofsport.org.
- [ ] Submit `sitemap.xml` in Google Search Console.

## Making an edit later

Edit the relevant `.html` file (on github.com you can click the pencil icon on
any file), commit, and the site updates in about a minute. Shared styling is in
`css/style.css`; after changing it, bump the `?v=` number on its link in each
page so browsers pick up the change. The header and footer repeat in every
page, so a change to them needs making in each `.html` file.

## If something breaks

- Site down or certificate warning: check the domain hasn't expired and the Squarespace DNS records above are unchanged.
- Form not sending: check the Web3Forms dashboard and that the access key is still in place.
