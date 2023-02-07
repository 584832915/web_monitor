import BaseMonitor from './../base/baseMonitor';
import { InitType } from '../types';
declare class PromiseError extends BaseMonitor {
    private eventCatch;
    constructor(params: InitType);
    handleError(): void;
}
export default PromiseError;
