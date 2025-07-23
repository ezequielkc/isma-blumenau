/**
 * ===================== HEADER CONFIGURATION =====================
 * Arquivo de configuração para personalizar o componente de cabeçalho
 */

// Configuração padrão do cabeçalho
const HEADER_CONFIG = {
  // Configuração dos logos
  logos: {
    path: '/assets/',
    uff: {
      src: 'logo-uff.jpg',
      alt: 'Logo UFF Blumenau'
    },
    isma: {
      src: 'logo-isma-site.png',
      alt: 'ISMA Wyng Tjun Logo'
    }
  },

  // Itens de navegação
  navigation: [
    {
      href: '/',
      text: 'Início',
      icon: 'fas fa-home',
      isActive: false
    },
    {
      href: '/sobre',
      text: 'Sobre',
      icon: 'fas fa-info-circle',
      isActive: false
    },
    {
      href: '/modalidades',
      text: 'Modalidades',
      icon: 'fas fa-fist-raised',
      isActive: false
    },
    {
      href: '/horarios',
      text: 'Horários',
      icon: 'fas fa-clock',
      isActive: false
    },
    {
      href: '/contato',
      text: 'Contato',
      icon: 'fas fa-envelope',
      isActive: false
    },
    {
      href: '/area-estudantes',
      text: 'Área Aluno',
      icon: 'fas fa-graduation-cap',
      isActive: false,
      isSpecial: true
    }
  ],

  // Configurações de comportamento
  behavior: {
    autoInit: true,
    closeOnLinkClick: true,
    closeOnEscape: true,
    closeOnOverlay: true,
    preventBodyScroll: true,
    focusFirstLink: true,
    enableScrollBehavior: true
  },

  // Configurações de acessibilidade
  accessibility: {
    enableAriaLabels: true,
    enableKeyboardNavigation: true,
    enableFocusManagement: true,
    enableScreenReaderSupport: true
  },

  // Configurações de animação
  animation: {
    duration: 300,
    easing: 'ease',
    respectReducedMotion: true
  },

  // Classes CSS customizáveis
  classes: {
    header: 'header',
    container: 'header__container',
    logo: 'header__logo',
    logoImg: 'header__logo-img',
    navDesktop: 'header__nav-desktop',
    navItem: 'header__nav-item',
    navLink: 'header__nav-link',
    navLinkSpecial: 'header__nav-link--area-aluno',
    mobileBtn: 'header__mobile-btn',
    mobileBtnIcon: 'header__mobile-btn-icon',
    navMobile: 'header__nav-mobile',
    navMobileList: 'header__nav-mobile-list',
    navMobileItem: 'header__nav-mobile-item',
    navMobileLink: 'header__nav-mobile-link',
    navMobileLinkSpecial: 'header__nav-mobile-link--area-aluno',
    mobileClose: 'header__mobile-close',
    overlay: 'header__overlay',
    active: 'active',
    scrolled: 'header--scrolled',
    menuOpen: 'menu-open'
  }
};

/**
 * Função para atualizar a página ativa na configuração
 * @param {string} currentPath - Caminho da página atual
 */
function setActivePage(currentPath) {
  HEADER_CONFIG.navigation.forEach(item => {
    item.isActive = item.href === currentPath;
  });
}

/**
 * Função para criar header com configuração personalizada
 * @param {Object} customConfig - Configuração personalizada
 * @returns {string} HTML do header
 */
function createHeaderWithConfig(customConfig = {}) {
  // Mescla configuração personalizada com padrão
  const config = mergeConfig(HEADER_CONFIG, customConfig);
  
  // Cria template com a configuração
  const template = new HeaderTemplate({
    logoPath: config.logos.path,
    logoUff: config.logos.uff.src,
    logoIsma: config.logos.isma.src,
    logoAlt: {
      uff: config.logos.uff.alt,
      isma: config.logos.isma.alt
    },
    navigationItems: config.navigation.map(item => ({
      href: item.href,
      text: item.text,
      icon: item.icon,
      isSpecial: item.isSpecial || false,
      isActive: item.isActive || false
    }))
  });

  return template.generate();
}

/**
 * Função para mesclar configurações (deep merge simples)
 * @param {Object} target - Configuração base
 * @param {Object} source - Configuração personalizada
 * @returns {Object} Configuração mesclada
 */
function mergeConfig(target, source) {
  const result = { ...target };
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = mergeConfig(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  
  return result;
}

/**
 * Função para inicializar header automaticamente
 */
function initHeaderAuto() {
  // Detecta página atual
  const currentPath = window.location.pathname;
  setActivePage(currentPath);

  // Cria header se não existir
  if (!document.querySelector('.header')) {
    const headerHTML = createHeaderWithConfig();
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }

  // Inicializa componente se habilitado
  if (HEADER_CONFIG.behavior.autoInit) {
    window.headerComponent = new HeaderComponent();
  }
}

/**
 * Configurações específicas por página
 */
const PAGE_CONFIGS = {
  '/': {
    navigation: HEADER_CONFIG.navigation.map(item => ({
      ...item,
      isActive: item.href === '/'
    }))
  },
  
  '/sobre': {
    navigation: HEADER_CONFIG.navigation.map(item => ({
      ...item,
      isActive: item.href === '/sobre'
    }))
  },
  
  '/modalidades': {
    navigation: HEADER_CONFIG.navigation.map(item => ({
      ...item,
      isActive: item.href === '/modalidades'
    }))
  },
  
  '/horarios': {
    navigation: HEADER_CONFIG.navigation.map(item => ({
      ...item,
      isActive: item.href === '/horarios'
    }))
  },
  
  '/contato': {
    navigation: HEADER_CONFIG.navigation.map(item => ({
      ...item,
      isActive: item.href === '/contato'
    }))
  },
  
  '/area-estudantes': {
    navigation: HEADER_CONFIG.navigation.map(item => ({
      ...item,
      isActive: item.href === '/area-estudantes'
    }))
  }
};

/**
 * Função para obter configuração da página atual
 * @param {string} path - Caminho da página
 * @returns {Object} Configuração da página
 */
function getPageConfig(path = window.location.pathname) {
  return PAGE_CONFIGS[path] || {};
}

/**
 * Função para adicionar estilos CSS personalizados
 * @param {Object} customStyles - Estilos personalizados
 */
function addCustomStyles(customStyles) {
  const style = document.createElement('style');
  style.textContent = `
    :root {
      ${Object.entries(customStyles).map(([key, value]) => 
        `${key}: ${value};`
      ).join('\n      ')}
    }
  `;
  document.head.appendChild(style);
}

// Disponibiliza globalmente
window.HEADER_CONFIG = HEADER_CONFIG;
window.createHeaderWithConfig = createHeaderWithConfig;
window.setActivePage = setActivePage;
window.getPageConfig = getPageConfig;
window.addCustomStyles = addCustomStyles;
window.initHeaderAuto = initHeaderAuto;

// Auto-inicialização se habilitada
if (typeof window !== 'undefined' && HEADER_CONFIG.behavior.autoInit) {
  document.addEventListener('DOMContentLoaded', initHeaderAuto);
} 