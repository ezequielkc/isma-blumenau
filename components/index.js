/**
 * UFF Components Library
 * Sistema modular de componentes para o site UFF Blumenau
 */

// Importar todos os componentes
// (Em um ambiente de produção, estes seriam imports reais)

/**
 * Classe principal para gerenciar todos os componentes
 */
class UFFComponents {
  constructor() {
    this.components = {
      Header: window.HeaderComponent,
      Footer: window.FooterComponent,
      Hero: window.HeroComponent,
      SEOMeta: window.SEOMetaComponent,
      WhatsApp: window.WhatsAppButtonComponent,
      CommonScripts: window.CommonScriptsComponent
    };
  }

  /**
   * Inicializa uma página completa com componentes padrão
   */
  initPage(pageConfig = {}) {
    const config = {
      page: 'home',
      enableAutoComponents: true,
      seo: {},
      hero: null,
      footer: true,
      whatsapp: true,
      scripts: true,
      ...pageConfig
    };

    // Inicializar SEO se configurado
    if (config.seo && Object.keys(config.seo).length > 0) {
      this.initSEO(config.page, config.seo);
    }

    // Inicializar Hero se configurado
    if (config.hero) {
      this.initHero(config.page, config.hero);
    }

    // Inicializar Footer se habilitado
    if (config.footer && config.enableAutoComponents) {
      this.initFooter();
    }

    // Inicializar WhatsApp se habilitado
    if (config.whatsapp && config.enableAutoComponents) {
      this.initWhatsApp();
    }

    // Inicializar Scripts comuns se habilitado
    if (config.scripts && config.enableAutoComponents) {
      this.initScripts();
    }

    return this;
  }

  /**
   * Inicializa SEO para uma página
   */
  initSEO(page, customConfig = {}) {
    if (!this.components.SEOMeta) return this;
    
    const seoHTML = this.components.SEOMeta.createPageSEO(page, customConfig);
    
    // Inserir no head se não estiver em modo de geração de HTML
    if (typeof document !== 'undefined') {
      this.components.SEOMeta.inject({ page, ...customConfig });
    }
    
    return seoHTML;
  }

  /**
   * Inicializa Hero para uma página
   */
  initHero(page, customConfig = {}) {
    if (!this.components.Hero) return this;
    
    // Se customConfig é true, usar configuração padrão da página
    if (customConfig === true) {
      customConfig = {};
    }
    
    const heroHTML = this.components.Hero.createPageHero(page, customConfig);
    
    // Renderizar se estiver no browser
    if (typeof document !== 'undefined') {
      const heroComponent = new this.components.Hero({ page, ...customConfig });
      heroComponent.render();
    }
    
    return heroHTML;
  }

  /**
   * Inicializa Footer
   */
  initFooter(customConfig = {}) {
    if (!this.components.Footer) return this;
    
    const footerHTML = this.components.Footer.create(customConfig);
    
    // Renderizar se estiver no browser e footer não existir
    if (typeof document !== 'undefined' && !document.querySelector('.footer')) {
      const footer = new this.components.Footer(customConfig);
      footer.render();
    }
    
    return footerHTML;
  }

  /**
   * Inicializa botão WhatsApp
   */
  initWhatsApp(type = 'float', customConfig = {}) {
    if (!this.components.WhatsApp) return this;
    
    const config = { type, ...customConfig };
    const whatsappHTML = this.components.WhatsApp.create(config);
    
    // Renderizar se estiver no browser
    if (typeof document !== 'undefined') {
      const whatsapp = new this.components.WhatsApp(config);
      whatsapp.render();
    }
    
    return whatsappHTML;
  }

  /**
   * Inicializa scripts comuns
   */
  initScripts(customConfig = {}) {
    if (!this.components.CommonScripts) return this;
    
    // Scripts são inicializados automaticamente
    return this.components.CommonScripts.init(customConfig);
  }

  /**
   * Método para gerar HTML completo de uma página
   */
  generatePageHTML(pageConfig = {}) {
    const config = {
      page: 'home',
      title: 'UFF Blumenau',
      seo: {},
      hero: null,
      content: '',
      footer: true,
      whatsapp: true,
      additionalScripts: [],
      ...pageConfig
    };

    const seoHTML = this.initSEO(config.page, config.seo);
    const heroHTML = config.hero ? this.initHero(config.page, config.hero) : '';
    const footerHTML = config.footer ? this.initFooter() : '';
    const whatsappHTML = config.whatsapp ? this.initWhatsApp() : '';

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  ${seoHTML}
  <link rel="stylesheet" href="/css/main.css">
  <link rel="stylesheet" href="/css/header.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
  <!-- Header será inserido automaticamente via JavaScript -->
  
  <main>
    ${heroHTML}
    ${config.content}
  </main>

  ${footerHTML}
  ${whatsappHTML}

  <!-- Scripts -->
  <script src="/components/header.js"></script>
  <script src="/components/footer.js"></script>
  <script src="/components/hero.js"></script>
  <script src="/components/whatsapp-button.js"></script>
  <script src="/components/common-scripts.js"></script>
  <script src="/js/header.js"></script>
  
  ${config.additionalScripts.map(script => `<script src="${script}"></script>`).join('\n  ')}
  
  <script>
    // Inicialização automática dos componentes
    document.addEventListener('DOMContentLoaded', function() {
      window.uffComponents = new UFFComponents();
      window.uffComponents.initPage(${JSON.stringify(config)});
    });
  </script>
</body>
</html>
    `.trim();
  }

  /**
   * Métodos de conveniência para páginas específicas
   */
  static createHomePage(customConfig = {}) {
    const uff = new UFFComponents();
    return uff.generatePageHTML({
      page: 'home',
      ...customConfig
    });
  }

  static createAboutPage(customConfig = {}) {
    const uff = new UFFComponents();
    return uff.generatePageHTML({
      page: 'sobre',
      hero: true,
      ...customConfig
    });
  }

  static createModalitiesPage(customConfig = {}) {
    const uff = new UFFComponents();
    return uff.generatePageHTML({
      page: 'modalidades',
      hero: true,
      ...customConfig
    });
  }

  static createContactPage(customConfig = {}) {
    const uff = new UFFComponents();
    return uff.generatePageHTML({
      page: 'contato',
      hero: true,
      whatsapp: { type: 'cta' },
      ...customConfig
    });
  }
}

// Exemplo de uso prático
class UFFPageBuilder {
  static buildPage(pageName, customConfig = {}) {
    const builders = {
      home: UFFComponents.createHomePage,
      sobre: UFFComponents.createAboutPage,
      modalidades: UFFComponents.createModalitiesPage,
      contato: UFFComponents.createContactPage
    };

    const builder = builders[pageName];
    return builder ? builder(customConfig) : null;
  }

  static generateAllPages() {
    const pages = ['home', 'sobre', 'modalidades', 'contato'];
    const results = {};

    pages.forEach(page => {
      results[page] = UFFPageBuilder.buildPage(page);
    });

    return results;
  }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.UFFComponents = UFFComponents;
  window.UFFPageBuilder = UFFPageBuilder;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { UFFComponents, UFFPageBuilder };
} 