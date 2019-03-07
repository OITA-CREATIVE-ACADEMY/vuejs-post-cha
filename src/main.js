// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/app'

// Bootsrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
// nicoをインポート
import "bootstrap-nico/dist/js/bootstrap.bundle.js"
import "bootstrap-nico/dist/js/bootstrap.js"
import "bootstrap-nico/dist/css/bootstrap.css"


Vue.use(BootstrapVue)
Vue.config.productionTip = false

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAASntGfp-FPAUHu-5II9y3s8pI0XppIZI",
  authDomain: "post-cha.firebaseapp.com",
  databaseURL: "https://post-cha.firebaseio.com",
  projectId: "post-cha",
  storageBucket: "post-cha.appspot.com",
  messagingSenderId: "656801433168"
};
firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
