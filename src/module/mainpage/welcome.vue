<!--
    created by zhaozhisheng on 08/15/2017
 -->
<template>
    <div class="page">
        <rap-head></rap-head>
        <div class="part_main">
            <p class="page_title">
            </p>
            <p class="btn" @click="goPage('main')">
            </p>
        </div>
        <el-dialog :visible.sync="loginShow">
            <el-form ref="form" :model="form">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.pwd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="goLogin">登录</el-button>
                    <el-button @click="goRegister">注册</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- <joy-cooper></joy-cooper> -->
    </div>
</template>
<script>
import rapHead from '../common/raphead.vue'
import joyCooper from '../joy/cooperation.vue'
import { _get, _post } from '../../store/base.js'
export default {
    name: 'welcome',
    data() {
        return {
            loginShow: false,
            form: {
                name: '',
                pwd: ''
            }
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
            _get('rap/isLogin', null, (data) => {
                console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
                if (data.success && data.result) {
                    this.$router.push({
                        path: 'mainpage'
                    })
                } else {
                    this.loginShow = true
                }
            })
        },
        goLogin() {

        },
        goRegister() {
            this.$router.push({
                path: 'register'
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
}

.page_title {
    width: 900px;
    height: 260px;
    margin: 30px auto;
    background: url('../../assets/images/logo.png') 0 center no-repeat;
    background-size: cover;
}

.btn {
    width: 210px;
    height: 94px;
    margin: 30px auto;
    background: url('../../assets/images/enter.png') 0 center no-repeat;
    background-size: cover;
}
</style>