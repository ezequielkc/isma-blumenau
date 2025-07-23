/**
 * WhatsApp Button Component
 * Gera botões WhatsApp padronizados para diferentes contextos
 */

class WhatsAppButtonComponent {
  constructor(config = {}) {
    this.config = {
      phone: '554799977632',
      message: 'Vim pelo site e gostaria de mais informações!',
      text: 'Fale no WhatsApp',
      icon: 'fab fa-whatsapp',
      type: 'float', // 'float', 'inline', 'cta'
      size: 'medium', // 'small', 'medium', 'large'
      position: 'bottom-right', // 'bottom-right', 'bottom-left'
      customClass: '',
      customStyles: '',
      ...config
    };
  }

  generateWhatsAppURL() {
    const encodedMessage = encodeURIComponent(this.config.message);
    return `https://wa.me/${this.config.phone}?text=${encodedMessage}`;
  }

  generateFloatingButton() {
    const positionClass = this.config.position === 'bottom-left' ? 'whatsapp-float-left' : 'whatsapp-float';
    
    return `
      <a href="${this.generateWhatsAppURL()}" 
         class="${positionClass} ${this.config.customClass}"
         target="_blank" 
         rel="noopener" 
         aria-label="${this.config.text}"
         style="${this.config.customStyles}">
        <i class="${this.config.icon}"></i>
      </a>
    `;
  }

  generateInlineButton() {
    const sizeClasses = {
      small: 'whatsapp-btn-small',
      medium: 'whatsapp-btn',
      large: 'whatsapp-btn-large'
    };
    
    const buttonClass = sizeClasses[this.config.size] || 'whatsapp-btn';
    
    return `
      <a href="${this.generateWhatsAppURL()}" 
         class="${buttonClass} ${this.config.customClass}"
         target="_blank" 
         rel="noopener"
         style="${this.config.customStyles}">
        <i class="${this.config.icon}"></i>
        ${this.config.text}
      </a>
    `;
  }

  generateCTAButton() {
    const ctaStyles = `
      display: inline-flex;
      align-items: center;
      gap: 0.5em;
      font-size: 1.15em;
      padding: 0.7em 1.4em;
      background: #25d366;
      color: #fff;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(37,211,102,0.08);
      transition: background 0.2s;
    `;
    
    return `
      <a href="${this.generateWhatsAppURL()}" 
         class="whatsapp-cta ${this.config.customClass}"
         target="_blank" 
         rel="noopener"
         style="${ctaStyles}${this.config.customStyles}">
        <i class="${this.config.icon}"></i>
        ${this.config.text}
      </a>
    `;
  }

  generate() {
    switch (this.config.type) {
      case 'float':
        return this.generateFloatingButton();
      case 'inline':
        return this.generateInlineButton();
      case 'cta':
        return this.generateCTAButton();
      default:
        return this.generateInlineButton();
    }
  }

  render(targetSelector = 'body') {
    const target = document.querySelector(targetSelector);
    if (target) {
      if (this.config.type === 'float') {
        target.insertAdjacentHTML('beforeend', this.generate());
      } else {
        target.insertAdjacentHTML('afterbegin', this.generate());
      }
    }
  }

  static create(config = {}) {
    const button = new WhatsAppButtonComponent(config);
    return button.generate();
  }

  // Métodos pré-configurados para diferentes contextos
  static createFloatingButton(config = {}) {
    return WhatsAppButtonComponent.create({
      type: 'float',
      message: 'Vim pelo site e gostaria de mais informações!',
      ...config
    });
  }

  static createContactButton(config = {}) {
    return WhatsAppButtonComponent.create({
      type: 'inline',
      text: 'Enviar Mensagem',
      message: 'Olá! Vi o site e gostaria de mais informações sobre as aulas.',
      ...config
    });
  }

  static createCTAButton(config = {}) {
    return WhatsAppButtonComponent.create({
      type: 'cta',
      text: 'Fale no WhatsApp',
      message: 'Vim pelo site e gostaria de mais informações!',
      ...config
    });
  }

  static createScheduleButton(config = {}) {
    return WhatsAppButtonComponent.create({
      type: 'inline',
      text: 'Agendar Aula Experimental',
      message: 'Olá! Gostaria de agendar uma aula experimental gratuita.',
      ...config
    });
  }

  // Método para adicionar estilos CSS necessários
  static injectStyles() {
    if (document.getElementById('whatsapp-button-styles')) return;
    
    const styles = `
      <style id="whatsapp-button-styles">
        .whatsapp-float {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          background: #25d366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
          transition: all 0.3s ease;
          z-index: 1000;
        }
        
        .whatsapp-float:hover {
          background: #128c7e;
          transform: scale(1.1);
          color: white;
          text-decoration: none;
        }
        
        .whatsapp-float-left {
          position: fixed;
          bottom: 20px;
          left: 20px;
          width: 60px;
          height: 60px;
          background: #25d366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
          transition: all 0.3s ease;
          z-index: 1000;
        }
        
        .whatsapp-float-left:hover {
          background: #128c7e;
          transform: scale(1.1);
          color: white;
          text-decoration: none;
        }
        
        .whatsapp-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: #25d366;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 500;
          transition: background 0.2s ease;
        }
        
        .whatsapp-btn:hover {
          background: #128c7e;
          color: white;
          text-decoration: none;
        }
        
        .whatsapp-btn-small {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.5rem 1rem;
          background: #25d366;
          color: white;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          transition: background 0.2s ease;
        }
        
        .whatsapp-btn-small:hover {
          background: #128c7e;
          color: white;
          text-decoration: none;
        }
        
        .whatsapp-btn-large {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          padding: 1rem 2rem;
          background: #25d366;
          color: white;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          transition: background 0.2s ease;
        }
        
        .whatsapp-btn-large:hover {
          background: #128c7e;
          color: white;
          text-decoration: none;
        }
        
        .whatsapp-cta:hover {
          background: #128c7e !important;
          color: white;
          text-decoration: none;
        }
        
        @media (max-width: 768px) {
          .whatsapp-float,
          .whatsapp-float-left {
            width: 50px;
            height: 50px;
            font-size: 1.3rem;
          }
        }
      </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
  }
}

// Auto-injetar estilos quando o componente for carregado
document.addEventListener('DOMContentLoaded', function() {
  WhatsAppButtonComponent.injectStyles();
});

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.WhatsAppButtonComponent = WhatsAppButtonComponent;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = WhatsAppButtonComponent;
} 