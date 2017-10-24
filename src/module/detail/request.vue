<!--
    created by zhaozhisheng on 07/17/2017
 -->
<template>
    <div class="rap_page">
        <rap-head></rap-head>
        <div class="content_top wid1080">
            <el-row :gutter="20">
                <div class="block fr">
                </div>
            </el-row>
        </div>
        <div class="content wid1080">
            <el-row :gutter="20">
                <el-col :span="6" class="pad20 grid-content bg-purple-dark bor20">
                    <div class="grid-content bg-purple">
                        <el-tree :data="interList" :props="defaultProps" @node-click="iterfaceNodeClick"></el-tree>
                    </div>
                </el-col>
                <el-col :span="18" class="pad20 grid-content bg-purple-dark bor20">
                    <div class="content_inter">
                        <div id='container'></div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import rapHead from '../common/raphead.vue'
import { _get, _post } from '../../libs/base.js'
import { JsonFormater } from '../../libs/jsonformate.js'
export default {
    filters: {},
    data() {
        return {
            interList: [],
            defaultProps: {
                label: 'name'
            },
            curIterfaceId: '',
            interfaceInfo: {
                name: '',
                type: '',
                url: ''
            },
            contentInter: ''
        }
    },
    computed: {

    },
    components: {
        rapHead
    },
    mounted() {
        this.getInterfaceList()
    },
    methods: {
        getInterfaceList() {
            _post('rap/getInterfaceList', {}, (data) => {
                if (data && data.result && data.success) {
                    let i = 0
                    let temparr = []
                    for (; i < data.result.length; i++) {
                        temparr.push({
                            name: data.result[i].name,
                            id: data.result[i]._id,
                            type: data.result[i].reqType,
                            url: data.result[i].reqUrl
                        })
                    }
                    this.interList = temparr
                    this.iterfaceNodeClick(this.interList[0])
                }
            })
        },
        iterfaceNodeClick(data) {
            let iterId = data.id
            let iterName = data.name
            this.curIterfaceId = data.id
            this.interfaceInfo.name = data.name
            this.interfaceInfo.type = data.type
            this.interfaceInfo.url = data.url
            this.getInterfaceParams(iterId)
        },
        getInterfaceParams(iterId) {
            _post('rap/getIterParamsByIterId', { iterId }, (data) => {
                if (data && data.result && data.success) {
                    let contentInter = data.result
                    var options = {
                        dom: '#container' //对应容器的css选择器
                    };
                    var jf = new JsonFormater(options); //创建对象
                    jf.doFormat(contentInter); //格式化json
                }
            })
        }
    }
}
</script>
<style lang="scss">
@import '../../assets/styles/jsonformate.css';

.content_inter {
    padding-top: 20px;
}
</style>