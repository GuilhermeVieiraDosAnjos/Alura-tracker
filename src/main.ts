import { createApp } from 'vue'
import "@fortawesome/fontawesome-free/css/all.css"
import App from './App.vue'
import roteador from './router/index'
import {key,  store } from './store'

createApp(App).
    use(roteador).
    use(store, key).
    mount('#app')
