import BaseMonitor from "src/base/baseMonitor.ts";
import { InitType, ExpendInfo } from './types';
import { customObjType } from './types/errorDetailType';
import { MitoVue } from './lib/vueError';
declare class WebMonitor extends BaseMonitor {
    constructor(params: InitType);
    setLocalforage(): void;
    init(expendObj: ExpendInfo): void;
    info(customObj?: customObjType): void;
    debug(customObj?: customObjType): void;
    warn(customObj?: customObjType): void;
    error(customObj?: customObjType): void;
}
export { MitoVue, WebMonitor };
