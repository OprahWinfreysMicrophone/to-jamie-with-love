# Turning on cross-device sync (one-time, ~3 minutes)

Checkmarks normally live only in each browser. To make them follow Jamie
between her phone and both PCs, the site needs one tiny free storage endpoint
in a Google account (hers is best — she owns her own data).

## Steps

1. While logged into the Google account, open **https://script.new**
2. Delete the sample code and paste the entire contents of
   [`sync-backend.gs`](sync-backend.gs)
3. Click **Deploy → New deployment**, choose type **Web app**, set:
   - *Execute as:* **Me**
   - *Who has access:* **Anyone**
4. Click **Deploy**, authorize when asked, and copy the **Web app URL**
   (it looks like `https://script.google.com/macros/s/…/exec`)
5. Give that URL to Claude (or paste it yourself into `data/sync.js` as the
   value of `SYNC_URL`) and push.

That's it. Every device that opens the dashboard afterward reads and writes
the same checkmark state — checks made on the phone show up on the PCs next
time the page gets focus, and vice versa.

## Honest notes

- The URL ends up in this public repo, so in principle a stranger who found
  it could read or mess with the checkmarks (never anything else — it stores
  only which boxes are ticked). If that ever happens, redeploy the script to
  get a fresh URL.
- Sync is last-write-wins. If two devices are edited at the same moment while
  offline, the later one wins. For one person this is fine.
- To turn sync off, set `SYNC_URL` back to `""`.
