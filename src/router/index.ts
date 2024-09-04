import Projetos from "@/views/Projetos/Projetos.vue"
import Tarefas from "../views/Tarefas.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Formulario from "@/views/Formulario.vue";

const rotas: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Tarefas",
    component: Tarefas,
  },
  {
    path: '/projetos',
    component: Projetos,
    children: [
      {
        path: '/',
        name : 'Projetos',
        component: Projetos
      },
      {
        path: '/projetos/novo',
        name : 'Novo Projetos',
        component: Formulario
      },
      {
        path: '/projetos/:id',
        name : 'Editar Projetos',
        component: Formulario,
        props :true
      }
    ]
  }
];

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

export default roteador;
