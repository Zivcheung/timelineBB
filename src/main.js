// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import firebase from './firebase.js'
import axios from "axios"



Vue.config.productionTip = false;
Vue.prototype.$firebase = firebase;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted(){
    let self = this
    window.onload =function() {
      self.$router.push({name:"index"});
    }
  }
});