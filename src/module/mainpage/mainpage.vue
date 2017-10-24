<!--
    created by zhaozhisheng on 08/15/2017
 -->
<template>
    <div>
        <rap-head></rap-head>
        <div class="page_main wid1080 content">
            <el-row :gutter="20">
                <section class="area_projects">
                    <div class="area_check">
                        <!-- <ul class="switch_check">
                            <li @click="getList('mine')" class="active">我的</li>
                            <li @click="getList('other')">别人的</li>
                        </ul> -->
                        <p class="text_filter_container fr">
                            <el-input placeholder="输入关键字进行过滤" class="text_filter_cotent" v-model="filterText"></el-input>
                            <el-button type="info" class="text_filter_search" @click="showFilter">搜索</el-button>
                        </p>
                    </div>
                    <div v-for="item in projectList" class="unit_project" @mouseover="showEditPanel(item._id)" @mouseleave="curFocusId = -1" >
                        <div @click="goPage(item)" >
                            <p class="unit_project__title">
                                {{item.name}}
                            </p>
                            <p class="unit_project__desc">
                                {{item.desc}}
                            </p>
                        </div>
                        <p class="part_edit" v-show="item._id == curFocusId">
                            <ul>
                                <li @click="goEdit(item)">E</li>
                                <li @click="goDelete(item)">D</li>
                            </ul>
                        </p>
                    </div>
                    <div class="unit_project unit_project__plus" @click="goAddProject">
                    </div>
                </section>
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
import { _get, _post } from '../../libs/base.js'
import rapHead from '../common/raphead.vue'
export default {
    name: 'mainpage',
    data() {
        return {
            originProjectList: [],
            projectList: [],
            dialogFormVisible: false,
            form: {
                _id: '',
                name: '',
                desc: ''
            },
            interList: [],
            defaultProps: {
                label: 'name'
            },
            filterText: '',
            curFocusId: '',
            editFlag: false
        }
    },
    watch: {
        // filterText(curVal, oldVal) {
        //     this.showFilter(curVal)
        // }
    },
    computed: {

    },
    components: {
        rapHead
    },
    mounted() {
        this.getProjectList()
    },
    methods: {
        goPage(item) {
            this.$router.push({
                path: 'detail',
                query: {
                    id: item._id,
                    name: item.name
                }
            })
        },
        goAddProject() {
            this.dialogFormVisible = true
        },
        projectAddConfirm() {
            if (this.editFlag) {
                _post('rap/updateProjectById', this.form, (data) => {
                    if (data.success) {
                        this.dialogFormVisible = false
                        this.getProjectList()
                    }
                })
            } else {
                _post('rap/add', this.form, (data) => {
                    if (data.success) {
                        this.dialogFormVisible = false
                        this.getProjectList()
                    }
                })
            }
        },
        getProjectList() {
            _get('rap/getAll', null, (data) => {
                if (data.success) {
                    this.projectList = data.result
                    this.originProjectList = data.result
                }
            })
        },
        getList(type) {

        },
        showEditPanel(_id) {
            this.curFocusId = _id
        },
        goEdit(item) {
            this.editFlag = true
            Object.assign(this.form, item)
            this.dialogFormVisible = true
        },
        goDelete(item) {
            let _id = item._id
            if (window.confirm('你是认真的么，删了可就没了')) {
                _get('rap/deleteProjectById', {_id}, (data) => {
                    if (data.success) {
                        this.getProjectList()
                    }
                })
            }
        },
        showFilter() {
            let val = this.filterText
            console.log('filter txt=' + val)
            if (!val) {
                this.projectList = this.originProjectList
            } else {
                let temp = this.originProjectList
                let temparr = []
                console.log('filter temp=', temp)
                for (let i = 0; i < temp.length; i++) {
                    if (temp[i].name.indexOf(val) !== -1 || temp[i].desc.indexOf(val) !== -1) {
                        temparr.push(temp[i])
                    }
                }

                this.projectList = temparr
            }
        }
        // ,
        // getInterfaceList() {
        //     _post('rap/getInterfaceList', {}, (data) => {
        //         if (data && data.result && data.success) {
        //             let i = 0
        //             let temparr = []
        //             for (; i < data.result.length; i++) {
        //                 temparr.push({
        //                     name: data.result[i].name,
        //                     id: data.result[i]._id,
        //                     type: data.result[i].reqType,
        //                     url: data.result[i].reqUrl
        //                 })
        //             }
        //             this.interList = temparr
        //         }
        //     })
        // }
    }
}
</script>
<style lang="scss">
.unit_project {
    position: relative;
    float: left;
    width: 200px;
    height: 130px;
    border: 1px solid #DDD;
    border-radius: 5px;
    margin: 10px 30px;
    padding: 10px;
    .part_edit {
        position: absolute;
        right: -20px;
        top: -1px;
        width: 20px;
        height: 130px;
        background: #ad9a99;
        border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;
        li {
            list-style: none;
            line-height: 65px;
            text-align: center;
            font-weight: bold;
            font-size: 16px;
            &:first-child {
                border-bottom: 1px solid #fff;
            }
        }
    }
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
.clearfix:after {
    content: '.';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
    font-size: 0;
}

.clearfix {
    display: block;
}

.area_check {
    height: 50px;
    .switch_check {
        display: inline-block;
        padding-top: 7px;
        li {
            float: left;
            list-style: none;
            line-height: 50px;
            display: inline-block;
            width: 60px;
            height: 36px;
            text-align: center;
            line-height: 36px;
            border: 1px solid #ad9a99;
            border-radius: 2px;
        }
        .active {
            background: #ad9a99;
        }
    }
}

.text_filter_container {
    width: 275px;
    margin-top: 7px;
    .text_filter_cotent {
        width: 200px;
    }
    .text_filter_search {
        width: 70px;
    }
}

.fr {
    float: right;
}

</style>