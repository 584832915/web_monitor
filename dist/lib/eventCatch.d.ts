import BaseMonitor from "src/base/baseMonitor";
declare let lastEvent: any;
declare class EventCatch extends BaseMonitor {
    constructor(param: any);
    handleEvent(): void;
}
export { lastEvent };
export default EventCatch;
