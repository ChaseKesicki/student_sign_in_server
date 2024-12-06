import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'bootstrap/dist/css/bootstrap.min.css'  //imports bootstrap styles to make webpage look pretty
import 'bootstrap-icons/font/bootstrap-icons.css'  //imports bootstrap icons (used for trash icon next to delete button)

import './style.css'
import App from './App.vue'

//createApp(App).mount('#app')


const app = createApp(App)
const pinia = createPinia()  //in this program, pinia is used to store and send data between vue pages

app.use(pinia)

app.mount('#app')