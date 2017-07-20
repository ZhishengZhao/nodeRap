export var couponFormat = (obj) => {
    var couponTipsTxt = (value, money) => {
        var str = ''
        if (value.interval) {
            if (value.data[0] === 1) {
                var len = value.data.length
                str = value.data[len - 1] + '期'
            } else {
                str = value.data.join('-') + '期'
            }
        } else {
            str = value.data.join(',') + '期'
        }
        let _money = money / 1000
        return _money + '元' + str + '免息'
    }
    var formatMoney = (value = 0) => {
        return value / 1000
    }
    var formatJSON = {}
    var formatList = []
    var usableTotal = 0
    var HASSPLIT = false
    for (let item of obj) {
        let subObj = item.parsedRule
        let itemClass = ''
            // coupon__item--god,
            // coupon__item--default ,
            // coupon__item--dis-god,
            // coupon__item--dis-def
            // feeScope === 7 是神券
        let isGod = Number(item.feeScope) === 7
        if (item.flag === 'y') {
            usableTotal += 1
            itemClass = isGod ? 'god' : 'default'
        } else {
            if (!HASSPLIT) {
                formatList.push({
                    type: 'split'
                })
                HASSPLIT = true
            }

            itemClass = isGod ? 'dis-god' : 'dis-def'

            //  itemClass = 'disabled'
        }

        // type -- free_interest|discount
        // code
        // flag
        // style
        // left_main
        // left_sub
        // right_title
        // right_desc
        //
        // date
        // 分为折扣券和 免息券， parseRule的对象不一样，其他都一样

        let _item = {
            isGod: isGod,
            code: item.code,
            flag: item.flag,
            right_title: (isGod ? '[神券]' : '') + item.desc,
            startTime: item.startTime,
            endTime: item.endTime,
            itemClass: itemClass,
            category: item.category
        }
        if (item.category === 'discount') {
            let leftMain = (subObj.discount * 10).toFixed(1) + '折'
            let leftSub = ''
            if (formatMoney(subObj.maxDiscountAmt) != 0) {
                leftSub = '最高' + formatMoney(subObj.maxDiscountAmt) + '元'
            }
            let desc1 = '金额≥' + formatMoney(subObj.minCashAmt) + '元'
            let desc2 = '分期数≥' + subObj.stages + '期'
            Object.assign(_item, {
                type: '折扣券',
                left_main: leftMain,
                left_sub: leftSub,
                tipsTxt: leftMain + '折扣券',
                right_desc: [desc1, desc2, item.randDesc]
            })
        } else {
            let descStr = subObj.limitString
            let arrDesc = descStr.split('，') // 中文逗号分隔
            arrDesc.push(item.randDesc)
                // arrDesc.push(subObj.whichcanuse)
            let stageStr = ''
            let stageObj = subObj.effectiveStages
                //  stageObj.data = Array.from(stageObj.data, (x) => Number(x))
            if (stageObj.interval) {
                if (stageObj.data[0] == 1) {
                    var len = stageObj.data.length
                    stageStr = '前' + stageObj.data[len - 1] + '期'
                } else {
                    stageStr = stageObj.data.join('-') + '期'
                }
            } else {
                stageStr = stageObj.data.join(',') + '期'
            }

            Object.assign(_item, {
                type: '免息券',
                left_main: formatMoney(subObj.effectiveAmt),
                left_sub: stageStr,
                tipsTxt: couponTipsTxt(subObj.effectiveStages, subObj.effectiveAmt),
                right_desc: arrDesc
            })
        }
        formatList.push(_item)
    }
    formatJSON = {
        usableTotal: usableTotal,
        list: formatList
    }

    /* this.$emit('toFather', {
         total: formatJSON.usableTotal,
         notUse: this.notUse
     }) */
    return formatJSON
}

export var serviceFormat = (data) => {
    if (!(data && data.result)) {
        return
    }
    data = data.result

    let resultData = {
        activeName: data.activeName,
        // 均月供
        averageMonthPay: (data.approximateMonthlyPay),
        // 月均服务费
        averageServicePay: (data.activeApproximateMonthlyServicePay),
        // 总优惠
        totalDiscount: (data.totalDuceServicePay || 0),
        // 总手续费
        totalCounterFee: (data.activeCalculateRateVos[0].handlerServiceFee || 0),
        // 参加活动与否
        isActive: data.isActive,
        // 还款列表
        repayList: data.activeCalculateRateVos
    }

    // this.$emit('toFather', resultData)
    return resultData
}
