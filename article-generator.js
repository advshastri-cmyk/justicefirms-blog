const fs = require('fs');
const path = require('path');

// Read articles.json
const articlesData = JSON.parse(fs.readFileSync('articles.json', 'utf-8'));

// Article page template
function generateArticlePage(article) {
  const isHindi = article.language === 'hi';
  const fontFamily = isHindi 
    ? "'Noto Sans Devanagari', sans-serif" 
    : "'Inter', system-ui, sans-serif";

  return `<!DOCTYPE html>
<html lang="${article.language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO Meta Tags -->
  <title>${article.seo.title}</title>
  <meta name="description" content="${article.seo.description}">
  <link rel="canonical" href="${article.seo.canonical}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${article.title}">
  <meta property="og:description" content="${article.excerpt}">
  <meta property="og:image" content="${article.cover}">
  <meta property="og:url" content="${article.seo.canonical}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="JusticeFirms Journal">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${article.title}">
  <meta name="twitter:description" content="${article.excerpt}">
  <meta name="twitter:image" content="${article.cover}">
  
  <!-- Article Meta -->
  <meta property="article:published_time" content="${article.published_at}">
  <meta property="article:author" content="${article.author.name}">
  <meta property="article:section" content="${article.category.primary}">
  
  <!-- Robots -->
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="googlebot" content="index, follow">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700&family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --gold: #D4AF37;
      --gold-dark: #B89A2E;
      --charcoal: #0B0C0E;
      --cream: #FDFDFB;
      --muted: #5F6368;
      --border: #e5e5e5;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: ${fontFamily};
      background: var(--cream);
      color: var(--charcoal);
      line-height: 1.8;
      -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Playfair Display', Georgia, serif;
      font-weight: 600;
      line-height: 1.3;
      margin-bottom: 1rem;
    }

    a {
      color: var(--gold);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    /* Header */
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background: rgba(11,12,14,0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80px;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      color: white;
      text-decoration: none;
    }

    .logo-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: linear-gradient(135deg, var(--gold), var(--gold-dark));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }

    .logo-text {
      font-family: 'Playfair Display', serif;
      font-size: 18px;
    }

    .back-btn {
      padding: 10px 24px;
      border-radius: 50px;
      background: rgba(255,255,255,0.1);
      color: white;
      font-size: 14px;
      border: none;
      cursor: pointer;
      transition: all 0.3s;
      text-decoration: none;
    }

    .back-btn:hover {
      background: rgba(255,255,255,0.15);
      text-decoration: none;
    }

    /* Article Header */
    .article-header {
      padding: 140px 24px 80px;
      background: linear-gradient(rgba(11,12,14,0.7), rgba(11,12,14,0.85)), 
                  url('${article.cover}');
      background-size: cover;
      background-position: center;
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .article-header-content {
      max-width: 900px;
    }

    .article-category {
      color: var(--gold);
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 24px;
    }

    .article-title {
      font-size: clamp(32px, 6vw, 56px);
      color: white;
      margin-bottom: 24px;
    }

    .article-excerpt {
      font-size: clamp(16px, 2vw, 20px);
      color: rgba(255,255,255,0.8);
      margin-bottom: 32px;
      line-height: 1.7;
    }

    .article-meta-header {
      display: flex;
      gap: 24px;
      justify-content: center;
      flex-wrap: wrap;
      color: rgba(255,255,255,0.7);
      font-size: 14px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Article Content */
    .article-content {
      max-width: 800px;
      margin: 0 auto;
      padding: 80px 24px;
    }

    .article-content h2 {
      font-size: 32px;
      margin-top: 48px;
      margin-bottom: 24px;
      color: var(--charcoal);
    }

    .article-content h3 {
      font-size: 24px;
      margin-top: 36px;
      margin-bottom: 16px;
      color: var(--charcoal);
    }

    .article-content p {
      font-size: 18px;
      line-height: 1.8;
      margin-bottom: 24px;
      color: #2c3e50;
    }

    .article-content ul, .article-content ol {
      margin-left: 24px;
      margin-bottom: 24px;
    }

    .article-content li {
      font-size: 18px;
      line-height: 1.8;
      margin-bottom: 12px;
    }

    .article-content blockquote {
      border-left: 4px solid var(--gold);
      padding-left: 24px;
      margin: 32px 0;
      font-style: italic;
      color: var(--muted);
    }

    .article-content strong {
      color: var(--charcoal);
      font-weight: 600;
    }

    /* CTA Box */
    .cta-box {
      margin: 48px 0;
      padding: 32px;
      background: linear-gradient(135deg, var(--gold), var(--gold-dark));
      border-radius: 16px;
      text-align: center;
    }

    .cta-box h3 {
      color: var(--charcoal);
      margin-bottom: 16px;
    }

    .cta-box p {
      color: rgba(11,12,14,0.8);
      margin-bottom: 24px;
    }

    .cta-btn {
      display: inline-block;
      padding: 14px 32px;
      background: var(--charcoal);
      color: white;
      border-radius: 50px;
      font-weight: 600;
      transition: all 0.3s;
      text-decoration: none;
    }

    .cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      text-decoration: none;
    }

    /* Related Articles */
    .related-articles {
      padding: 80px 24px;
      background: #f8f8f6;
    }

    .related-container {
      max-width: 1280px;
      margin: 0 auto;
    }

    .related-title {
      text-align: center;
      font-size: 36px;
      margin-bottom: 48px;
    }

    .related-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 32px;
    }

    .related-card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      transition: all 0.3s;
      cursor: pointer;
    }

    .related-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }

    .related-card h3 {
      font-size: 20px;
      margin-bottom: 12px;
    }

    .related-card p {
      color: var(--muted);
      font-size: 15px;
    }

    /* Footer */
    .footer {
      padding: 60px 24px 40px;
      background: var(--charcoal);
      color: rgba(255,255,255,0.7);
      text-align: center;
    }

    .footer a {
      color: var(--gold);
    }

    .footer p {
      margin-bottom: 12px;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .article-header {
        min-height: 50vh;
      }

      .article-content {
        padding: 60px 20px;
      }

      .article-content h2 {
        font-size: 26px;
      }

      .article-content p,
      .article-content li {
        font-size: 16px;
      }
    }
  </style>

  <!-- Schema.org Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${article.title}",
    "description": "${article.excerpt}",
    "image": "${article.cover}",
    "datePublished": "${article.published_at}",
    "dateModified": "${article.published_at}",
    "author": {
      "@type": "Person",
      "name": "${article.author.name}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "JusticeFirms Journal",
      "logo": {
        "@type": "ImageObject",
        "url": "https://blog.justicefirms.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${article.seo.canonical}"
    }
  }
  </script>
</head>
<body>

  <!-- Header -->
  <header class="header">
    <div class="header-inner">
      <a href="/" class="logo">
        <div class="logo-icon">⚖️</div>
        <span class="logo-text">JusticeFirms</span>
      </a>
      <a href="/" class="back-btn">← Back to Articles</a>
    </div>
  </header>

  <!-- Article Header -->
  <div class="article-header">
    <div class="article-header-content">
      <div class="article-category">${article.category.primary} › ${article.category.secondary}</div>
      <h1 class="article-title">${article.title}</h1>
      <p class="article-excerpt">${article.excerpt}</p>
      <div class="article-meta-header">
        <div class="meta-item">
          <span>👤</span>
          <span>${article.author.name}</span>
        </div>
        <div class="meta-item">
          <span>📅</span>
          <span>${new Date(article.published_at).toLocaleDateString('en-IN')}</span>
        </div>
        <div class="meta-item">
          <span>⏱️</span>
          <span>${article.reading_time}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Article Content -->
  <article class="article-content">
    ${article.content}

    <div class="cta-box">
      <h3>${isHindi ? 'कानूनी सहायता चाहिए?' : 'Need Legal Help?'}</h3>
      <p>${isHindi ? 'अनुभवी वकील से परामर्श लें' : 'Get expert legal guidance from experienced advocates'}</p>
      <a href="https://justicefirms.com/contact" class="cta-btn">
        ${isHindi ? 'परामर्श बुक करें' : 'Book Consultation'}
      </a>
    </div>
  </article>

  <!-- Related Articles -->
  <section class="related-articles">
    <div class="related-container">
      <h2 class="related-title">${isHindi ? 'संबंधित लेख' : 'Related Articles'}</h2>
      <div class="related-grid" id="relatedGrid">
        <!-- Will be populated by JavaScript -->
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <p>© 2026 JusticeFirms Journal. All rights reserved.</p>
    <p><a href="https://justicefirms.com">Visit Main Website</a></p>
  </footer>

  <script>
    // Load related articles
    fetch('/articles.json')
      .then(res => res.json())
      .then(data => {
        const currentId = '${article.id}';
        const currentCategory = '${article.category.primary}';
        
        const related = data.articles
          .filter(a => a.id !== currentId && a.category.primary === currentCategory)
          .slice(0, 3);

        const grid = document.getElementById('relatedGrid');
        grid.innerHTML = related.map(article => \`
          <div class="related-card" onclick="window.location.href='/\${article.slug}.html'">
            <h3>\${article.title}</h3>
            <p>\${article.excerpt}</p>
          </div>
        \`).join('');
      });
  </script>

</body>
</html>`;
}

// Generate all article pages
articlesData.articles.forEach(article => {
  const html = generateArticlePage(article);
  const filename = `${article.slug}.html`;
  fs.writeFileSync(filename, html, 'utf-8');
  console.log(`✅ Generated: ${filename}`);
});

console.log(`\n🎉 Successfully generated ${articlesData.articles.length} article pages!`);
