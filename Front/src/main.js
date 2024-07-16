import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import 'bulma/css/bulma.css';


const app = createApp(App);

app.use(router);


app.config.globalProperties.$http = axios;

app.mount('#app');