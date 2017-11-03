<!--
    created by zhaozhisheng on 08/15/2017
 -->
<template>
    <div class="page">
        <rap-head></rap-head>
        <div class="part_main">
            <p class="title--main" @click="showJoy = !showJoy">
            </p>
            <p class="btn--main" @click="goPage('main')">
            </p>
        </div>
        <joy-cooper v-show="showJoy"></joy-cooper>
    </div>
</template>
<script>
import rapHead from 'common/raphead.vue'
import joyCooper from 'joy/cooperation.vue'
import goLogin from 'common/login/index.js'
import { user } from 'api/api.js'
export default {
    name: 'welcome',
    data() {
        return {
            loginShow: false,
            form: {
                name: '',
                email: '',
                pwd: '',
                pwdconfirm: ''
            },
            actionLogin: true,
            showJoy: false
        }
    },
    computed: {
    },
    components: {
        rapHead,
        joyCooper
    },
    mounted() {},
    methods: {
        goPage(params) {
            let me = this
            user.isLogin(null, (data) => {
                if (data.success && data.result) {
                    me.$router.push({
                        path: 'mainpage'
                    })
                } else {
                    goLogin.create(() => {
                        me.$router.push({
                            path: 'mainpage'
                        })
                    })
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.part_main {
    height: 800px;
    padding: 100px;
    margin: 0 auto;
    min-width: 900px;
}

.title--main {
    width: 900px;
    height: 260px;
    margin: 30px auto;
    background: url('../../assets/images/logo.png') 0 center no-repeat;
    background-size: cover;
}

.btn--main {
    width: 210px;
    height: 94px;
    margin: 30px auto;
    background: url('../../assets/images/enter.png') 0 center no-repeat;
    background-size: cover;
}
</style>