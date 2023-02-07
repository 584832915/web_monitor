export declare enum ErrorCategoryEnum {
    JsError = 1000,
    PromiseError = 1001,
    ResourceError = 1002,
    eventCatch = 1003,
    RefreshOrLeave = 1004,
    VueError = 1005,
    xhrCatch = 1006,
    ConsoleCatch = 1007,
    Performance = 1008,
    FPS = 1009,
    NetWorkSpeed = 1010,
    unloadCatch = 1011
}
export declare enum LevelType {
    warn = "warn",
    error = "error",
    info = "info",
    debug = "debug"
}
export interface BaseError {
    timestamp: number | undefined;
    logVer: string;
    network: string;
    [key: string]: any;
}
export interface InitType {
    jsError?: Boolean;
    eventCatch?: Boolean;
    promiseError?: Boolean;
    performanceNavigation?: Boolean;
    getFps?: Boolean;
    refreshOrLeave?: Boolean;
    consoleCatch?: Boolean;
    consoleTypeList?: Array<string>;
    xhrCatch?: Boolean;
    ignoreXhr?: Array<string>;
    version?: string;
    appName: string;
    userName?: string;
}
export interface ExpendInfo {
    id?: string;
    uid?: string;
    cid?: string;
}
