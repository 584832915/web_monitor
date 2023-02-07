import { BaseError, InitType } from './../types/index';
declare class BaseMonitor {
    monitorExpendObj: Object;
    private baseObj;
    constructor(params?: InitType);
    SendTracker(data?: {}): void;
    storageTracker(data: any): void;
    handleTrackerItem(data?: any): {
        code: any;
        type: any;
        message: string;
    };
    getExtraData(): BaseError;
    handleNetWork(): string;
}
export default BaseMonitor;
