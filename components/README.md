# 🎯 Componentes de Cabeçalho Modular

Sistema modular e reutilizável para cabeçalho responsivo usando HTML5, CSS3 e JavaScript puro (Vanilla JS).

## 📁 Estrutura de Arquivos

```
├── css/
│   └── header.css          # Estilos do componente
├── js/
│   └── header.js           # Funcionalidade JavaScript  
├── components/
│   ├── header.html         # Exemplo de uso
│   └── README.md           # Esta documentação
└── assets/
    ├── logo-uff.jpg
    └── logo-isma-site.png
```

## 🚀 Como Usar

### Método 1: HTML Estático (Recomendado para páginas simples)

1. **Inclua os arquivos CSS e JS:**
```html
<link rel="stylesheet" href="/css/header.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
<script src="/js/header.js"></script>
```

2. **Copie o HTML do cabeçalho:**
```html
<header class="header" id="header-principal">
  <div class="header__container">
    <!-- Logo -->
    <a href="/" class="header__logo" aria-label="Página inicial">
      <img src="/assets/logo-uff.jpg" alt="Logo UFF Blumenau" class="header__logo-img">
      <img src="/assets/logo-isma-site.png" alt="ISMA Wyng Tjun Logo" class="header__logo-img">
    </a>

    <!-- Navegação Desktop -->
    <nav class="header__nav-desktop" role="navigation" aria-label="Menu principal">
      <ul class="header__nav-desktop">
        <li class="header__nav-item">
          <a href="/" class="header__nav-link">
            <i class="fas fa-home"></i> Início
          </a>
        </li>
        <!-- Adicione mais itens aqui -->
      </ul>
    </nav>

    <!-- Botão Mobile -->
    <button class="header__mobile-btn" aria-label="Abrir menu de navegação">
      <i class="fas fa-bars header__mobile-btn-icon"></i>
    </button>
  </div>

  <!-- Menu Mobile -->
  <nav class="header__nav-mobile" role="navigation" aria-label="Menu mobile">
    <!-- Conteúdo do menu mobile -->
  </nav>

  <!-- Overlay -->
  <div class="header__overlay"></div>
</header>
```

### Método 2: JavaScript Programático (Recomendado para SPAs)

```javascript
// 1. Criar template customizado
const headerTemplate = new HeaderTemplate({
  logoPath: '/assets/',
  logoUff: 'logo-uff.jpg',
  logoIsma: 'logo-isma-site.png',
  navigationItems: [
    { href: '/', text: 'Início', icon: 'fas fa-home' },
    { href: '/sobre', text: 'Sobre', icon: 'fas fa-info-circle' },
    { href: '/contato', text: 'Contato', icon: 'fas fa-envelope' },
    { 
      href: '/area-estudantes', 
      text: 'Área Aluno', 
      icon: 'fas fa-graduation-cap',
      isSpecial: true 
    }
  ]
});

// 2. Gerar HTML
const headerHTML = headerTemplate.generate();

// 3. Inserir no DOM
document.body.insertAdjacentHTML('afterbegin', headerHTML);

// 4. Inicializar funcionalidade
const headerComponent = new HeaderComponent();
```

## 🎨 Customização CSS

### Variáveis CSS Disponíveis

```css
:root {
  /* Layout */
  --header-height: 80px;
  --header-bg: var(--white);
  --header-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  
  /* Navegação */
  --nav-gap: 2rem;
  --nav-link-padding: 0.5rem 1rem;
  --nav-link-border-radius: 6px;
  
  /* Logo */
  --logo-height: 50px;
  --logo-gap: 1rem;
  
  /* Mobile */
  --mobile-menu-width: 280px;
  --mobile-btn-size: 40px;
  --mobile-overlay-bg: rgba(0, 0, 0, 0.5);
}
```

### Exemplo de Customização

```css
/* Mudar cores do tema */
:root {
  --header-bg: #f8f9fa;
  --nav-gap: 1.5rem;
  --logo-height: 60px;
}

/* Header com fundo transparente */
.header--transparent {
  background: transparent;
  box-shadow: none;
}

/* Animação personalizada no scroll */
.header--scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}
```

## ⚙️ API JavaScript

### Classe `HeaderComponent`

```javascript
const header = new HeaderComponent();

// Métodos públicos
header.openMobileMenu();      // Abre menu mobile
header.closeMobileMenu();     // Fecha menu mobile
header.toggleMobileMenu();    // Alterna menu mobile
header.isMobileMenuOpen();    // Verifica se está aberto
header.destroy();             // Remove event listeners
```

### Classe `HeaderTemplate`

```javascript
const template = new HeaderTemplate({
  logoPath: '/assets/',
  logoUff: 'custom-logo.png',
  logoIsma: 'custom-logo-2.png',
  logoAlt: {
    uff: 'Logo personalizado 1',
    isma: 'Logo personalizado 2'
  },
  navigationItems: [
    { 
      href: '/custom-page', 
      text: 'Página Customizada', 
      icon: 'fas fa-star',
      isSpecial: false 
    }
  ]
});

const html = template.generate();
```

## 📱 Recursos Responsivos

### Breakpoints

- **Desktop:** `> 768px` - Menu horizontal completo
- **Tablet/Mobile:** `≤ 768px` - Menu hamburger
- **Mobile pequeno:** `≤ 480px` - Menu fullscreen

### Características Mobile

- Menu deslizante da direita
- Overlay com blur
- Botão de fechar
- Scroll bloqueado no body
- Foco automático no primeiro item
- Fechamento com ESC

## ♿ Acessibilidade

### Recursos Incluídos

- **ARIA Labels:** Descrições apropriadas
- **ARIA States:** `aria-expanded`, `aria-hidden`
- **Semântica HTML5:** `<nav>`, `<header>`, landmarks
- **Navegação por teclado:** Tab, Enter, Escape
- **Screen readers:** Textos alternativos e labels
- **Focus management:** Foco visual e lógico
- **Reduced motion:** Suporte para `prefers-reduced-motion`

### Exemplo de Uso para Acessibilidade

```html
<!-- Exemplo de navegação acessível -->
<nav role="navigation" aria-label="Menu principal">
  <ul>
    <li>
      <a href="/" aria-current="page">Início</a>
    </li>
    <li>
      <a href="/sobre">Sobre</a>
    </li>
  </ul>
</nav>
```

## 🔧 Configurações Avançadas

### Auto-inicialização

O componente se inicializa automaticamente quando o DOM estiver pronto:

```javascript
// Desabilitar auto-inicialização
window.DISABLE_HEADER_AUTO_INIT = true;

// Inicializar manualmente
const header = new HeaderComponent();
```

### Múltiplas Instâncias

```javascript
// Para múltiplos cabeçalhos na mesma página
const header1 = new HeaderComponent();
const header2 = new HeaderComponent();

// Limpeza
header1.destroy();
header2.destroy();
```

### Eventos Customizados

```javascript
// Escutar eventos do menu
document.addEventListener('menuOpened', function() {
  console.log('Menu mobile aberto');
});

document.addEventListener('menuClosed', function() {
  console.log('Menu mobile fechado');
});
```

## 🎯 Melhores Práticas

1. **Performance:**
   - Use `cacheDOM()` para evitar consultas repetidas
   - Implemente `removeEventListener` para cleanup
   - Use CSS transforms para animações

2. **Manutenibilidade:**
   - Mantenha CSS modular com BEM
   - Use variáveis CSS para customização
   - Documente configurações personalizadas

3. **Acessibilidade:**
   - Sempre teste com leitores de tela
   - Verifique navegação por teclado
   - Use cores com contraste adequado

4. **Responsividade:**
   - Teste em diferentes dispositivos
   - Use media queries apropriadas
   - Considere orientação portrait/landscape

## 🐛 Troubleshooting

### Problemas Comuns

**Menu mobile não abre:**
- Verifique se o JavaScript foi carregado
- Confirme se as classes CSS estão corretas
- Verifique erros no console

**Estilos não aplicados:**
- Confirme ordem de carregamento do CSS
- Verifique especificidade das regras
- Confirme se as variáveis CSS estão definidas

**Problemas de performance:**
- Use `transform` ao invés de `left/right` para animações
- Implement `will-change` para elementos animados
- Considere `content-visibility` para otimização

## 📦 Dependências

- **Font Awesome 6.0+** (para ícones)
- **CSS Custom Properties** (suporte IE11+)
- **ES6 Classes** (suporte moderno)

## 🔄 Versionamento

- **v1.0.0** - Versão inicial com recursos básicos
- **v1.1.0** - Adicionado suporte a múltiplas instâncias
- **v1.2.0** - Melhorias de acessibilidade e performance

---

**Criado para:** Defesa Pessoal Blumenau  
**Tecnologias:** HTML5, CSS3, JavaScript ES6+  
**Compatibilidade:** Navegadores modernos (IE11+) 