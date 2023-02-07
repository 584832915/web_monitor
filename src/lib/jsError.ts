
import BaseMonitor from './../base/baseMonitor'
import { lastEvent } from './eventCatch'
import getSelector from '../utils/getSelector';
import { getLines } from '../utils'
import { JsErrorType, SourceErrorType } from '../types/errorDetailType'
import { ErrorCategoryEnum, LevelType, InitType } from '../types'
// 捕获js错误
class JsError extends BaseMonitor {
    private eventCatch
    constructor(params: InitType) {
        super(params)
        this.eventCatch = params.eventCatch
        this.handleError()
    }
    demos() {
        return this.handleError()
    }
    private handleError() {
        //监听全局未捕获的错误
        window.addEventListener('error', this.addJsErrorListerner.bind(this), true);
    }
    addJsErrorListerner(event) {
        let lastEvents
        if (this.eventCatch !== false) {
            lastEvents = lastEvent;//最后一个交互事件
        }

        //如果是脚本加载错误
        if (event.target && (event.target.src || event.target.href)) {
            let sourceErrorObj: SourceErrorType = {
                code: ErrorCategoryEnum.ResourceError,
                type: LevelType.error,
                filename: event.target.src || event.target.href,//哪个文件报错了
                tagName: event.target.tagName,//SCRIPT
                selector: getSelector(event.target) //最后一个操作的元素

            }

            this.SendTracker(sourceErrorObj);
        } else {
            let jsErrorObj: JsErrorType = {
                code: ErrorCategoryEnum.JsError,
                type: LevelType.error,
                message: event.message,//报错信息
                filename: event.filename,//哪个文件报错了
                position: `${event.lineno}:${event.colno}`,
                stack: getLines(event.error.stack),
                selector: lastEvents ? getSelector(lastEvents.path) : '' //代表最后一个操作的元素
            }

            this.SendTracker(jsErrorObj);
        }
    }
}

export default JsError