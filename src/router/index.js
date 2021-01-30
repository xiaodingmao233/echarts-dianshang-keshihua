import Vue from 'vue'
import Router from 'vue-router'
import SellerPage from '@/views/SellerPage'
import TrendPage from '@/views/TrendPage'
import MapPage from '@/views/MapPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/sellerPage',
      component: SellerPage
    },
    {
      path: '/trendpage',
      component: TrendPage
    },
    {
      path: '/mappage',
      component: MapPage
    }
  ]
})
