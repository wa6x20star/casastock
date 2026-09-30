import { getHousehold } from "../data";

type Purchase={id:string;purchased_on:string;total_amount:number|string;markets:{name:string}|null};

export default async function Gastos(){
  const {s,id}=await getHousehold();
  const start=new Date(); start.setDate(1); start.setHours(0,0,0,0);
  const historyStart=new Date(start); historyStart.setMonth(historyStart.getMonth()-5);
  const [{data:currentData},{data:historyData}]=await Promise.all([
    s.from("purchases").select("id,purchased_on,total_amount,markets(name)").eq("household_id",id).gte("purchased_on",start.toISOString().slice(0,10)).order("purchased_on",{ascending:false}),
    s.from("purchases").select("purchased_on,total_amount").eq("household_id",id).gte("purchased_on",historyStart.toISOString().slice(0,10)),
  ]);
  const purchases=(currentData??[]) as unknown as Purchase[];
  const total=purchases.reduce((sum,p)=>sum+Number(p.total_amount),0);
  const byMarket=new Map<string,number>();
  for(const purchase of purchases){const market=purchase.markets?.name??"Mercado não informado";byMarket.set(market,(byMarket.get(market)??0)+Number(purchase.total_amount));}
  const markets=[...byMarket.entries()].sort((a,b)=>b[1]-a[1]);
  const totalsByMonth=new Map<string,number>();
  for(const purchase of historyData??[]){const month=purchase.purchased_on.slice(0,7);totalsByMonth.set(month,(totalsByMonth.get(month)??0)+Number(purchase.total_amount));}
  const months=Array.from({length:6},(_,index)=>{const date=new Date(historyStart);date.setMonth(historyStart.getMonth()+index);const key=`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}`;return {key,label:date.toLocaleDateString("pt-BR",{month:"short"}),total:totalsByMonth.get(key)??0};});
  const maxMonthly=Math.max(...months.map(month=>month.total),1);

  return <>
    <p className="eyebrow">{start.toLocaleDateString("pt-BR",{month:"long",year:"numeric"})}</p>
    <h1>Gastos do mês</h1>
    <section className="grid cols-2"><article className="card"><span className="muted">Total registrado</span><p className="metric">{total.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</p></article><article className="card"><span className="muted">Compras registradas</span><p className="metric">{purchases.length}</p></article></section>
    <h2>Evolução em 6 meses</h2>
    <section className="card monthly-history" aria-label="Evolução de gastos nos últimos seis meses">{months.map(month=><div className="month-row" key={month.key}><span>{month.label}</span><div className="bar-track"><span className="bar-fill" style={{width:`${(month.total/maxMonthly)*100}%`}}/></div><b>{month.total.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</b></div>)}</section>
    <h2>Por mercado</h2>
    {markets.length?<ul className="summary-list card">{markets.map(([market,value])=><li key={market}><span>{market}</span><b>{value.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</b></li>)}</ul>:<p className="empty card">Nenhuma compra foi registrada neste mês.</p>}
    <h2>Últimas compras</h2>
    {purchases.length?<ul className="summary-list card">{purchases.map(p=><li key={p.id}><span><b>{p.markets?.name??"Mercado"}</b><small className="muted">{new Date(`${p.purchased_on}T12:00:00`).toLocaleDateString("pt-BR")}</small></span><b>{Number(p.total_amount).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</b></li>)}</ul>:null}
  </>;
}
