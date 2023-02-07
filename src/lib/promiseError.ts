import BaseMonitor from './../base/baseMonitor'
import { lastEvent } from './eventCatch'
import getSelector from '../utils/getSelector';
import { getLines } from '../utils'
import { ErrorCategoryEnum, LevelType, InitType } from '../types'
import { PromiseErrorType } from '../types/errorDetailType'

class PromiseError extends BaseMonitor {
    private eventCatch
    constructor(params: InitType) {
        super(params)
        this.eventCatch = params.eventCatch
        this.handleError()
    }
    handleError() {
        window.addEventListener('unhandledrejection', (event) => {
            let lastEvents
            if (this.eventCatch !== false) {
                lastEvents = lastEvent;//最后一个交互事件
            }
            let message, filename, line = 0, column = 0, stack = '';
            let reason = event.reason;

            if (typeof reason === 'string') {
                message = reason;
            } else if (typeof reason === 'object') {//说明是一个错误对象
                message = reason.message;

                if (reason.stack) {
                    let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
                    filename = matchResult[1];
                    line = matchResult[2];
                    column = matchResult[3];
                }

                stack = getLines(reason.stack);
            }

            let promiseErrorObj: PromiseErrorType = {
                code: ErrorCategoryEnum.PromiseError,//promise执行错误
                type: LevelType.error,
                message,//报错信息
                filename,//哪个文件报错了
                position: `${line}:${column}`,//行:列
                stack,
                selector: lastEvents ? getSelector(lastEvents.path) : '' //代表最后一个操作的元素
            }
            this.SendTracker(promiseErrorObj)
        }, true)
    }
}

export default PromiseError