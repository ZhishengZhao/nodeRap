var jc = {
    resultRap: {

    },
    resultReal: {

    },
    init(rapData, realData) {
        this.resultRap = {}
        this.resultReal = {}

        if (typeof rapData == 'string') {
            rapData = this.toJson(rapData)
        }

        if (typeof realData == 'string') {
            realData = this.toJson(realData)
        }

        return this.compare(rapData, realData, [])
    }, 

    compare(rapData, realData, key) {
        let rapDataType = this.getType(rapData), 
            realDataType = this.getType(realData);
        
        if (rapDataType == realDataType) {
            if (rapDataType == 'object') {
                this.simpleKeyHandler(rapData, realData, key);
                this.complexKeyHandler(rapData, realData, key);
            } else if (rapDataType == 'array') {
                // for (let item in rapData) {
                // this.compare(rapData, realData, key)
                // }
                let minLength = Math.min(rapData.length,realData.length)
                for (let i = 0; i < minLength; i++) {
                    this.compare(rapData[i], realData[i], key)
                }

                if (rapData.length > minLength) {
                    
                }

                if (realData.length > minLength) {

                }
            } else {
                console.log('其他字符类型，不用对比')
            }
        } else {
            this.resultArr.push('key ' + key + '\'s Type diff between rap and real:')
        }

        return {
            resultRap: this.resultRap,
            resultReal: this.resultReal
        }
    },
    simpleKeyHandler(rapData, realData, parentkey) {
        let rapKeys = this.getSimpleKey(rapData),
            realKeys = this.getSimpleKey(realData);

        rapKeys.forEach(key => {
            let index = realKeys.indexOf(key);
            if (index == -1) {
                this.setKeyValue('resultRap', key, parentkey, false, rapData)
            } else {
                if (typeof rapData[key] === typeof realData[key]) {
                    this.setKeyValue('resultRap', key, parentkey, true, rapData)
                    this.setKeyValue('resultReal', key, parentkey, true, realData)
                } else {
                    this.setKeyValue('resultRap', key, parentkey, false, rapData)
                    this.setKeyValue('resultReal', key, parentkey, false, realData)
                }

                realKeys.splice(index, 1);
            }
        });

        realKeys.forEach(key => {
            this.setKeyValue('resultReal', key, parentkey, false, realData)
        })
    },
    // setKeyValue(taregt, key, keyArr, equal, value) {
    setKeyValue(target, key, parentkey, equal, data) {
        let flag = equal ? '_0' : '_1'
        let length = parentkey.length
        // 从下向上递归，逐步组成对象 赋值属性
        // console.log('parentkey', parentkey)
        if (length) {
            if (!this[target][parentkey]) {
                this[target][parentkey] = {}
            }
            this[target][parentkey][key + flag] = data[key]
            
            parentkey.forEach((key, index) => {
                // try {
                //     if (inde !=0 ) {

                //     } else {
                //         if (!this[target][key]) {
                //             this[target][key] = {}
                //         } 
                //     }
                    
                // }
            })
        } else {
            this[target][key + flag] = data[key]
        }
    },
    complexKeyHandler(rapData, realData, parentkey) {
        let cRapKeys = this.getSimpleKey(rapData, 'hard'),
            cRealKeys = this.getSimpleKey(realData, 'hard');

        cRapKeys.forEach(key => {
            let index = cRealKeys.indexOf(key);
            if (index == -1) {
                this.setKeyValue('resultRap', key, parentkey, false, rapData)
            } else {
                parentkey.push(key)
                this.compare(rapData[key], realData[key], parentkey)

                cRealKeys.splice(index, 1);
            }
        });

        cRealKeys.forEach(key => {
            this.setKeyValue('resultReal', key, parentkey, false, realData)
        })
    },
    getSimpleKey(obj, type = 'simple') {
        return Object.keys(obj).filter(key => {
            return type == 'simple' ? (typeof obj[key] !== 'object') : (typeof obj[key] == 'object');
        })
    },
    getType(data) {
        if (data) {
            let type = typeof data 
            if (type == 'object') {
                if (data.toString() == '[object Object]') {
                    return 'object'
                } else {
                    return 'array'
                }
            } else {
                return type
            }
        } else {
            return null
        }
    },

    toJson(data) {
        return JSON.parse(data)
    },
    getArrSame(arrOri, arrTar, type) {
        if (type == 'same') {
            return arrOri.fiter((item) => {
                return arrTar.indexOf(item) !== -1;
            });
        } else {
            return arrOri.fiter((item) => {
                return arrTar.indexOf(item) == -1;
            }) ;
        }
    },

    getBone(obj) {

    }
}

window.jc = jc
// export default jc



