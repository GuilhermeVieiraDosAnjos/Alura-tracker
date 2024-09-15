import clienteHttp from "@/http";
import IProjeto from "@/interface/IProjeto";
import { Estado } from "@/store";
import { ALTERAR_PROJETOS, CADASTRAR_PROJETOS, DELETAR_PROJETOS, OBTER_PROJETOS } from "@/store/tipo-acoes";
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETO, EXCLUIR_PROJETO } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoProjeto {
  projetos : IProjeto[]
}

export const projeto: Module<EstadoProjeto, Estado> ={
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string){
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto
      }as IProjeto
      state.projetos.push(projeto)
    },
    [ALTERA_PROJETO](state, projeto: IProjeto){
      const index = state.projetos.findIndex(proj => proj.id == projeto.id)
      state.projetos[index] = projeto 
    },
    [EXCLUIR_PROJETO](state, id: string){
      state.projetos = state.projetos.filter(proj => proj.id != id)
    },
    [DEFINIR_PROJETO](state, projetos: IProjeto[]){
      state.projetos = projetos
    },
  },
  
  actions: {
    [OBTER_PROJETOS]({commit}){
      clienteHttp.get('projetos')
      .then(resposta => commit(DEFINIR_PROJETO, resposta.data))
      .catch(e => {
        console.error("Erro ao obter projeto", e)
      })
    },

    [CADASTRAR_PROJETOS](context, nomeDoProjeto: string){
      return clienteHttp.post('projetos',{
        nome:nomeDoProjeto
      })
    },

    [ALTERAR_PROJETOS](context, projeto: IProjeto ){
      return clienteHttp.put(`/projetos/${projeto.id}`, projeto)
    },

    [DELETAR_PROJETOS]({commit}, id: string ){
      return clienteHttp.delete(`/projetos/${id}`)
        .then(() => commit(EXCLUIR_PROJETO, id))
    },

  }
}