import localforage from "localforage";
import { BaseError, InitType } from './../types/index'
import { version } from './version.json'
import { isAlowed } from '../lib/reportTracker'
// 监控基类
class BaseMonitor {
    public monitorExpendObj: Object
    private baseObj: Object
    constructor(params: InitType = { appName: "" }) {
        this.baseObj = {
            appName: params.appName,
            userName: params.userName || "",
            version: params.version || ""
        }
        this.monitorExpendObj = {}; //init传的自定义参数
    }
    // 收集各个模块的日志
    SendTracker(data = {}) {
        let extraData = this.getExtraData();
        let trackerItem = this.handleTrackerItem(data)
        let log = { ...extraData, ...trackerItem, ...this.baseObj };
        console.log(log, isAlowed, '日志log')
        if (isAlowed) {
            this.storageTracker(log)
        }
    }
    // 存储日志
    storageTracker(data) {
        localforage.setItem(new Date().getTime().toString() + Math.random(), data)
    }

    // 整理捕捉的日志
    handleTrackerItem(data: any = {}) {
        let messageArr: Array<string> = []
        for (let key in data) {
            if (!["code", "type"].includes(key) && data[key]) {
                let value = typeof data[key] === 'string' ? data[key] : JSON.stringify(data[key])
                messageArr.push(`${key}:${value}`)
            }
        }
        return {
            code: data.code,
            type: data.type,
            message: messageArr.join('|')
        }
    }
    // 获取公共信息
    getExtraData(): BaseError {
        if (!Object.keys(this.monitorExpendObj).length) {
            let sessionMonitor = sessionStorage.getItem('monitorExpendObj') as string
            this.monitorExpendObj = sessionMonitor ? JSON.parse(sessionMonitor) : {}
        }
        return {
            logVer: version,
            timestamp: Date.now(),
            network: this.handleNetWork(),
            ...this.monitorExpendObj
        }
    }
    // 获取网络状态 
    handleNetWork() {
        let netConnect = (navigator as any).connection;
        if (netConnect) {
            let { downlink, effectiveType, onchange, rtt } = netConnect
            return `downlink:${downlink};effectiveType:${effectiveType},onchange:${onchange},rtt:${rtt}`
        } else {
            return ''
        }
    }

}

export default BaseMonitor;