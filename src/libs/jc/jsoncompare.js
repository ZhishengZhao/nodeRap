const jc = {
    init(rapData, realData) {
        if (typeof rapData == 'string') {
            rapData = this.toJson(rapData)
        }

        if (typeof realData == 'string') {
            realData = this.toJson(realData)
        }

        this.compare(rapData, realData, '')
    }, 

    compare(rapData, realData, key) {
        let rapDataType = this.getType(rapData), 
            realDataType = this.getType(realData);
        
        if (rapDataType == realDataType) {
            if (rapDataType == 'object') {
                console.log('object compare')
                let rapKeys = Object.keys(rapData),
                    realKeys = Object.keys(realData),
                    sameKeys = this.getArrSame(rapKeys, realKeys, 'same'),
                    rapOnlyKeys = this.getArrSame(rapKeys, realKeys, 'diff'),
                    realOnlyKeys = this.getArrSame(realKeys, rapKeys, 'diff');

                rapKeys.forEach((key => {
                    if (realData.hasOwnProperty(key)) {
                        this.compare(rapData[key], realData[key], key)
                    } else {
                        console.log('字段缺失')
                        console.log('key ' + key + ' is missing in realData')
                    }
                }))
            } else if (rapDataType == 'array') {
                
                for (let item in rapData) {
                    this.compare(rapData[key], realData[key], '')
                }

                // if (!rapData.length) {

                // }

                // if (!realData.length) {

                // }
            } else {
                console.log('其他字符类型，不用对比')
            }
        } else {
            this.resultArr.push('key ' + key + '\'s Type diff between rap and real:')
        }
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

export default jc


var finalData = {

}


