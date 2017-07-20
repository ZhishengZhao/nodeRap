import axdToast from 'src/components/toast/index'
import axdAlert from 'src/components/alert/index'
export const userstatus = (data) => {
    let code = (data.ret && data.ret.code) || data.code
    let isApp = false
    if (aixuedai && aixuedai.isApp && aixuedai.isApp === 'y') {
        isApp = true
    } else {
        isApp = false
    }
    if (!code) {
        axdToast(data.resultDes || (data.ret && data.ret.resultDes))
        return
    }
    switch (code) {
        case 'not_login':
            if (isApp) {
                window.location.href = 'axd://login'
            } else {
                // 没有登陆
                axdToast('请重新登入')
                setTimeout(function() {
                    let url = window.location.pathname + window.location.search
                    window.location.href = '/login.html?url=' + encodeURIComponent(url)
                }, 3000)
            }
            break
        case '-1999':
            if (isApp) {
                window.location.href = 'axd://login'
            } else {
                // 没有登陆
                axdToast('请重新登入')
                setTimeout(function() {
                    let url = window.location.pathname + window.location.search
                    window.location.href = '/login.html?url=' + encodeURIComponent(url)
                }, 3000)
            }
            break
        case 'not_real_name':
            if (isApp) {
                if (aixuedai && aixuedai.appVersion && aixuedai.appVersion >= 204) {
                    let callbackUrl = window.location.href
                    let tipContent = '请如实填写以下信息，爱又米承诺，您所提交的信息仅做为信用评估之用'
                    window.location.href = 'axd://Certification/show?callInfo=' + encodeURIComponent(tipContent) + '&callbackUrl=' + encodeURIComponent(callbackUrl) + '&callCode=2'
                } else {
                    window.location.href = 'axd://addBasicInfo'
                }
            } else {
                axdToast('用户未实名认证！')
                setTimeout(function() {
                    let url = window.location.pathname + window.location.search
                    window.location.href = '/mall/goinfo.html?auth=true&notifyUrl=' + encodeURIComponent(url)
                }, 3000)
            }
            break
        case -1999:
            if (isApp) {
                window.location.href = 'axd://login'
            } else {
                // 没有登陆
                axdToast('请重新登入')
                setTimeout(function() {
                    let url = window.location.pathname + window.location.search
                    window.location.href = '/login.html?url=' + encodeURIComponent(url)
                }, 3000)
            }
            break
        case 'empty_pay_pwd':
            if (isApp) {
                window.location.href = 'axd://setPayPassword'
            } else {
                // 支付密码为空 用户未设置支付密码
                axdToast('请设置支付密码')
                setTimeout(function() {
                    let url = '/mall/safe/initsetpwd.html?url=' + encodeURIComponent(window.location.pathname + window.location.search)
                    window.location.href = url
                }, 3000)
            }
            break
        case 'reset_pay_pwd':
            if (isApp) {
                window.location.href = 'axd://resetPayPassword'
            }
            break
        case 'in_mianqianing':
            axdAlert('抱歉，您的身份信息认证中，请耐心等待审核通过后再继续当前操作')
            break
        case 'AuthStatus_JH':
            // 抱歉，信用帐户未激活，请先激活您的信用帐户
            axdToast('抱歉，信用帐户未激活，请先激活您的信用帐户')
            break
        case 'in_self_check_two':
            // 自助审核中二次下单
            axdToast('抱歉，您当前有一笔订单等待提交，请通过后再继续当前操作')
            break
        case 'close_never_user':
            // 永久关闭用户
            axdToast('抱歉，您暂不符合爱又米信用分期服务条件,暂不可申请该业务')
            break
        case ' close_30days_user':
            // 30天关闭用户
            axdToast('抱歉，您的身份信息审核未通过，请在30天后再尝试提交!')
            break
        case 'in_self_check_less_than':
            // 自助审核中然后又小于大授信的额度
            axdToast('抱歉，您的身份信息认证中，请耐心等待审核通过后再继续当前操作')
            break
        case 'ismianqianpass_more_totalprice':
            // 可用额度不足用户提示
            axdToast('抱歉，当前您的信用消费额度或月还款额度不足')
            break
        case 'merchant_not_normal':
            // 抱歉，该店已关闭，无法下单，换其他商品试试吧
            axdToast('抱歉，该店已关闭，无法下单，换其他商品试试吧')
            break
        case 'offline_merchant_not_mianqian':
            axdToast('抱歉，请申请信用额度后再继续当前操作')
            break
        case 'select_credit_check_two':
            axdToast('抱歉，您当前有一笔订单等待提交，请通过后再继续当前操作')
            break
        case 'seckill_product_not_allow':
            axdToast('秒杀商品没有在活动时间内，不能进行购买！')
            break
        case 'in_self_check':
            axdAlert('抱歉，您的身份信息认证中，请耐心等待审核通过后再继续当前操作')
            break
        case 'is_in_dianshen':
            axdAlert('抱歉，您有一笔审核中的订单，请完成后再继续当前操作')
            break
        case 'has_loan_order':
            axdAlert('抱歉，您有一笔审核中的取点花订单，请完成后再继续当前操作')
            break
        case 'offline_merchant_not_same_city':
            axdAlert('该商户不在您的消费范围内，不可下单!')
            break
        case 'isselfpass_no':
            axdToast('您的身份信息等待重新提交，请审核通过后再继续当前操作!')
            setTimeout(function() {
                if (isApp) {
                    window.location.href = 'axd://go?page=verifydiy&needback=ture&needlogin=ture'
                }
            }, 3000)
            break
        case 'exist_over_due_bill':
            axdAlert('抱歉，您有未还账单，请还款后再继续当前操作')
            break
        case 'offline_merchant_justcan_buy_one':
            axdAlert('抱歉，该商品每次仅限购一件!')
            break
        case 'firstself3_down_app':
            axdToast('下载app提交自助资料')
            setTimeout(function() {
                if (isApp) {
                    window.location.href = aixuedai.appDownloadUrl
                }
            }, 3000)
            break
        case 'not_enough_avail':
            axdToast(data.resultDes || data.ret.resultDes)
            setTimeout(function() {
                if (isApp) {
                    window.location.href = '/app/mall/trade/myTrades.html'
                }
            }, 3000)
            break
        default:
            axdToast(data.resultDes || data.ret.resultDes)
            break
    }
}
