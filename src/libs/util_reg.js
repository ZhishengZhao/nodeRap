const urlReg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
const emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
const passwordReg = /^[a-zA-Z0-9]{6,10}$/

// 正则校验
module.exports = {
    isValidUrl: (theUrl) => {
        return urlReg.test(theUrl);
    },
    isValidEmail: (email) => {
        return emailReg.test(email)
    },
    isValidPwd: (pwd) => {
        return passwordReg.test(pwd)
    }
};