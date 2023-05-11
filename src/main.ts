import 'normalize.css';
import { createPinia } from 'pinia';
import VueVirtualScroller from 'vue-virtual-scroller';
import { createApp, ref } from 'vue';
import App from './App.vue';
import './assets/css/common.css';
import './assets/css/transition.css';
import './index.css';
import router from './router';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

export const theme: any = ref(null);
const app = createApp(App);
app.use(createPinia());
app.use(VueVirtualScroller);
app.use(router);
app.mount('#app');