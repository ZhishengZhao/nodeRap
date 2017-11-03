import Vue from 'vue'

const rapAlertVue = Vue.extend(require('./alert.vue'))
let pool = []

let getAnInstance = () => {
    if (pool.length > 0) {
        return pool[0]
    }
    return new rapAlertVue({
        el: document.createElement('div'),
        propsData: {
            show: false
        }
    })
}

let rapAlert = (options) => {
    options = options || {}
    let instance = getAnInstance()

    instance.show = true
    instance.callback = callback

    Vue.nextTick(() => {
        document.body.appendChild(instance.$el)
    })
}

export default rapAlert
