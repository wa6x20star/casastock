type AuthAction="signIn"|"signUp";

export function authErrorMessage(message:string,action:AuthAction){
  const normalized=message.toLowerCase();
  if(normalized.includes("security purposes")||normalized.includes("rate limit"))return "Aguarde cerca de um minuto antes de tentar novamente. Isso protege sua conta contra solicitações repetidas.";
  if(normalized.includes("already registered"))return "Este e-mail já possui uma conta. Use a tela de entrada para continuar.";
  if(normalized.includes("email not confirmed"))return "Confirme seu e-mail pelo link recebido antes de entrar.";
  if(normalized.includes("invalid login credentials"))return "E-mail ou senha incorretos.";
  if(normalized.includes("password should be"))return "Use uma senha com pelo menos 8 caracteres.";
  return action==="signUp"?"Não foi possível criar a conta agora. Confira os dados e tente novamente.":"Não foi possível entrar agora. Tente novamente em instantes.";
}
