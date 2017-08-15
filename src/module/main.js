import Vue from 'vue'
import VueRouter from 'vue-router'
import detail from './detail/index.vue'
import App from './App.vue'
import '../libs/jsonformate.js'
Vue.use(VueRouter)
import {
  Dialog,
  Input,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  Form,
  Tree,
  Alert,
  Icon,
  Row,
  Col,
  Message
} from 'element-ui'

Vue.use(Dialog)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)

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
    el: '#app',
    router,
    render: h => h(App)
})