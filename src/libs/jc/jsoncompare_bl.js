var jd = {
    resultRap: {

    },
    resultReal: {

    },
    init(rapData, realData) {
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
                // console.log('object compare')
                // let rapKeys = Object.keys(rapData),
                //     realKeys = Object.keys(realData);

                this.simpleKeyHandler(rapData, realData, key);
                this.complexKeyHandler(rapData, realData, key);
            } else if (rapDataType == 'array') {
                for (let item in rapData) {
                    this.compare(rapData[key], realData[key], key)
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
                    this.resultRap[key + '_1'] = rapData[key]
                } else {
                    if (typeof rapData[key] === typeof realData[key]) {
                        this.resultRap[key + '_0'] = rapData[key]
                        this.resultReal[key + '_0'] = realData[key]
                    } else {
                        this.resultRap[key + '_1'] = rapData[key]
                        this.resultReal[key + '_1'] = realData[key]
                    }

                    realKeys.splice(index, 1);
                }
            });

            realKeys.forEach(key => {
                this.resultReal[key + '_1'] = realData[key]
            })
        } else {
            // if (this.resultReal)
        }
    },
    setKeyValue(key, parentkey, equal, value) {
        
    },
    complexKeyHandler(rapKeys, realKeys, key) {
        let cRapKeys = this.getSimpleKey(rapData, 'hard'),
            cRealKeys = this.getSimpleKey(realData, 'hard');

        if (!key) {

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

// export default jc

var demo_1_ori = {
        "name": "json",
        "age": 13
    },
    demo_1_tar = {
        "name": "json",
        "age": 13,
        "gender": "male"
    };

var result = jc.init(demo_1_ori, demo_1_tar);
console.log('result', result);

