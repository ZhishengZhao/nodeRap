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
        <!-- <div>
            <form action="" method="post" class="dark-matter">
                <h1>Contact Form
            <span>Please fill all the texts in the fields.</span>
            </h1>
                <label>
                    <span>Your Name :</span>
                </label>
                <label>
                    <span>Your Email :</span>
                    <input id="email" type="email" name="email" placeholder="Valid Email Address" />
                </label>
                <label>
                    <span>Message :</span>
                    <textarea id="message" name="message" placeholder="Your Message to Us"></textarea>
                </label>
                <label>
                    <span>Subject :</span>
                    <select name="selection">
                        <option value="Job Inquiry">Job Inquiry</option>
                        <option value="General Question">General Question</option>
                    </select>
                </label>
                <label>
                    <span>&nbsp;</span>
                    <input type="button" class="button" value="Send" />
                </label>
            </form>
        </div> -->
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
            _post('rap/registe', this.form, (data) => {
                console.log('registeregisteregisteregisteregisteregiste', data)
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
// .page {
//     width: 1080px;
//     height: 678px;
//     margin: 80px auto;
//     border-radius: 20px;
//     overflow: hidden;
//     border: 10px dashed #000;
//     .el-form {
//         padding: 100px;
//     }
//     .el-form-item__label {
//         width: 200px;
//     }
//     .el-form-item__content {
//         display: inline-block;
//         width: 300px;
//     }
// }
// .dark-matter {
//     margin-left: auto;
//     margin-right: auto;
//     max-width: 500px;
//     background: #555;
//     padding: 20px 30px 20px 30px;
//     font: 12px "Helvetica Neue", Helvetica, Arial, sans-serif;
//     color: #D3D3D3;
//     text-shadow: 1px 1px 1px #444;
//     border: none;
//     border-radius: 5px;
//     -webkit-border-radius: 5px;
//     -moz-border-radius: 5px;
// }
// .dark-matter h1 {
//     padding: 0px 0px 10px 40px;
//     display: block;
//     border-bottom: 1px solid #444;
//     margin: -10px -30px 30px -30px;
// }
// .dark-matter h1>span {
//     display: block;
//     font-size: 11px;
// }
// .dark-matter label {
//     display: block;
//     margin: 0px 0px 5px;
// }
// .dark-matter label>span {
//     float: left;
//     width: 20%;
//     text-align: right;
//     padding-right: 10px;
//     margin-top: 10px;
//     font-weight: bold;
// }
// .dark-matter input[type="text"],
// .dark-matter input[type="email"],
// .dark-matter textarea,
// .dark-matter select {
//     border: none;
//     color: #525252;
//     height: 25px;
//     line-height: 15px;
//     margin-bottom: 16px;
//     margin-right: 6px;
//     margin-top: 2px;
//     outline: 0 none;
//     padding: 5px 0px 5px 5px;
//     width: 70%;
//     border-radius: 2px;
//     -webkit-border-radius: 2px;
//     -moz-border-radius: 2px;
//     -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
//     background: #DFDFDF;
// }
// .dark-matter select {
//     // background: #DFDFDF url('down-arrow.png') no-repeat right;
//     appearance: none;
//     -webkit-appearance: none;
//     -moz-appearance: none;
//     text-indent: 0.01px;
//     text-overflow: '';
//     width: 70%;
//     height: 35px;
//     color: #525252;
//     line-height: 25px;
// }
// .dark-matter textarea {
//     height: 100px;
//     padding: 5px 0px 0px 5px;
//     width: 70%;
// }
// .dark-matter .button {
//     background: #FFCC02;
//     border: none;
//     padding: 10px 25px 10px 25px;
//     color: #585858;
//     border-radius: 4px;
//     -moz-border-radius: 4px;
//     -webkit-border-radius: 4px;
//     text-shadow: 1px 1px 1px #FFE477;
//     font-weight: bold;
//     box-shadow: 1px 1px 1px #3D3D3D;
//     -webkit-box-shadow: 1px 1px 1px #3D3D3D;
//     -moz-box-shadow: 1px 1px 1px #3D3D3D;
// }
// .dark-matter .button:hover {
//     color: #333;
//     background-color: #EBEBEB;
// }
</style>