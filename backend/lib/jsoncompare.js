class jsonCompare {
    constructor() {

    }

    init(rapJson, realJson) {
        let checkResult = this.dataCheck(rapJson, realJson);
        checkResult.success && this.go(rapJson, realJson);
    }

    dataCheck(rapJson, realJson) {
        rapJson = this.jsonParse(rapJson);
        realJson = this.jsonParse(realJson);

        if (!realJson) {
            console.log('请确保接口返回有效数据！');
            return {
                success: false,
                desc: '真实接口返回数据异常！'
            };
        }

        if (!rapJson) {
            console.log('请确保rap数据格式正常！');
            return {
                success: false,
                desc: 'rap数据异常！'
            };
        }

        return {
            success: true
        };
    }

    jsonParse(json) {
        if (json) {
            if (json && typeof json !== 'object') {
                try {
                    json = JSON.parse(json);
                    return json;
                } catch (e) {
                    return false;
                }
            } else {
                return json;
            }  
        } else {
            return false;
        }
    }

    go(rapJson, realJson) {
        if (rapJson == realJson) {
            return true;
        } else {
            for (let key in rapJson) {
                if (rapJson.hasOwnProperty(key) && realJson.hasOwnProperty(key)) {

                } else {
                    return false;
                }
            }
        }
    }

    isObject(obj) {

    }
}
