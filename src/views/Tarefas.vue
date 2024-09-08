<template>
  <div class="column is-three-quarter conteudo">
    <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
      <BoxVoid v-if="listaVazia"> Você Não Está muito Produtivo hoje </BoxVoid>
      <!-- Pelo elemento pai estamos passando a tarefa e o projeto para ser retornado no box da tarefa -->
      <TarefaMain
        v-for="(tarefa, index) in tarefas"
        :key="index"
        :tarefa="tarefa"
        :projeto="tarefa.projeto"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormularioTarefa from "../components/FormularioTarefa.vue";
import TarefaMain from "../components/TarefaMain.vue";
import ITarefa from "../interface/ITarefa";
import BoxVoid from "../components/BoxVoid.vue";

export default defineComponent({
  name: "App",
  components: { FormularioTarefa, TarefaMain, BoxVoid },
  data() {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false,
    };
  },
  computed: {
    listaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    },
    trocarTema(modoEscuroAtivo: boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo;
    },
  },
});
</script>
