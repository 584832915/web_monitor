import BaseMonitor from "src/base/baseMonitor";
import { ErrorCategoryEnum, LevelType } from "src/types";
import { ConsoleBehaviorType } from 'src/types/errorDetailType'

class ConsoleCatch extends BaseMonitor {
    private consoleTypeList: Array<string>
    constructor(params) {
        super(params)
        this.consoleTypeList = params.consoleTypeList || ['error']
        this.handleConsole()
    }

    handleConsole() {
        if (!window || !window.console) return;

        this.consoleTypeList.forEach((type) => {
            const action = window.console[type];

            window.console[type] = (...rest: any[]) => {
                const msg = Array.from(rest);
                const consoleBehaviorObj: ConsoleBehaviorType = {
                    code: ErrorCategoryEnum.ConsoleCatch,
                    type: LevelType.info,
                    consoleType: type,
                    message: JSON.stringify(msg)
                };

                this.SendTracker(consoleBehaviorObj)

                return typeof action === "function" && action.call(null, ...rest);
            }
        })

    }
}

export default ConsoleCatch