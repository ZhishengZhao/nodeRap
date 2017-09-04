<!--
    created by zhaozhisheng on 08/15/2017
 -->
<template>
    <div>
        <rap-head></rap-head>
        <div class="page_main wid1080 content">
            <el-row :gutter="20">
                <el-col :span="6" class="pad20 grid-content bg-purple-dark bor20">
                    <h3>我的项目</h3>
                    <h3>分组列表</h3>
                    <el-tree :data="interList" :props="defaultProps" @node-click="getProjectsByCondition"></el-tree>
                </el-col>
                <el-col :span="18" class="pad20 grid-content bg-purple-dark bor20">
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
                </el-col>
            </el-row>            
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
    </div>
</template>
<script>
import { _get, _post } from '../../store/base.js'
import rapHead from '../common/raphead.vue'
export default {
    name: 'mainpage',
    data() {
        return {
            projectList: [],
            dialogFormVisible: false,
            form: {
                name: '',
                desc: ''
            },
            interList: [],
            defaultProps: {
                label: 'name'
            }
        }
    },
    computed: {

    },
    components: {
        rapHead
    },
    mounted() {
        this.init()
        this.getInterfaceList()
    },
    methods: {
        init() {
            this.getProjectList()
        },
        goPage(_id) {
            this.$router.push({
                path: 'detail',
                query: {
                    id: _id
                },
                params: {
                    id: _id
                }
            })
        },
        goAddProject() {
            this.dialogFormVisible = true
        },
        projectAddConfirm() {
            _post('project/add', this.form, (data) => {
                if (data.success) {
                    this.dialogFormVisible = false
                    this.getProjectList()
                }
            })
        },
        getProjectList() {
            _post('project/getAll', this.form, (data) => {
                if (data.success) {
                    this.projectList = data.result
                }
            })
        },
        getProjectsByCondition() {

        },
        getInterfaceList() {
            _post('rap/getInterfaceList', {}, (data) => {
                if (data && data.result && data.success) {
                    let i = 0
                    let temparr = []
                    for(; i < data.result.length; i++) {
                        temparr.push({
                            name: data.result[i].name,
                            id: data.result[i]._id,
                            type: data.result[i].reqType,
                            url: data.result[i].reqUrl
                        })
                    }
                    this.interList = temparr
                }
            })
        }
    }
}

</script>
<style lang="scss">
.unit_project {
    float: left;
    width: 200px;
    height: 130px;
    border: 1px solid #DDD;
    border-radius: 5px;
    margin: 20px 20px 0 0;
    padding: 10px;
}
.unit_project__title {
    font-size: 18px;    
    color: #6D8095;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.unit_project__desc {
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
