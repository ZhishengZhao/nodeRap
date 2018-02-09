<!--
    created by zhaozhisheng on 07/17/2017
 -->
<template>
    <div class="page_root clearfix">
        <div class="rap_page__compare">
            <div class="container area_left" >
                <p class="json_container json_left" id='container'></p>
            </div>
            <div class="container area_middle">
                <p class="btn_compare" @click="dialogShow = true"></p>
            </div>
            <div class="container area_right">
                <p class="json_container json_right" id='containerReal'></p>
            </div>
            <div class="area_float">
                <rap-dialog id="login_component" v-show="dialogShow">
                    <template slot="content">
                        <h2>对比接口地址</h2>
                        <el-select v-model="rapUrl" placeholder="rap地址">
                            <el-option v-for="item in interList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input v-model="realUrl" placeholder="对比地址"></el-input>
                        <p class="btn__full" @click="doCompare">Compare</p>
                    </template>
                </rap-dialog>
            </div>
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
import { 
    isValidUrl
} from 'src/libs/util_reg.js'
export default {
    filters: {},
    data() {
        return {
            nodeList: [],
            projectId: this.$route.query.id,
            projectName: this.$route.query.name,
            /*---------------*/
            rapUrl: '',
            realUrl: '',
            dialogShow: false,
            interList: [],
            pageList: [],
            rapDataReady: false,
            realDataReady: false,
            rapData: {},
            realData: {}
        }
    },
    computed: {
        dataReady() {
            return this.rapDataReady && this.realDataReady
        }
    },
    watch: {
        dataReady(val) {
            if (val) {
                this.setCompare()
            }
        }
    },
    components: {
        rapHead,
        rapFooter,
        rapDialog
    },
    created() {
        this.getInterfaceList()
    },
    mounted() {
        this.openDialog()
    },
    methods: {
        /* 初始化事件 */
        /**
         * @DateTime 2018-01-19
         * @Author   Zhao       Zhisheng
         * @return   {[type]}   [获取接口列表]
         */
        getInterfaceList() {
            let pid = this.projectId
            inter.getListByPID({ pid }, (data) => {
                if (data && data.result && data.success) {
                    let tempArr = []
                    for (let i = 0; i < data.result.length; i++) {
                        tempArr.push({
                            name: data.result[i].name,
                            id: data.result[i]._id,
                            type: data.result[i].reqType,
                            url: data.result[i].reqUrl,
                            pid: data.result[i].pid
                        })
                    }
                    this.nodeList = tempArr
                    this.arrHandle(tempArr)
                }
            })
        },
        arrHandle(arr) {
            arr.forEach((item) => {
                if (item.pid == 0) {
                    this.pageList.push({
                        value: item.id,
                        label: item.name
                    })
                } else {
                    this.interList.push({
                        value: item.id,
                        label: item.name
                    })
                }
            })
        },
        /**
         * @DateTime 2018-01-19
         * @Author   Zhao       Zhisheng
         * @return   {[type]}   [description]
         */
        openDialog() {
            this.dialogShow = true
        },
        doCompare() {
            if (!this.rapUrl) {
                this.$alert('请选择一个rap接口')
                return
            } 
            if (!isValidUrl(this.realUrl)) {
                this.$alert('请输入一个有效的对比接口地址')
                return
            }
            // 获取对比源数据
            this.getInterfaceParams(this.rapUrl)
            this.getData(this.realUrl)
            // 接入loading -- 获取数据 -- 初始填充数据 -- jc对比 -- 重新格式化数据展示 -- 解除loading
            // 填充json 归整为一个通用函数
        },
        getData(realUrl) {
            common.getAjaxData({ 
                url: realUrl
            }, (data) => {

                data = data.result
                this.realData = data
                this.realDataReady = true

                this.renderJsonDom('#containerReal', data)
            })
        },
        // 获取接口参数
        getInterfaceParams(pid) {
            jsonRecords.getFormatedItem({ pid }, (data) => {
                if (typeof data == 'string') {
                    data = JSON.parse(data)
                }
                this.rapData = data
                this.rapDataReady = true
                this.renderJsonDom('#container', data)
            })
        },
        setCompare() {
            let {
                rapData,
                realData
            } = this.$data
            console.log(rapData, realData)
            let {
                resultRap,
                resultReal
            }  = jc.init(rapData, realData)
            console.log(resultRap, resultReal)

            this.renderJsonDom('#container', resultRap)
            this.renderJsonDom('#containerReal', resultReal)
            this.dialogShow = false
        },
        renderJsonDom(dom, data, color) {
            var options = {
                dom: dom //对应容器的css选择器
            };
            var jf = new JsonFormater(options); //创建对象
            jf.doFormat(data); //格式化json
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
.page_root {
    padding: 3%;
}
.rap_page__compare {
    display: flex;
    display: -webkit-flex;
    position: absolute;
    // align-items: center;
    width: 94%;
    height: 90%;
    background-color: #ccc;
    box-shadow: 0 0 50px #909399;
    border-radius: 20px;
    overflow: hidden;
    .container {
        position: relative;
        flex: 4;
        overflow: auto;
        // padding-top: 50px;
    }
    .area_middle {
        flex: 0;
        flex-basis: 100px;
        // height: 100px;
        padding-top: 30%;
        // margin-top: 200px;
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
    .btn_compare {
        width: 100px;
        height: 100px;
        background: url('../../assets/images/vs.png') 0 center no-repeat;
        background-size: cover;
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