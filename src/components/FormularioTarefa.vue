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
import { computed, defineComponent } from 'vue';
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
  data () {
    return {
      descricao : '',
      idProjeto : '' 
    }
  },
  methods:{
    finalizarTarefa(tempoDecorrido: number) : void {
      //Verificação para ver se o projeto foi selecionado ou não
      const projetoSelecionado = this.projetos.find(proj => proj.id == this.idProjeto);

      //Caso não tenha sido selecionado Notifica
      if(!projetoSelecionado){
        this.store.commit(NOTIFICAR,{
          titulo: 'Ops',
          texto: 'É necessário associar um projeto a uma tarefa',
          tipo: TipoNotificacao.FALHA
        })
        return;
      }


      this.$emit('aoSalvarTarefa', {
        duracaoEmSegundos : tempoDecorrido,
        descricao : this.descricao,
        projeto: this.projetos.find(proj => proj.id == this.idProjeto)
      })
      this.descricao = '';
    }
  },
  setup () {
    const store = useStore(key)
    return {
      projetos: computed(()=> store.state.projetos),
      store
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
