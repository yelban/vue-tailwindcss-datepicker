import '@/assets/main.css';
// import 'primevue/resources/themes/tailwind-light/theme.css';
import 'primevue/resources/themes/lara-light-teal/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import VueTailwindDatepicker from 'vue-tailwind-datepicker';
import ToastService from 'primevue/toastservice';
import BadgeDirective from 'primevue/badgedirective';

import App from './App.vue';

const app = createApp(App);

app.use(PrimeVue, { ripple: true });

app.use(VueTailwindDatepicker);

app.use(ToastService);

app.directive('badge', BadgeDirective);

app.mount('#app');
