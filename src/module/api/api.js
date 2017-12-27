import { creatAPI } from './base'

/* Common */
const common = {
    sendEmailActive: (params, callback) => creatAPI('rap/sendEmailActive', 'post', params, callback),
    sendEmailPwd: (params, callback) => creatAPI('rap/sendEmailPwd', 'post', params, callback)
}

/* User */
const user = {
    isLogin: (params, callback) => creatAPI('rap/isLogin', 'get', params, callback),
    login: (params, callback) => creatAPI('rap/login', 'post', params, callback),
    register: (params, callback) => creatAPI('rap/registe', 'post', params, callback),
    resetPwd: (params, callback) => creatAPI('rap/resetPwd', 'post', params, callback)
}

/* Project */
const project = {
    add: (params, callback) => creatAPI('rap/add', 'post', params, callback),
    delete: (params, callback) => creatAPI('rap/deleteProjectById', 'get', params, callback),
    update: (params, callback) => creatAPI('rap/updateProjectById', 'post', params, callback),
    getList: (params, callback) => creatAPI('rap/getAll', 'get', params, callback),
    getMine: (params, callback) => creatAPI('rap/getAllMine', 'get', params, callback),
    getOthers: (params, callback) => creatAPI('rap/getAllOthers', 'get', params, callback)
}

/* UserProject Relation */
const userProject = {
    // getList: (params, callback) => creatAPI('rap/getAll', 'get', params, callback),
    getMyJoins: (params, callback) => creatAPI('rap/getMyJoins', 'get', params, callback)
}

/* Interface */
const inter = {
    add: (params, callback) => creatAPI('rap/addInterface', 'post', params, callback),
    delete: (params, callback) => creatAPI('rap/deleteInterface', 'get', params, callback),
    update: (params, callback) => creatAPI('rap/updateInterface', 'post', params, callback),
    getList: (params, callback) => creatAPI('rap/getInterfaceList', 'post', params, callback),
    getListByPID: (params, callback) => creatAPI('rap/getInterfaceListByProjectID', 'post', params, callback)
}

/* jsonRecords */
const jsonRecords = {
    add: (params, callback) => creatAPI('rap/addJsonRecord', 'post', params, callback),
    update: (params, callback) => creatAPI('rap/updateJsonRecord', 'post', params, callback),
    getItem: (params, callback) => creatAPI('rap/getJsonRecordByPid', 'post', params, callback),
    getFormatedItem: (params, callback) => creatAPI('rap/getFinalJRByPid', 'post', params, callback),
    ajaxImport: (params, callback) => creatAPI('rap/ajaxImport', 'post', params, callback) 
}

/* Mock */
const mock = {
    getData: (params, callback) => creatAPI('rap/mock/:projectId/*', 'get', params, callback)
}

export {
    common,
    user,
    project,
    inter,
    jsonRecords,
    mock,
    userProject
}