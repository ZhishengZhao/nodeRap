import Vue from 'vue'

const loginDialog = Vue.extend(require('./login.vue'))
let pool = []

let getAnInstance = () => {
    if (pool.length > 0) {
        let instance = pool[0]
        pool.splice(0, 1)
        return instance
    }
    return new loginDialog({
        el: document.createElement('div'),
        propsData: {
            show: false
        }
    })
}

let goLogin = {
    create: (callback) => {

        let instance = getAnInstance()

        instance.show = true
        instance.callback = callback

        Vue.nextTick(() => {
            document.body.appendChild(instance.$el)
        })
    },
    destroy: () => {
        Vue.nextTick(() => {
            document.getElementById('login_component').remove()
        })
    }
}

export default goLogin
