import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { router } from './router/router'; // Import the router
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// Create the app and attach the router
const app = createApp(App);
app.use(router);
app.use(Toast, {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
});
app.mount('#app');
