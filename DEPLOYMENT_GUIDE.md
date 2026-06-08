# Mining Simulator - Deployment Guide

## Overview

This is an **educational mining simulator** designed for learning about cryptocurrency mining concepts. It is **NOT** production-ready for real mining.

## ⚠️ Critical Before Deployment

Read the following sections completely before deploying this application:

1. **Legal Considerations**
2. **Ethical Guidelines**
3. **Security Requirements**

---

## 1. Legal Considerations

### Required Disclaimers

You MUST include the following on any page hosting this simulator:

```
⚠️ EDUCATIONAL SIMULATOR DISCLAIMER

This application is an EDUCATIONAL TOOL ONLY and does not produce real 
cryptocurrency. Using this simulator constitutes agreement to:

✓ This runs on YOUR device (not sent to external servers)
✓ This simulator does NOT mine real cryptocurrency
✓ CPU usage will significantly increase during operation
✓ You understand the risks of CPU-intensive operations
✓ You have explicit permission to use this device's resources
✓ You will monitor system temperature
✓ You will immediately stop if overheating occurs
```

### Liability

Clearly state in your Terms of Service:

```
DISCLAIMER OF LIABILITY

This simulator is provided "AS IS" without warranties. Users assume all 
risk including:

- Hardware damage from overheating
- System crashes or instability  
- Electricity costs
- Data loss from system failure

The operator assumes no liability for any damages resulting from use 
of this simulator.
```

---

## 2. Ethical Guidelines

### ✅ ACCEPTABLE USE

- Educational institutions (with student consent)
- Learning/tutorial websites
- Personal experimentation (own device)
- Demonstration of blockchain concepts
- Computer science courses
- Open-source projects with clear labeling

### ❌ PROHIBITED USE

- Embedding in ad networks without consent
- Deploying on shared systems without permission
- Cryptojacking (mining without user knowledge)
- Hiding simulator's true nature
- Automatically starting on page load
- Using on mobile devices (excessive battery drain)
- Redirecting computing power to attacker wallet
- Misleading users about rewards

---

## 3. Security Requirements

### Deployment Checklist

- [ ] **HTTPS Required** - Always use HTTPS, never HTTP
- [ ] **CSP Headers Enabled** - Content Security Policy configured
- [ ] **SRI Verified** - Subresource Integrity hashes current
- [ ] **Disclaimers Visible** - Clear warnings before start
- [ ] **Consent Required** - User must actively agree
- [ ] **No Auto-Start** - Mining only starts on explicit user action
- [ ] **Rate Limiting** - Server-side rate limits if applicable
- [ ] **Monitoring** - Track simulator usage and abuse
- [ ] **User Data** - No collection or transmission of user data
- [ ] **Terms Updated** - Terms of Service reflect simulator nature

---

## 4. Web Server Configuration

### Nginx Example

```nginx
server {
    listen 443 ssl http2;
    server_name example.com;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # CSP Header
    add_header Content-Security-Policy 
        "script-src 'self' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; connect-src 'self' wss:; worker-src blob:" 
        always;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    location / {
        root /var/www/mining-simulator;
        index secure-miner.html;
        
        # Cache static assets
        expires 1d;
        add_header Cache-Control "public, immutable";
    }
}
```

### Apache Example

```apache
<VirtualHost *:443>
    ServerName example.com
    
    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/key.pem
    
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Content-Security-Policy "script-src 'self' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; connect-src 'self' wss:; worker-src blob:"
    
    <Directory /var/www/mining-simulator>
        Order allow,deny
        Allow from all
        
        <FilesMatch \\.html$>
            Header set Cache-Control "no-cache, no-store, must-revalidate"
        </FilesMatch>
    </Directory>
</VirtualHost>
```

---

## 5. Installation Steps

### Step 1: Download Files

```bash
cd /var/www/mining-simulator
wget https://your-repo.com/secure-miner.html
wget https://your-repo.com/SECURITY_AUDIT.md
wget https://your-repo.com/DEPLOYMENT_GUIDE.md
```

### Step 2: Set Permissions

```bash
chown www-data:www-data /var/www/mining-simulator
chmod 755 /var/www/mining-simulator
chmod 644 /var/www/mining-simulator/*.html
```

### Step 3: Configure Web Server

- Copy Nginx/Apache configuration above
- Restart web server
- Test with browser

### Step 4: Verify Security Headers

```bash
curl -I https://example.com/secure-miner.html

# Should include:
# Content-Security-Policy: script-src 'self' https://cdn.jsdelivr.net...
# X-Frame-Options: SAMEORIGIN
# X-Content-Type-Options: nosniff
```

---

## 6. Monitoring & Maintenance

### Log Monitoring

```bash
# Monitor for abuse attempts
grep "error" /var/log/nginx/access.log
grep "suspicious" /var/log/custom.log
```

### Update Checks

- [ ] Weekly: Review SRI hashes for CDN updates
- [ ] Monthly: Check security updates for CryptoJS
- [ ] Quarterly: Review usage statistics
- [ ] Annually: Security audit

### Performance Monitoring

- Monitor server bandwidth usage
- Track CPU simulator user count
- Alert if unusual traffic patterns
- Rate limit if necessary

---

## 7. Updating SRI Hashes

When updating CryptoJS version:

```bash
# Get new SRI hash from CDN
curl https://cdn.jsdelivr.net/npm/crypto-js@VERSION/crypto-js.min.js | \
  openssl dgst -sha384 -binary | openssl base64

# Update in secure-miner.html
<script src="https://cdn.jsdelivr.net/npm/crypto-js@VERSION/crypto-js.min.js"
        integrity="sha384-NEW_HASH_HERE"
        crossorigin="anonymous"></script>
```

---

## 8. User Education

### What to Tell Users

"This simulator teaches how mining algorithms work. Your computer 
simulates mining using hashing, but it doesn't produce real cryptocurrency. 
It's a learning tool that uses CPU intensively - monitor your temperature!"

### FAQ

**Q: Will I earn cryptocurrency?**  
A: No. This is an educational simulator only.

**Q: Why does my computer get hot?**  
A: The simulator uses your CPU significantly. It's normal but ensure proper cooling.

**Q: Why does it stop when I minimize the browser?**  
A: Browser tab backgrounding reduces CPU allocation. This is intentional for power efficiency.

**Q: Can I run this on my phone?**  
A: Not recommended. Mobile devices have limited cooling and the simulator is CPU-intensive.

---

## 9. Troubleshooting

### Issue: "Script blocked by CSP"
**Solution:** Verify CSP headers match the meta tag in HTML

### Issue: "SRI verification failed"
**Solution:** Verify integrity hash matches current CryptoJS version

### Issue: "Workers failing to start"
**Solution:** Check browser console for blob URL errors

### Issue: "Browser tab unresponsive"
**Solution:** User should reduce thread count or stop simulation

---

## 10. Support & Reporting

If users encounter issues:

1. Check browser console (F12)
2. Clear browser cache
3. Try different browser
4. Report bugs with:
   - Browser version
   - Operating system
   - Error messages
   - Steps to reproduce

---

## Conclusion

Follow this guide to safely deploy an educational mining simulator. 
Always prioritize:

✓ User transparency  
✓ System security  
✓ Ethical practices  
✓ Legal compliance  
✓ Performance monitoring  

**Never use this for cryptojacking or deceptive purposes.**
