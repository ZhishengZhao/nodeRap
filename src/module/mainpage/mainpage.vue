<!--
    created by zhaozhisheng on 08/15/2017
 -->
<template>
    <div class="page wid1080">
        <h1>我的项目</h1>
        <hr/>
        <section class="area_projects">
            <div v-for="item in projectList" class="unit_project" @click="goPage(item._id)">
                <p class="unit_project__title">
                    {{item.name}}
                </p>
                <p class="unit_project__desc">
                    {{item.desc}}
                </p>
            </div>
            <div class="unit_project unit_project__plus" @click="goAddProject">
            </div>
        </section> 
        <el-dialog :visible.sync="dialogFormVisible">
          <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="项目名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="项目描述">
                <el-input v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="projectAddConfirm">确定</el-button>
                <el-button @click="dialogFormVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import { _get, _post } from '../../store/base.js'

export default {
    name: 'mainpage',
    data() {
        return {
            projectList: [],
            dialogFormVisible: false,
            form: {
                name: '',
                desc: ''
            }
        }
    },
    computed: {

    },
    components: {
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.getProjectList()
        },
        goPage(_id) {
            console.log('_id', typeof _id)
            this.$router.push({
                path: 'detail',
                quert: {
                    id: _id
                }
            })
        },
        goAddProject() {
            this.dialogFormVisible = true
        },
        projectAddConfirm() {
            _post('project/add', this.form, (data) => {
                console.log('result',data)
                if (data.success) {
                    this.dialogFormVisible = false
                    this.getProjectList()
                }
            })
        },
        getProjectList() {
            _post('project/getAll', this.form, (data) => {
                console.log('result',data)
                if (data.success) {
                    this.projectList = data.result
                }
            })
            this.projectList.push({
                id: '',
                name: '项目测试',
                desc: '',
                owner: ''
            })
        }
    }
}

</script>
<style lang="scss">
.page {
    padding-top: 50px;
}
.unit_project {
    float: left;
    width: 200px;
    height: 130px;
    border: 1px solid #DDD;
    border-radius: 5px;
    margin: 20px 20px 0 0;
    padding: 10px;
    // text-align: center;
    &:nth-child(5) {
        margin-right: 0;
    }
}
.unit_project__title {
    // line-height: 30px;
    // font-size: 15px;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
    font-size: 18px;    
    color: #6D8095;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.unit_project__desc {
    // height: 50px;
    // width: 200px;
    // line-height: 30px;
    // text-indent: 30px;
    // font-size: 15px;
    // overflow: hidden;
    // text-overflow: ellipsis;
    color: rgba(0, 0, 0, 0.3);
    text-overflow: ellipsis;
    width: 182px;
    white-space: inherit;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
}
.unit_project__plus {
    border: 1px dashed #DDD;
    position: relative;
    cursor: pointer;
    opacity: 0.7;
    background: url('../../assets/images/plus.png') no-repeat center center;
    background-color: #FFF;
    -webkit-transition: .3s;
    -moz-transition: .3s;
    -ms-transition: .3s;
    -o-transition: .3s;
    transition: .3s;
}
</style>
