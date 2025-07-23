/**
 * Common Scripts Component
 * Scripts JavaScript comuns utilizados em várias páginas
 */

class CommonScriptsComponent {
  constructor(config = {}) {
    this.config = {
      enableHeaderScroll: true,
      enableMobileMenu: true,
      enableSmoothScroll: true,
      enableLazyLoading: false,
      scrollThreshold: 50,
      ...config
    };
    
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      if (this.config.enableHeaderScroll) {
        this.initHeaderScroll();
      }
      
      if (this.config.enableMobileMenu) {
        this.initMobileMenu();
      }
      
      if (this.config.enableSmoothScroll) {
        this.initSmoothScroll();
      }
      
      if (this.config.enableLazyLoading) {
        this.initLazyLoading();
      }
    });
  }

  initHeaderScroll() {
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.header');
      if (!header) return;
      
      if (window.scrollY > this.config.scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!mobileMenuBtn || !navMenu) return;
    
    // Toggle menu mobile
    mobileMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      navMenu.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      });
    });
    
    // Fechar menu ao clicar fora dele
    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      }
    });
    
    // Prevenir que o clique no menu feche ele
    navMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  initSmoothScroll() {
    // Scroll suave para âncoras internas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignorar links vazios ou só com #
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  initLazyLoading() {
    // Lazy loading para imagens
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Método para adicionar analytics/tracking
  static initAnalytics(config = {}) {
    // Google Analytics ou outras ferramentas
    if (config.googleAnalyticsId) {
      // Implementar GA4
      console.log('Analytics initialized:', config.googleAnalyticsId);
    }
    
    // Facebook Pixel
    if (config.facebookPixelId) {
      // Implementar FB Pixel
      console.log('Facebook Pixel initialized:', config.facebookPixelId);
    }
  }

  // Método para lidar com formulários
  static initForms() {
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', function(e) {
        // Validação básica
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
          } else {
            field.classList.remove('error');
          }
        });
        
        if (!isValid) {
          e.preventDefault();
          console.log('Formulário contém campos obrigatórios vazios');
        }
      });
    });
  }

  // Método para otimização de performance
  static initPerformanceOptimizations() {
    // Preload de recursos críticos
    const criticalResources = [
      '/css/main.css',
      '/css/header.css',
      '/js/header.js'
    ];
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.endsWith('.css') ? 'style' : 'script';
      document.head.appendChild(link);
    });

    // Service Worker para cache (se necessário)
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  // Método para debugging
  static enableDebugMode() {
    window.DEBUG_MODE = true;
    console.log('Debug mode enabled');
    
    // Log de eventos de navegação
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        console.log('Link clicked:', e.target.href);
      }
    });
    
    // Log de scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        console.log('Scroll position:', window.scrollY);
      }, 100);
    });
  }

  // Método estático para inicialização rápida
  static init(config = {}) {
    return new CommonScriptsComponent(config);
  }
}

// Auto-inicialização com configuração padrão
if (typeof window !== 'undefined') {
  window.CommonScriptsComponent = CommonScriptsComponent;
  
  // Inicializar automaticamente se não estiver desabilitado
  if (!window.DISABLE_COMMON_SCRIPTS_AUTO_INIT) {
    CommonScriptsComponent.init();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CommonScriptsComponent;
} 