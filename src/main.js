import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import axios from 'axios';
import './assets/main.css';



const app = createApp(App);

// Configuración global de Axios
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true; 

app.use(createPinia());
app.use(router);
app.mount('#app');
