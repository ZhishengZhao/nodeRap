import Vue from 'vue'
import VueRouter from 'vue-router'
import detail from './detail/index.vue'
import App from './App.vue'
import '../libs/jsonformate.js'
Vue.use(VueRouter)
import {
  Input,
  Button,
  Tree,
  Alert,
  Row,
  MessageBox,
  Message
} from 'element-ui'

Vue.use(Input)
Vue.use(Button)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Row)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message

import configRoutes from './routes.js'

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: configRoutes,
    linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'demo'
    if (!to.query.url && from.query.url) {
        to.query.url = from.query.url
    }
    next()
})

new Vue({
    el: '#hiRap',
    router,
    render: h => h(App)
})