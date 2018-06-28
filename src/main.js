import Vue from 'vue'
import { Input, Select, Option, Button, Autocomplete } from 'element-ui';
import App from './App.vue'

Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Autocomplete)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#vuesearch')
