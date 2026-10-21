# Changelog

Todas as mudanças relevantes do projeto **petalmzde**.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/);
versionamento inspirado em [SemVer](https://semver.org/lang/pt-BR/).

## [0.8.0] - 2026-10-20
### Adicionado
- **Backend com Supabase**: catálogo de buquês e itens do "Monte seu Buquê" agora vêm do banco de dados.
- **Painel administrativo** em `/admin` (rota não linkada no site) com login por e-mail/senha.
- Gestão pela tela, sem commits: criar, editar, excluir e ativar/desativar buquês e itens.
- **Upload de imagens** direto pela tela (Supabase Storage).
- Campo de **promoção em %** com cálculo do preço final em tempo real.
- Storage e tabelas migrados com os dados existentes.
### Segurança
- RLS (Row Level Security): leitura pública, escrita restrita a administradores.
- Lista de administradores (`public.admins`) — criar conta não concede acesso de escrita.

## [0.7.0] - 2026-10-19
### Adicionado
- Novos buquês: Lírios Azuis, Homem Aranha Pelúcia, Snoopy, Rosas Vermelhas.
- Novos itens do Monte seu Buquê: Girassol (Tamanho G), Snoopy 10cm, Chaveiro com Foto.
### Alterado
- Atualização de preços do catálogo.
- Padronização da altura dos cards de produto (proporção uniforme).

## [0.6.0] - 2026-08-03
### Adicionado
- **Preços e promoções** nos cards, com valor riscado e selo de desconto.
- **Seleção de cor das flores** no Monte seu Buquê (paleta por item), incluída no pedido.
- Buquê Zoro One Piece ao catálogo.
### Alterado
- Cards sem moldura, com mais destaque para a imagem.
- Aba de catálogo renomeada para "Buquês".
- Botões de redes sociais ocultados do topo (hero) e altura ajustada.

## [0.5.0] - 2026-06-20
### Adicionado
- Preview de compartilhamento (Open Graph) com a logo e dimensões definidas.
- Favicon da logo.

## [0.4.0] - 2026-06-20
### Adicionado
- **Monte seu Buquê**: montagem personalizada com flores e adicionais, contadores
  e resumo do pedido enviado via WhatsApp.

## [0.3.0] - 2026-06-07
### Adicionado
- Botão do TikTok nas redes sociais.
### Corrigido
- Ajustes no rodapé: remoção de duplicidade da Shopee e organização dos links/contatos.
- Pontuação do copyright.

## [0.2.0] - 2026-06-06
### Alterado
- Identidade visual: cabeçalho branco, título em minúsculas, slogan único,
  logo sem texto, rodapé com melhor contraste.
- Título, meta tags e textos das páginas.

## [0.1.0] - 2026-06-06
### Adicionado
- Página inicial (hero, produtos em destaque, redes sociais).
- Página de produtos com grid completo e orçamento via WhatsApp.
- Roteamento (home e produtos) e deploy na Vercel (SPA via `vercel.json`).

## [0.0.1] - 2026-06-06
### Adicionado
- Estrutura inicial do projeto: React + Vite, ESLint, estilos base.
- Paleta de cores roxa/lavanda baseada na logo.
- Logo, imagens dos produtos e catálogo inicial.
