<!--
    created by zhaozhisheng on 08/15/2017
 -->
<template>
    <div class="page">
        <div class="title" @click="goPage('main')">
            <h3 class="bg__blue">Hi</h3><h3>Rap</h3>
        </div>
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
    h3 {
        font-size: 140px;
        display: inline-block;
        color: #323030;
    }
    .bg__blue {
        background-color: #323030;
        margin-right: 45px;
        color: #fff;
    }
}
</style>