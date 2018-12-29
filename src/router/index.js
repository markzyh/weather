import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/pages/index/index'
import Region from '@/components/pages/region/region'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/region',
      name: 'Region',
      component: Region
    }
  ]
})
