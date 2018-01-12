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

        return this.compare(rapData, realData, '')
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

        if (!parentkey) {
            rapKeys.forEach(key => {
                let index = realKeys.indexOf(key);
                if (index == -1) {
                    // this.resultRap[key + '_1'] = rapData[key]
                    this.setKeyValue('resultRap', key, parentkey, false, rapData)
                } else {
                    if (typeof rapData[key] === typeof realData[key]) {
                        // this.resultRap[key + '_0'] = rapData[key]
                        // this.resultReal[key + '_0'] = realData[key]
                        this.setKeyValue('resultRap', key, parentkey, true, rapData)
                        this.setKeyValue('resultReal', key, parentkey, true, realData)
                    } else {
                        // this.resultRap[key + '_1'] = rapData[key]
                        // this.resultReal[key + '_1'] = realData[key]
                        this.setKeyValue('resultRap', key, parentkey, false, rapData)
                        this.setKeyValue('resultReal', key, parentkey, false, realData)
                    }

                    realKeys.splice(index, 1);
                }
            });

            realKeys.forEach(key => {
                // this.resultReal[key + '_1'] = realData[key]
                this.setKeyValue('resultReal', key, parentkey, false, realData)
            })
        } else {
            if (!this.resultRap[parentkey]) {
                this.resultRap[parentkey] = {}
            }

            if (!this.resultReal[parentkey]) {
                this.resultReal[parentkey] = {}
            }

            rapKeys.forEach(key => {
                let index = realKeys.indexOf(key);
                if (index == -1) {
                    this.resultRap[parentkey][key + '_1'] = rapData[key]
                } else {
                    if (typeof rapData[key] === typeof realData[key]) {
                        this.resultRap[parentkey][key + '_0'] = rapData[key]
                        this.resultReal[parentkey][key + '_0'] = realData[key]
                    } else {
                        this.resultRap[parentkey][key + '_1'] = rapData[key]
                        this.resultReal[parentkey][key + '_1'] = realData[key]
                    }

                    realKeys.splice(index, 1);
                }
            });

            realKeys.forEach(key => {
                this.resultReal[parentkey][key + '_1'] = realData[key]
            })

        }
    },
    // setKeyValue(taregt, key, keyArr, equal, value) {
    setKeyValue(taregt, key, parentkey, equal, data) {
        let flag = equal ? '_0' : '_1'
        // 从下向上递归，逐步组成对象 赋值属性
        // if (keyArr.length) {
        //     let temp = {}, 
        //         result = {}

        //     result[key + flag] = value
        //     for (var i = keyArr.length - 1; i >= 0; i--) {
        //         result = {}
        //         result[keyArr[i]] = {}
        //     }
        // } else {
        //     this[taregt][key + flag] = value 
        // }
        if (parentkey) {
            this[taregt][parentkey][key + flag] = data[key]
        } else {
            this[taregt][key + flag] = data[key]
        }
    },
    complexKeyHandler(rapData, realData, parentkey) {
        let cRapKeys = this.getSimpleKey(rapData, 'hard'),
            cRealKeys = this.getSimpleKey(realData, 'hard');

        // console.log('complexKeys', cRapKeys)
        if (!parentkey) {
            cRapKeys.forEach(key => {
                let index = cRealKeys.indexOf(key);
                if (index == -1) {
                    this.resultRap[key + '_1'] = rapData[key]
                } else {
                    this.compare(rapData[key], realData[key], key)

                    cRealKeys.splice(index, 1);
                }
            });

            cRealKeys.forEach(key => {
                this.resultReal[key + '_1'] = realData[key]
            })
        } else {
            if (!this.resultRap[parentkey]) {
                this.resultRap[parentkey] = {}
            }

            if (!this.resultReal[parentkey]) {
                this.resultReal[parentkey] = {}
            }

            cRapKeys.forEach(key => {
                let index = cRealKeys.indexOf(key);
                if (index == -1) {
                    this.resultRap[key + '_1'] = rapData[key]
                } else {
                    this.compare(rapData[key], realData[key], key)

                    cRealKeys.splice(index, 1);
                }
            });

            cRealKeys.forEach(key => {
                this.resultReal[key + '_1'] = realData[key]
            })
        }
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



