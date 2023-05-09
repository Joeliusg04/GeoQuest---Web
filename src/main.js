import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('./assets/icons/pin.png'),
    iconUrl: require('./assets/icons/pin.png'),
    shadowUrl: require('./assets/icons/pin.png'),
    shadowSize: 0
});

L.Popup.prototype._animateZoom = function (e) {
    if (!this._map) {
        return
    }
    var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
        anchor = this._getAnchor()
    L.DomUtil.setPosition(this._container, pos.add(anchor))
}


createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
