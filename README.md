# UFF - Underground Fight and Fitness - Academia de Artes Marciais Blumenau

Site institucional oficial da academia UFF - Underground Fight and Fitness, credenciada pela ISMA Wyng Tjun e localizada em Blumenau, Santa Catarina. Este projeto apresenta uma solução web completa para divulgação e gestão de informações da academia de artes marciais.

## Visão Geral

O sistema foi desenvolvido com foco em responsividade, acessibilidade e performance, utilizando tecnologias web modernas para criar uma experiência consistente em todos os dispositivos. A arquitetura modular permite fácil manutenção e escalabilidade.

## Estrutura do Projeto

```
Defesa Pessoal Blumenau/
├── area-estudantes/           # Área restrita para alunos matriculados
│   ├── index.html            # Sistema de autenticação
│   ├── dashboard.html        # Painel principal do aluno
│   ├── caminho-estudante.html # Progressão básica e intermediária
│   └── caminho-mestre.html   # Progressão avançada e instrutor
├── assets/                   # Recursos estáticos
│   ├── capa-home.jpg        # Imagem principal da página inicial
│   ├── favicon.png          # Ícone do site
│   ├── logo-isma-site.png   # Logotipo ISMA Wyng Tjun
│   ├── logo-uff.jpg         # Logotipo UFF Blumenau
│   └── Video ISMA.mp4       # Conteúdo audiovisual institucional
├── components/               # Componentes reutilizáveis
│   ├── header.html          # Template do cabeçalho
│   └── README.md            # Documentação dos componentes
├── css/                     # Folhas de estilo
│   ├── main.css            # Estilos principais
│   ├── header.css          # Estilos do cabeçalho
│   ├── global.css          # Variáveis e reset CSS
│   ├── components.css      # Estilos de componentes
│   ├── responsive.css      # Media queries
│   └── index.css          # Estilos específicos da homepage
├── js/                     # Scripts JavaScript
│   ├── header.js          # Funcionalidade do cabeçalho
│   └── header-config.js   # Configurações do header
├── index.html             # Página inicial
├── sobre.html             # Informações institucionais
├── modalidades.html       # Descrição das artes marciais oferecidas
├── horarios.html          # Grade de horários e preços
├── contato.html           # Informações de contato e localização
├── politica-privacidade.html # Política de privacidade LGPD
├── termos-uso.html        # Termos de uso do site
├── robots.txt             # Diretrizes para crawlers
├── sitemap.xml            # Mapa do site para SEO
└── vercel.json            # Configuração de deploy
```

## Características Técnicas

### Frontend
- HTML5 semântico com microdata estruturados
- CSS3 com Custom Properties e Grid Layout
- JavaScript ES6+ com módulos e classes
- Font Awesome 6.0 para iconografia
- Google Fonts para tipografia personalizada

### Responsividade
- Design mobile-first com breakpoints otimizados
- Suporte completo para dispositivos de 320px a 2560px
- Imagens responsivas com lazy loading
- Menu adaptativo com animações fluidas

### Acessibilidade
- Conformidade com WCAG 2.1 AA
- Navegação por teclado completa
- Suporte a leitores de tela
- Contraste de cores otimizado
- ARIA labels e landmarks semânticos

### Performance
- Carregamento assíncrono de recursos
- Otimização de imagens e compressão
- Minificação de CSS e JavaScript
- Lazy loading para conteúdo multimídia

## Funcionalidades Implementadas

### Sistema de Navegação
- Cabeçalho fixo responsivo
- Menu hamburger animado para mobile
- Breadcrumbs contextuais
- Navegação por âncoras internas

### Área do Estudante
- Sistema de autenticação baseado em sessão
- Dashboard personalizado por nível
- Acompanhamento de progressão técnica
- Conteúdo exclusivo por graduação

### Integração com WhatsApp
- Botão flutuante com deep linking
- Mensagens pré-formatadas por contexto
- Integração com horários de atendimento

### SEO e Marketing
- Meta tags otimizadas para cada página
- Open Graph para redes sociais
- Schema.org para rich snippets
- Sitemap XML automatizado

## Configuração do Ambiente

### Requisitos Mínimos
- Servidor web com suporte a arquivos estáticos
- Certificado SSL válido (recomendado)
- Suporte a compressão GZIP

### Deploy Local
```bash
# Clonar o repositório
git clone [repository-url]

# Navegar para o diretório
cd "Defesa Pessoal Blumenau"

# Servir arquivos localmente
python -m http.server 8000
# ou
npx live-server
```

### Deploy em Produção
O projeto está configurado para deploy automático na Vercel:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ]
}
```

## Segurança

### Área do Estudante
- Autenticação baseada em sessionStorage
- Timeout automático de sessão (8 horas)
- Proteção contra acesso direto via URL
- Validação client-side e server-side

### Conformidade LGPD
- Política de privacidade detalhada
- Consentimento explícito para cookies
- Minimização de dados coletados
- Direitos do titular implementados

## Manutenção e Suporte

### Atualizações de Conteúdo
1. Editar arquivos HTML correspondentes
2. Atualizar informações em `contato.html` para mudanças organizacionais
3. Modificar `horarios.html` para ajustes de cronograma
4. Revisar `sitemap.xml` após adicionar novas páginas

### Backup e Versionamento
- Controle de versão via Git
- Backup automático dos assets no repositório
- Versionamento semântico para releases

## Monitoramento

### Analytics
- Google Analytics 4 configurado
- Métricas de performance via Lighthouse
- Monitoramento de uptime e disponibilidade

### SEO
- Posicionamento orgânico acompanhado
- Core Web Vitals otimizados
- Indexação verificada via Search Console

## Contato Técnico

Para questões relacionadas ao desenvolvimento e manutenção do sistema:

**Academia UFF Blumenau**
- Responsável: Sifu Angel Samaniego
- WhatsApp: (47) 99977-6320
- Instagram: @sifu_angel_samaniego
- Academia: @uffbnu

**Especificações Técnicas**
- Linguagens: HTML5, CSS3, JavaScript ES6+
- Frameworks: Vanilla JS (sem dependências externas)
- Hospedagem: Vercel (CDN global)
- Domínio: Configuração pendente

---

Documentação técnica atualizada em: 2024
Versão do sistema: 1.0.0
Compatibilidade: Navegadores modernos (Chrome 60+, Firefox 60+, Safari 12+, Edge 79+)
