import { addProduct, consume, recordPurchase } from "../actions";
import { getHousehold } from "../data";
import { BulkPurchaseForm } from "@/components/bulk-purchase-form";

type PageProps = { searchParams: Promise<{ erro?: string }> };

export default async function Estoque({ searchParams }: PageProps) {
  const [{ erro }, { s, id }] = await Promise.all([searchParams, getHousehold()]);
  const { data: items } = await s.from("household_products").select("id,name,brand,category,current_quantity,unit,minimum_quantity,ideal_quantity").eq("household_id", id).order("name");
  const products = items ?? [];
  const availableProducts = products.filter((product) => Number(product.current_quantity) > 0);

  return <div className="stock-page">
    <div className="page-heading">
      <div><span className="eyebrow">Organização da casa</span><h1>Estoque</h1><p>Cadastre produtos, registre compras e dê baixa no que foi consumido.</p></div>
      <a className="outline-button" href="#saldo">Ver saldo atual ↓</a>
    </div>

    {erro && <p className="notice danger" role="alert">{erro}</p>}

    <section className="stock-actions" aria-label="Ações do estoque">
      <form action={addProduct} className="card stock-action-card">
        <div className="stock-action-heading"><span className="section-icon"><span aria-hidden="true">+</span></span><div><h2>Cadastrar produto</h2><p>Adicione um item à sua casa.</p></div></div>
        <label>Nome do produto<input name="name" placeholder="Feijão carioca 1 kg" required /></label>
        <div className="two-cols"><label>Marca<input name="brand" placeholder="Opcional" /></label><label>Categoria<input name="category" placeholder="Mercearia" /></label></div>
        <div className="two-cols"><label>Unidade<select name="unit" defaultValue="un"><option value="un">unidade</option><option value="kg">kg</option><option value="L">litro</option></select></label><label>Estoque mínimo<input name="minimum_quantity" type="number" min="0" step="0.01" defaultValue="0" /></label></div>
        <label>Estoque ideal<input name="ideal_quantity" type="number" min="0" step="0.01" placeholder="Opcional" /></label>
        <button>Cadastrar produto</button>
      </form>

      <form action={recordPurchase} className="card stock-action-card">
        <div className="stock-action-heading"><span className="section-icon"><span aria-hidden="true">↓</span></span><div><h2>Registrar compra</h2><p>A entrada aumenta seu saldo.</p></div></div>
        {products.length ? <>
          <label>Produto<select name="product_id">{products.map((product) => <option key={product.id} value={product.id}>{product.name} ({product.unit})</option>)}</select></label>
          <div className="two-cols"><label>Quantidade<input name="quantity" type="number" min="0.01" step="0.01" required /></label><label>Preço unitário<input name="unit_price" type="number" min="0.01" step="0.01" required /></label></div>
          <label>Mercado<input name="market" placeholder="Ex.: Mercado Central" required /></label>
          <label>Data da compra<input name="purchased_on" type="date" defaultValue={new Date().toISOString().slice(0, 10)} required /></label>
          <button>Salvar compra</button>
        </> : <p className="notice">Cadastre um produto primeiro para registrar uma compra.</p>}
      </form>

      <form action={consume} className="card stock-action-card">
        <div className="stock-action-heading"><span className="section-icon"><span aria-hidden="true">↑</span></span><div><h2>Registrar consumo</h2><p>A saída reduz seu saldo.</p></div></div>
        {availableProducts.length ? <>
          <label>Produto<select name="product_id">{availableProducts.map((product) => <option key={product.id} value={product.id}>{product.name} — saldo: {product.current_quantity} {product.unit}</option>)}</select></label>
          <label>Quantidade usada<input name="quantity" type="number" min="0.01" step="0.01" required /></label>
          <label>Data<input name="occurred_on" type="date" defaultValue={new Date().toISOString().slice(0, 10)} required /></label>
          <button>Dar baixa no estoque</button>
        </> : <p className="notice">Não há itens com saldo disponível para consumo.</p>}
      </form>
    </section>

    {products.length > 0 && <BulkPurchaseForm products={products.map((product) => ({ id: product.id, name: product.name, unit: product.unit }))} />}

    <section className="section-card inventory-panel" id="saldo">
      <div className="section-heading"><div><span className="section-icon">□</span><span><h2>Saldo atual</h2><p>Veja o que você tem e identifique o que precisa ser reposto.</p></span></div><a className="text-link" href="/lista">Ver lista de reposição →</a></div>
      {products.length ? <div className="inventory-table"><div className="inventory-header"><span>Produto</span><span>Quantidade atual</span><span>Mínimo</span><span>Ideal</span><span>Situação</span></div>{products.map((product, index) => { const quantity = Number(product.current_quantity); const minimum = Number(product.minimum_quantity); const state = quantity === 0 ? "alert" : quantity <= minimum ? "warning" : "ok"; const label = state === "alert" ? "Repor" : state === "warning" ? "Baixo" : "OK"; return <div className="inventory-row" key={product.id}><div className="product-name"><span className={`product-thumb thumb-${index % 3 === 0 ? "red" : index % 3 === 1 ? "gold" : "green"}`}>▦</span><span><b>{product.name}</b><small>{[product.brand, product.category].filter(Boolean).join(" · ") || "Produto doméstico"}</small></span></div><strong>{product.current_quantity} <small>{product.unit}</small></strong><span>{product.minimum_quantity} {product.unit}</span><span>{product.ideal_quantity ?? "—"}{product.ideal_quantity ? ` ${product.unit}` : ""}</span><span className={`status ${state}`}><i /> {label}</span></div>; })}</div> : <p className="empty card">Nenhum produto cadastrado. Comece adicionando o primeiro item acima.</p>}
    </section>
  </div>;
}
