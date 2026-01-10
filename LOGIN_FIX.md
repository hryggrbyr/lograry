# Decap CMS Login Fix - Documentation

## The Problem: 404 Error on Login

When you try to log in to the CMS admin page (especially on a phone), you may see:
```
404 Not Found
https://api.netlify.com/auth?provider=github&site_id=hryggrbyr.github.io
```

### Why This Happens

Decap CMS (formerly Netlify CMS) uses Netlify Identity for authentication. When you attempt to log in:

1. Decap CMS sends your `site_id` to Netlify's authentication API
2. Netlify looks up the site using that `site_id`
3. **The problem:** If `site_id` is set to `hryggrbyr.github.io` (your GitHub Pages URL), Netlify can't find it
4. Netlify returns a **404 Not Found** error

### Why It Works on Your Computer But Not Your Phone

When you're on your computer, you may already have:
- An active session cached in your browser
- Cookies from a previous successful authentication
- Local storage with valid credentials

On your phone, you're starting fresh without these cached credentials, so the authentication attempt fails immediately.

---

## The Solution

The fix is simple: add the `site_domain` field to your `config.yml` backend configuration.

### What We Changed

**File:** `public/admin/config.yml`

**Before:**
```yaml
backend:
  name: github
  repo: hryggrbyr/lograry
  branch: main
```

**After:**
```yaml
backend:
  name: github
  repo: hryggrbyr/lograry
  branch: main
  site_domain: hryggrbyr.github.io
```

### Why This Works

The `site_domain` field tells Decap CMS what domain to expect. Even though you're deploying to GitHub Pages, setting `site_domain: hryggrbyr.github.io` helps Decap CMS properly identify itself when communicating with Netlify's authentication service.

---

## How to Test the Fix

1. **On your computer:** 
   - Clear your browser cache and cookies for the admin page
   - Navigate to `https://hryggrbyr.github.io/lograry/admin/`
   - Attempt to log in fresh (without existing session)

2. **On your phone:**
   - Navigate to `https://hryggrbyr.github.io/lograry/admin/`
   - Attempt to log in
   - You should no longer see the 404 error

3. **What should happen:**
   - You'll be redirected to GitHub's login page
   - After authenticating with GitHub, you'll be redirected back to the CMS
   - You should be logged in successfully

---

## Important Notes

### About Netlify Identity vs. GitHub Authentication

Decap CMS can work with two different backend configurations:

1. **GitHub Backend** (your current setup)
   - Commits are made to GitHub under your GitHub user account
   - Authentication via GitHub Personal Access Token (PAT)
   - Works with GitHub Pages, Netlify, or any static host

2. **Netlify Backend**
   - Requires hosting on Netlify
   - Uses Netlify Identity for authentication
   - Not applicable for GitHub Pages deployments

Your site is deployed to **GitHub Pages**, so the GitHub backend is correct.

### The `site_domain` Field

The `site_domain` parameter is often optional for GitHub backends, but it's good practice to include it because:
- It clarifies which site the CMS belongs to
- It helps with certain edge cases in authentication
- It prevents ambiguity when the same GitHub repo might be deployed to multiple domains

---

## If You Ever Deploy to Netlify

If in the future you deploy this site to Netlify instead of (or in addition to) GitHub Pages, you would update your config like this:

```yaml
backend:
  name: github
  repo: hryggrbyr/lograry
  branch: main
  site_domain: your-netlify-site-name.netlify.app
```

Replace `your-netlify-site-name` with the actual subdomain Netlify assigns to your site.

---

## Troubleshooting

If you're still having issues after the fix:

1. **Clear all browser cache and cookies** for the admin domain
2. **Hard refresh** the page (`Ctrl+Shift+R` on Windows/Linux, `Cmd+Shift+R` on Mac)
3. **Try a different browser** to rule out browser-specific issues
4. **Check the browser console** for any error messages (F12 or Cmd+Option+I)
5. **Verify your GitHub Personal Access Token** is still valid and has the correct scopes

---

## Reference Links

- [Decap CMS Configuration Documentation](https://decapcms.org/docs/configuration-options/)
- [Decap CMS Backend Configuration](https://decapcms.org/docs/backends-overview/)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)