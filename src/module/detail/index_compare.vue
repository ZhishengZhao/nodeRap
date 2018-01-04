<!--
    created by zhaozhisheng on 01/04/2018
 -->
<template>
    <div class="rap_page">
        <rap-head></rap-head>
        <div class="content wid1080">
            <el-row :gutter="20" class="border">
                <el-col :span="6" class="pad20 grid-content bg-purple-dark bor20 border">
                    <div class="grid-content bg-purple">
                        <h3>{{projectName}}</h3>
                        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
                        </el-input>
                        <el-tree ref="interTree" :data="interList" :props="defaultProps" @node-click="iterfaceNodeClick" :filter-node-method="filterNode">
                        </el-tree>
                    </div>
                </el-col>
                <el-col :span="18" class="pad20 grid-content bg-purple-dark bor20 border">
                    <div>
                        <h3>对比接口信息</h3>
                    </div>
                    <div class="grid-content bg-purple-light border">
                        <h3>接口参数</h3>
                        
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import rapHead from 'common/raphead.vue'
import rapFooter from 'common/footer.vue'
import interfaceDetail from './interfacedetail.vue'
import { project, inter, jsonRecords } from 'api/api.js'
import { JsonFormater } from 'src/libs/jsonformate.js'
import rapDialog from 'src/components/dialog/index.vue'
import { jsonlint } from 'src/libs/jsonlint/jsonlint.js'
export default {
    filters: {},
    data() {
        return {
            interList: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            form: {
                name: '',
                type: '',
                link: '',
                desc: ''
            },
            curIterfaceId: '',
            curIterfaceName: '',
            curPageId: '',
            interfaceInfo: {
                name: '',
                type: '',
                url: '',
                projectId: this.$route.query.id
            },
            projectId: this.$route.query.id,
            projectName: this.$route.query.name,
            filterText: ''
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
        interfaceDetail
    },
    mounted() {
        this.getInterfaceList()
    },
    methods: {
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
        /* 非初始化--交互事件 */
        // 左侧列表点击
        iterfaceNodeClick(data) {
            if (data.id == '0') {
                this.curPageId = data.pid
            } else if (data.pid != '0' && data.id != '0') {
                Object.assign(this.interfaceInfo, data)
                this.curIterfaceId = data.id
                this.curIterfaceName = data.name
            } else {
                this.curPageId = data.id
            }
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

.border {
    border: 1px solid transparent;
}
</style>