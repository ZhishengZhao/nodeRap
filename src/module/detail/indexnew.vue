<!--
    created by zhaozhisheng on 07/17/2017
 -->
<template>
    <div class="rap_page">
        <rap-head></rap-head>
        <div class="content wid1080">
            <el-row :gutter="20" class="border">
                <div class="block fr">
                    <el-button type="info" @click="editFlag = true">编辑</el-button>
                    <el-button type="info" @click="editFlag = false">取消</el-button>
                </div>
            </el-row>
            <el-row :gutter="20" class="border">
                <el-col :span="6" class="pad20 grid-content bg-purple-dark bor20 border">
                    <div class="grid-content bg-purple">
                        <h3>接口列表</h3>
                        <el-tree :data="interList" :props="defaultProps" @node-click="iterfaceNodeClick"></el-tree>
                        <el-button v-if="editFlag" @click="openInterDialog" type="info">add</el-button>
                        <el-button v-if="editFlag" @click="deleteInterface" type="info">delete</el-button>
                    </div>
                </el-col>
                <el-col :span="18" class="pad20 grid-content bg-purple-dark bor20 border">
                    <interface-detail :detail="interfaceInfo" class="border"></interface-detail>
                    <div class="grid-content bg-purple-light border">
                        <div class="content_inter">
                            <el-button type="info" v-if="editFlag" @click="goUpdate">更新</el-button>
                            <div id='container'></div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="other">
            <el-dialog :visible.sync="dialogFormVisible">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="请求类型">
                        <el-radio-group v-model="form.type">
                            <el-radio label="get"></el-radio>
                            <el-radio label="post"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="请求链接">
                        <el-input v-model="form.link"></el-input>
                    </el-form-item>
                    <el-form-item label="说明">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="goAddInterface">确定</el-button>
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog class="bor-radius_50" :visible.sync="updateFlag">
                <el-form ref="form" :model="form">
                    <el-form-item>
                        <textarea name="" cols="30" rows="10" class="edit_input" ref="editParams" v-model="responseParams">
                        </textarea>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="goUpdateSubmit">确定</el-button>
                        <el-button @click="updateFlag = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import rapHead from '../common/raphead.vue'
import rapFooter from '../common/footer.vue'
import interfaceDetail from './interfacedetail.vue'
import { _get, _post } from '../../store/base.js'
import { JsonFormater } from '../../libs/jsonformate.js'
export default {
    filters: {},
    data() {
        return {
            interList: [],
            defaultProps: {
                label: 'name'
            },
            dialogFormVisible: false,
            form: {
                name: '',
                type: '',
                link: '',
                desc: ''
            },
            curIterfaceId: '',
            editFlag: false,
            interfaceInfo: {
                name: '',
                type: '',
                url: ''
            },
            projectId: this.$route.query.id,
            /* 接口内容 */
            responseParams: '',
            updateFlag: false
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
        // 初始化事件
        // 获取接口列表
        getInterfaceList() {
            var pid = this.projectId
            _post('rap/getInterfaceListByProjectID', { pid }, (data) => {
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
        // 非初始化事件
        iterfaceNodeClick(data) {
            let iterId = data.id
            this.curIterfaceId = data.id
            let iterName = data.name
            this.interfaceInfo.name = data.name
            this.interfaceInfo.type = data.type
            this.interfaceInfo.url = data.url
            this.getInterfaceParams(iterId)
        },
        openInterDialog() {
            this.dialogFormVisible = true
        },
        deleteInterface() {
            var iterId = this.curIterfaceId
            _get('rap/deleteInterface', { iterId }, (data) => {
                if (data && data.success) {
                    this.getInterfaceList()
                }
            })
        },
        getInterfaceParams(pid) {
            // _post('rap/getIterParamsByIterId', { iterId }, (data) => {
            _post('rap/getJsonRecordByPid', { pid }, (data) => {
                if (data && data.result && data.success) {
                    this.responseParams = JSON.stringify(data.result)
                    if (!this.editFlag) {
                        let contentInter = data.result
                        var options = {
                            dom: '#container' //对应容器的css选择器
                        };
                        var jf = new JsonFormater(options); //创建对象
                        jf.doFormat(contentInter); //格式化json
                    }
                }
            })
        },
        // 新增接口
        goAddInterface() {
            let inter = {
                name: this.form.name,
                desc: this.form.desc,
                reqType: this.form.type,
                reqUrl: this.form.link,
                resParamsId: '',
                reqParamsId: '',
                projectId: this.projectId
            }
            _post('rap/addInterface', { inter }, (data) => {
                if (data && data.success) {
                    this.dialogFormVisible = false
                    this.getInterfaceList()
                }
            })
        },
        goUpdate() {
            this.updateFlag = true
        },
        goUpdateSubmit() {
            let txt = this.responseParams
            this.responseParams = JSON.stringify(this.json2mock(txt))
            _post('rap/addJsonRecord', {
                pid: this.curIterfaceId,
                content: this.responseParams
            }, (data) => {
                if (data && data.success) {
                    this.updateFlag = false
                    this.getInterfaceList()
                }
            })
        },
        json2mock(tar) {
            let jsonObj = tar
            if (typeof jsonObj == 'string') {
                jsonObj = JSON.parse(jsonObj)
            }

            let keys = Object.keys(jsonObj)
            for (let i = 0; i < keys.length; i++) {
                if (jsonObj[keys[i]] instanceof Array) {
                    if (!/\|[0-9]/.test(keys[i])) {
                        let newKey = keys[i] + '|' + jsonObj[keys[i]].length
                        jsonObj[newKey] = jsonObj[keys[i]]
                        delete jsonObj[keys[i]]
                    }
                } else if (typeof jsonObj[keys[i]] == 'object') {
                    this.json2mock(jsonObj[keys[i]])
                }
            }

            return jsonObj
        }
    }
}
</script>
<style lang="scss">
.edit_input {
    width: 750px;
    height: 560px;
}

.border {
    border: 1px solid transparent;
}

.el-dialog--small {
    width: auto;
    border-radius: 10px;
}

.el-form-item__content {
    text-align: center;
}

.jf-ObjectBrace {
    color: #00AA00;
    font-weight: bold;
}

.jf-ArrayBrace {
    color: #0033FF;
    font-weight: bold;
}

.jf-PropertyName {
    color: #CC0000;
    font-weight: bold;
}

.jf-String {
    color: #007777;
}

.jf-Number {
    color: #AA00AA;
}

.jf-Boolean {
    color: #0000FF;
}

.jf-Null {
    color: #0000FF;
}

.jf-Comma {
    color: #000000;
    font-weight: bold;
}

pre.jf-CodeContainer {
    margin-top: 0;
    margin-bottom: 0;
    text-align: left;
}

.content_inter {
    padding-top: 20px;
}

.content_inter_2 {
    padding-top: 20px;
}
</style>