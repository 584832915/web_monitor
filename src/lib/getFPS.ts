import BaseMonitor from "src/base/baseMonitor";
import { ErrorCategoryEnum, LevelType } from 'src/types'
// import calculateFps from 'src/utils/calculateFps'

class GetFps extends BaseMonitor {
    constructor(params) {
        super(params)
        if (!window.requestAnimationFrame) {
            console.warn("Your browser does not suppport requestAnimationFrame api.");
            return
        }
        // this.getFpsFun()  //暂时注释
    }

    getFpsFun() {
        const limit = 3;                        // 出现低FPS的连续次数上限 
        const below = 20;                       // 可容忍的最低FPS 
        const updateInterval = 2 * 1000;        // 检测帧率的间隔时间 
        let updateTimer = 0;                    // 已经过去的时间 
        let count = 0;

        let lastTime = performance.now();
        let frame = 0;
        let lastFameTime = performance.now();
        const loop = () => {
            frame += 1;
            const now = performance.now();
            const fs = (now - lastFameTime);
            lastFameTime = now;
            updateTimer += fs || 0;
            if (updateTimer < updateInterval) {
                window.requestAnimationFrame(loop);
                return;
            }
            updateTimer = 0;

            let fps = 0;
            fps = Math.round(1000 / fs);
            if (now > 1000 + lastTime) {
                fps = Math.round((frame * 1000) / (now - lastTime));
                frame = 0;
                lastTime = now;
            }
            if (fps < below) {
                count += 1;
                if (count >= limit) {
                    let FPSObj = {
                        code: ErrorCategoryEnum.FPS,
                        type: LevelType.info,
                        fps: fps,
                        message: `连续${count}次FPS低于${below}，当前FPS为${fps}`
                    }
                    this.SendTracker(FPSObj)
                    console.warn('网页卡顿', `连续${count}次FPS低于${below}，当前FPS为${fps}`);
                }
            } else {
                count = 0;
            }
            window.requestAnimationFrame(loop);
        };
        loop();
    }
}

export default GetFps