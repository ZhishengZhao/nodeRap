<!--
    created by zhaozhisheng on 07/17/2017
 -->
<template>
    <div class="rap_page">
        <rap-head></rap-head>
        <div class="content wid1080">
            <el-row :gutter="20" class="border">
                <div class="block fr">
                    <el-button type="info" v-if="!editFlag" @click="goEdit">编辑</el-button>
                    <!-- <el-button type="info" v-if="editFlag" @click="addPageShow = true">添加页面</el-button> -->
                    <el-button type="info" v-if="editFlag" @click="editComplete">完成</el-button>
                </div>
            </el-row>
            <el-row :gutter="20" class="border">
                <el-col :span="6" class="pad20 grid-content bg-purple-dark bor20 border">
                    <div class="grid-content bg-purple">
                        <h3>{{projectName}}</h3>
                        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
                        </el-input>
                        <div class="area_operate clearfix" v-if="editFlag">
                            <p @click="addPageShow = true">新增页面</p>
                            <p @click="editInterface(false)">新增接口</p>
                        </div>
                        <el-tree ref="interTree" :data="interList" :props="defaultProps" @node-click="iterfaceNodeClick" :filter-node-method="filterNode">
                            <!-- :render-content="renderContent" -->
                        </el-tree>
                        <!-- <el-button v-if="editFlag" @click="editInterface(false)" type="info">add</el-button>
                        <el-button v-if="editFlag" @click="deleteInterface" type="info">delete</el-button> -->
                        <!-- <el-button v-if="editFlag" @click="editInterface(true)" type="info">update</el-button> -->
                    </div>
                </el-col>
                <el-col :span="18" class="pad20 grid-content bg-purple-dark bor20 border">
                    <div class="area_btns_inter" v-if="editFlag">
                        <!-- <p @click="editInterface(true)">更新接口</p> -->
                        <p @click="goUpdate">更新内容</p>
                        <p @click="deleteInterface">删除接口</p>
                    </div>
                    <interface-detail :detail="interfaceInfo" class="border"></interface-detail>
                    <div class="grid-content bg-purple-light border content_inter">
                        <h3>接口参数</h3>
                        <!-- <div class="fr trigle_topright" v-if="editFlag">
                            <p @click="goUpdate">更新</p>
                        </div> -->
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
                    <el-form-item label="所属页面">
                        <el-select v-model="curPageId" placeholder="请选择">
                            <el-option v-for="item in pageOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="说明">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="goAddInterface">确定</el-button>
                        <el-button type="primary" @click="goAddInterface('import')">直导</el-button>
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog class="bor-radius_50 wid800 item_margin0" :visible.sync="updateFlag">
                <el-form ref="form">
                    <el-form-item>
                        <textarea name="" cols="30" rows="10" class="edit_input " ref="editParams" v-model="responseParams">
                        </textarea>
                    </el-form-item>
                    <el-form-item :class="bgColor" v-if="jsonCheckResult" v-html="jsonCheckResult">
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="goUpdateSubmit">确定</el-button>
                        <el-button @click="updateFlag = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog class="bor-radius_50" :visible.sync="addPageShow">
                <el-form ref="form" :model="formPage" label-width="80px">
                    <el-form-item label="名称">
                        <el-input v-model="formPage.name"></el-input>
                    </el-form-item>
                    <el-form-item label="说明">
                        <el-input type="textarea" v-model="formPage.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="goAddPage">确定</el-button>
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
import interfaceDetail from './interface_detail.vue'
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
            emailReg: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
            jsonCheckResult: '',
            jsonValid: false
        }
    },
    watch: {
        filterText(val) {
            this.$refs.interTree.filter(val);
        }
    },
    computed: {
        bgColor() {
            return this.jsonValid ? 'bg_green' : 'bg_red'
        }
    },
    components: {
        rapHead,
        rapFooter,
        interfaceDetail,
        rapDialog
    },
    beforeRouteLeave(to, from, next) {
        this.editComplete()
        next()
    },
    mounted() {
        this.getInterfaceList()
        this.initEditState()
    },
    methods: {
        initEditState() {
            let pid = this.projectId,
                type = 'isSelfLocked';

            project.goEdit({ pid, type }, (result) => {
                if (result.success) {
                    this.$confirm('项目正在被您锁定，是否进入编辑状态？')
                        .then((data) => {
                            this.editFlag = true
                        }).catch(data => {
                            this.editComplete()
                        });
                }
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
        /* 非初始化--交互事件 */
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
        // 新增页面
        goAddPage() {
            let params = {
                name: this.formPage.name,
                desc: this.formPage.desc,
                projectId: this.projectId,
                pid: 0
            }

            inter.add(params, (data) => {
                if (data && data.success) {
                    this.addPageShow = false
                    this.getInterfaceList()
                }
            })
        },
        // 接口主体更新
        editInterface(editflag) {
            this.dialogFormVisible = true
            this.interEditFlag = editflag
        },
        // 新增接口
        goAddInterface(type) {
            console.log(type)
            if (this.curPageId == '') {
                alert('请先添加一个页面，在添加接口')
                return
            }
            
            let params = {
                name: this.form.name,
                desc: this.form.desc,
                reqType: this.form.type,
                reqUrl: this.form.link,
                projectId: this.projectId,
                pid: this.curPageId,
                id: this.curIterfaceId
            }

            if (!this.formCheck('addForm', params)) {
                return
            }

            if (type == 'import') {
                if (!this.emailReg.test(params.reqUrl)) {
                    this.$alert('请输入完整有效的url地址，如https://m.aiyoumi.com:8443/mall/loan/getLoanInit')
                    return
                }
                
                inter.directImport(params, (data) => {
                    if (data && data.success) {
                        this.dialogFormVisible = false
                        this.getInterfaceList()
                    }
                })
            } else {
                if (params.reqUrl.indexOf('/') != 0) {
                    params.reqUrl = '/' + params.reqUrl
                }
                let action = this.interEditFlag ? 'update' : 'add'
                // console.log('-------------')
                inter[action](params, (data) => {
                    if (data && data.success) {
                        this.dialogFormVisible = false
                        this.getInterfaceList()
                    }
                })
            }
        },
        // 参数校验
        formCheck(type, data) {
            if (type === 'addForm') {
                if (!data.name) {
                    this.$alert('请输入接口名')
                    return false
                }
                if (!data.reqType) {
                    this.$alert('请选择接口类型')
                    return false
                }
                if (!data.reqUrl) {
                    this.$alert('请输入接口地址')
                    return false
                }

                return true
            }
        },
        // 接口删除
        deleteInterface() {
            let context = '确定删除接口' + this.curIterfaceName + '？'
            this.$confirm(context)
                .then((data) => {
                    var iterId = this.curIterfaceId
                    inter.delete({ iterId }, (data) => {
                        if (data && data.success) {
                            this.getInterfaceList()
                        }
                    })
                }).catch(data => {});
        },
        // 接口内容更新
        goUpdate() {
            this.updateFlag = true
            let pid = this.curIterfaceId
            jsonRecords.getItem({ pid }, (data) => {
                if (typeof data == 'string') {
                    data = JSON.parse(data)
                }

                this.responseParams = data[0].content
            })
        },
        // 接口内容更新提交
        goUpdateSubmit() {
            let txt = this.responseParams

            try {
                jsonlint.parse(txt)
                this.jsonValid = true
                this.jsonCheckResult = '<p>JSON数据格式正常</p>'
            } catch (err) {
                this.jsonValid = false
                this.jsonCheckResult = err.message
                console.log(err.message.split('\n'))
                let erArr = err.message.split('\n')
                let descDom = erArr.map((item) => {
                    return '<p>' + item + '</p>'
                })
                this.jsonCheckResult = descDom.join(' ')
                return
            }

            this.responseParams = txt // JSON.stringify(this.json2mock(txt))
            jsonRecords.update({
                _id: this.curIterfaceId,
                content: this.responseParams,
                pid: this.curIterfaceId
            }, (data) => {
                if (data && data.success) {
                    this.updateFlag = false
                    this.getInterfaceList()
                }
                this.jsonValid = false
            })
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
        },
        renderContent: function(createElement, { node, data }) {
            var self = this;
            return createElement('span', [
                createElement('span', node.label),
                createElement('span', {
                    attrs: {
                        style: "float: right; margin-right: 20px"
                    }
                }, [
                    createElement('el-button', {
                        attrs: {
                            size: "mini",
                            class: self.setClass(node)
                        },
                        on: {
                            click: function() {
                                console.info("点击了节点" + data.id + "的添加按钮");
                            }
                        }
                    }, "添加"),
                    createElement('el-button', {
                        attrs: {
                            size: "mini"
                        },
                        on: {
                            click: function() {
                                console.info("点击了节点" + data.id + "的删除按钮");
                            }
                        }
                    }, "删除")
                ]),
            ]);
        },
        setClass(node) {
            console.log('node=', node)
            return node.data.pid == 0 ? '' : 'dom_hide'
        },
        goEdit() {
            let pid = this.projectId,
                type = 'doEdit';

            project.goEdit({ pid, type }, (result) => {
                if (result.success) {
                    this.editFlag = true
                } else {
                    this.$alert(result.desc)
                }
            })
        },
        editComplete() {
            let pid = this.projectId,
                type = 'doComplete';

            project.goEdit({ pid, type }, (result) => {
                if (result.success) {
                    this.editFlag = false
                } else {
                    this.$alert(result.desc)
                }
            })
        }
    }
}
</script>
<style lang="scss">
@import '../../assets/styles/jsonformate.css';

.edit_input {
    width: 100%;
    height: 500px;
    max-height: 500px;
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

.content_inter {
    position: relative;
    padding-top: 20px;
}

.content_inter_2 {
    padding-top: 20px;
}

.dom_hide {
    display: none;
}

.fr {
    float: right;
}

.trigle_topright {
    position: absolute;
    right: 0;
    width: 0;
    height: 0;
    border: 80px solid #ccc;
    border-bottom: 80px solid transparent;
    border-left: 80px solid transparent;
    p {
        position: absolute;
        right: -63px;
        top: -54px;
        font-size: 29px;
        color: #fff;
    }
}
.wid800 .el-dialog {
    width: 800px;
}
.item_margin0 {
    .el-form-item {
        margin-bottom: 0;
    }
}
.bg_green {
    background-color: #efe;
    color: #393;
    border: 2px solid #393;
    margin-bottom: 15px !important;
}
.bg_red {
    background-color: #fee;
    color: #933;
    border: 2px solid #933;
    margin-bottom: 15px !important;
}
.area_operate {
    position: relative;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #a8a3a3;
    p {
        float: left;
        width: 44%;
        margin: 10px 2.5%;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background-color: #909399;
        border-radius: 5px;
        color: #fff;
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
.area_btns_inter {
    position: absolute;
    right: 15px;
    top: 33px;
    width: 140px;
    height: 120px;
    z-index: 1999;
    p {
        width: 80%;
        height: 32px;
        margin: 2px;
        line-height: 28px;
        text-align: center;
        background-color: #909399;
        border-radius: 5px;
        color: #fff;
    }
}
</style>