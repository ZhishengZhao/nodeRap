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
                        <p class="switch_check">
                            <el-button @click="getList('all')" type="primary">所有的</el-button>
                            <el-button @click="getList('mine')" type="primary">我创建的</el-button>
                            <el-button @click="getList('myjoin')" type="success">我参与的</el-button>
                        </p>
                        <p class="text_filter_container fr">
                            <el-input placeholder="输入关键字进行过滤" class="text_filter_cotent" v-model="filterText"></el-input>
                            <el-button type="info" class="text_filter_search" @click="search">搜索</el-button>
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
            <rap-dialog v-show="dialogFormVisible">
                <div slot="content">
                    <h2>Project Info</h2>
                    <input type="text" class="disblock input__project--edit" v-model="form.name" placeholder="项目名称">
                    <input type="text" class="disblock input__project--edit" v-model="form.desc" placeholder="项目描述">
                    <input type="text" class="disblock input__project--edit" v-model="form.paties" placeholder="项目成员">
                    <el-button type="primary" @click="projectAddConfirm">确定</el-button>
                    <el-button @click="projectAddCancel">取消</el-button>
                </div>
            </rap-dialog>
            <rap-dialog>
                <div slot="content">
                    <div class="alert__title">
                        这里是一个测试的title
                    </div>
                    <div class="alert__content">
                        谁知道这里会是什么
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea pariatur amet quisquam aspernatur adipisci neque qui corporis enim eius error explicabo cum ipsam et quae nemo cumque, distinctio eligendi nostrum.
                    </div>
                    <div class="alert__btns">
                        <p class="rap--btn">呵呵</p>
                    </div>
                </div>
            </rap-dialog>
        </div>
    </div>
</template>
<script>
import rapDialog from 'src/components/dialog/index.vue'
import rapHead from 'common/raphead.vue'
import { project, userProject } from 'api/api.js'
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
                desc: '',
                paties: '',
                partyArr: [],
                isPartyChanged: false
            },
            interList: [],
            defaultProps: {
                label: 'name'
            },
            filterText: '',
            curFocusId: '',
            isEdit: false,
            belongs: 'all',
            hideDelete: false
        }
    },
    computed: {

    },
    components: {
        rapHead,
        rapDialog
    },
    mounted() {
        this.getList('all')
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
            this.form.partyArr = JSON.stringify(this.form.paties.split(','));
            let action = this.isEdit ? 'update' : 'add'

            project[action](this.form, (data) => {
                if (data.success) {
                    this.dialogFormVisible = false
                    this.getList('all')
                    this.clearForm()
                }
            })
        },
        projectAddCancel() {
            this.dialogFormVisible = false
            this.clearForm()
        },
        getList(type) {
            if (type === 'all') {
                this.belongs = 'all'
                project.getList(null, (data) => {
                    if (data.success) {
                        this.projectList = data.result
                        this.originProjectList = data.result
                    }
                })
            } else if (type === 'mine') {
                this.belongs = 'mine'
                project.getMine(null, (data) => {
                    if (data.success) {
                        this.projectList = data.result
                        this.originProjectList = data.result
                    }
                })
            } else {
                this.belongs = 'myjoin'
                userProject.getMyJoins(null, (data) => {
                // project.getMyJoins(null, (data) => {
                    if (data.success) {
                        this.projectList = data.result
                        this.originProjectList = data.result
                    }
                })
            }
        },
        showEditPanel(_id) {
            if (this.belongs === 'mine') {
                this.curFocusId = _id
            }
        },
        goEdit(item) {
            this.isEdit = true
            Object.assign(this.form, item)
            this.dialogFormVisible = true
        },
        goDelete(item) {
            let _id = item._id
            if (window.confirm('你是认真的么，删了可就没了')) {
                project.delete({_id}, (data) => {
                    if (data.success) {
                        this.getList('all')
                    }
                })
            }
        },
        search() {
            let val = this.filterText
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
        },
        clearForm() {
            this.form = {
                _id: '',
                name: '',
                desc: '',
                paties: '',
                partyArr: [],
                isPartyChanged: false
            }
        }
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
        // background: #ad9a99;
        border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;
        li {
            list-style: none;
            line-height: 65px;
            text-align: center;
            font-weight: bold;
            font-size: 16px;
            border-bottom-right-radius: 5px;
            border-top-right-radius: 5px;
            &:first-child {
                border-bottom: 1px solid #fff;
                background-color: #67c23a;
            }
            &:nth-child(2) {
                background-color: #d62316;
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

.input__project--edit {
    width: 400px;
    height: 50px;
    line-height: 50px;
    text-indent: 10px;
    margin: 10px auto;
    border: 1px solid rgba(50,58,69,.2);
    border-radius: 5px;
    font-size: 18px;   
}

.alert__title {
    font-size: 20px;
    text-align: center;
    line-height: 28px;
}
.alert__content {
    // text-align: center;
    font-size: 18px;
    line-height: 22px;
}
.alert__btns {
    font-size: 20px;
    line-height: 28px;
}
.rap--btn {
    display: inline-block;
    width: auto;
    height: 28px;
    border-radius: 10px;
    font-size: 18px;
    line-height: 27px;
    padding: 0 20px;
    background-color: #409eff;
}

</style>