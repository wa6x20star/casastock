"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { authErrorMessage } from "@/lib/auth-errors";
export async function signUp(formData:FormData){const email=String(formData.get("email"));const password=String(formData.get("password"));const supabase=await createClient();const {data,error}=await supabase.auth.signUp({email,password,options:{emailRedirectTo:`${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback`}});if(error)redirect(`/cadastro?erro=${encodeURIComponent(authErrorMessage(error.message,"signUp"))}`);redirect(data.session?"/criar-casa":"/entrar?mensagem=confira-email")}
export async function resendConfirmation(formData:FormData){const email=String(formData.get("email")).trim();const supabase=await createClient();const {error}=await supabase.auth.resend({type:"signup",email,options:{emailRedirectTo:`${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback`}});if(error)redirect(`/entrar?erro=${encodeURIComponent(authErrorMessage(error.message,"signUp"))}`);redirect("/entrar?mensagem=email-reenviado")}
export async function signIn(formData:FormData){const supabase=await createClient();const {error}=await supabase.auth.signInWithPassword({email:String(formData.get("email")),password:String(formData.get("password"))});if(error)redirect(`/entrar?erro=${encodeURIComponent(authErrorMessage(error.message,"signIn"))}`);redirect("/painel")}
export async function signOut(){const supabase=await createClient();await supabase.auth.signOut();redirect("/")}
