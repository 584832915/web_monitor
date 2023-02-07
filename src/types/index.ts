/* 错误类型枚举 */
export enum ErrorCategoryEnum {
    JsError = 1000,//js错误
    PromiseError, //promise错误
    ResourceError,//资源加载错误
    eventCatch,//操作事件监听
    RefreshOrLeave,//刷新或者离开页面
    VueError,//vue错误
    xhrCatch,//ajax错误
    ConsoleCatch,//console捕捉
    Performance,//性能
    FPS,//fps卡顿
    NetWorkSpeed,//网速
    unloadCatch
}

export enum LevelType {
    warn = "warn",
    error = "error",
    info = "info",
    debug = "debug"
}


export interface BaseError {
    timestamp: number | undefined,
    logVer: string,
    network: string,
    [key: string]: any
}

export interface InitType {
    jsError?: Boolean,
    eventCatch?: Boolean,
    promiseError?: Boolean,
    performanceNavigation?: Boolean,
    getFps?: Boolean,
    refreshOrLeave?: Boolean,
    consoleCatch?: Boolean,
    consoleTypeList?: Array<string>,
    xhrCatch?: Boolean,
    ignoreXhr?: Array<string>,
    version?: string,
    appName: string,
    userName?: string
}

export interface ExpendInfo {
    id?: string,
    uid?: string,
    cid?: string,

}

