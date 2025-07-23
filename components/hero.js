/**
 * Hero Section Component
 * Gera seções hero padronizadas para páginas internas
 */

class HeroComponent {
  constructor(config = {}) {
    this.config = {
      title: 'Título da Página',
      subtitle: 'Subtítulo da página',
      backgroundImage: null,
      backgroundVideo: null,
      customClass: '',
      customStyles: '',
      overlay: true,
      overlayOpacity: 0.6,
      textAlign: 'center',
      minHeight: '400px',
      ...config
    };
  }

  generateBackgroundStyles() {
    const styles = [];
    
    if (this.config.backgroundImage) {
      styles.push(`background-image: url('${this.config.backgroundImage}')`);
      styles.push('background-size: cover');
      styles.push('background-position: center');
    }
    
    if (this.config.minHeight) {
      styles.push(`min-height: ${this.config.minHeight}`);
    }
    
    if (this.config.customStyles) {
      styles.push(this.config.customStyles);
    }
    
    return styles.length > 0 ? ` style="${styles.join(';')}"` : '';
  }

  generateOverlay() {
    if (!this.config.overlay) return '';
    
    return `
      <div class="hero-overlay" style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, ${this.config.overlayOpacity});
        z-index: 1;
      "></div>
    `;
  }

  generateBackgroundVideo() {
    if (!this.config.backgroundVideo) return '';
    
    return `
      <video 
        autoplay 
        muted 
        loop 
        playsinline
        class="hero-video"
        style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        "
      >
        <source src="${this.config.backgroundVideo}" type="video/mp4">
      </video>
    `;
  }

  generate() {
    const cssClass = `hero${this.config.customClass ? ' ' + this.config.customClass : ''}`;
    const backgroundStyles = this.generateBackgroundStyles();
    
    return `
      <section class="${cssClass}"${backgroundStyles}>
        ${this.generateBackgroundVideo()}
        ${this.generateOverlay()}
        <div class="container" style="position: relative; z-index: 2;">
          <div class="hero-content" style="text-align: ${this.config.textAlign};">
            <h1 class="hero-title">${this.config.title}</h1>
            <p class="hero-subtitle">${this.config.subtitle}</p>
          </div>
        </div>
      </section>
    `;
  }

  render(targetSelector = 'main') {
    const target = document.querySelector(targetSelector);
    if (target) {
      target.insertAdjacentHTML('afterbegin', this.generate());
    }
  }

  static create(config = {}) {
    const hero = new HeroComponent(config);
    return hero.generate();
  }

  // Método para criar hero específico para cada página
  static createPageHero(page, customConfig = {}) {
    const pageConfigs = {
      sobre: {
        title: 'Conheça a UFF - Underground Fight and Fitness',
        subtitle: 'Tradição, excelência e transformação através das artes marciais'
      },
      modalidades: {
        title: 'Nossas Modalidades',
        subtitle: 'Artes marciais tradicionais para todos os níveis'
      },
      horarios: {
        title: 'Horários e Valores',
        subtitle: 'Encontre o horário ideal para sua rotina'
      },
      contato: {
        title: 'Entre em Contato',
        subtitle: 'Estamos prontos para atendê-lo'
      }
    };

    const config = { ...pageConfigs[page], ...customConfig };
    return HeroComponent.create(config);
  }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.HeroComponent = HeroComponent;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = HeroComponent;
} 