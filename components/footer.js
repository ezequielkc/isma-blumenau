/**
 * Footer Component
 * Gera o rodapé padrão do site UFF Blumenau
 */

class FooterComponent {
  constructor(config = {}) {
    this.config = {
      legalLinks: [
        { href: '/politica-privacidade', text: 'Política de Privacidade' },
        { href: '/termos-uso', text: 'Termos de Uso' }
      ],
      socialLinks: [
        { 
          href: 'https://www.instagram.com/sifu_angel_samaniego/', 
          text: 'Sifu Angel',
          icon: 'fab fa-instagram',
          title: 'Instagram Sifu Angel Samaniego'
        },
        { 
          href: 'https://www.instagram.com/uffbnu/', 
          text: 'Academia',
          icon: 'fab fa-instagram',
          title: 'Instagram Academia'
        }
      ],
      courseLinks: [
        {
          href: 'https://seguranca.defesapessoalblumenau.com.br/',
          text: 'Defesa Pessoal para Seguranças',
          icon: 'fas fa-shield-alt',
          title: 'Defesa Pessoal para Seguranças'
        }
      ],
      copyright: '© 2025 UFF - Underground Fight and Fitness - Academia de Artes Marciais Blumenau. Todos os direitos reservados.',
      developer: {
        text: 'Desenvolvido por',
        name: 'Ezequiel Kowalski',
        url: 'https://portfolio.ezequielkowalski.com.br/'
      },
      ...config
    };
  }

  generateLegalLinks() {
    return this.config.legalLinks.map(link => 
      `<li><a href="${link.href}">${link.text}</a></li>`
    ).join('');
  }

  generateSocialLinks() {
    return this.config.socialLinks.map(link => 
      `<a href="${link.href}" target="_blank" rel="noopener" title="${link.title}">
        <i class="${link.icon}"></i> ${link.text}
      </a>`
    ).join('');
  }

  generateCourseLinks() {
    return this.config.courseLinks.map(link => 
      `<a href="${link.href}" target="_blank" rel="noopener" title="${link.title}">
        <i class="${link.icon}"></i> ${link.text}
      </a>`
    ).join('');
  }

  generate() {
    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-column">
              <h4>Links Legais</h4>
              <nav class="footer-menu">
                <ul>
                  ${this.generateLegalLinks()}
                </ul>
              </nav>
            </div>
            <div class="footer-column">
              <h4>Redes Sociais</h4>
              <div class="footer-social">
                ${this.generateSocialLinks()}
              </div>
            </div>
            <div class="footer-column">
              <h4>Cursos</h4>
              <div class="footer-social">
                ${this.generateCourseLinks()}
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <small>${this.config.copyright}</small>
            <span class="credito-dourado" style="font-size: 0.85em; font-weight: normal;">
              ${this.config.developer.text} 
              <a href="${this.config.developer.url}" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;">
                ${this.config.developer.name}
              </a>
            </span>
          </div>
        </div>
      </footer>
    `;
  }

  render(targetSelector = 'body') {
    const target = document.querySelector(targetSelector);
    if (target) {
      target.insertAdjacentHTML('beforeend', this.generate());
    }
  }

  static create(config = {}) {
    const footer = new FooterComponent(config);
    return footer.generate();
  }
}

// Auto-inicialização se o elemento não existir
document.addEventListener('DOMContentLoaded', function() {
  if (!document.querySelector('.footer') && !window.DISABLE_FOOTER_AUTO_INIT) {
    const footer = new FooterComponent();
    footer.render();
  }
});

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.FooterComponent = FooterComponent;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = FooterComponent;
} 