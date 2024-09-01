<template>
  <BoxVoid>
    <div class="columns">
      <div class="column is-7">{{ tarefa.descricao || 'Tarefa sem descrição' }}</div>
      <div class="column">
        <CronometroTarefas :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
      </div>
    </div>
  </BoxVoid>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ITarefa from "@/interface/ITarefa";
import CronometroTarefas from "./CronometroTarefas.vue";
import BoxVoid from "./BoxVoid.vue";

export default defineComponent({
  name: "TarefaMain",
  components: {
    CronometroTarefas,
    BoxVoid
  },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true
    }
  }
});
</script>