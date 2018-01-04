# nodeRap
一个简单的前端接口系统。

## 技术概述
前端采用vue+webpack实现，后端使用node+express+mongoDB实现。

## 安装使用

npm install -D

开发环境启动：

npm run dev

由于目前前后端统一启动，但只做了前端文件的动态编译，如果改了后台文件，请重新启动脚本

## 更新日志

#### 2017/10/26
* [FE,BE] update 
1、前后端统一启动脚本重写完成
2、接口统一规划处理（初期）
3、后端接收数据处理（bodyParser）
4、删除部分无用老代码（已做数据备份）

下一步
前端代码部分重写，完善功能：
1、用户系统
2、eslint脚本
3、测试引入，后端test脚本开发
4、接口读取功能


#### 2017/10/26
* [FE,BE] UPDATE
新增服务端启动脚本，主被部署到12服务器

#### 2017/11/01
* [okr-noderap] update
添加用户模块，新增用户注册、登录功能
更新用户工程绑定，添加个人创建/参与工程检索功能

#### 2017/11/02
* [okr-noderap] update
更新注册登录模块，添加全局接口拦截处理（登陆引导）
添加dialog组件
更新服务脚本
更新webpack缩写目录

#### 2017/12/29
* [okr-noderap] update
新增用户密码找回功能
新增接口直导功能，直接从接口读取数据填充记录，无需二次编辑
新增数据更新JSON格式校验及提示功能