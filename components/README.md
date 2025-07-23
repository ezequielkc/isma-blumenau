# Documentação do Sistema de Cabeçalho Modular

Sistema modular e reutilizável para implementação de cabeçalho responsivo utilizando HTML5, CSS3 e JavaScript vanilla. Projetado para máxima flexibilidade e facilidade de manutenção.

## Arquitetura do Sistema

### Estrutura de Arquivos

```
├── css/
│   └── header.css          # Folha de estilos do componente
├── js/
│   └── header.js           # Lógica de funcionamento e interações
├── components/
│   ├── header.html         # Template de referência (legacy)
│   ├── header.js           # Componente de cabeçalho (já existente)
│   ├── footer.js           # Componente de rodapé
│   ├── hero.js             # Componente de seções hero
│   ├── seo-meta.js         # Componente de meta tags SEO
│   ├── whatsapp-button.js  # Componente de botões WhatsApp
│   ├── common-scripts.js   # Scripts JavaScript comuns
│   ├── index.js            # Sistema unificado de componentes
│   ├── example-implementation.html # Exemplo prático de uso
│   └── README.md           # Esta documentação
└── assets/
    ├── logo-uff.jpg        # Logotipo principal
    └── logo-isma-site.png  # Logotipo secundário
```

## Métodos de Implementação

### Método 1: Integração HTML Estática

Recomendado para sites institucionais com estrutura de páginas estáticas.

**Passo 1: Inclusão de Dependências**
```html
<link rel="stylesheet" href="/css/header.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
<script src="/js/header.js"></script>
```

**Passo 2: Estrutura HTML Base**
```html
<header class="header" id="header-principal">
  <div class="header__container">
    <!-- Área de Logotipos -->
    <a href="/" class="header__logo" aria-label="Página inicial">
      <img src="/assets/logo-uff.jpg" alt="Logo UFF Blumenau" class="header__logo-img">
      <img src="/assets/logo-isma-site.png" alt="ISMA Wyng Tjun Logo" class="header__logo-img">
    </a>

    <!-- Navegação Principal -->
    <nav class="header__nav-desktop" role="navigation" aria-label="Menu principal">
      <ul class="header__nav-desktop">
        <li class="header__nav-item">
          <a href="/" class="header__nav-link">
            <i class="fas fa-home"></i> Início
          </a>
        </li>
        <li class="header__nav-item">
          <a href="/sobre" class="header__nav-link">
            <i class="fas fa-info-circle"></i> Sobre
          </a>
        </li>
        <!-- Itens adicionais conforme necessário -->
      </ul>
    </nav>

    <!-- Controle Mobile -->
    <button class="header__mobile-btn" aria-label="Abrir menu de navegação">
      <div class="header__mobile-btn-icon">
        <div class="header__mobile-btn-middle"></div>
      </div>
    </button>
  </div>

  <!-- Menu Mobile -->
  <nav class="header__nav-mobile" role="navigation" aria-label="Menu mobile">
    <button class="header__mobile-close" aria-label="Fechar menu">
      <i class="fas fa-times"></i>
    </button>
    <ul class="header__nav-mobile-list">
      <!-- Itens de navegação mobile -->
    </ul>
  </nav>

  <!-- Overlay de Fundo -->
  <div class="header__overlay"></div>
</header>
```

### Método 2: Implementação Programática via JavaScript

Recomendado para Single Page Applications ou sistemas com renderização dinâmica.

```javascript
// Configuração personalizada do template
const headerConfig = new HeaderTemplate({
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
    { href: '/contato', text: 'Contato', icon: 'fas fa-envelope' },
    { 
      href: '/area-estudantes', 
      text: 'Área Aluno', 
      icon: 'fas fa-graduation-cap',
      isSpecial: true 
    }
  ]
});

// Geração e inserção do HTML
const headerHTML = headerConfig.generate();
document.body.insertAdjacentHTML('afterbegin', headerHTML);

// Inicialização da funcionalidade
const headerComponent = new HeaderComponent();
```

## Configuração e Personalização

### Variáveis CSS Disponíveis

```css
:root {
  /* Dimensões Estruturais */
  --header-height: 85px;
  --header-bg: #ffffff;
  --header-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  --header-padding: 1rem 0;
  --header-z-index: 1000;
  
  /* Configurações de Navegação */
  --nav-gap: 2rem;
  --nav-link-padding: 0.5rem 1rem;
  --nav-link-border-radius: 6px;
  --nav-link-transition: all 0.3s ease;
  
  /* Especificações do Logotipo */
  --logo-height: 60px;
  --logo-gap: 1rem;
  
  /* Parâmetros Mobile */
  --mobile-menu-width: 280px;
  --mobile-menu-bg: #ffffff;
  --mobile-menu-shadow: -5px 0 20px rgba(0, 0, 0, 0.15);
  --mobile-btn-size: 48px;
  --mobile-overlay-bg: rgba(0, 0, 0, 0.5);
}
```

### Exemplo de Customização Avançada

```css
/* Tema personalizado para marca */
:root {
  --header-bg: #f8f9fa;
  --nav-gap: 1.5rem;
  --logo-height: 70px;
  --mobile-menu-width: 320px;
}

/* Header transparente para landing pages */
.header--transparent {
  background: transparent;
  box-shadow: none;
}

.header--transparent.header--scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

/* Variações de cor para diferentes seções */
.header--dark {
  --header-bg: #1a1a1a;
  --nav-link-color: #ffffff;
}
```

## Interface de Programação (API)

### Classe HeaderComponent

```javascript
// Instanciação
const header = new HeaderComponent();

// Métodos de Controle
header.openMobileMenu();           // Abre menu mobile
header.closeMobileMenu();          // Fecha menu mobile  
header.toggleMobileMenu();         // Alterna estado do menu
header.isMobileMenuOpen();         // Retorna boolean do estado
header.destroy();                  // Remove listeners e limpa memória

// Propriedades de Estado
header.mobileMenu                  // Elemento DOM do menu
header.overlay                     // Elemento DOM do overlay
header.mobileBtn                   // Elemento DOM do botão
```

### Classe HeaderTemplate

```javascript
// Configuração personalizada
const template = new HeaderTemplate({
  logoPath: '/assets/custom/',
  logoUff: 'custom-logo-1.svg',
  logoIsma: 'custom-logo-2.svg',
  logoAlt: {
    uff: 'Logotipo Personalizado 1',
    isma: 'Logotipo Personalizado 2'
  },
  navigationItems: [
    { 
      href: '/dashboard', 
      text: 'Dashboard', 
      icon: 'fas fa-tachometer-alt',
      isSpecial: false 
    },
    {
      href: '/admin',
      text: 'Administração',
      icon: 'fas fa-cog',
      isSpecial: true
    }
  ]
});

// Geração do markup
const htmlOutput = template.generate();
```

## Comportamento Responsivo

### Breakpoints Implementados

| Resolução | Comportamento |
|-----------|---------------|
| > 768px | Menu horizontal completo com todos os itens visíveis |
| ≤ 768px | Menu hamburger com painel deslizante lateral |
| ≤ 480px | Menu fullscreen para melhor usabilidade touch |

### Características Mobile

- **Animação de Entrada:** Deslizamento suave da direita para esquerda
- **Overlay Inteligente:** Backdrop blur com fechamento por toque
- **Gestão de Foco:** Navegação sequencial por teclado
- **Scroll Lock:** Prevenção de scroll do body durante navegação
- **Escape Key:** Fechamento via tecla ESC
- **Touch Gestures:** Suporte a gestos de deslizar para fechar

## Padrões de Acessibilidade

### Conformidade WCAG 2.1

**Estrutura Semântica:**
```html
<header role="banner">
  <nav role="navigation" aria-label="Menu principal">
    <ul>
      <li>
        <a href="/" aria-current="page">Início</a>
      </li>
    </ul>
  </nav>
</header>
```

**Atributos ARIA Implementados:**
- `aria-expanded`: Estado do menu mobile
- `aria-hidden`: Visibilidade para leitores de tela  
- `aria-label`: Descrições contextuais
- `aria-current`: Indicação de página ativa
- `role`: Definição de papéis semânticos

**Navegação por Teclado:**
- Tab: Navegação sequencial entre elementos
- Enter/Space: Ativação de botões e links
- Escape: Fechamento de menus abertos
- Arrow Keys: Navegação dentro de menus

### Suporte a Tecnologias Assistivas

```css
/* Texto para leitores de tela */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Estados de foco visíveis */
.header__nav-link:focus,
.header__mobile-btn:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* Redução de movimento para usuários sensíveis */
@media (prefers-reduced-motion: reduce) {
  .header__nav-mobile,
  .header__overlay {
    transition: none;
  }
}
```

## Configurações Avançadas

### Controle de Inicialização

```javascript
// Desabilitar inicialização automática
window.DISABLE_HEADER_AUTO_INIT = true;

// Configuração manual com parâmetros
const header = new HeaderComponent({
  autoClose: true,
  closeOnEscape: true,
  closeOnOverlay: true,
  focusManagement: true
});
```

### Eventos Customizados

```javascript
// Escutar eventos do sistema
document.addEventListener('header:menuOpened', function(event) {
  console.log('Menu mobile foi aberto');
  // Lógica personalizada
});

document.addEventListener('header:menuClosed', function(event) {
  console.log('Menu mobile foi fechado');
  // Lógica personalizada
});

// Disparar eventos personalizados
const customEvent = new CustomEvent('header:navigationChanged', {
  detail: { currentPage: '/sobre' }
});
document.dispatchEvent(customEvent);
```

### Múltiplas Instâncias

```javascript
// Para sistemas com múltiplos headers
const primaryHeader = new HeaderComponent();
const secondaryHeader = new HeaderComponent();

// Limpeza adequada de memória
function cleanup() {
  primaryHeader.destroy();
  secondaryHeader.destroy();
}

// Executar ao sair da página
window.addEventListener('beforeunload', cleanup);
```

## Otimização de Performance

### Técnicas Implementadas

**CSS:**
```css
/* Otimização de animações */
.header__nav-mobile {
  will-change: transform;
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Contenção de layout */
.header {
  contain: layout style;
}

/* Lazy loading de backgrounds */
.header__overlay {
  background: var(--mobile-overlay-bg);
  content-visibility: auto;
}
```

**JavaScript:**
```javascript
// Debounce para eventos de resize
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Aplicação no redimensionamento
window.addEventListener('resize', debounce(handleResize, 100));
```

## Resolução de Problemas

### Problemas Comuns e Soluções

**Menu mobile não responsivo:**
```javascript
// Verificar inicialização
if (!window.headerComponent) {
  window.headerComponent = new HeaderComponent();
}

// Verificar elementos DOM
const requiredElements = ['.header__mobile-btn', '.header__nav-mobile', '.header__overlay'];
requiredElements.forEach(selector => {
  if (!document.querySelector(selector)) {
    console.error(`Elemento obrigatório não encontrado: ${selector}`);
  }
});
```

**Conflitos de CSS:**
```css
/* Especificidade adequada */
.header .header__nav-link {
  /* Estilos específicos */
}

/* Reset de estilos conflitantes */
.header * {
  box-sizing: border-box;
}
```

**Performance em dispositivos mobile:**
```css
/* Otimização para touch devices */
@media (hover: none) and (pointer: coarse) {
  .header__nav-link:hover {
    /* Remover efeitos hover desnecessários */
  }
}
```

### Debug e Monitoramento

```javascript
// Modo debug habilitado
const DEBUG_MODE = true;

if (DEBUG_MODE) {
  console.log('Header Component Debug Mode Enabled');
  
  // Log de eventos
  document.addEventListener('header:menuOpened', () => {
    console.log('Debug: Menu opened at', new Date().toISOString());
  });
}

// Métricas de performance
function measureHeaderPerformance() {
  const start = performance.now();
  new HeaderComponent();
  const end = performance.now();
  console.log(`Header initialization: ${end - start}ms`);
}
```

## Dependências e Compatibilidade

### Dependências Externas
- **Font Awesome 6.0+:** Iconografia (opcional, pode ser substituído)
- **CSS Custom Properties:** Suporte IE11+ (com polyfill)
- **ES6 Classes:** Navegadores modernos (transpilação disponível)

### Compatibilidade de Navegadores

| Navegador | Versão Mínima | Observações |
|-----------|---------------|-------------|
| Chrome | 60+ | Suporte completo |
| Firefox | 60+ | Suporte completo |
| Safari | 12+ | Vendor prefixes necessários |
| Edge | 79+ | Chromium-based |
| IE | 11 | Requer polyfills |

### Polyfills Necessários para IE11

```javascript
// Custom Properties polyfill
if (!window.CSS || !CSS.supports('color', 'var(--fake-var)')) {
  // Carregar polyfill
}

// ES6 Classes polyfill
if (typeof window.HeaderComponent === 'undefined') {
  // Carregar transpiled version
}
```

## Controle de Versão

### Histórico de Versões

**v1.0.0** - Implementação inicial
- Sistema básico de navegação
- Responsividade mobile
- Acessibilidade WCAG 2.1

**v1.1.0** - Melhorias de performance
- Otimização de animações
- Redução de bundle size
- Cache de elementos DOM

**v1.2.0** - Funcionalidades avançadas
- Múltiplas instâncias
- Eventos customizados
- API expandida

**v1.3.0** - Sistema de componentes completo
- Menu hamburger animado
- Melhor suporte a touch
- Debug tools integradas

**v2.0.0** - Versão atual (Sistema Modular Completo)
- Footer Component com configuração flexível
- Hero Component para seções padronizadas
- SEO Meta Component para otimização automatizada
- WhatsApp Button Component com múltiplos tipos
- Common Scripts Component para funcionalidades básicas
- Sistema unificado UFFComponents para gerenciamento
- Redução de ~60% no código duplicado
- Manutenção centralizada e consistência garantida

---

**Projeto:** UFF - Academia de Artes Marciais Blumenau  
**Tecnologias:** HTML5, CSS3, JavaScript ES6+  
**Licença:** Uso interno da academia  
**Manutenção:** Sistema de versionamento semântico 