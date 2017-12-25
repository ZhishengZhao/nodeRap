import Vue from 'vue'
import VueRouter from 'vue-router'
import detail from './detail/index.vue'
import App from './App.vue'
import '../libs/jsonformate.js'
// import ElementUI from 'element-ui'
Vue.use(VueRouter)
// Vue.use(ElementUI)
import {
    Select,
    Option,
    OptionGroup,
    Input,
    Button,
    Tree,
    Alert,
    Row,
    Col,
    MessageBox,
    Message,
    Dialog,
    Form,
    FormItem,
    Radio,
    RadioGroup
} from 'element-ui'

Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Col)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)

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