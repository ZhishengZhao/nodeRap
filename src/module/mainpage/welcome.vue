<!--
    created by zhaozhisheng on 08/15/2017
 -->
<template>
    <div class="page">
        <h3 class="title" @click="goPage('main')">
           Hi Rap 
        </h3>
    </div>
</template>
<script>
import goLogin from 'common/login/index.js'
import { user } from 'api/api.js'
export default {
    name: 'welcome',
    data() {
        return {
        }
    },
    computed: {
    },
    components: {
    },
    mounted() {
    },
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
.page {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fafafa;
}
.title {
    position: absolute;
    left: 50%;
    top: 38%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    font-size: 140px;
}
</style>