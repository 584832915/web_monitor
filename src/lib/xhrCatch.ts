import BaseMonitor from './../base/baseMonitor'
import { XhrCatchType } from '../types/errorDetailType'
import { ErrorCategoryEnum, LevelType } from '../types'

class XhrCatch extends BaseMonitor {
    private ignoreXhr: Array<string>
    constructor(params) {
        super(params)
        this.ignoreXhr = params.ignoreXhr ? params.ignoreXhr : []
        this.handleXhrCatch()
    }

    handleXhrCatch() {
        const that = this;
        let XMLHttpRequest: any = window.XMLHttpRequest;
        let oldOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function (method, url, async) {
            if (!url.match(/logcollect/) && !url.match(/sockjs/) && !that.ignoreXhr.includes(url)) {
                this.logData = { method, url, async };
            }
            return oldOpen.apply(this, arguments);
        }
        let oldSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.send = function (body) {
            if (this.logData) {
                let startTime = Date.now();//在发送之前记录一下开始的时间
                //XMLHttpRequest  readyState 0 1 2 3 4
                //status 2xx 304 成功 其它 就是失败
                let handler = (types) => (event) => {
                    let duration = Date.now() - startTime;
                    let status = this.status;//200 500
                    let statusText = this.statusText;// OK Server Error
                    let xhrObj: XhrCatchType = {
                        code: ErrorCategoryEnum.xhrCatch,
                        type: types === 'load' ? LevelType.info : LevelType.error,
                        eventType: types,//load error abort
                        pathname: this.logData.url,//请求路径
                        status: status + '-' + statusText,//状态码
                        duration,//持续时间
                        response: this.response ? this.response : '',//响应体
                        params: body || ''
                    }
                    that.SendTracker(xhrObj)
                }
                this.addEventListener('load', handler('load'), false);
                this.addEventListener('error', handler('error'), false);
                this.addEventListener('abort', handler('abort'), false);
            }
            return oldSend.apply(this, arguments);
        }
    }
}

export default XhrCatch