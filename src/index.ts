import localforage from "localforage";
import BaseMonitor from "src/base/baseMonitor";
import * as classErrorObj from "./lib";
import { InitType, ExpendInfo, LevelType } from './types'
import { customObjType } from './types/errorDetailType'
import { MitoVue } from './lib/vueError' //vue 错误单独处理
import ReportTracker from './lib/reportTracker' //上报日志

class WebMonitor extends BaseMonitor {
    constructor(params: InitType) {
        super(params)
        if (!['关键字2', '关键字1', '关键字3'].includes(params.appName)) {
            console.error("appName Should be 关键字2、关键字1、关键字3")
            return
        }
        this.setLocalforage()
        // 根据配置初始化监听错误类型
        for (let key in classErrorObj) {
            if (params[key] !== false) {
                new classErrorObj[key](params)
            }
        }
        new ReportTracker(params)
    }
    // 配置localforage
    setLocalforage() {
        const driverOrder: Array<any> = [
            localforage.INDEXEDDB,
            localforage.WEBSQL,
            localforage.LOCALSTORAGE,
        ];
        localforage.config({
            name: "webMonitor",
            storeName: "webMonitorStore",
        });
        localforage.setDriver(driverOrder);
    }
    // 初始化传入数据
    init(expendObj: ExpendInfo) {
        sessionStorage.setItem('monitorExpendObj', JSON.stringify(expendObj))
    }

    // 自定义上报日志
    info(customObj: customObjType = {}) {
        customObj.type = LevelType.info
        customObj.code = customObj.code ? customObj.code : 2000
        this.SendTracker(customObj)
    }
    debug(customObj: customObjType = {}) {
        customObj.type = LevelType.debug
        customObj.code = customObj.code ? customObj.code : 2000
        this.SendTracker(customObj)
    }
    warn(customObj: customObjType = {}) {
        customObj.type = LevelType.warn
        customObj.code = customObj.code ? customObj.code : 2000
        this.SendTracker(customObj)
    }
    error(customObj: customObjType = {}) {
        customObj.type = LevelType.error
        customObj.code = customObj.code ? customObj.code : 2000
        this.SendTracker(customObj)
    }
}

export { MitoVue, WebMonitor }