//Criamos um hook para passar a função de notificar 

import { TipoNotificacao } from "@/interface/INotificacao"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/tipo-mutacoes"

type Notificador ={
  notificar: (tipo: TipoNotificacao, titulo: string, texto:string) => void
}

export default (): Notificador => {
  const notificar = (tipo: TipoNotificacao, titulo: string, texto: string): void => {
    store.commit(NOTIFICAR, {
      titulo,
      texto,
      tipo
    });
  }

  return {
    notificar 
  }
}