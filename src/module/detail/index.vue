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
                    <el-button type="info" @click="cancelAll">取消</el-button>
                    <el-button type="info" @click="saveAll">保存</el-button>
                    <el-button type="info" @click="goRequest">请求接口</el-button>
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
                        <el-button v-if="editFlag" @click="deleteInterface" type="info">delete</el-button>
                    </div>
                </el-col>
                <el-col :span="18" class="pad20 grid-content bg-purple-dark bor20">
                    <interface-detail :detail="interfaceInfo"></interface-detail>
                    <div class="grid-content bg-purple-light">                       
                        <div class="area_request">
                            <h3>请求参数</h3>
                            <el-table
                            border
                            @cell-dblclick = "goEditRequest"
                            :data="requestParams"
                            style="width: 100%">
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
                                        <span v-if="editFlag && scope.row.index == curRowIndex && curColIndex == 0" class="cell-edit-input"><el-input v-model="editValue" @change="setEditValue('res')"></el-input></span>
                                        <span v-else class="show_value" >{{ scope.row.key }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="含义"
                                prop="comments"
                                width="180">
                                    <template scope="scope">
                                        <span v-if="editFlag && scope.row.index == curRowIndex && curColIndex == 1" class="cell-edit-input"><el-input v-model="editValue" @change="setEditValue('res')"></el-input></span>
                                        <span v-else class="show_value" >{{ scope.row.comments }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="类型"
                                prop="type"
                                type="select">
                                    <template scope="scope">
                                        <span v-if="editFlag && scope.row.index == curRowIndex && curColIndex == 2" class="cell-edit-input">
                                            <select v-model="editValue" @change="setEditValue('res')">
                                                <option v-for="item in typeList" :value="item">
                                                    {{item}}
                                                </option>
                                            </select>
                                            <!-- <el-input v-model="editValue" @change="setEditValue('res')"></el-input> -->
                                        </span>
                                        <span v-else class="show_value" >{{ scope.row.type }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="备注"
                                prop="value">
                                    <template scope="scope">
                                        <span v-if="editFlag && scope.row.index == curRowIndex && curColIndex == 3" class="cell-edit-input"><el-input v-model="editValue" @change="setEditValue('res')"></el-input></span>
                                        <span v-else class="show_value" >{{ scope.row.value }}</span>
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
import { _get, _post } from '../../store/base.js'
import rapHead from '../../components/head.vue'
import rapFooter from '../../components/footer.vue'
import interfaceDetail from './interfacedetail.vue'
import {
    getIndexs
} from '../../libs/tools.js'
export default {
    filters: {},
    data() {
        return {
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
            parasType: 'res',
            curRowIndex: -1,
            curColIndex: -1,
            editValue: '',
            propOrder: ['key', 'comments', 'type', 'value'],
            typeList: ['number', 'string', 'object', 'boolean']
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
        cancelAll() {
            this.editFlag = false;
        },
        goRequest() {
            this.$router.push({
                path: 'requestData'
            })
        },
        deleteInterface() {
            var iterId = this.curIterfaceId
            _post('rap/getInterfaceList', null, (data) => {
                if (data && data.success) {
                    alert('delete success')
                }
            })
        },
        saveResponse() {
            var params = {
                recordId: this.curIterfaceId,
                responseParams: JSON.stringify(this.responseParams)
            }
            _post('rap/paramsSave', params, (data) => {
                // this.backdata = data.result
                if (data && data.success) {
                    this.dialogFormVisible = false
                    this.editFlag = false
                    this.getInterfaceList()
                }
            })

            this.editFlag = false;
            this.curColIndex = -1;
            this.curRowIndex = -1;
        },
        saveAll() {
            // this.responseParams
            this.editFlag = false
        },
        addResponseList() {

        },
        addParams(tar) {
            if (tar === 'req') {
                var count = this.requestParams.length
                this.requestParams.push({
                    index: count,
                    key: '',
                    comments: '',
                    type: '',
                    value: ''
                })
            } else {
                var count = this.responseParams.length
                this.responseParams.push({
                    index: count,
                    key: '',
                    comments: '',
                    type: '',
                    value: ''
                })
            }
        },
        goEditAll() {
            this.editFlag = true
        },
        goSaveEditAll() {
            // console.log('requestParams', this.requestParams)
        },
        goEditRequest(row, column, cell, event) {
            // console.log(row, column, cell, event)
        },
        goEditResponse(row, column, cell, event) {
            if (this.editFlag) {
                let indexs = getIndexs(row, column, cell)
                this.curColIndex = indexs.colIndex
                this.curRowIndex = indexs.rowIndex

                var tempObj = this.responseParams[this.curRowIndex]

                this.editValue = tempObj[this.propOrder[this.curColIndex]]
            }
        },
        setEditValue(type) {
            if (type == 'res') {
                // console.log('====================', this.editValue)
                this.responseParams[this.curRowIndex][this.propOrder[this.curColIndex]] = this.editValue
            } else {
                this.requestParams[this.curRowIndex][this.propOrder[this.curColIndex]] = this.editValue
            }
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
            _post('rap/addInterface', {inter}, (data) => {
                // this.backdata = data.result
                if (data && data.success) {
                    this.dialogFormVisible = false
                    this.getInterfaceList()
                }
            })
        },
        getInterfaceList() {
            _post('rap/getInterfaceList', {}, (data) => {
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
            // console.log(data);
            let iterId = data.id
            this.curIterfaceId = data.id
            let iterName = data.name
            // this.getIterParams(iterId)
            this.interfaceInfo.name = data.name
            this.interfaceInfo.type = data.type
            this.interfaceInfo.url = data.url
            this.getInterfaceParams(iterId)
        },
        getInterfaceParams(iterId) {
            let params = {
                iterId: iterId,
                type: 'rap'
            }
            _post('rap/getIterParamsByIterId', params, (data) => {
                let tempArrRes = []
                let tempArrReq = []
                if (data && data.result && data.success) {
                    let i = 0
                    for (; i < data.result.length; i++) {
                        if (data.result[i].parasType === 'req') {
                            tempArrReq.push({
                                index: i,
                                key: data.result[i].key,
                                comments: data.result[i].comments,
                                type: data.result[i].valueType,
                                value: data.result[i].value
                            })
                        } else {
                            tempArrRes.push({
                                index: i,
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
            // console.log('>>>>>>>>>>>>>>>>>>>>', row)
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

</style>
