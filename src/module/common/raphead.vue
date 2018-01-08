<!--
    created by zhaozhisheng on 07/17/2017
 -->
<template>
    <el-row :gutter="20" class="rap_head">
        <div class="wid1080" @click="goMainPage">
            <h3 class="bg__blue">Hi</h3><h3>Rap</h3>
            <!-- <img class="logo" src="./img/logo1.png" alt="" @click="goMainPage"> -->
            <!-- <a class="logo_title" href="javascript:;">Heioray</a> -->
            <!-- <span @click="goLogin">{{welcomeTxt}}</span> -->
        </div>
    </el-row>
    <!-- <div class="rap_head">
        <div class="wid1080">
            <img class="logo" src="./img/logo1.png" alt="" @click="goMainPage">
            <a class="logo_title" href="javascript:;">Heioray</a>
            <span @click="goLogin">{{welcomeTxt}}</span>
        </div>
    </div> -->
</template>
<script>
import { user } from '../api/api.js'
export default {
    name: 'head',
    data() {
        return {
            isLogin: false,
            welcomeTxt: '登录'
        }
    },
    computed: {

    },
    components: {},
    mounted() {
        // user.isLogin(null, (data) => {
        //     if (data.success && data.result) {
        //         this.isLogin = true;
        //         this.welcomeTxt = 'Hi ' + data.result.name
        //     }
        // })
    },
    methods: {
        goMainPage() {
            this.$router.go(-1)
        },
        goLogin() {
            this.$emit('back', 'doLogin');
        }
    }
}
</script>
<style lang="scss" scoped>
a {
    text-decoration: none;
    color: #fff;
}

.rap_head {
    // width: 100%;
    height: 80px;
    background-color: #3B3E43;
    padding: 15px 0;
}

.wid1080 {
    width: 1080px;
    margin: 0 auto;
    h3 {
        font-size: 40px;
        display: inline-block;
        color: #e5d5d5;
    }
    .bg__blue {
        background-color: #e5d5d5;
        margin-right: 15px;
        color: #3b3e43;
    }
}

.logo_title {
    font-size: 36px;
    line-height: 80px;
}

.logo {
    width: 226px;
}
</style>