<!--
    created by zhaozhisheng on 07/17/2017
 -->
<template>
    <div class="rap_page__compare">
        <div class="area_left">
            <div class="part_top">
                <h3>{{projectName}}</h3>
                <el-input placeholder="输入关键字进行过滤" v-model="filterText">
                </el-input>
                <el-tree ref="interTree" :data="interList" :props="defaultProps" @node-click="iterfaceNodeClick" :filter-node-method="filterNode">
                </el-tree>
            </div>
            <div class="area_interinfo">
                <h3>接口信息</h3>
                <p>
                    <span class="wd100">
                        rap地址：
                    </span>
                    <span class="bg_url">
                        {{interfaceInfo.url}}
                    </span>
                </p>
                <p>
                    <span class="wd100">
                        对比接口地址：
                    </span>
                    <span>
                        <!-- <input type="text" class="" v-model="realAddress"> -->
                        <textarea class="input_address" v-model="realAddress"></textarea>
                    </span>
                </p>
                <div class="block_preview">
                    <a href="javascript:;" target="blank" @click="doCompare">
                        对比
                    </a>
                </div>
            </div>
        </div>
        <div class="area_right">
            <h3>接口参数</h3>
            <div class="json_container json_left" id='container'></div>
            <div class="json_container json_right" id='container2'></div>
        </div>
        <div class="other">
            <el-dialog class="bor-radius_50" :visible.sync="addPageShow">
                <el-form ref="form" :model="formPage" label-width="80px">
                    <el-form-item label="名称">
                        <el-input v-model="formPage.name"></el-input>
                    </el-form-item>
                    <el-form-item label="说明">
                        <el-input type="textarea" v-model="formPage.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="">确定</el-button>
                        <el-button @click="addPageShow = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import rapHead from 'common/raphead.vue'
import rapFooter from 'common/footer.vue'
import { project, inter, jsonRecords, common } from 'api/api.js'
import { JsonFormater } from 'src/libs/jsonformate.js'
import rapDialog from 'src/components/dialog/index.vue'
export default {
    filters: {},
    data() {
        return {
            realAddress: '',
            interList: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            dialogFormVisible: false,
            form: {
                name: '',
                type: '',
                link: '',
                desc: ''
            },
            formPage: {
                name: '',
                desc: ''
            },
            curIterfaceId: '',
            curIterfaceName: '',
            curPageId: '',
            editFlag: false,
            interEditFlag: false,
            interfaceInfo: {
                name: '',
                type: '',
                url: '',
                projectId: this.$route.query.id
            },
            projectId: this.$route.query.id,
            projectName: this.$route.query.name,
            /* 接口内容 */
            responseParams: '',
            updateFlag: false,
            addPageShow: false,
            filterText: '',
            pageOptions: [],
            leafNodes: []
        }
    },
    watch: {
        filterText(val) {
            this.$refs.interTree.filter(val);
        }
    },
    computed: {

    },
    components: {
        rapHead,
        rapFooter,
        rapDialog
    },
    mounted() {
        this.getInterfaceList()
    },
    methods: {
        doCompare() {
            common.getAjaxData({ 
                url: this.realAddress
            }, (data) => {
                data = data.result

                var options = {
                    dom: '#container2' //对应容器的css选择器
                };
                var jf = new JsonFormater(options); //创建对象
                jf.doFormat(data); //格式化json
            })
        },
        /* 初始化事件 */
        // 获取接口列表
        getInterfaceList() {
            let pid = this.projectId
            inter.getListByPID({ pid }, (data) => {
                if (data && data.result && data.success) {
                    let temparr = []
                    for (let i = 0; i < data.result.length; i++) {
                        temparr.push({
                            name: data.result[i].name,
                            id: data.result[i]._id,
                            type: data.result[i].reqType,
                            url: data.result[i].reqUrl,
                            pid: data.result[i].pid
                        })
                    }
                    this.interList = this.arrHandle(temparr)
                    // console.log('interList', this.interList)
                    if (this.leafNodes.length) {
                        this.iterfaceNodeClick(this.leafNodes[0])
                    }
                }
            })
        },
        arrHandle(arr) {
            let pidArr = []
            let childArr = []
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].pid == 0) {
                    arr[i].children = []
                    pidArr.push(arr[i])
                    this.pageOptions.push({
                        value: arr[i].id,
                        label: arr[i].name
                    })
                } else {
                    childArr.push(arr[i])
                }
            }
            this.leafNodes = childArr
            for (let m = 0; m < childArr.length; m++) {
                for (let n = 0; n < pidArr.length; n++) {
                    if (childArr[m].pid == pidArr[n].id) {
                        pidArr[n].children.push(childArr[m])
                    }
                }
            }

            return pidArr
        },
        // 左侧列表点击
        iterfaceNodeClick(data) {
            if (data.id == '0' && this.editFlag) {
                this.dialogFormVisible = true
                this.curPageId = data.pid
            } else if (data.pid != '0' && data.id != '0') {
                Object.assign(this.interfaceInfo, data)
                this.curIterfaceId = data.id
                this.curIterfaceName = data.name
                this.getInterfaceParams(data.id)
            } else {
                this.curPageId = data.id
            }
        },
        // 获取接口参数
        getInterfaceParams(pid) {
            jsonRecords.getFormatedItem({ pid }, (data) => {
                if (typeof data == 'string') {
                    data = JSON.parse(data)
                }

                let contentInter = data
                var options = {
                    dom: '#container' //对应容器的css选择器
                };
                var jf = new JsonFormater(options); //创建对象
                jf.doFormat(contentInter); //格式化json
            })
        },
        /* 非初始化--辅助处理 */
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        }
    }
}
</script>
<style lang="scss">
@import '../../assets/styles/jsonformate.css';
* {
    box-sizing: border-box;
}
.rap_page__compare {
    padding: 15px;
    background-color: #f2f2f2;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
.area_left {
    padding: 15px;
    position: absolute;
    left: 0;
    top: 0;
    width: 300px;
    overflow: auto;
    .part_top {
        height: 50%;
        min-height: 400px;
        overflow: auto;
    }
    .area_interinfo {
        position: relative;
        height: 50%;
        h3 {
            font-size: 20px;
            border-bottom: 1px solid #a8a3a3;
            margin-bottom: 10px;
        }
        .input_address {
            width: 270px;
            height: 80px;
            text-indent: 5px;
            font-size: 16px;
        }
        .bg_url {
            background-color: #fff;
            border: 1px solid #ccc;
            text-indent: 5px;
            font-size: 16px;
            font-weight: normal;
        }
        p {
            font-size: 16px;
            span {
                display: block;
                font-weight: bold;
                line-height: 44px;
            }
            input {
                display: inline-block;
                // min-width: 500px;
                height: 32px;
                border: 1px solid #ccc;
                border-radius: 5px;
                text-indent: 6px;
                line-height: 32px;
                font-size: 15px;
            }
        }

        .block_preview {
            width: 100%;
            height: 80px;
            border: 4px solid #000;
            border-radius: 10px;
            text-align: center;
            padding-left: 0;
            a {
                font-size: 30px;
                line-height: 72px;
                text-decoration: none;
                color: #000;
            }
        }
    }
}

.area_right {
    width: 100%;
    padding-left: 320px;
    .json_container {
        display: inline-block;
        width: 48% !important;
        min-width: 0 !important;
        margin-right: 2%;
        float: left;
    }
}

.border {
    border: 1px solid transparent;
}

.el-dialog--small {
    // width: auto;
    border-radius: 10px;
}

.el-form-item__content {
    // text-align: center;
}
.other .el-input__icon {
    display: none;
}

#container {
    background-color: #272822;
    min-height: 350px;
    width: 100%;
    overflow: scroll;
}

#container2 {
    background-color: #272822;
    min-height: 350px;
    width: 100%;
    overflow: scroll;
}

.content_inter {
    position: relative;
    padding-top: 20px;
    .json_container {
        display: inline-block;
        width: 48% !important;
        min-width: 0 !important;
        margin-right: 2%;
        float: left;
    }
}

.content_inter_2 {
    padding-top: 20px;
}


.item_margin0 {
    .el-form-item {
        margin-bottom: 0;
    }
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


</style>