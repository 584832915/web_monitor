import { ErrorCategoryEnum, LevelType } from './index'


interface BaseType {
    code: ErrorCategoryEnum,
    type: LevelType
}

export interface JsErrorType extends BaseType {
    message: string,
    filename: string,
    position: string,
    stack: string,
    selector: string
}

export interface SourceErrorType extends BaseType {
    filename: string,
    tagName: string
    selector: string
}


export interface PromiseErrorType extends BaseType {
    message: string,
    filename: string,
    position: string,
    stack: string,
    selector: string
}

export interface EventCatchType extends BaseType {
    nodeName: string,
    innerText: string,
    selector: string
}

export interface VueVmType {
    componentName: string,
    propsData?: string
}

export interface VueErrorType extends BaseType {
    Vueversion: number,
    message: string,
    errorName: string,
    stack: string,
    componentName: string,
    propsData?: string
}

export interface XhrCatchType extends BaseType {
    eventType: string,
    pathname: string,
    status: string,
    duration: number,
    response: string,
    params: string
}

export interface RefreshOrLeaveType extends BaseType {
    types: string
}

export interface ConsoleBehaviorType extends BaseType {
    consoleType: string,
    message: string
}

export interface customObjType {
    code?: number,
    type?: LevelType
    message?: string
}

