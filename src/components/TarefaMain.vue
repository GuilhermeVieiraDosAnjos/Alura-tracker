<template>
  <BoxVoid>
    <div class="columns clicavel" @click="tarefaClicada">
      <div class="column is-7">{{ tarefa.descricao || 'Tarefa sem descrição' }}</div>
      <div class="column">
        <CronometroTarefas :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
      </div>
      <!-- Criado uma Nova coluna que caso não receba o projeto retorna uma alternativa -->
      <div class="column">{{ projeto?.nome || 'Projeto não definido' }}</div>
    </div>
  </BoxVoid>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ITarefa from "@/interface/ITarefa";
import CronometroTarefas from "./CronometroTarefas.vue";
import BoxVoid from "./BoxVoid.vue";
import IProjeto from "@/interface/IProjeto";

export default defineComponent({
  name: "TarefaMain",
  emits: ['aoTarefaClicada'],
  components: {
    CronometroTarefas,
    BoxVoid
  },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required : true
    },
    //Pegando a prop de projeto e o type da Interface
    projeto: {
      type: Object as PropType<IProjeto>,
      required: true
    },
  },
  setup(props, {emit}) {
    const  tarefaClicada = () : void => {
      emit('aoTarefaClicada', props.tarefa)
    }

    return{
      tarefaClicada
    }
  },
});
</script>

<style scoped>
.clicavel{
  cursor: pointer;
}
</style>