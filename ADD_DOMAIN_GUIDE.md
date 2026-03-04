# How to Add Your Custom Domain to Vercel

## Prerequisites
- A domain name (e.g., bluemenplumbing.com)
- Access to your domain registrar's DNS settings
- Your Vercel project deployed

## Method 1: Vercel Dashboard (Easiest)

### Step 1: Navigate to Domain Settings
1. Go to https://vercel.com/dashboard
2. Select your project: **bluemenplumbing**
3. Click **Settings** in the top navigation
4. Click **Domains** in the sidebar

### Step 2: Add Your Domain
1. In the input field, enter your domain:
   - `bluemenplumbing.com` (root domain)
   - `www.bluemenplumbing.com` (www subdomain)
   - Or both!
2. Click **Add**

### Step 3: Configure DNS Records at Your Domain Registrar

Vercel will provide you with DNS records to add. Here's what you need:

#### For Root Domain (bluemenplumbing.com):
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
TTL: 3600 (or Auto)
```

#### For WWW Subdomain (www.bluemenplumbing.com):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

### Step 4: Where to Add DNS Records

**Popular Domain Registrars:**

#### GoDaddy:
1. Log in to GoDaddy
2. Go to "My Products" → "DNS"
3. Scroll to "Records"
4. Click "Add" and enter the records above

#### Namecheap:
1. Log in to Namecheap
2. Go to "Domain List" → Select your domain
3. Click "Manage" → "Advanced DNS"
4. Add the records under "Host Records"

#### Cloudflare:
1. Log in to Cloudflare
2. Select your domain
3. Go to "DNS" tab
4. Add the A and CNAME records
5. **Important:** Set Proxy status to "DNS only" (grey cloud) for initial setup

#### Google Domains (now Squarespace):
1. Log in to your account
2. Select your domain → "DNS"
3. Scroll to "Custom records"
4. Add the A and CNAME records

### Step 5: Verify Domain
1. Return to Vercel dashboard
2. Vercel will automatically detect DNS changes
3. SSL certificate will be issued automatically (can take a few minutes)
4. You'll see a green checkmark when ready

---

## Method 2: Using Vercel CLI

### Prerequisites
Install Vercel CLI:
```bash
npm i -g vercel
```

### Add Domain via CLI:
```bash
# Login to Vercel
vercel login

# Link your project (if not already linked)
vercel link

# Add your domain
vercel domains add bluemenplumbing.com

# Add www subdomain
vercel domains add www.bluemenplumbing.com
```

Then configure DNS records as shown in Method 1, Step 3.

---

## Common Issues & Solutions

### 1. "Invalid Configuration" Error
**Causes:**
- Domain already in use by another Vercel project
- DNS records not configured correctly
- Domain not verified with registrar

**Solutions:**
- Remove domain from old project first
- Double-check DNS records match exactly
- Verify domain ownership at registrar

### 2. "Domain Already Exists"
The domain is assigned to another Vercel project.
- Go to that project and remove it
- Or use a subdomain instead

### 3. SSL Certificate Not Issued
- Wait 10-15 minutes after DNS propagation
- Ensure DNS records are correct
- Remove and re-add the domain

### 4. DNS Not Propagating
- Use [whatsmydns.net](https://whatsmydns.net) to check propagation
- Clear your DNS cache:
  - Mac: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
  - Windows: `ipconfig /flushdns`
- Wait up to 48 hours (usually much faster)

### 5. Redirect Loop
- Check if you have multiple redirects configured
- Disable "Always Use HTTPS" at your DNS provider temporarily
- Let Vercel handle HTTPS redirects

---

## Best Practices

### 1. Add Both Root and WWW
```bash
vercel domains add bluemenplumbing.com
vercel domains add www.bluemenplumbing.com
```

### 2. Set Primary Domain
- In Vercel dashboard, star your preferred domain
- Vercel will redirect all other domains to the primary

### 3. Don't Use Cloudflare Proxy Initially
- Set to "DNS only" mode during setup
- Enable proxy after domain is verified

### 4. Check DNS Before Adding
Verify your current DNS settings:
```bash
dig bluemenplumbing.com
dig www.bluemenplumbing.com
```

---

## Verification Commands

### Check DNS Records:
```bash
# Check A record
dig bluemenplumbing.com A

# Check CNAME record
dig www.bluemenplumbing.com CNAME

# Check from multiple locations
# Visit: https://whatsmydns.net
```

### Check SSL Certificate:
```bash
# After domain is added
curl -I https://bluemenplumbing.com
```

---

## Next Steps After Domain is Added

1. **Update Environment Variables** (if needed):
   ```bash
   # In Vercel dashboard: Settings → Environment Variables
   NEXT_PUBLIC_SITE_URL=https://bluemenplumbing.com
   ```

2. **Update Your Code**:
   - Update any hardcoded URLs
   - Update sitemap.xml
   - Update robots.txt

3. **Set Up Redirects** (optional):
   Create `vercel.json`:
   ```json
   {
     "redirects": [
       {
         "source": "/old-page",
         "destination": "/new-page",
         "permanent": true
       }
     ]
   }
   ```

4. **Test Your Domain**:
   - Visit https://bluemenplumbing.com
   - Check mobile responsiveness
   - Test SSL certificate
   - Verify all pages load correctly

---

## Support

- **Vercel Docs**: https://vercel.com/docs/concepts/projects/domains
- **DNS Checker**: https://whatsmydns.net
- **SSL Checker**: https://www.ssllabs.com/ssltest/

## Questions?

If you encounter issues:
1. Check the Common Issues section above
2. Verify DNS records are correct
3. Wait 10-15 minutes for changes to propagate
4. Contact Vercel support if needed
