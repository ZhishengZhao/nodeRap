<!--
    created by zhaozhisheng on 07/17/2017
 -->
<template>
    <div class="rap_page__compare">
        <div class="container area_left" >
            <p class="inter_info">
                rap接口: {{interfaceInfo.url}}
                <!-- <el-select v-model="curPageId" placeholder="请选择">
                    <el-option v-for="item in pageOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select> -->
            </p>
            <p class="json_container json_left" id='container'></p>
        </div>
        <div class="container area_middle">
            <p class="btn_compare" @click="doCompare">Compare</p>
        </div>
        <div class="container area_right">
            <p class="inter_info inter_info__right">
                对比接口: {{interfaceInfo.url}}
                <!-- <el-select v-model="curPageId" placeholder="请选择">
                    <el-option v-for="item in pageOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select> -->
            </p>
            <p class="json_container json_right" id='container2'></p>
        </div>
        <div class="area_float">
            <rap-dialog id="login_component">
            <template slot="content" v-show="show">
                <h2>对比接口地址</h2>
                <el-select v-model="rapUrl" placeholder="rap地址">
                    <el-option v-for="item in pageOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-input v-model="realUrl" placeholder="对比地址"></el-input>
                <p class="btn__full" @click="doLogin">Compare</p>
            </template>
        </rap-dialog>
        </div>
    </div>
</template>
<script>
import rapHead from 'common/raphead.vue'
import rapFooter from 'common/footer.vue'
import { project, inter, jsonRecords, common } from 'api/api.js'
import { JsonFormater } from 'src/libs/jsonformate.js'
import rapDialog from 'src/components/dialog/index.vue'
import 'src/libs/jc/jsoncompare_v3.js'
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
            leafNodes: [],
            /*---------------*/
            rapUrl: '',
            realUrl: ''
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
                    // this.pageOptions.push({
                    //     value: arr[i].id,
                    //     label: arr[i].name
                    // })
                } else {
                    this.pageOptions.push({
                        value: arr[i].id,
                        label: arr[i].name
                    })
                    // childArr.push(arr[i])
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

                // let contentInter = data
                var options = {
                    dom: '#container2' //对应容器的css选择器
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
// div {
//     border: 1px solid #000;
// }

.rap_page__compare {
    display: flex;
    display: -webkit-flex;
    position: absolute;
    width: 100%;
    height: 100%;
    .container {
        position: relative;
        flex: 4;
        overflow: auto;
        padding-top: 50px;
    }
    .area_middle {
        flex: 0;
        flex-basis: 100px;
    }
    .json_container {
        width: 100%;
        height: 100%;
        background-color: #272822;
    }
    .inter_info {
        position: absolute;
        left: 10px;
        top: 0;
        line-height: 50px;
    }
}
.el-input__icon {
    display: none;
}
.area_float div {
    width: 100%;
    margin-bottom: 6px;
}
// .input__login {
//     display: block;
//     width: 400px;
//     height: 50px;
//     line-height: 50px;
//     text-indent: 10px;
//     margin: 10px auto;
//     border: 1px solid rgba(50,58,69,.2);
//     border-radius: 5px;
//     font-size: 18px;
// }
.btn__full {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 25px;
    text-align: center;
    margin: 10px auto;
    background: #ccc;
    border-radius: 20px;
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