import BaseMonitor from '../base/baseMonitor'
import { ErrorCategoryEnum, LevelType } from '../types'
import { RefreshOrLeaveType } from '../types/errorDetailType'

class RefreshOrLeave extends BaseMonitor {
    constructor(params) {
        super(params)
        this.handleRefreshOrLeave()
    }
    handleRefreshOrLeave() {
        window.addEventListener("beforeunload", (event) => {
            let refreshOrLeaveObj: RefreshOrLeaveType = {
                code: ErrorCategoryEnum.RefreshOrLeave,
                type: LevelType.info,
                types: event.type
            }
            this.SendTracker(refreshOrLeaveObj)
        });

    }
}

export default RefreshOrLeave
