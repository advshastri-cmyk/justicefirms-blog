# JusticeFirms — files to restore (Quick guide)

आपने index.html और CNAME रखा हुआ है। बाकी files (jo aapne delete kiye the) main yahan de raha hoon. इन्हें repo root में upload कर दीजिए:

Files to upload:
- index.html (already present — replace with provided if you want the new premium version)
- 404.html
- manifest.json
- robots.txt
- sitemap.xml
- articles.json
- favicon.svg

How to upload (GitHub web UI — non‑technical)
1. Login to GitHub → open your repository (`advshastri-cmyk/<repo>`).
2. Click "Add file" → "Upload files".
3. Drag & drop the files from above (404.html, manifest.json, robots.txt, sitemap.xml, articles.json, favicon.svg). If you want to replace index.html with the new premium one, also upload the index.html (it will overwrite).
4. Commit changes (message: "Restore site files — premium theme").
5. Go to Settings → Pages → Ensure Source = `main` branch and folder `/ (root)`. Save.
6. DNS: Ensure CNAME file contains `blog.justicefirms.com` (you said you already have it). In your registrar DNS add:
   - Type: CNAME
   - Host: blog
   - Value: advshastri-cmyk.github.io.
7. Wait for DNS + HTTPS. Then open: https://blog.justicefirms.com

How to add/update articles (non-technical — recommended)
- Edit `articles.json` via GitHub web UI:
  1. In repo, click `articles.json`.
  2. Click the pencil icon (edit).
  3. Add a new article object inside the array (follow existing structure). Use a comma between items.
  4. Commit changes → site will fetch the updated articles.json and display them (may need to refresh browser).

Quick example (add inside articles.json array):
{
  "id": "maintenance-divorce-2025",
  "type": "civil",
  "title": "Maintenance & Divorce — Practical Steps",
  "date": "2025-12-01",
  "category": "Civil · Family",
  "author": "Adv. S. Gupta",
  "excerpt": "Short practical checklist to claim maintenance and file for divorce in India.",
  "cover": "",
  "content": "### Key steps\n1. Gather financial records\n2. Draft petition\n\nContact: https://justicefirms.com/contact"
}

Notes & suggestions
- Always end every article with a clear CTA to `https://justicefirms.com/contact` and a short "How we can help" paragraph — this converts visitors to clients.
- For persistent server-side CMS (non-technical write/publish), we can add Netlify CMS or a simple GitHub‑backed admin later.
- If you want, I can package these files into a ZIP and provide it so you can upload directly.

If aap chahen, main abhi aapka index.html bhi replace karke ready version push karne layak ZIP bana doon — boliye, main ZIP ready kar dunga.  
