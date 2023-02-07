import BaseMonitor from './../base/baseMonitor';
declare class XhrCatch extends BaseMonitor {
    private ignoreXhr;
    constructor(params: any);
    handleXhrCatch(): void;
}
export default XhrCatch;
