/**
 *
 */
import {
    getReactDetailInfo,
} from 'store/modules/trade/product'
const state = {
    defaultData: {
        defaultImg: require('src/module/trade/product/img/default.gif'),
        defaultShopLogo: require('src/module/trade/product/img/shop-logo.jpg')
    },
    initData: {
        sellPoint: [],
        instalment: {
            isShow: true, // 是否展示
            txt: '', // 文字描述
            thumbImg: '', // 缩略图
            detailImg: '', // 详情图
            detailUrl: '' // 详情链接
        }
    }
}
// getter
const getters = {
    price: state => {
        return state.interactData.trade.price ? state.interactData.trade.price : state.initData.trade.minPrice
    }
}

// actions 数据接口管理
const actions = {
    // 获取初始化的cps资源位数据
    getCpsSourceData({commit}, params) {
        return new Promise((resolve, reject) => {
            getCpsSource(params).then((data) => {
                if (data.success) {
                    commit('initSellingPoint', data.result)
                    commit('initInstalment', data.result)
                    commit('initSales', data.result)
                    commit('initCouponSource', data.result)
                    resolve()
                } else {
                    reject()
                }
            })
        })
    }
}

// mutations 状态转换 和 数据适配
const mutations = {
    // ****** 初始化数据处理 *******
    initDesc(state, product) {
        let {
            productAllVo: {
                productType,
                id,
                content,
                imgUrl,
                name,
                priceTags,
                tags,
                merchantIdStr,
                productReal: {
                    productImgs,
                    isAxd,
                    isSeaAmoy,
                    taxFee
                }
            }
        } = product

        imgUrl = formatImg(imgUrl)

        // banner图片的处理，如果后台未配置，则取商品图
        let bannerImgs = []
        if (productImgs && productImgs.length > 0) {
            productImgs.forEach((item, index) => {
                if (item.url) {
                    let tItem = {
                        img: formatImg(item.url),
                        url: 'javascript:void(0);'
                    }
                    bannerImgs.push(tItem)
                }
            })
        }
        if (bannerImgs.length == 0) {
            bannerImgs.push({
                img: imgUrl,
                url: 'javascript:void(0);'
            })
        }

        // 存state
        Object.assign(state.initData.desc, {
            content,
            imgUrl,
            name,
            priceTags: priceTags ? priceTags.split(',') : undefined,
            nameTags: tags ? tags.split(',') : undefined,
            bannerImgs,
            productId: id,
            isAxd,
            merchantIdStr,
            isSeaAmoy: isSeaAmoy == 'y',
            tax: taxFee ? Number(taxFee) : 0,
            productType
        })
    }
}

// 属性替换
function replaceProperty(item, targetName, currName, valueType) {
    if (valueType == 'img') {
        item[currName] = formatImg(item[currName])
    }
    item[targetName] = item[currName]

    delete item[currName]
}

export default {
    state,
    getters,
    actions,
    mutations
}
