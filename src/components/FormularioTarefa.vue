<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja inicar"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <TemporizadorTarefas @ao-temporizador-finalizado="finalizarTarefa"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import TemporizadorTarefas from './TemporizadorTarefas.vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { NOTIFICAR } from '@/store/tipo-mutacoes';
import { TipoNotificacao } from '@/interface/INotificacao';

export default defineComponent({
  name: 'FormularioTarefa',
  components: {
    TemporizadorTarefas
  },
  emits: ['aoSalvarTarefa'],

  setup (props, {emit}) {
    const store = useStore(key)

    const descricao = ref("")
    const idProjeto= ref("")

    const projetos =  computed(()=> store.state.projeto.projetos)

    const finalizarTarefa = (tempoDecorrido: number) : void => {
      //Verificação para ver se o projeto foi selecionado ou não
      const projetoSelecionado = projetos.value.find(proj => proj.id == idProjeto.value);

      //Caso não tenha sido selecionado Notifica
      if(!projetoSelecionado){
        store.commit(NOTIFICAR,{
          titulo: 'Ops',
          texto: 'É necessário associar um projeto a uma tarefa',
          tipo: TipoNotificacao.FALHA
        })
        return;
      }
      emit('aoSalvarTarefa', {
        duracaoEmSegundos : tempoDecorrido,
        descricao : descricao.value,
        projeto: projetos.value.find(proj => proj.id == idProjeto.value)
      })
      descricao.value = '';
    }

    return {
      projetos: computed(()=> store.state.projeto.projetos),
      descricao,
      idProjeto,
      finalizarTarefa
    }
  }
})
</script>

<style>
.formulario{
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>
