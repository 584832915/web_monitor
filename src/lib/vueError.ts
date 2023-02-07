
import { getLines } from '../utils'
import BaseMonitor from './../base/baseMonitor'
import { VueErrorType, VueVmType } from 'src/types/errorDetailType'
import { ErrorCategoryEnum, LevelType, InitType } from 'src/types'

function vue2VmHandler(vm): VueVmType {
    let componentName = ''
    if (vm.$root === vm) {
        componentName = 'root'
    } else {
        const name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name
        componentName =
            (name ? 'component <' + name + '>' : 'anonymous component') +
            (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '')
    }
    return {
        componentName,
        propsData: vm.$options && vm.$options.propsData
    }
}
function vue3VmHandler(vm): VueVmType {
    let componentName = ''
    if (vm.$root === vm) {
        componentName = 'root'
    } else {
        const name = vm.$options && vm.$options.name
        componentName = name ? 'component <' + name + '>' : 'anonymous component'
    }
    return {
        componentName,
        propsData: vm.$props
    }
}
const MitoVue = {
    install(Vue, baseObj: InitType): void {
        if (!Vue || !Vue.config) {
            console.error('Vue is not defined!')
            return
        }
        if (!['关键字2', '关键字1', '关键字3'].includes(baseObj.appName)) {
            console.error("appName Should be 关键字2、关键字1、关键字3")
            return
        }
        Vue.config.errorHandler = function (err: Error, vm, info: string): void {
            let version = Vue?.version
            let bigVersion = Number(version.split('.')[0])
            let vmObj = bigVersion === 2 ? vue2VmHandler(vm) : vue3VmHandler(vm)
            const VueErrorObj: VueErrorType = {
                code: ErrorCategoryEnum.VueError,
                type: LevelType.error,
                Vueversion: version,
                message: `${err.message}(${info})`,
                errorName: err.name,
                stack: err.stack ? getLines(err.stack) : '',
                ...vmObj,
            }
            new BaseMonitor(baseObj).SendTracker(VueErrorObj)
        }
    }
}



export { MitoVue }