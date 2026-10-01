import Link from "next/link";

const steps = [
  ["01", "Registrar", "Adicione os produtos que realmente fazem parte da sua rotina."],
  ["02", "Acompanhar", "Registre compras e consumos para manter o saldo sempre atual."],
  ["03", "Repor melhor", "Receba uma lista simples com o que está acabando."],
];

export default function Home() {
  return <main className="landing-page">
    <nav className="public-nav" aria-label="Navegação principal">
      <Link className="public-brand" href="/"><span className="logo-mark">⌂</span><span>CasaStock</span></Link>
      <div className="public-links"><a href="#como-funciona">Como funciona</a><a href="#recursos">Funcionalidades</a><a href="#visao">Nossa visão</a></div>
      <div className="public-actions"><Link className="ghost-button" href="/entrar">Entrar</Link><Link className="button" href="/cadastro">Criar conta</Link></div>
    </nav>

    <section className="hero-section">
      <div className="hero-copy"><span className="eyebrow pill">MVP · estoque doméstico inteligente</span><h1>Seu estoque.<br/><em>Seu consumo.</em><br/>Suas compras mais inteligentes.</h1><p className="lead">O CasaStock ajuda você a organizar o que tem em casa, entender seu consumo e saber exatamente o que comprar.</p><div className="actions"><Link className="button button-large" href="/cadastro">Começar agora <span>→</span></Link><a className="text-link" href="#como-funciona"><span className="play-icon">▶</span> Ver como funciona</a></div><div className="trust-row"><span>✓ Sem planilhas complicadas</span><span>✓ Feito para a rotina real</span></div></div>
      <div className="hero-dashboard" aria-label="Prévia do painel CasaStock"><div className="mock-window"><div className="mock-window-bar"><span className="window-dot red"/><span className="window-dot yellow"/><span className="window-dot green"/><span className="mock-title">Minha casa · CasaStock</span></div><div className="mock-body"><div className="mock-sidebar"><span className="mock-logo">⌂</span><b>Estoque</b><span>Produtos</span><span>Consumo</span><span>Gastos</span><span>Lista</span></div><div className="mock-main"><span className="mock-kicker">VISÃO DA CASA</span><h2>Estoque</h2><p>Veja o que está em casa e o que precisa repor.</p><div className="mock-metrics"><div><small>Gasto do mês</small><b>R$ 217,50</b></div><div><small>Produtos</small><b>24</b></div><div><small>Repor</small><b className="orange-text">5 itens</b></div></div><div className="mock-list"><div><span className="product-thumb thumb-red">▦</span><span><b>Feijão carioca 1kg</b><small>Alimentos · 2 pacotes</small></span><strong className="status ok">OK</strong></div><div><span className="product-thumb thumb-gold">▦</span><span><b>Arroz branco 5kg</b><small>Alimentos · 1 pacote</small></span><strong className="status warning">Baixo</strong></div><div><span className="product-thumb thumb-green">▦</span><span><b>Macarrão 500g</b><small>Alimentos · 0 pacotes</small></span><strong className="status alert">Repor</strong></div></div></div></div></div></div>
    </section>

    <section className="steps-section" id="como-funciona"><div className="section-intro"><span className="eyebrow">Um ciclo simples</span><h2>Mais controle para o seu dia a dia.</h2><p>Cada registro ajuda sua casa a tomar decisões melhores, uma compra de cada vez.</p></div><div className="steps-grid">{steps.map(([number,title,description])=><article className="step-card" key={number}><span className="step-number">{number}</span><span className="step-icon">{number === "01" ? "□" : number === "02" ? "↕" : "☷"}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>

    <section className="feature-band" id="recursos"><div><span className="eyebrow">Inteligência a partir da sua rotina</span><h2>O essencial para uma casa mais organizada.</h2><p>Comece simples. O histórico cresce junto com você e prepara o caminho para recomendações cada vez melhores.</p></div><div className="feature-cards"><article><span className="feature-icon">□</span><h3>Estoque real</h3><p>Saldo atualizado com compras e consumo.</p></article><article><span className="feature-icon">▥</span><h3>Gastos claros</h3><p>Veja onde seu dinheiro está indo.</p></article><article><span className="feature-icon">♧</span><h3>Lista inteligente</h3><p>Reponha na medida certa.</p></article></div></section>

    <section className="closing-section" id="visao"><span className="eyebrow pill">CasaStock</span><h2>Mais organização hoje.<br/><em>Mais tranquilidade amanhã.</em></h2><p>Seu estoque pessoal é o primeiro passo para consumir melhor e comprar com mais consciência.</p><Link className="button button-large" href="/cadastro">Criar minha casa <span>→</span></Link></section>
    <footer className="public-footer"><span>© 2026 CasaStock</span><span>Estoque doméstico inteligente</span></footer>
  </main>;
}
