import clienteHttp from "@/http";
import ITarefa from "@/interface/ITarefa";
import { Estado } from "@/store";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from "@/store/tipo-acoes";
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS, EXCLUIR_TAREFA } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
  tarefas : ITarefa[]
}

export const tarefa : Module<EstadoTarefa, Estado> = {
  state: {
    tarefas: []
  },
  mutations: {
    [ADICIONA_TAREFA](state, tarefa: ITarefa){
      // tarefa.id = new Date().toISOString()
      state.tarefas.push(tarefa)
    },
    [ALTERA_TAREFA](state, tarefa:ITarefa){
      const index = state.tarefas.findIndex(task => task.id == tarefa.id)
      state.tarefas[index] = tarefa
    },
    [EXCLUIR_TAREFA](state, id:number){
      state.tarefas = state.tarefas.filter(task => task.id != id)
    },
    [DEFINIR_TAREFAS](state, tarefas:ITarefa[]){
      state.tarefas = tarefas
    },
  },

  actions: {
    [OBTER_TAREFAS]({commit}, filtro){
      let url = 'tarefas'

      if(filtro){
        url += '?descricao=' + filtro
      }

      clienteHttp.get(url)
      .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
      .catch(e => {
        console.error("Erro ao obter projeto", e)
      })
    },

    [CADASTRAR_TAREFA]({commit}, tarefa: ITarefa){
      return clienteHttp.post('/tarefas', tarefa)
      .then(resposta => commit(ADICIONA_TAREFA, resposta.data) )
    },

    [ALTERAR_TAREFA]({commit}, tarefa: ITarefa ){
      return clienteHttp.put(`/tarefas/${tarefa.id}`,tarefa)
        .then(() => commit(ALTERA_TAREFA, tarefa))
    },
  }
}