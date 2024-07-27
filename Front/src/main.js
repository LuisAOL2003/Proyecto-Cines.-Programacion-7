import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import { createPinia } from 'pinia';
import 'bulma/css/bulma.css';

const app = createApp(App);

// Crear una instancia de Pinia
const pinia = createPinia();

app.use(router);
app.use(pinia); // Usar Pinia

app.config.globalProperties.$http = axios;

app.mount('#app');