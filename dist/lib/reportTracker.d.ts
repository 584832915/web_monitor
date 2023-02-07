declare let isAlowed: boolean;
declare class ReportTracker {
    private timer;
    private traceId;
    private monitorExpendObj;
    private url;
    private baseObj;
    constructor(params: any);
    sendBeacon(): void;
    postStart(): void;
    ajaxSend(data?: never[], kesArr?: never[]): void;
    postTracker(): Promise<void>;
}
export { isAlowed };
export default ReportTracker;
