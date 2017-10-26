import { creatAPI } from './base'

/* User */
const user = {
    isLogin: (params, callback) => creatAPI('rap/isLogin', 'get', params, callback),
    login: (params, callback) => creatAPI('rap/login', 'post', params, callback),
    registe: (params, callback) => creatAPI('rap/registe', 'post', params, callback)
}

/* Project */
const project = {
    add: (params, callback) => creatAPI('rap/add', 'post', params, callback),
    delete: (params, callback) => creatAPI('rap/deleteProjectById', 'get', params, callback),
    update: (params, callback) => creatAPI('rap/updateProjectById', 'post', params, callback),
    getList: (params, callback) => creatAPI('rap/getAll', 'get', params, callback)  
}

/* Interface */
const inter = {
    add: (params, callback) => creatAPI('rap/addInterface', 'get', params, callback),
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
    getFormatedItem: (params, callback) => creatAPI('rap/getFinalJRByPid', 'post', params, callback)
}

/* Mock */
const mock = {
    getData: (params, callback) => creatAPI('rap/mock/:projectId/*', 'get', params, callback)
}

export {
    user,
    project,
    inter,
    jsonRecords,
    mock
}