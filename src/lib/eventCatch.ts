import BaseMonitor from "src/base/baseMonitor";
import { ErrorCategoryEnum, LevelType } from "src/types";
import getSelector from '../utils/getSelector';
import { EventCatchType } from 'src/types/errorDetailType'

let lastEvent
// click事件采集
class EventCatch extends BaseMonitor {
    constructor(param) {
        super(param)
        this.handleEvent()
    }
    handleEvent() {
        document.addEventListener('click', (event: any) => {
            lastEvent = event;//记录最后一次click
            let eventCatchObj: EventCatchType = {
                code: ErrorCategoryEnum.eventCatch,
                type: LevelType.info,
                nodeName: event.target.nodeName,
                innerText: event.target.innerText,
                selector: getSelector(event.path),
            }
            this.SendTracker(eventCatchObj);
        }, {
            capture: true,//捕获阶段
            passive: true//默认不阻止默认事件
        });
    }
}

export { lastEvent }
export default EventCatch