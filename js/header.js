/**
 * ===================== HEADER COMPONENT JAVASCRIPT =====================
 * Módulo responsável pela funcionalidade do cabeçalho responsivo
 * Inclui controle do menu mobile, navegação e interações
 */

class HeaderComponent {
  constructor() {
    this.init();
  }

  /**
   * Inicializa o componente do cabeçalho
   */
  init() {
    this.cacheDOM();
    this.bindEvents();
    this.setupAccessibility();
  }

  /**
   * Cache dos elementos DOM para melhor performance
   */
  cacheDOM() {
    this.header = document.querySelector('.header');
    this.mobileBtn = document.querySelector('.header__mobile-btn');
    this.mobileMenu = document.querySelector('.header__nav-mobile');
    this.mobileCloseBtn = document.querySelector('.header__mobile-close');
    this.overlay = document.querySelector('.header__overlay');
    this.mobileLinks = document.querySelectorAll('.header__nav-mobile-link');
    this.body = document.body;
  }

  /**
   * Vincula eventos aos elementos
   */
  bindEvents() {
    // Toggle do menu mobile
    if (this.mobileBtn) {
      this.mobileBtn.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Fechar menu mobile
    if (this.mobileCloseBtn) {
      this.mobileCloseBtn.addEventListener('click', () => this.closeMobileMenu());
    }

    // Fechar menu ao clicar no overlay
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.closeMobileMenu());
    }

    // Fechar menu ao clicar em links
    this.mobileLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });

    // Fechar menu com tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMobileMenuOpen()) {
        this.closeMobileMenu();
      }
    });

    // Scroll behavior (opcional - para header com background transparente)
    window.addEventListener('scroll', () => this.handleScroll());

    // Resize handler para limpar estado do menu mobile
    window.addEventListener('resize', () => this.handleResize());
  }

  /**
   * Configura recursos de acessibilidade
   */
  setupAccessibility() {
    // ARIA attributes
    if (this.mobileBtn) {
      this.mobileBtn.setAttribute('aria-expanded', 'false');
      this.mobileBtn.setAttribute('aria-controls', 'mobile-navigation');
    }

    if (this.mobileMenu) {
      this.mobileMenu.setAttribute('id', 'mobile-navigation');
      this.mobileMenu.setAttribute('aria-hidden', 'true');
    }
  }

  /**
   * Abre/fecha o menu mobile
   */
  toggleMobileMenu() {
    if (this.isMobileMenuOpen()) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  /**
   * Abre o menu mobile
   */
  openMobileMenu() {
    this.mobileMenu?.classList.add('active');
    this.overlay?.classList.add('active');
    this.body.classList.add('menu-open');
    
    // Acessibilidade
    this.mobileBtn?.setAttribute('aria-expanded', 'true');
    this.mobileMenu?.setAttribute('aria-hidden', 'false');
    
    // Foco no primeiro link
    const firstLink = this.mobileMenu?.querySelector('.header__nav-mobile-link');
    firstLink?.focus();
    
    // Previne scroll do body
    this.body.style.overflow = 'hidden';
  }

  /**
   * Fecha o menu mobile
   */
  closeMobileMenu() {
    this.mobileMenu?.classList.remove('active');
    this.overlay?.classList.remove('active');
    this.body.classList.remove('menu-open');
    
    // Acessibilidade
    this.mobileBtn?.setAttribute('aria-expanded', 'false');
    this.mobileMenu?.setAttribute('aria-hidden', 'true');
    
    // Restaura scroll do body
    this.body.style.overflow = '';
    
    // Retorna foco para o botão
    this.mobileBtn?.focus();
  }

  /**
   * Verifica se o menu mobile está aberto
   */
  isMobileMenuOpen() {
    return this.mobileMenu?.classList.contains('active') || false;
  }

  /**
   * Gerencia comportamento no scroll (opcional)
   */
  handleScroll() {
    const scrollY = window.scrollY;
    
    // Adiciona classe quando rolar para baixo
    if (scrollY > 50) {
      this.header?.classList.add('header--scrolled');
    } else {
      this.header?.classList.remove('header--scrolled');
    }
  }

  /**
   * Gerencia redimensionamento da janela
   */
  handleResize() {
    // Fecha menu mobile se a tela ficar grande
    if (window.innerWidth > 768 && this.isMobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }

  /**
   * Método público para destruir o componente
   */
  destroy() {
    // Remove event listeners
    this.mobileBtn?.removeEventListener('click', this.toggleMobileMenu);
    this.mobileCloseBtn?.removeEventListener('click', this.closeMobileMenu);
    this.overlay?.removeEventListener('click', this.closeMobileMenu);
    
    this.mobileLinks.forEach(link => {
      link.removeEventListener('click', this.closeMobileMenu);
    });
    
    // Limpa classes
    this.closeMobileMenu();
  }
}

/**
 * ===================== HEADER TEMPLATE GENERATOR =====================
 * Classe para gerar o HTML do cabeçalho dinamicamente
 */

class HeaderTemplate {
  constructor(config = {}) {
    this.config = {
      logoPath: '/assets/',
      logoUff: 'logo-uff.jpg',
      logoIsma: 'logo-isma-site.png',
      logoAlt: {
        uff: 'Logo UFF Blumenau',
        isma: 'ISMA Wyng Tjun Logo'
      },
      navigationItems: [
        { href: '/', text: 'Início', icon: 'fas fa-home' },
        { href: '/sobre', text: 'Sobre', icon: 'fas fa-info-circle' },
        { href: '/modalidades', text: 'Modalidades', icon: 'fas fa-fist-raised' },
        { href: '/horarios', text: 'Horários', icon: 'fas fa-clock' },
        { href: '/contato', text: 'Contato', icon: 'fas fa-envelope' },
        { 
          href: '/area-estudantes', 
          text: 'Área Aluno', 
          icon: 'fas fa-graduation-cap',
          isSpecial: true 
        }
      ],
      ...config
    };
  }

  /**
   * Gera o HTML completo do cabeçalho
   */
  generate() {
    return `
      <header class="header" id="header-principal">
        <div class="header__container">
          ${this.generateLogo()}
          ${this.generateDesktopNav()}
          ${this.generateMobileButton()}
        </div>
        ${this.generateMobileNav()}
        ${this.generateOverlay()}
      </header>
    `;
  }

  /**
   * Gera o HTML do logo
   */
  generateLogo() {
    return `
      <a href="/" class="header__logo" aria-label="Página inicial">
        <img 
          src="${this.config.logoPath}${this.config.logoUff}" 
          alt="${this.config.logoAlt.uff}" 
          class="header__logo-img"
        >
        <img 
          src="${this.config.logoPath}${this.config.logoIsma}" 
          alt="${this.config.logoAlt.isma}" 
          class="header__logo-img"
        >
      </a>
    `;
  }

  /**
   * Gera o HTML da navegação desktop
   */
  generateDesktopNav() {
    const navItems = this.config.navigationItems.map(item => {
      const classes = item.isSpecial 
        ? 'header__nav-link header__nav-link--area-aluno'
        : 'header__nav-link';
      
      return `
        <li class="header__nav-item">
          <a href="${item.href}" class="${classes}">
            <i class="${item.icon}"></i>
            ${item.text}
          </a>
        </li>
      `;
    }).join('');

    return `
      <nav class="header__nav-desktop" role="navigation" aria-label="Menu principal">
        <ul class="header__nav-desktop">
          ${navItems}
        </ul>
      </nav>
    `;
  }

  /**
   * Gera o HTML do botão mobile
   */
  generateMobileButton() {
    return `
      <button 
        class="header__mobile-btn" 
        aria-label="Abrir menu de navegação"
        aria-expanded="false"
      >
        <i class="fas fa-bars header__mobile-btn-icon"></i>
      </button>
    `;
  }

  /**
   * Gera o HTML da navegação mobile
   */
  generateMobileNav() {
    const mobileItems = this.config.navigationItems.map(item => {
      const classes = item.isSpecial 
        ? 'header__nav-mobile-link header__nav-mobile-link--area-aluno'
        : 'header__nav-mobile-link';
      
      return `
        <li class="header__nav-mobile-item">
          <a href="${item.href}" class="${classes}">
            <i class="${item.icon}"></i>
            ${item.text}
          </a>
        </li>
      `;
    }).join('');

    return `
      <nav class="header__nav-mobile" role="navigation" aria-label="Menu mobile">
        <button class="header__mobile-close" aria-label="Fechar menu">
          <i class="fas fa-times"></i>
        </button>
        <ul class="header__nav-mobile-list">
          ${mobileItems}
        </ul>
      </nav>
    `;
  }

  /**
   * Gera o overlay para mobile
   */
  generateOverlay() {
    return '<div class="header__overlay"></div>';
  }
}

/**
 * ===================== AUTO INITIALIZATION =====================
 */

// Inicialização automática quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  // Só inicializa se o cabeçalho existir na página
  if (document.querySelector('.header')) {
    window.headerComponent = new HeaderComponent();
  }
});

// Exporta as classes para uso em outros contextos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HeaderComponent, HeaderTemplate };
}

// Disponibiliza globalmente no navegador
window.HeaderComponent = HeaderComponent;
window.HeaderTemplate = HeaderTemplate; 