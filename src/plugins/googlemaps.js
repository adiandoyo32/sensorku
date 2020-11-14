import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyD9uz6zUypi-G-JJfXsLb0plc3EAP8P5Aw',
        libraries: 'places'
    },
    installComponent: true
})