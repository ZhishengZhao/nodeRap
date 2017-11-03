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
            <div v-show="dialogFormVisible">
                <div class="mask"></div>
                <div class="dialog__project--edit">
                    <h2>Project Info</h2>
                    <!-- <div>
                        <span>项目名称：</span>
                        <input type="text" class="input__project--edit" v-model="form.name">
                    </div>
                    <div>
                        <span>项目描述：</span>
                        <input type="text" class="input__project--edit" v-model="form.desc">
                    </div>
                    <div>
                        <span>项目成员：</span>
                        <input type="text" class="input__project--edit" v-model="form.paties">
                    </div> -->
                    
                    <input type="text" class="disblock input__project--edit" v-model="form.name" placeholder="项目名称">
                    <input type="text" class="disblock input__project--edit" v-model="form.desc" placeholder="项目描述">
                    <input type="text" class="disblock input__project--edit" v-model="form.paties" placeholder="项目成员">
                    <el-button type="primary" @click="projectAddConfirm">确定</el-button>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import rapHead from '../common/raphead.vue'
import { project, userProject } from '../api/api.js'
export default {
    name: 'mainpage',
    props: {
        config: {
            type: Object
        }
    }, 
    filters: {
        txt(val) {
            return val + ''
        }
    },
    data() {
        return {
            originProjectList: [],
            txt: ''
        }
    },
    watch: {
        filterText(curVal, oldVal) {
            this.search(curVal)
        },
        config: {
            handler(curVal, oldValue) {
                if (this.isApp && !this.showH5Bar) {
                    axdApp.send({
                        module: 'webview',
                        method: 'configNavigationBar',
                        params: this.formatedConfigApp,
                        callback: function(data) {}
                    })
                }
            },
            deep: true
        }
    },
    computed: {
        ...mapState({
            bannerImgs: state => state.product.initData.desc.bannerImgs,
            buyType: state => state.product.initData.trade.buyType
        })
    },
    components: {

    },
    mounted() {

    },
    methods: {
        ...mapMutations([
            'updateInteractData'
        ])
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
</style>