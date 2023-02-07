import BaseMonitor from "src/base/baseMonitor";
declare class ConsoleCatch extends BaseMonitor {
    private consoleTypeList;
    constructor(params: any);
    handleConsole(): void;
}
export default ConsoleCatch;
