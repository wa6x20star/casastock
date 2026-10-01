"use client";

import { useState } from "react";
import { recordBulkPurchase } from "@/app/(app)/actions";

type Product = { id: string; name: string; unit: string };
type PurchaseRow = { key: number; productId: string; quantity: string; unitPrice: string };

function createRow(products: Product[], key: number): PurchaseRow {
  return { key, productId: products[0]?.id ?? "", quantity: "", unitPrice: "" };
}

export function BulkPurchaseForm({ products }: { products: Product[] }) {
  const [nextKey, setNextKey] = useState(1);
  const [rows, setRows] = useState<PurchaseRow[]>(() => [createRow(products, 0)]);

  function updateRow(key: number, field: "productId" | "quantity" | "unitPrice", value: string) {
    setRows((current) => current.map((row) => row.key === key ? { ...row, [field]: value } : row));
  }

  function addRow() {
    setRows((current) => [...current, createRow(products, nextKey)]);
    setNextKey((current) => current + 1);
  }

  function removeRow(key: number) {
    setRows((current) => current.length === 1 ? current : current.filter((row) => row.key !== key));
  }

  return <form action={recordBulkPurchase} className="card bulk-purchase-card">
    <div className="stock-action-heading"><span className="section-icon"><span aria-hidden="true">▦</span></span><div><h2>Adicionar feira</h2><p>Registre vários itens da mesma compra de uma só vez.</p></div></div>
    <div className="bulk-rows">
      {rows.map((row, index) => <div className="bulk-row" key={row.key}>
        <span className="bulk-row-number">{index + 1}</span>
        <label>Produto<select name="product_id" value={row.productId} onChange={(event) => updateRow(row.key, "productId", event.target.value)} required>{products.map((product) => <option key={product.id} value={product.id}>{product.name} ({product.unit})</option>)}</select></label>
        <label>Quantidade<input name="quantity" type="number" min="0.01" step="0.01" value={row.quantity} onChange={(event) => updateRow(row.key, "quantity", event.target.value)} required /></label>
        <label>Preço unitário<input name="unit_price" type="number" min="0.01" step="0.01" value={row.unitPrice} onChange={(event) => updateRow(row.key, "unitPrice", event.target.value)} required /></label>
        <button className="remove-row" type="button" onClick={() => removeRow(row.key)} disabled={rows.length === 1} aria-label={`Remover item ${index + 1}`}>×</button>
      </div>)}
    </div>
    <div className="bulk-footer">
      <button className="outline-button" type="button" onClick={addRow}>+ Adicionar item</button>
      <div className="bulk-meta"><label>Mercado<input name="market" placeholder="Ex.: Feira de sábado" required /></label><label>Data<input name="purchased_on" type="date" defaultValue={new Date().toISOString().slice(0, 10)} required /></label></div>
      <button type="submit">Salvar feira e atualizar estoque</button>
    </div>
  </form>;
}
