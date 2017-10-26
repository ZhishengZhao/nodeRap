<!--
    created by zhaozhisheng on 08/15/2017
 -->
<template>
    <div>
        <div class="page">
            <el-form ref="form" :model="form">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="Email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="form.gender"></el-input>
                </el-form-item>
                <el-form-item label="自我独白">
                    <el-input v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="头像">
                    <el-input v-model="form.avatar"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.pwd"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="form.pwdConfirm"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="register">注册</el-button>
                </el-form-item>
            </el-form>
            <!-- <joy-cooper></joy-cooper> -->
        </div>
    </div>
</template>
<script>
import rapHead from '../common/raphead.vue'
import joyCooper from '../joy/cooperation.vue'
import { user } from '../api/api.js'
export default {
    name: 'welcome',
    data() {
        return {
            dialogFormVisible: false,
            form: {
                name: '',
                pwd: '',
                pwdConfirm: '',
                email: '',
                gender: '',
                avatar: '',
                desc: ''
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
        register() {
            user.registe(this.form, (data) => {
                if (data.success && data.result) {
                    this.$router.push({
                        path: 'mainpage'
                    })
                } else {
                    alert(data.desc || 'err')
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>