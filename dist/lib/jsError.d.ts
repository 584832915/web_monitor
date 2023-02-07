import BaseMonitor from './../base/baseMonitor';
import { InitType } from '../types';
declare class JsError extends BaseMonitor {
    private eventCatch;
    constructor(params: InitType);
    handleError(): void;
    addJsErrorListerner(event: any): void;
}
export default JsError;
