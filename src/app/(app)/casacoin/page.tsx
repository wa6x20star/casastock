import { createClient } from "@/lib/supabase/server";

const labels:Record<string,string>={earn:"Conquista",spend:"Uso",adjustment:"Ajuste"};

export default async function CasaCoin(){
  const s=await createClient();
  const {data:{user}}=await s.auth.getUser();
  const {data:wallet}=await s.from("casacoin_wallets").select("id,balance").eq("user_id",user!.id).maybeSingle();
  const {data:transactions}=wallet?await s.from("casacoin_transactions").select("id,kind,amount,description,created_at").eq("wallet_id",wallet.id).order("created_at",{ascending:false}).limit(10):{data:[]};
  const balance=Number(wallet?.balance??0);

  return <>
    <p className="eyebrow">Futuro CasaStock</p>
    <h1>CasaCoin</h1>
    <section className="coin-card"><span>Seu saldo</span><p>{balance.toLocaleString("pt-BR",{maximumFractionDigits:0})} <small>CasaCoins</small></p><b>Em breve: recompensas por contribuições úteis à comunidade.</b></section>
    <section className="card"><h2>Como funciona</h2><p className="muted">A carteira já está preparada para registrar créditos, usos e ajustes com histórico individual. Nesta versão, CasaCoins não têm saque, conversão financeira ou compra.</p></section>
    <h2>Histórico</h2>
    {transactions?.length?<ul className="transaction-list">{transactions.map(tx=><li key={tx.id}><div><b>{labels[tx.kind]??tx.kind}</b><span className="muted">{tx.description??"Movimentação CasaCoin"}</span></div><strong className={Number(tx.amount)>0?"coin-positive":"danger"}>{Number(tx.amount)>0?"+":""}{Number(tx.amount).toLocaleString("pt-BR")}</strong></li>)}</ul>:<p className="empty card">Ainda não há movimentações na sua carteira.</p>}
  </>;
}
