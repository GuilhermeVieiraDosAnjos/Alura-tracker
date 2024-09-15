<template>
  <div class="column is-three-quarter conteudo">
    <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
      <BoxVoid v-if="listaVazia"> Você Não Está muito Produtivo hoje </BoxVoid>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="text"
            placeholder="Digite para filtrar"
            v-model="filtro"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-search"></i>
          </span>
        </p>
      </div>
      <!-- Pelo elemento pai estamos passando a tarefa e o projeto para ser retornado no box da tarefa -->
      <TarefaMain
        v-for="(tarefa, index) in tarefas"
        :key="index"
        :tarefa="tarefa"
        :projeto="tarefa.projeto"
        @aoTarefaClicada="selecionarTarefa"
      />
      <Modal :mostrar="tarefaSelecionada != null">
        <template v-slot:cabecalho>
          <p class="modal-card-title">Editando uma Tarefa</p>
          <button
            class="delete"
            aria-label="close"
            @click="fecharModal"
          ></button>
        </template>
        <template v-slot:corpo>
          <div class="field">
            <label for="descricaoDaTarefa" class="label">
              Nome do Tarefa
            </label>
            <input
              v-if="tarefaSelecionada"
              type="text"
              class="input"
              v-model="tarefaSelecionada.descricao"
              id="nomeDoProjeto"
            />
          </div>
        </template>
        <template v-slot:rodape>
          <div class="buttons">
            <button class="button is-success" @click="alterarTarefa">
              Salvar Alterações
            </button>
            <button class="button" @click="fecharModal">Cancelar</button>
          </div>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import FormularioTarefa from "../components/FormularioTarefa.vue";
import TarefaMain from "../components/TarefaMain.vue";
import BoxVoid from "../components/BoxVoid.vue";
import { useStore } from "@/store";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "@/store/tipo-acoes";
import ITarefa from "@/interface/ITarefa";
import Modal from "@/components/Modal.vue";

export default defineComponent({
  name: "App",
  components: { FormularioTarefa, TarefaMain, BoxVoid, Modal },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    alterarTarefa() {
      this.store
        .dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    },
  },
  computed: {
    listaVazia(): boolean {
      return this.tarefas && this.tarefas.length === 0;
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    const filtro = ref("");

    // const tarefas = computed(() =>
    //   store.state.tarefa.tarefas.filter(
    //     (t) => !filtro.value || t.descricao.includes(filtro.value)
    //   )
    // );

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
      filtro,
    };
  },
});
</script>
