import IProjeto from "@/interface/IProjeto";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, ATUALIZA_TAREFA, EXCLUIR_PROJETO, EXCLUIR_TAREFA, NOTIFICAR } from "./tipo-mutacoes";
import ITarefa from "@/interface/ITarefa";
import { INotificacao } from "@/interface/INotificacao";

interface Estado {
  projetos : IProjeto[],
  tarefas : ITarefa[],// Terminar de implementar as tarefas, fazendo serem salvas por mutations
  notificacoes : INotificacao[]
}

export const key : InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projetos: [],
    tarefas :[],
    notificacoes: []
  },
  mutations: {
    [ADICIONA_TAREFA](state, tarefa: ITarefa){
      tarefa.id = new Date().toISOString()
      state.tarefas.push(tarefa)
    },
    [ATUALIZA_TAREFA](state, tarefa:ITarefa){
      const index = state.tarefas.findIndex(task => task.id == tarefa.id)
      state.tarefas[index] = tarefa
    },
    [EXCLUIR_TAREFA](state, id:string){
      state.tarefas = state.tarefas.filter(task => task.id != id)
    },

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

    [NOTIFICAR](state,  novaNotificacao: INotificacao){
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
      }, 3000)
    }

  }
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}