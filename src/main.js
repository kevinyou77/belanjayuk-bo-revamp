import Vue from 'vue'
import router from './router'
import store from './store'
import Main from './views/Main.vue'
import { apolloProvider } from './config/apolloProvider'
import BootstrapVue from 'bootstrap-vue'
import { firestorePlugin } from 'vuefire'
import * as firebase from 'firebase'
import 'firebase/firestore'
import '../src/styles/index.scss'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(firestorePlugin)

// var firebaseConfig = {
//   apiKey: "AIzaSyBnRpJXWkY2xjhKzJHHnYWyvktolsjP5II",
//   authDomain: "belanjayuk-b7d5d.firebaseapp.com",
//   databaseURL: "https://belanjayuk-b7d5d.firebaseio.com",
//   projectId: "belanjayuk-b7d5d",
//   storageBucket: "belanjayuk-b7d5d.appspot.com",
//   messagingSenderId: "459763394415",
//   appId: "1:459763394415:web:08a3dbff46f0c729aa6a9a",
//   measurementId: "G-N3SRSPWB8G"
// };
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBnRpJXWkY2xjhKzJHHnYWyvktolsjP5II",
  authDomain: "belanjayuk-b7d5d.firebaseapp.com",
  databaseURL: "https://belanjayuk-b7d5d.firebaseio.com",
  projectId: "belanjayuk-b7d5d",
  storageBucket: "belanjayuk-b7d5d.appspot.com",
  messagingSenderId: "459763394415",
  appId: "1:459763394415:web:08a3dbff46f0c729aa6a9a",
  measurementId: "G-N3SRSPWB8G"
})

export const db = firebaseApp.firestore()
export const storage = firebaseApp.storage().ref()

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(Main),
}).$mount('#app')