module.exports = {
    userNameCheck: (name) => {
        return !!name
    },
    passwordCheck: (pwd) => {
        return !!pwd
    },
    emailCheck: (email) => {
        if (!email) {
            return false
        } else if (!/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)){
            return false
        } else {
            return true
        }
    }
}