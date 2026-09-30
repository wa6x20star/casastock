import Link from "next/link";
import { getHousehold } from "../data";

export default async function ListaInteligente(){
  const {s,id}=await getHousehold();
  const {data:items}=await s.from("household_products").select("id,name,unit,current_quantity,minimum_quantity,ideal_quantity").eq("household_id",id).order("name");
  const suggestions=(items??[]).filter(item=>Number(item.minimum_quantity)>0&&Number(item.current_quantity)<=Number(item.minimum_quantity)).map(item=>({
    ...item,
    suggestedQuantity:Math.max(Number(item.ideal_quantity??item.minimum_quantity)-Number(item.current_quantity),1),
  }));

  return <>
    <p className="eyebrow">Preparada para evoluir</p>
    <h1>Lista inteligente</h1>
    <p className="muted">Sugestões baseadas no estoque mínimo definido para cada produto.</p>
    {suggestions.length?<section className="card"><h2>Prioridade de reposição</h2><ul className="suggestion-list">{suggestions.map(item=><li key={item.id}><div><b>{item.name}</b><span className="muted">Saldo: {item.current_quantity} {item.unit} · mínimo: {item.minimum_quantity} {item.unit}{item.ideal_quantity&&<> · ideal: {item.ideal_quantity} {item.unit}</>}</span></div><strong>Comprar {item.suggestedQuantity} {item.unit}</strong></li>)}</ul></section>:<section className="empty card"><b>Sua casa está abastecida.</b><br/>Cadastre um estoque mínimo nos produtos para receber recomendações automáticas.</section>}
    <p className="notice">Na próxima etapa, esta tela poderá combinar consumo médio e histórico de preços para sugerir a melhor hora e quantidade de compra.</p>
    <Link className="button" href="/produtos">Ajustar estoque mínimo</Link>
  </>;
}
