
import BaseMonitor from './../base/baseMonitor'
import afterLoad from 'src/utils/afterLoad';
import { ErrorCategoryEnum, LevelType } from 'src/types/index'
import { roundByFour } from 'src/utils'
import observe from 'src/utils/observe'

// 性能监控
class PerformanceNavigation extends BaseMonitor {
    constructor(params) {
        super(params)
        if (!this.isPerformanceSupported()) {
            console.warn("Your browser does not suppport performance api.");
            return;
        }
        afterLoad(this.getPerformance.bind(this))//页面加载完成后调用
    }
    resolveNavigationTiming(entry: PerformanceNavigationTiming) {
        const {
            fetchStart,//浏览器已经准备好去使用 HTTP 请求抓取文档
            domainLookupStart,//域名开始解析
            domainLookupEnd,//解析域名结束
            connectStart,//请求连接被发送到网络之时d时间戳
            connectEnd,//网络链接建立的时间节点
            secureConnectionStart,//安全连接握手开始
            requestStart,//浏览器发送从服务器或者缓存获取实际文档的请求开始
            responseStart,//响应开始
            responseEnd,//响应结束
            domInteractive,//主文档的解析器结束
            domContentLoadedEventStart,//脚本解析开始
            domContentLoadedEventEnd,//脚本解析结束
            loadEventStart,//load事件触发，全部加载完毕
        } = entry
        let performanceObj = {
            code: ErrorCategoryEnum.Performance,
            type: LevelType.info,
            dnsLookup: roundByFour(domainLookupEnd - domainLookupStart),//域名解析时间
            initialConnection: roundByFour(connectEnd - connectStart),//连接时间
            ssl: secureConnectionStart ? roundByFour(connectEnd - secureConnectionStart) : 0,
            ttfb: roundByFour(responseStart - requestStart),//首字节到达时间
            contentDownload: roundByFour(responseEnd - responseStart),//响应的读取时间
            domParse: roundByFour(domInteractive - responseEnd),//Dom 解析时间
            deferExecuteDuration: roundByFour(domContentLoadedEventStart - domInteractive),
            domContentLoadedCallback: roundByFour(domContentLoadedEventEnd - domContentLoadedEventStart),
            resourceLoad: roundByFour(loadEventStart - domContentLoadedEventEnd),
            domReady: roundByFour(domContentLoadedEventEnd - fetchStart),
            pageLoad: roundByFour(loadEventStart - fetchStart)
        }
        this.SendTracker(performanceObj)
    }
    getPerformance() {
        if (!!window.PerformanceObserver && PerformanceObserver.supportedEntryTypes?.includes('navigation')) {
            const entryHandler = (entry: PerformanceNavigationTiming) => {
                if (entry.entryType === 'navigation') {
                    if (po) {
                        po.disconnect()
                    }
                    this.resolveNavigationTiming(entry)
                }
            }

            const po = observe('navigation', entryHandler)
        } else {
            const navigation =
                performance.getEntriesByType('navigation').length > 0 ? performance.getEntriesByType('navigation')[0] : performance.timing
            this.resolveNavigationTiming(navigation as PerformanceNavigationTiming)
        }
    }
    isPerformanceSupported = (): boolean => {
        return !!window.performance && !!window.performance.getEntriesByType && !!window.performance.mark
    }

}

export default PerformanceNavigation