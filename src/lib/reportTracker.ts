import localforage from "localforage";
import { nanoid } from '../utils/getNanoid'
import { randomNum } from '../utils'
import { ErrorCategoryEnum, LevelType } from '../types'
let isAlowed: boolean = true
// 上报日志
class ReportTracker {
    private timer: any;
    private traceId: string
    private monitorExpendObj: object
    private url: string
    private baseObj: object
    constructor(params) {
        this.timer = null
        this.traceId = nanoid(32)//生成nanoid
        this.monitorExpendObj = {}
        this.url = "https://xxx.com"
        this.baseObj = {
            appName: params.appName,
            userName: params.userName || "",
            version: params.version || ""
        }
        window.requestIdleCallback = window.requestIdleCallback || function (handler) {
            let startTime = Date.now();
            return setTimeout(function () {
                handler({
                    didTimeout: false,
                    timeRemaining: function () {
                        return Math.max(0, 50.0 - (Date.now() - startTime));
                    }
                });
            }, 1);
        }
        this.sendBeacon()
        this.postStart()
    }
    sendBeacon() {
        if (!Object.keys(this.monitorExpendObj).length) {
            let sessionMonitor = sessionStorage.getItem('monitorExpendObj') as string
            this.monitorExpendObj = sessionMonitor ? JSON.parse(sessionMonitor) : {}
        }
        let beaconMsg = [
            {
                code: ErrorCategoryEnum.unloadCatch,
                type: LevelType.info,
                ...this.monitorExpendObj,
                message: `User has closed the current window`,
                timestamp: Date.now(),
                traceId: this.traceId,
                ...this.baseObj
            }
        ]

        window.addEventListener('unload', () => {
            if (navigator.sendBeacon) {
                navigator.sendBeacon(this.url, JSON.stringify({ msg: beaconMsg }));
            }
        });
    }
    // 开始上传
    postStart() {
        this.timer = window.setTimeout(() => {
            window.requestIdleCallback((item) => {
                this.postTracker()
            }, { timeout: 5000 })
        }, 5000)

    }
    // 调用上报日志接口
    ajaxSend(data = [], kesArr = []) {
        let xhr = new XMLHttpRequest()
        xhr.open('post', this.url)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onload = () => {
            let response = JSON.parse(xhr.response)
            kesArr.forEach((val) => {
                localforage.removeItem(val)
            })
            window.clearTimeout(this.timer)
            if (response.rate === -1) {
                isAlowed = false
            } else {
                this.postStart()
            }

        }
        xhr.onerror = (error) => {
            window.clearTimeout(this.timer)
            this.postStart()
        }
        xhr.send(JSON.stringify({ msg: data }))
    }
    // 接口保存日志
    async postTracker() {
        try {
            let valueArr: any = []
            let kesArr: any = []
            await localforage.iterate((value: Object, key) => {
                valueArr.push({ ...value, traceId: this.traceId })
                kesArr.push(key)
            })
            if (valueArr.length) {
                this.ajaxSend(valueArr, kesArr)
            } else {
                window.clearTimeout(this.timer)
                this.postStart()
            }

        } catch {
            window.clearTimeout(this.timer)
            this.postStart()
        }

    }
}
export { isAlowed }
export default ReportTracker