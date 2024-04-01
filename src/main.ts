import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
// import Button from './components/ui/AppButton.vue'
import router from './router'
import { tasksStore } from './stores'

const app = createApp(App)

app.use(router)

app.use(tasksStore)

app.mount('#app')
