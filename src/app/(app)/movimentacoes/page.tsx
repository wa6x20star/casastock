import { getHousehold } from "../data";

type Movement={id:string;kind:string;quantity_delta:number|string;occurred_on:string;household_products:{name:string;unit:string}|null};
const labels:Record<string,string>={purchase:"Compra",consumption:"Consumo",adjustment:"Ajuste"};

export default async function Movimentacoes(){
  const {s,id}=await getHousehold();
  const {data}=await s.from("stock_movements").select("id,kind,quantity_delta,occurred_on,household_products(name,unit)").eq("household_id",id).order("occurred_on",{ascending:false}).limit(40);
  const movements=(data??[]) as unknown as Movement[];
  return <>
    <p className="eyebrow">Auditoria do estoque</p>
    <h1>Movimentações</h1>
    <p className="muted">Cada compra e baixa de consumo fica registrada para você acompanhar a evolução do estoque.</p>
    {movements.length?<ul className="movement-list card">{movements.map(movement=>{const quantity=Number(movement.quantity_delta);return <li key={movement.id}><span className={quantity>0?"movement-icon incoming":"movement-icon outgoing"}>{quantity>0?"+":"−"}</span><div><b>{movement.household_products?.name??"Produto removido"}</b><small className="muted">{labels[movement.kind]??movement.kind} · {new Date(`${movement.occurred_on}T12:00:00`).toLocaleDateString("pt-BR")}</small></div><strong className={quantity>0?"coin-positive":"danger"}>{quantity>0?"+":""}{quantity} {movement.household_products?.unit??"un"}</strong></li>})}</ul>:<p className="empty card">As movimentações aparecerão aqui quando você registrar compras ou consumo.</p>}
  </>;
}
