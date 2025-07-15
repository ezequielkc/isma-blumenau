# Deploy na Vercel - URLs Limpas

## Configuração

Este projeto está configurado para funcionar na Vercel com URLs limpas (sem extensão .html).

### Arquivo `vercel.json`

O arquivo `vercel.json` na raiz do projeto contém:

- `"cleanUrls": true` - Remove automaticamente extensões .html
- `"trailingSlash": false` - Remove barras finais das URLs
- `"redirects"` - Configura redirecionamentos para URLs limpas

### URLs Disponíveis

- **Página Inicial**: `/` ou `/index.html`
- **Sobre**: `/sobre`
- **Modalidades**: `/modalidades`
- **Horários**: `/horarios`
- **Contato**: `/contato`
- **Política de Privacidade**: `/politica-privacidade`
- **Termos de Uso**: `/termos-uso`

### Como Fazer o Deploy

1. Conecte seu repositório à Vercel
2. A Vercel detectará automaticamente o arquivo `vercel.json`
3. O deploy será feito com as configurações de URLs limpas

### Benefícios

- URLs mais limpas e profissionais
- Melhor SEO
- Experiência do usuário aprimorada
- Redirecionamentos automáticos funcionam em ambas as direções

### Notas Importantes

- Todos os links internos foram atualizados para usar URLs limpas
- O arquivo `vercel.json` gerencia os redirecionamentos automaticamente
- Funciona tanto com URLs com .html quanto sem 