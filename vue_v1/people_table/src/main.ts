import './assets/main.css'
import VueDayjs from 'vue3-dayjs-plugin'

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App).use(VueDayjs)

app.mount('#app')
