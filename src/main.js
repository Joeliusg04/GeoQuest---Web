import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('./assets/icons/pin-de-ubicacion.png'),
    iconUrl: require('./assets/icons/pin-de-ubicacion.png'),
    shadowSize: 0
});


createApp(App).use(router).mount('#app')
