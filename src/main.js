import { createApp } from 'vue'
import { createPinia } from 'pinia' // Add this
import App from './App.vue'
import "./style.css"
import router from './router'

const app = createApp(App)
app.use(createPinia()) 
app.use(router)
app.mount('#app')