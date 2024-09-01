<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-8"
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
      <div class="column">
        <TemporizadorTarefas @ao-temporizador-finalizado="finalizarTarefa"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TemporizadorTarefas from './TemporizadorTarefas.vue';

export default defineComponent({
  name: 'FormularioTarefa',
  components: {
    TemporizadorTarefas
  },
  emits: ['aoSalvarTarefa'],
  data () {
    return {
      descricao : ''
    }
  },
  methods:{
    finalizarTarefa(tempoDecorrido: number) : void {
      this.$emit('aoSalvarTarefa', {
        duracaoEmSegundos : tempoDecorrido,
        descricao : this.descricao
      })
      this.descricao = '';
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
