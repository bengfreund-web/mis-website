# Montana Institute of Sport website: handoff

The site is plain HTML, CSS and a little JavaScript. There is no WordPress, no
database, no admin login and nothing to update or patch. It is built to run
untouched for years.

## Where things live

| What | Where |
|---|---|
| Website files | `/var/www/mis` on the server (master copy: this folder) |
| Web server | Caddy, config at `/etc/caddy/Caddyfile` (copy in `deploy/Caddyfile`) |
| HTTPS certificate | Renewed automatically by Caddy. No action needed. |
| Donations | GiveLively: https://secure.givelively.org/donate/montana-institute-of-sport |
| Contact form | Web3Forms emails each submission to the address the access key was created with |
| Domain | montanainstituteofsport.org at the current registrar |

## Things a person must do

1. **Renew the domain.** Turn on auto-renew at the registrar and keep the card on file current. This is the one thing that can take the site down.
2. **Keep the server bill paid** (DigitalOcean / Linode / Vultr, about $6/month).
3. **Read the uptime alerts.** UptimeRobot emails if the site goes down.

## One-time setup (before launch)

- [ ] Create a Web3Forms access key at web3forms.com using the inbox that should receive messages, then replace `WEB3FORMS_ACCESS_KEY` in `index.html` and `contact.html`.
- [ ] Create the VPS (Ubuntu LTS, smallest plan), install Caddy, copy `deploy/Caddyfile` to `/etc/caddy/Caddyfile`.
- [ ] Turn on unattended security upgrades: `sudo apt install unattended-upgrades`.
- [ ] Turn on the host's automatic weekly backups (a checkbox in the VPS dashboard).
- [ ] Upload the site: `./deploy/deploy.sh root@SERVER_IP`.
- [ ] Test on the server's IP, then point the domain's A record at it (DNS cutover).
- [ ] Add a free UptimeRobot monitor for https://montanainstituteofsport.org.
- [ ] Submit `sitemap.xml` in Google Search Console.

## Making an edit later

Open the relevant `.html` file in any text editor, change the words, save, and
run `./deploy/deploy.sh root@SERVER_IP`. Shared styling is in `css/style.css`.
The header and footer are repeated in every page, so a change to them needs
making in each `.html` file.

## If something breaks

- Site down: check the server is running in the host dashboard, then `sudo systemctl restart caddy`.
- Certificate warning: almost always means DNS no longer points at the server.
- Form not sending: check the Web3Forms dashboard and that the access key is still in place.
