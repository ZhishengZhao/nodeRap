<!--
    created by zhaozhisheng on 07/17/2017
 -->
<template>
    <div class="rap_page">
        <rap-head></rap-head>
        <div class="content_top wid1080">
            <el-row :gutter="20">
                <div class="block fr">
                    <el-button type="info" @click="goEditAll">编辑</el-button>
                    <el-button type="info" @click="saveAll">保存</el-button>
                </div>
            </el-row>
        </div>
        <div class="content wid1080">
            <el-row :gutter="20">
                <el-col :span="6" class="pad20 grid-content bg-purple-dark bor20">
                    <div class="grid-content bg-purple">
                        <h3>接口列表</h3>
                        <el-tree :data="interList" :props="defaultProps" @node-click="iterfaceNodeClick"></el-tree>
                        <el-button v-if="editFlag" @click="openInterDialog" type="info">add</el-button>
                    </div>
                </el-col>
                <el-col :span="18" class="pad20 grid-content bg-purple-dark bor20">
                    <div class="area_interinfo mb20">
                        <h3>接口详情</h3>
                        <p>
                            <span class="wd70 mr20">
                                接口名称
                            </span>
                            <span>
                                {{interfaceInfo.name}}
                            </span>
                        </p>
                        <p>
                            <span class="wd70 mr20">
                                请求类型
                            </span>
                            <span>
                                {{interfaceInfo.type}}
                            </span>
                        </p>
                        <p>
                            <span class="wd70 mr20">
                                请求url
                            </span>
                            <span>
                                {{interfaceInfo.url}}
                            </span>
                        </p>
                    </div>
                    <div class="grid-content bg-purple-light">                       
                        <div class="area_request">
                            <h3>请求参数</h3>
                            <el-table
                            border
                            @cell-dblclick = "goEditRequest"
                            :data="requestParams"
                            style="width: 100%">
                                <el-table-column type="index">
                                </el-table-column>
                                <el-table-column
                                label="变量名"
                                prop="key"
                                width="180">
                                    <template scope="scope">
                                        <span v-if="!editFlag">{{ scope.row.key }}</span>
                                        <span v-if="editFlag" class="cell-edit-input"><el-input v-model="inputColumn1"></el-input></span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="含义"
                                prop="comments"
                                width="180">
                                    <template scope="scope">
                                        <span v-if="!editFlag">{{ scope.row.comments }}</span>
                                        <span v-if="editFlag" class="cell-edit-input"><el-input v-model="inputColumn1"></el-input></span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="类型"
                                prop="type">
                                    <template scope="scope">
                                        <span v-if="!editFlag">{{ scope.row.type }}</span>
                                        <span v-if="editFlag" class="cell-edit-input"><el-input v-model="inputColumn1"></el-input></span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="备注"
                                prop="value">
                                    <template scope="scope">
                                        <span v-if="!editFlag">{{ scope.row.value }}</span>
                                        <span v-if="editFlag" class="cell-edit-input"><el-input v-model="inputColumn1"></el-input></span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-button v-show="editFlag" type="info" @click="addParams('req')">添加参数</el-button>
                            <el-button v-show="editFlag" type="info" @click="importJson('req')">导入json</el-button>
                        </div>
                        <div class="area_response">
                            <h3>响应参数</h3><el-button v-show="editFlag" type="info" @click="addResponseList">添加一组响应</el-button>
                            <el-table
                            border
                            @cell-dblclick = "goEditResponse"
                            :data="responseParams"
                            style="width: 100%">
                                <el-table-column
                                label="变量名"
                                prop="key"
                                width="180">
                                    <template scope="scope">
                                        <span class="show_value" >{{ scope.row.key }}</span>
                                        <span  class="cell-edit-input show_input"><el-input v-model="resKey"></el-input></span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="含义"
                                prop="comments"
                                width="180">
                                    <template scope="scope">
                                        <span v-if="!editFlag">{{ scope.row.comments }}</span>
                                        <span v-if="editFlag" class="cell-edit-input"><el-input v-model="resComment"></el-input></span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="类型"
                                prop="type"
                                type="select">
                                    <template scope="scope">
                                        <span v-if="!editFlag">{{ scope.row.type }}</span>
                                        <span v-if="editFlag" class="cell-edit-input">
                                            <el-input v-model="resType"></el-input>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="备注"
                                prop="value">
                                    <template scope="scope">
                                        <span v-if="!editFlag">{{ scope.row.value }}</span>
                                        <span v-if="editFlag" class="cell-edit-input"><el-input v-model="resValue"></el-input></span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-button v-show="editFlag" type="info" @click="addParams('res')">添加参数</el-button>
                            <el-button v-show="editFlag" type="info" @click="importJson('res')">导入json</el-button>
                            <el-button v-show="editFlag" type="info" @click="saveResponse">保存测试</el-button>
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
        </div>
    </div>
</template>
<script>
import { _get, _post } from '../store/base.js'
import rapHead from './head.vue'
import rapFooter from './footer.vue'
export default {
    filters: {},
    data() {
        return {
            // requestParams: [{
            //         key: 'req1',
            //         comments: 'req1',
            //         type: 'req1',
            //         value: 'req1'
            //     }, {
            //         key: 'req1',
            //         comments: 'req1',
            //         type: 'req1',
            //         value: 'req1'
            //     }, {
            //         key: 'req1',
            //         comments: 'req1',
            //         type: 'req1',
            //         value: 'req1'
            //     }],
            // responseParams: [{
            //         key: 'res1',
            //         comments: 'res1',
            //         type: 'res1',
            //         value: 'res1'
            //     }],
            requestParams: [],
            responseParams: [],
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
            inputColumn1: '',
            resKey: '',
            resValue: '',
            resType: '',
            resComment: '',
            parasType: 'res'
        }
    },
    computed: {

    },
    components: {
        rapHead,
        rapFooter
    },
    mounted() {
        this.getInterfaceList()
    },
    methods: {
        saveResponse() {
            let params = {
                parasType: this.parasType,
                recordId: this.curIterfaceId,
                key: this.resKey,
                value: this.resValue,
                valueType: this.resType,
                parentId: '',
                comments: this.resComment
            }
            _post('http://localhost:3000/rap/paramsSave', params, (data) => {
                // this.backdata = data.result
                if (data && data.success) {
                    this.dialogFormVisible = false
                    this.editFlag = false
                    this.getInterfaceList()
                }
            })
        },
        saveAll() {
            this.editFlag = false
        },
        addResponseList() {

        },
        addParams(tar) {
            if (tar === 'req') {
                this.requestParams.push({
                    key: '',
                    comments: '',
                    type: '',
                    value: ''
                })
            } else {
                this.responseParams.push({
                    key: '',
                    comments: '',
                    type: '',
                    value: ''
                })
            }
        },
        goEditTest(a,b) {
            console.log(a, b)
        },
        goEditAll() {
            this.editFlag = true
        },
        goSaveEditAll() {
            console.log('requestParams', this.requestParams)
        },
        goEditRequest(row, column, cell, event) {
            console.log(row, column, cell, event)
        },
        goEditResponse(row, column, cell, event) {
            console.log(row, column, cell, event)
            let tar = cell.getElementsByClassName('show_input')[0]
            cell.getElementsByClassName('show_value')[0].style.display = 'none'
            console.log(tar)
            tar.style.display = 'block'
        },
        openInterDialog() {
            this.dialogFormVisible = true
        },
        goAddInterface() {
            // let inter = this.form
            let inter = {
                name: this.form.name,
                desc: this.form.desc,
                reqType: this.form.type,
                reqUrl: this.form.link,
                resParamsId: '',
                reqParamsId: ''
            }
            _post('http://localhost:3000/rap/addInterface', {inter}, (data) => {
                // this.backdata = data.result
                if (data && data.success) {
                    this.dialogFormVisible = false
                    this.getInterfaceList()
                }
            })
        },
        getInterfaceList() {
            _post('http://localhost:3000/rap/getInterfaceList', {}, (data) => {
                if (data && data.result && data.success) {
                    let i = 0
                    let temparr = []
                    for(; i < data.result.length; i++) {
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
            console.log(data);
            let iterId = data.id
            this.curIterfaceId = data.id
            let iterName = data.name
            this.getIterParams(iterId)
            this.interfaceInfo.name = data.name
            this.interfaceInfo.type = data.type
            this.interfaceInfo.url = data.url
            this.getInterfaceParams(iterId)
        },
        getInterfaceParams(iterId) {
            _post('http://localhost:3000/rap/getIterParamsByIterId', {iterId}, (data) => {
                console.log(data)
                let tempArrRes = []
                let tempArrReq = []
                if (data && data.result && data.success) {
                    let i = 0
                    for (; i < data.result.length; i++) {
                        if (data.result[i].parasType === 'req') {
                            tempArrReq.push({
                                key: data.result[i].key,
                                comments: data.result[i].comments,
                                type: data.result[i].valueType,
                                value: data.result[i].value
                            })
                        } else {
                            tempArrRes.push({
                                key: data.result[i].key,
                                comments: data.result[i].comments,
                                type: data.result[i].valueType,
                                value: data.result[i].value
                            })
                        }
                    }
                }
                this.responseParams = tempArrRes
                this.requestParams = tempArrReq
            })
        },
        getIterParams() {

        },
        handleEdit:function(row){
            console.log('>>>>>>>>>>>>>>>>>>>>', row)
        //遍历数组改变editeFlag
        },
        handleSave:function(row){
            //保存数据，向后台取数据
        },
        handleMouseEnter:function(row, column, cell, event){
          cell.children[0].children[1].style.color="black";
        },
        handleMouseOut:function(row, column, cell, event){
          cell.children[0].children[1].style.color="#ffffff";
        }
    }
}
</script>
<style lang="scss">
* {
    box-sizing: border-box;
}
.fr {
    float: right;
}
.mb20 {
    margin-bottom: 20px;
}
.wid1080 {
    width: 1080px;
    margin: 0 auto;
}
.content_top {
    padding: 20px;
}
.content {
    background: #f2f2f2;
    padding: 10px 20px 30px 20px;
    border-radius: 5px 5px 20px 20px;
}
.area_interinfo {
    // margin-bottom: 20px;
}

.el-tree {
    background: #f2f2f2;
    border: none;
}
.show_input {
    display: none;
}
.btn_mine {

}
</style>
