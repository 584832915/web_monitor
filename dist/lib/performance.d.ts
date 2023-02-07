import BaseMonitor from './../base/baseMonitor';
declare class PerformanceNavigation extends BaseMonitor {
    constructor(params: any);
    resolveNavigationTiming(entry: PerformanceNavigationTiming): void;
    getPerformance(): void;
    isPerformanceSupported: () => boolean;
}
export default PerformanceNavigation;
