const emailReg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
const passwordReg = /^[a-zA-Z0-9]{6,10}$/

module.exports = {
    emailReg,
    passwordReg
}