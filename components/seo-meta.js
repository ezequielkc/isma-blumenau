/**
 * SEO Meta Tags Component
 * Gera meta tags padronizadas para SEO e redes sociais
 */

class SEOMetaComponent {
  constructor(config = {}) {
    this.config = {
      // Meta tags básicas
      title: 'UFF Blumenau | Defesa Pessoal e Artes Marciais',
      description: 'Academia de artes marciais em Blumenau. Wyng Tjun, defesa pessoal e boxe chinês com instrutor credenciado ISMA.',
      author: 'UFF Blumenau',
      robots: 'index, follow',
      canonical: 'https://defesapessoalblumenau.com.br/',
      
      // Open Graph
      ogType: 'website',
      ogLocale: 'pt_BR',
      ogSiteName: 'UFF Blumenau',
      ogImage: 'https://defesapessoalblumenau.com.br/assets/logo-uff.jpg',
      
      // Twitter Card
      twitterCard: 'summary_large_image',
      
      // Schema.org dados estruturados
      schemaOrg: null,
      
      // Configurações base do site
      baseUrl: 'https://defesapessoalblumenau.com.br',
      siteName: 'UFF Blumenau',
      defaultImage: '/assets/logo-uff.jpg',
      
      ...config
    };
  }

  generateBasicMetas() {
    return `
      <meta charset="UTF-8">
      <meta http-equiv="Content-Language" content="pt-BR">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${this.config.title}</title>
      <meta name="description" content="${this.config.description}">
      <meta name="robots" content="${this.config.robots}">
      <meta name="author" content="${this.config.author}">
      <link rel="canonical" href="${this.config.canonical}">
      <link rel="icon" type="image/png" href="/assets/favicon.png">
    `;
  }

  generateOpenGraphMetas() {
    const ogImage = this.config.ogImage.startsWith('http') 
      ? this.config.ogImage 
      : `${this.config.baseUrl}${this.config.ogImage}`;
      
    return `
      <!-- Open Graph -->
      <meta property="og:type" content="${this.config.ogType}">
      <meta property="og:locale" content="${this.config.ogLocale}">
      <meta property="og:title" content="${this.config.title}">
      <meta property="og:description" content="${this.config.description}">
      <meta property="og:url" content="${this.config.canonical}">
      <meta property="og:site_name" content="${this.config.ogSiteName}">
      <meta property="og:image" content="${ogImage}">
    `;
  }

  generateTwitterMetas() {
    const twitterImage = this.config.ogImage.startsWith('http') 
      ? this.config.ogImage 
      : `${this.config.baseUrl}${this.config.ogImage}`;
      
    return `
      <!-- Twitter Card -->
      <meta name="twitter:card" content="${this.config.twitterCard}">
      <meta name="twitter:title" content="${this.config.title}">
      <meta name="twitter:description" content="${this.config.description}">
      <meta name="twitter:image" content="${twitterImage}">
    `;
  }

  generateSchemaOrg() {
    if (!this.config.schemaOrg) return '';
    
    return `
      <script type="application/ld+json">
      ${JSON.stringify(this.config.schemaOrg, null, 2)}
      </script>
    `;
  }

  generate() {
    return `
      ${this.generateBasicMetas()}
      ${this.generateOpenGraphMetas()}
      ${this.generateTwitterMetas()}
      <!-- Fim SEO técnico -->
      ${this.generateSchemaOrg()}
    `.trim();
  }

  // Método para criar SEO específico para cada página
  static createPageSEO(page, customConfig = {}) {
    const pageConfigs = {
      home: {
        title: 'UFF Blumenau | Defesa Pessoal, Artes Marciais e Autoconfiança em Blumenau',
        description: 'Aprenda defesa pessoal, Wyng Tjun e artes marciais na UFF Blumenau. Aulas para todas as idades, ambiente acolhedor, instrutor credenciado ISMA. Transforme corpo, mente e conduta!',
        canonical: 'https://defesapessoalblumenau.com.br/',
        schemaOrg: {
          "@context": "https://schema.org",
          "@type": "SportsActivityLocation",
          "name": "UFF Blumenau",
          "image": "https://defesapessoalblumenau.com.br/assets/logo-uff.jpg",
          "url": "https://defesapessoalblumenau.com.br/",
          "telephone": "+55 47 99977-6320",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "R. 7 de Setembro, 2139 - Centro",
            "addressLocality": "Blumenau",
            "addressRegion": "SC",
            "postalCode": "89012-401",
            "addressCountry": "BR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-26.9144968",
            "longitude": "-49.0748577"
          },
          "openingHours": "Mo-Sa 08:00-22:00",
          "priceRange": "Consulte valores",
          "description": "Academia de artes marciais credenciada ISMA, referência em defesa pessoal, Wyng Tjun e Boxe Chinês em Blumenau.",
          "sameAs": [
            "https://www.instagram.com/uffbnu/"
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "20",
            "bestRating": "5",
            "worstRating": "1",
            "ratingExplanation": "Baseado em avaliações públicas do Google Maps: https://www.google.com/maps/place/ISMA+Wyng+Tjun/"
          }
        }
      },
      sobre: {
        title: 'Sobre a UFF Blumenau | Nossa História e Missão',
        description: 'Conheça a história, missão e valores da UFF Blumenau. Academia credenciada ISMA, referência em defesa pessoal e artes marciais em Blumenau.',
        canonical: 'https://defesapessoalblumenau.com.br/sobre'
      },
      modalidades: {
        title: 'Modalidades | UFF Blumenau',
        description: 'Conheça as modalidades oferecidas pela UFF Blumenau: Wyng Tjun, Filosofia Wyng Tjun e Boxe Chinês (Sandá). Defesa pessoal, disciplina e saúde para todas as idades.',
        canonical: 'https://defesapessoalblumenau.com.br/modalidades'
      },
      horarios: {
        title: 'Horários e Valores | UFF Blumenau',
        description: 'Confira os horários das aulas e valores da UFF Blumenau. Aulas de Wyng Tjun, defesa pessoal e boxe chinês para todas as idades.',
        canonical: 'https://defesapessoalblumenau.com.br/horarios'
      },
      contato: {
        title: 'Contato | UFF Blumenau',
        description: 'Entre em contato com a UFF Blumenau. Endereço, telefone, WhatsApp e redes sociais. Agende sua aula experimental.',
        canonical: 'https://defesapessoalblumenau.com.br/contato'
      }
    };

    const config = { ...pageConfigs[page], ...customConfig };
    const seoMeta = new SEOMetaComponent(config);
    return seoMeta.generate();
  }

  // Método para inserir as meta tags no head
  static inject(config = {}) {
    const seoMeta = new SEOMetaComponent(config);
    const metaTags = seoMeta.generate();
    
    // Criar um elemento temporário para parsing
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = metaTags;
    
    // Inserir cada meta tag no head
    const head = document.head;
    Array.from(tempDiv.children).forEach(element => {
      if (element.tagName === 'SCRIPT') {
        // Para scripts de schema.org
        head.appendChild(element);
      } else {
        // Para meta tags
        head.appendChild(element);
      }
    });
  }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.SEOMetaComponent = SEOMetaComponent;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SEOMetaComponent;
} 