var jc = {
    resultRap: {

    },
    resultReal: {

    },
    resultArr: [],
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
        // if (!rapData && !realData) {
        //     return {
        //         resultRap: this.resultRap,
        //         resultReal: this.resultReal
        //     }
        // } else if (rapData && !realData) {
        //     let rapDataType = this.getType(rapData)

        //     if (rapDataType == 'object') {
        //         this.simpleKeyHandler(rapData, realData, key);
        //         this.complexKeyHandler(rapData, realData, key);
        //     } else if (rapDataType == 'array') {
        //         // let minLength = Math.min(rapData.length, realData.length)
        //         // let i = 0
        //         // let count = key.length

        //         // for (; i < minLength; i++) {
        //         //     key[count - 1].num = i
        //         //     this.compare(rapData[i], realData[i], key)
        //         // }
        //         let maxLength = Math.max(rapData.length, realData.length)
        //         let i = 0
        //         let count = key.length

        //         for (; i < maxLength; i++) {
        //             key[count - 1].num = i
        //             this.compare(rapData[i], realData[i], key)
        //         }



        //         // if (rapData.length > minLength) {
        //         //     this.setKeyValue('resultRap', key, parentkey, flag, rapData)
        //         //     this.resultRap.concat(rapData.filter((item, index) => index > i))
        //         // }

        //         // if (realData.length > minLength) {
        //         //     this.resultReal.concat(realData.filter((item, index) => index > i))
        //         // }
        //     } else {
        //         console.log('其他字符类型，不用对比')
        //     }

        //     return {
        //         resultRap: this.resultRap,
        //         resultReal: this.resultReal
        //     }
        // } else if (!rapData && realData) {
        //     let realDataType = this.getType(realData)

        //     if (realDataType == 'object') {
        //         this.simpleKeyHandler(rapData, realData, key);
        //         this.complexKeyHandler(rapData, realData, key);
        //     } else if (realDataType == 'array') {
        //         let maxLength = Math.max(rapData.length, realData.length)
        //         let i = 0
        //         let count = key.length

        //         for (; i < maxLength; i++) {
        //             key[count - 1].num = i
        //             this.compare(rapData[i], realData[i], key)
        //         }
        //     } else {
        //         console.log('其他字符类型，不用对比')
        //     }

        //     return {
        //         resultRap: this.resultRap,
        //         resultReal: this.resultReal
        //     }
        // } else {
            let rapDataType = this.getType(rapData),
                realDataType = this.getType(realData)

            if (rapDataType == realDataType) {
                if (rapDataType == 'object') {
                    this.simpleKeyHandler(rapData, realData, key);
                    this.complexKeyHandler(rapData, realData, key);
                } else if (rapDataType == 'array') {
                    // let minLength = Math.min(rapData.length, realData.length)
                    // let i = 0
                    // let count = key.length

                    // for (; i < minLength; i++) {
                    //     key[count - 1].num = i
                    //     this.compare(rapData[i], realData[i], key)
                    // }
                    let maxLength = Math.max(rapData.length, realData.length)
                    let i = 0
                    let count = key.length

                    for (; i < maxLength; i++) {
                        key[count - 1].num = i
                        this.compare(rapData[i], realData[i], key)
                    }

                    // if (rapData.length > minLength) {
                    //     this.setKeyValue('resultRap', key, parentkey, flag, rapData)
                    //     this.resultRap.concat(rapData.filter((item, index) => index > i))
                    // }

                    // if (realData.length > minLength) {
                    //     this.resultReal.concat(realData.filter((item, index) => index > i))
                    // }
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
        // }
    },
    simpleKeyHandler(rapData, realData, parentkey) {
        let rapKeys = this.getSimpleKey(rapData) || [],
            realKeys = this.getSimpleKey(realData) || [];

        rapKeys.forEach(key => {
            let index = realKeys.indexOf(key);
            if (index == -1) {
                this.setKeyValue('resultRap', key, parentkey, false, rapData)
            } else {
                let flag = typeof rapData[key] === typeof realData[key]
                this.setKeyValue('resultRap', key, parentkey, flag, rapData)
                this.setKeyValue('resultReal', key, parentkey, flag, realData)
                realKeys.splice(index, 1)
                
                // if (typeof rapData[key] === typeof realData[key]) {
                //     this.setKeyValue('resultRap', key, parentkey, true, rapData)
                //     this.setKeyValue('resultReal', key, parentkey, true, realData)
                // } else {
                //     this.setKeyValue('resultRap', key, parentkey, false, rapData)
                //     this.setKeyValue('resultReal', key, parentkey, false, realData)
                // }
                // realKeys.splice(index, 1);
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
        
        // console.log('parentkey', parentkey)

        // 从下向上递归，逐步组成对象 赋值属性
        // console.log('parentkey', parentkey)
        // if (length > 1) {
        let temp = {}

        for (var i = length - 1; i >= 0; i--) {
            if (i == length - 1) {
                if (this.getType(parentkey[i]) == 'object') {
                    let arr = new Array(parentkey[i]['num'] + 1)
                    arr[parentkey[i]['num']] = {
                        [key + flag]: data[key]
                    }

                    temp = {
                        [parentkey[i]['key']]: arr
                    }
                } else {
                    temp = {
                        [parentkey[i]]: {
                            [key + flag]: data[key]
                        }
                    }
                }
            } else {
                if (this.getType(parentkey[i]) == 'object') {
                    temp = {
                        [parentkey[i]]: [{
                            [key + flag]: data[key]
                        }]
                    }
                } else {
                    temp = {
                        [parentkey[i]]: temp
                    }
                }
            }
        }

        this[target] = deepConcat(this[target], temp)
    },
    complexKeyHandler(rapData, realData, parentkey) {
        let cRapKeys = this.getSimpleKey(rapData, 'hard'),
            cRealKeys = this.getSimpleKey(realData, 'hard');

        cRapKeys.forEach(key => {
            let index = cRealKeys.indexOf(key);
            if (index == -1) {
                this.setKeyValue('resultRap', key, parentkey, false, rapData)
            } else {
                if (this.getType(rapData[key]) !== 'array') {
                    parentkey.push(key)
                } else {
                    parentkey.push({
                        key,
                        num: 0
                    })
                }
                
                this.compare(rapData[key], realData[key], parentkey)

                cRealKeys.splice(index, 1);
            }
        });

        cRealKeys.forEach(key => {
            this.setKeyValue('resultReal', key, parentkey, false, realData)
        })
    },
    getSimpleKey(obj = {}, type = 'simple') {
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
            });
        }
    }
}

window.jc = jc
// export default jc
/**
 * @DateTime 2018-01-15
 * @Author   Zhao       Zhisheng
 * @param    {[Object]}   t        [target]
 * @param    {[Object]}   o        [source]
 * @return   {[Object]}   t        [target]
 */
function deepConcat(t, o) {
    let typeO = getType(o)
    let typeT = getType(t)
    if (typeO && !typeT) {
        t = o
    } else if ((!typeO && typeT) || (!typeO && !typeT)) {

    } else if (typeO !== typeT) {
        console.log(typeT, typeO)
        console.log(t, o)
        throw new Error('深合并需保证两个参数数据类型一致')
    } else {
        if (typeO == 'object') {
            for (let key in o) {
                if (getType(o[key]) == 'object') {
                    if (!t.hasOwnProperty(key)) {
                        t[key] = o[key]
                    } else {
                        t[key] = deepConcat(t[key], o[key])
                    }
                } else if (getType(o[key]) == 'array') {
                    if (!t.hasOwnProperty(key) || !t[key].length) {
                        t[key] = o[key]
                    } else {
                        t[key] = deepConcat(t[key], o[key])
                    }
                } else {
                    if (o.hasOwnProperty(key) && !t.hasOwnProperty(key)) {
                        t[key] = o[key]
                    }
                }
            }
        } else if (typeO == 'array') {
            if (!t || !t.length) {
                t = o.slice()
            } else {
                // for (let i = 0; i < o.length; i++) {
                //     deepConcat(t[i], o[i])
                // }
                o.forEach((item, index) => {
                    t[index] = deepConcat(t[index], item)
                })
            }
        } else {
            t = o
        }
    }

    return t
}

/**
 * @DateTime 2018-01-15
 * @Author   Zhao       Zhisheng
 * @param    {[type]}   obj      [input]
 * @return   {[type]}            [obj type]
 */
function getType(data) {
    if (data) {
        let type = typeof data
        if (type == 'object') {
            if (!data.hasOwnProperty('length')) {
            // if (data.toString() == '[object Object]') {
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
}


var a = {
        info: {
            home: {
                location: {
                    name: 'hangzhou',
                    years: 3
                },
                settle: true
            },
            gender: 'male'
        }
    },
    b = {
        location: {
            name: 'new',
            years: 5
        }
    }


function test_obj(key, parentkey, data) {
    let length = parentkey.length
    let temp = {}

    for (var i = length - 1; i >= 0; i--) {
        if (i == length - 1) {
            temp = {
                [parentkey[i]]: {
                    [key]: data[key]
                }
            }
        } else {
            temp = {
                [parentkey[i]]: temp
            }
        }
    }

    return temp
}

var b = {
    location: {
        name: 'new',
        years: 5
    }
}

test_obj('years', ['info', 'home', 'location'], b)


var a = {
        info: {
            home: {
                location: {
                    name: 'hangzhou',
                    years: 3
                },
                settle: true
            },
            gender: 'male'
        }
    },
    b = {
        info: {
            home: {
                location: {
                    name: '1111',
                    years: 232323
                },
                settle: false
            },
            gender: 'female'
        }
    }

// deepConcat(a, b)