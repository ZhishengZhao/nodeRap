<!--
    created by zhaozhisheng on 07/17/2017
 -->
<template>
    <div class="rap_page">
        <rap-head></rap-head>
        <div class="content wid1080">
            <el-row :gutter="20" class="border">
                <div class="block fr">
                    <el-button type="info" v-if="!editFlag" @click="editFlag = true">编辑</el-button>
                    <el-button type="info" v-if="editFlag" @click="addPageShow = true">添加页面</el-button>
                    <el-button type="info" v-if="editFlag" @click="editFlag = false">取消</el-button>
                </div>
            </el-row>
            <el-row :gutter="20" class="border">
                <el-col :span="6" class="pad20 grid-content bg-purple-dark bor20 border">
                    <div class="grid-content bg-purple">
                        <h3>取点花</h3>
                        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
                        </el-input>
                        <el-tree ref="interTree" :data="interList" :props="defaultProps" @node-click="iterfaceNodeClick" :filter-node-method="filterNode"></el-tree>
                        <el-button v-if="editFlag" @click="dialogFormVisible = true" type="info">add</el-button>
                        <el-button v-if="editFlag" @click="deleteInterface" type="info">delete</el-button>
                    </div>
                </el-col>
                <el-col :span="18" class="pad20 grid-content bg-purple-dark bor20 border">
                    <interface-detail :detail="interfaceInfo" class="border"></interface-detail>
                    <div class="grid-content bg-purple-light border content_inter">
                        <h3>接口参数</h3>
                        <hr>
                        <el-button type="info" v-if="editFlag" @click="goUpdate">更新</el-button>
                        <div id='container'></div>
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
                <el-form ref="form">
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
            <el-dialog class="bor-radius_50" :visible.sync="addPageShow">
                <el-form ref="form" :model="formPage">
                    <el-form-item label="名称">
                        <el-input v-model="formPage.name"></el-input>
                    </el-form-item>
                    <el-form-item label="说明">
                        <el-input type="textarea" v-model="formPage.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="goAddPage">确定</el-button>
                        <el-button @click="dialogFormVisible = false">取消</el-button>
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
            curPageId: '',
            editFlag: false,
            interfaceInfo: {
                name: '',
                type: '',
                url: '',
                projectId: this.$route.query.id
            },
            projectId: this.$route.query.id,
            /* 接口内容 */
            responseParams: '',
            updateFlag: false,
            addPageShow: false,
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
        /* 初始化事件 */
        // 获取接口列表
        getInterfaceList() {
            let pid = this.projectId
            _post('rap/getInterfaceListByProjectID', { pid }, (data) => {
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
                    this.iterfaceNodeClick(this.interList[0])
                }
            })
        },
        arrHandle(arr) {
            let pidArr = []
            let childArr = []
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].pid == 0) {
                    arr[i].children = []
                    arr[i].children.push({
                        name: '添加接口',
                        id: '0',
                        type: '0',
                        url: '0',
                        pid: arr[i].id
                    })
                    pidArr.push(arr[i])
                } else {
                    childArr.push(arr[i])
                }
            }
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
            if (data.id == '0' && this.editFlag) {
                this.dialogFormVisible = true
                this.curPageId = data.pid
            } else if (data.pid != '0' && data.id != '0') {
                Object.assign(this.interfaceInfo, data)
                this.curIterfaceId = data.id
                this.getInterfaceParams(data.id)
            } else {
                this.curPageId = data.id
            }
        },
        // 新增页面
        goAddPage() {
            let inter = {
                name: this.formPage.name,
                desc: this.formPage.desc,
                projectId: this.projectId,
                pid: 0
            }
            _post('rap/addInterface', inter, (data) => {
                if (data && data.success) {
                    this.addPageShow = false
                    this.getInterfaceList()
                }
            })
        },
        // 新增接口
        goAddInterface() {
            if (this.form.link.indexOf('/') != 0) {
                this.form.link = '/' + this.form.link
            }

            let inter = {
                name: this.form.name,
                desc: this.form.desc,
                reqType: this.form.type,
                reqUrl: this.form.link,
                resParamsId: '',
                reqParamsId: '',
                projectId: this.projectId,
                pid: this.curPageId
            }
            _post('rap/addInterface', inter, (data) => {
                if (data && data.success) {
                    this.dialogFormVisible = false
                    this.getInterfaceList()
                }
            })
        },
        // 接口删除
        deleteInterface() {
            var iterId = this.curIterfaceId
            _get('rap/deleteInterface', { iterId }, (data) => {
                if (data && data.success) {
                    this.getInterfaceList()
                }
            })
        },
        // 接口更新1
        goUpdate() {
            this.updateFlag = true
            let pid = this.curIterfaceId
            _post('rap/getJsonRecordByPid', { pid }, (data) => {
                if (typeof data == 'string') {
                    data = JSON.parse(data)
                }

                this.responseParams = data[0].content
            })
        },
        // 接口更新2
        goUpdateSubmit() {
            let txt = this.responseParams
            // this.responseParams = JSON.stringify(this.json2mock(txt))
            this.responseParams = txt // JSON.stringify(this.json2mock(txt))
            _post('rap/updateJsonRecord', {
                _id: this.curIterfaceId,
                content: this.responseParams,
                pid: this.curIterfaceId
            }, (data) => {
                if (data && data.success) {
                    this.updateFlag = false
                    this.getInterfaceList()
                }
            })
        },
        // 获取接口参数
        getInterfaceParams(pid) {
            _post('rap/getFinalJRByPid', { pid }, (data) => {
                // console.log('data', data)
                if (typeof data == 'string') {
                    data = JSON.parse(data)
                }

                if (!this.editFlag) {
                    let contentInter = data
                    var options = {
                        dom: '#container' //对应容器的css选择器
                    };
                    var jf = new JsonFormater(options); //创建对象
                    jf.doFormat(contentInter); //格式化json
                }
            })

            // _post('rap/getJsonRecordByPid', { pid }, (data) => {
            //     if (typeof data !== 'string') {
            //         data = JSON.stringify(data)
            //     }

            //     this.responseParams = data
            // })
        },
        /* 非初始化--辅助处理 */
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        // 接口删除
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
@import '../../assets/styles/jsonformate.css';

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

#container {
    background-color: #272822;
    min-height: 350px;
}

.content_inter {
    padding-top: 20px;
}

.content_inter_2 {
    padding-top: 20px;
}
</style>