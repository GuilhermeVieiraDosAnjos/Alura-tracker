<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";

import { TipoNotificacao } from "@/interface/INotificacao";
// import { notificacaoMixin } from "@/mixins/notificar";

import useNotificador from "@/hooks/notificador";
import { ALTERAR_PROJETOS, CADASTRAR_PROJETOS } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    },
  },
  // mixins: [notificacaoMixin] Uma maneira de utilizar as notificações sem ser pelo store,
  // mounted() {
  //   if (this.id) {
  //     const projeto = this.store.state.projeto.projetos.find(
  //       (proj) => proj.id == this.id
  //     );
  //     this.nomeDoProjeto = projeto?.nome || "";
  //   }
  // },
  // data() {
  //   return {
  //     nomeDoProjeto: "",
  //   };
  // },
  setup(props) {
    const router = useRouter() 

    const store = useStore();
    const { notificar } = useNotificador();

    const nomeDoProjeto = ref("")

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        (proj) => proj.id == props.id
      );
      nomeDoProjeto.value = projeto?.nome || "";
    }

    const salvar = ()=> {
      if (props.id) {
        store
          .dispatch(ALTERAR_PROJETOS, {
            id: props.id,
            nome: nomeDoProjeto.value,
          })
          .then(() => lidarComSucesso());
      } else {
        store
          .dispatch(CADASTRAR_PROJETOS, nomeDoProjeto.value)
          .then(() => lidarComSucesso());
      }
    }

    const lidarComSucesso =()=> {
      nomeDoProjeto.value = "";
      notificar(
        TipoNotificacao.SUCESSO,
        "Excelente",
        "Projeto Cadastrado Com Sucesso"
      );
      router.push("/projetos");
    }

    return {
      nomeDoProjeto,
      salvar
    };
  },
});
</script>
