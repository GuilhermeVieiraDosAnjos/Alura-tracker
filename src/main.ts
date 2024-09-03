import { createApp } from 'vue'
import "@fortawesome/fontawesome-free/css/all.css"
import App from './App.vue'
import roteador from './router/index'

createApp(App).
    use(roteador).
    mount('#app')
