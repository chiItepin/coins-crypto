import { createApp } from 'vue';
import { VuesticPlugin } from 'vuestic-ui';
import 'vuestic-ui/dist/vuestic-ui.css';
import App from './App.vue';
import router from './routes';

createApp(App)
  .use(VuesticPlugin)
  .use(router)
  .mount('#app');
