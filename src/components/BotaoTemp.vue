<template>
  <button class="button" @click="acao" :disabled="desabilitado">
    <span class="icon">
      <i :class="icone"></i>
    </span>
    <span>{{nomeBotao}}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BotaoTemp',
  emits:['acao'],
  props:{
    nomeBotao :{
      type: String,
      required: true,
    },
    icone: {
      type: String,
      required: true
    },
    desabilitado:{
      type:Boolean,
      default: false
    }
  },
  methods:{
    acao (): void{
      this.$emit('acao')
    }
  }
})
</script>
