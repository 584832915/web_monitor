const observe = (type: string, callback: any): PerformanceObserver | undefined => {
    try {
        if (PerformanceObserver.supportedEntryTypes?.includes(type)) {
            const po: PerformanceObserver = new PerformanceObserver((l) => {
                callback(l.getEntries()[0])
            })
            po.observe({ type, buffered: true })
            return po
        }
    } catch (e) {
        throw e
    }
}


export default observe