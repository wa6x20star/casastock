# CasaStock V0.1

MVP mobile-first para estoque doméstico, construído com Next.js, TypeScript e Supabase.

## Rodar localmente

1. Copie `.env.example` para `.env.local` e preencha a URL e a chave publicável do projeto Supabase.
2. Crie um projeto Supabase e aplique `supabase/migrations/202609280001_initial_schema.sql` pelo SQL Editor ou `supabase db push`.
3. Em **Authentication > URL Configuration**, inclua `http://localhost:3000/auth/callback` (e a URL da Vercel em produção) como redirect URL.
4. Execute `npm install` e `npm run dev`.

## Fluxo entregue

Conta → casa → produto local → compra (mercado, data e preço) → saldo atualizado → consumo → painel com gasto mensal.

As compras e consumos usam funções transacionais no banco. `product_catalog` é independente de `household_products`, deixando o catálogo comunitário separado do estoque privado. A migração também cria estruturas de listas inteligentes e CasaCoin (wallet e transações), sem qualquer fluxo de saque.

## Publicar na Vercel

Importe esta pasta na Vercel e configure `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` nas variáveis de ambiente. Defina também `NEXT_PUBLIC_SITE_URL` com a URL final da aplicação para os e-mails de confirmação.
