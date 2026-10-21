# Deprecated: Express contact API

`server/index.js` has been replaced by the Django contact endpoint:

- `POST /api/contact/` in `D:\portfolio-be` (or your Django backend)

The Vite proxy now targets Django on `http://localhost:8000`.

You can delete this `server/` folder once you confirm Django + Resend works in your environment.

Legacy run (not needed):

```bash
npm run dev:legacy-express
```
