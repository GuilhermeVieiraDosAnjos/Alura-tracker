<template>
  <main class="columns is-gapless is-mutiline" :class="{'modo-escuro': modoEscuroAtivo}">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <TarefaMain v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <BoxVoid v-if="listaVazia" >
          Você Não Está muito Produtivo hoje
        </BoxVoid>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import FormularioTarefa from "./components/FormularioTarefa.vue";
import TarefaMain from "./components/TarefaMain.vue";
import ITarefa from "./interface/ITarefa";
import BoxVoid from "./components/BoxVoid.vue";

export default defineComponent({
  name: "App",
  components: {BarraLateral, FormularioTarefa, TarefaMain, BoxVoid},
  data(){
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false
    }
  },
  computed: {
    listaVazia (): boolean{
      return this.tarefas.length === 0
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa)
    },
    trocarTema (modoEscuroAtivo: boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo
    }
  }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main {
  --bg-primario: #fff;
  --texto-primario: #000
}

main.modo-escuro{
  --bg-primario : #2b2d42;
  --texto-primario : #ddd;
}

.conteudo{
  background-color: var(--bg-primario);
}
</style>
