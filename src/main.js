// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from '@/api/ajax'
import { Button, Input,Autocomplete } from 'element-ui';

/* import {_getNowWeather,_getForecastWeather,_getRegion} from '@/api/ajax' */

Vue.use(Input);
Vue.use(Button);
Vue.use(Autocomplete);
Vue.prototype.$axios = axios

/* Vue.prototype._getNowWeather = _getNowWeather

Vue.prototype._getForecastWeather = _getForecastWeather

Vue.prototype._getRegion = _getRegion */

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
