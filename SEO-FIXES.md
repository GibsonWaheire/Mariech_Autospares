# SEO Fix Guide - Mariech Autospares

## Issues Fixed ✅

### 1. **Missing robots.txt**
- **File**: `/public/robots.txt`
- **Issue**: Search engine crawlers didn't know what to index
- **Fix**: Created robots.txt allowing all crawling + sitemap reference

### 2. **Missing sitemap.xml**
- **File**: `/public/sitemap.xml`
- **Issue**: Search engines couldn't discover all pages
- **Fix**: Created XML sitemap with all important pages

### 3. **Incorrect Canonical URL**
- **Issue**: Canonical URL pointed to `mariechautospare.com` instead of `mariechautospares.co.ke`
- **Fix**: Updated to correct domain
- **Location**: `index.html` line ~26

### 4. **Broken Open Graph Images**
- **Issue**: OG images pointed to wrong domains (`.com` instead of `.co.ke` + typo `.coke`)
- **Fix**: Updated to correct URLs using logo from your domain
- **Location**: `index.html` lines ~32-37

### 5. **JSON-LD Schema Issues**
- **Issue**: Structured data had wrong URLs
- **Fix**: Updated all schema.org URLs to use `mariechautospares.co.ke`
- **Location**: `index.html` lines ~61-140

---

## Next Steps to Improve Indexing 🚀

### 1. **Submit to Google Search Console**
```
https://search.google.com/search-console
```
- Add both domain and www subdomain
- Upload or set DNS record to verify
- Submit sitemap: https://mariechautospares.co.ke/sitemap.xml
- Monitor crawl errors
- Check if site is being crawled

### 2. **Submit to Google Business Profile**
```
https://business.google.com
```
- Verify business location
- Add photos and opening hours
- This helps with local SEO in Nairobi, Kenya

### 3. **Check Bing Webmaster Tools**
```
https://www.bing.com/webmasters
```
- Submit sitemap
- Monitor crawl stats

### 4. **Verify robots.txt is accessible**
```
https://mariechautospares.co.ke/robots.txt
https://mariechautospares.co.ke/sitemap.xml
```

### 5. **Test with Google Mobile-Friendly Test**
```
https://search.google.com/test/mobile-friendly
```

### 6. **Check Indexation Status**
In Google Search Console:
- Use "Coverage" report to see what's indexed
- Fix any errors shown

---

## Technical Checklist ✓

- [x] robots.txt created
- [x] sitemap.xml created
- [x] Canonical URL corrected
- [x] Open Graph meta tags fixed
- [x] JSON-LD structured data corrected
- [x] Phone numbers in schema (for local search)
- [x] Geographic markup for Nairobi, Kenya
- [x] Business hours in structured data

---

## Long-term SEO Improvements (Future)

1. **Dynamic Sitemap Generation**
   - Generate sitemap dynamically from products database
   - Include product-detail pages
   - Update lastmod timestamps

2. **Meta Tag Dynamic Generation**
   - Create unique title and description for each product
   - Add schema.org Product type for each item
   - Include ratings/reviews when available

3. **Performance Optimization**
   - Minimize image sizes
   - Enable compression
   - Use CDN for faster loading
   - Core Web Vitals optimization

4. **Content Improvements**
   - Add more text content (currently image-heavy)
   - Create blog section for auto parts topics
   - Build backlinks from automotive sites

5. **Internal Linking**
   - Link products to related categories
   - Create topic clusters around product types

6. **Mobile Optimization**
   - Test on real devices
   - Ensure touch-friendly buttons
   - Fast page load on 4G

---

## Files Created/Modified

**Created:**
- `/public/robots.txt` - Crawler rules
- `/public/sitemap.xml` - Site structure for search engines

**Modified:**
- `/index.html` - Fixed URLs in meta tags and schemas

---

## Estimated Time to See Results

- **Crawling**: 1-7 days (once submitted to Search Console)
- **Indexation**: 2-4 weeks
- **Ranking**: 4-12 weeks (depends on competition)

For immediate boost, submit sitemap to Google Search Console today!
