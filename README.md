# web前端日志收集及埋点上报方案


### 引用方式

#### script标签引用

```javascript
 <script src="../dist/monitor.umd.js"></script>
```
#### import 引用

```javascript
 import { MitoVue,WebMonitor } from '../dist/monitor.min.js'
 import '../dist/monitor.umd.js'
```

### 初始化

#### 初始化参数说明

| 字段名                |    值类型     | 是否必传 | 描述及默认值                                                    |
| :-------------------- | :-----------: | :------: | :-------------------------------------------------------------- |
| appName               |    string     |    是    | appName 关键字2、关键字1、关键字3 三选一                        |
| userName              |    string     |    否    | 用户名 默认空                                                   |
| version               |    string     |    否    | 版本号 默认空                                                   |
| jsError               |    boolean    |    否    | 是否捕捉js错误和资源加载错误,默认true                           |
| eventCatch            |    boolean    |    否    | js错误是否捕捉最后一次点击事件,默认true                         |
| promiseError          |    boolean    |    否    | 是否捕捉promise错误,默认true                                    |
| performanceNavigation |    boolean    |    否    | 是否捕捉performance页面性能,默认true                            |
| getFps                |    boolean    |    否    | 是否捕捉fps,默认true                                            |
| refreshOrLeave        |    boolean    |    否    | 是否捕捉beforeunload事件,默认true                               |
| consoleCatch          |    boolean    |    否    | 是否捕捉console,默认true，默认只捕捉error,可配置consoleTypeList |
| consoleTypeList       | array<string> |    否    | 需要捕捉的consoleType ['error','warn','info','log',...]         |
| xhrCatch              |    boolean    |    否    | 是否捕捉xhr请求 默认true  可配置ignoreXhr                       |
| ignoreXhr             | array<string> |    否    | 忽略捕捉的xhr请求的数组                                         |

#### 引入monitor.min.js 调用示例

```javascript
  const monitor = new WebMonitor({
            appName: '关键字1',
            userName: 'hesufang',
            version: '1.3.20',
            jsError: true, //是否捕捉js错误和资源加载错误,默认true
            eventCatch: false, //js错误是否捕捉最后一次点击事件,默认true
            promiseError: false, //是否捕捉promise错误,默认true
            performanceNavigation: false, //是否捕捉页面性能,默认true
            getFps: false, //是否捕捉fps,默认true
            refreshOrLeave: false, //是否捕捉beforeunload事件,默认true
            consoleCatch: true, //是否捕捉console,默认true，默认只捕捉error,可配置consoleTypeList
            consoleTypeList: ['warn'], //需要捕捉的consoleType ['error','warn','info','log',...]
            xhrCatch: true, //是否捕捉xhr请求
            ignoreXhr: ["https://xxx.com"], //ignoreXhr忽略捕捉接口的数组
        })
```

#### 引入monitor.umd.js  调用示例

```javascript
  const monitor = new MonitorJS.WebMonitor({
            appName: '关键字1',
            userName: 'hesufang',
            version: '1.3.20',
            jsError: true, 
            eventCatch: false, 
            promiseError: false, 
            performanceNavigation: false, 
            getFps: false, 
            refreshOrLeave: false, 
            consoleCatch: true, 
            consoleTypeList: ['warn'], 
            xhrCatch: true, 
            ignoreXhr: ["https://xxx.com/"], 
        })
```


### init方法初始化数据

#### 参数说明

| 字段名 | 值类型 | 是否必传 | 描述及默认值                                |
| :----- | :----: | :------: | :------------------------------------------ |
| id     | string |    否    | id   默认空                                 |
| uid    | string |    否    | uid        默认空                           |
| cid    | string |    否    | cid     默认空                              |
| 其他   | string |    否    | 其他初始化数据上报日志时将拼接到message字段 |

#### 调用示例

```javascript
        monitor.init({
            webcastId: '11111',
            uid: '22222',
            cid: '333333',
            ...
        })

```


### 初始化MitoVue

#### 参数说明

| 字段名   | 值类型 | 是否必传 | 描述及默认值                            |
| :------- | :----: | :------: | :-------------------------------------- |
| appName  | string |    是    | appName 关键字2、关键字1、关键字3三选一 |
| userName | string |    否    | 用户名 默认空                           |
| version  | string |    否    | 版本号 默认空                           |


#### 调用示例
```javascript
    // 引入monitor.min.js
     Vue.use(MitoVue, {
            appName: '关键字1',
            userName: 'hesufang',
            version: '1.3.20',
    })
    // 引入monitor.min.js
     Vue.use(MonitorJS.MitoVue, {
            appName: '关键字1',
            userName: 'hesufang',
            version: '1.3.20',
        })
```


### 自定义上报方法

#### 自定义上报参数说明
| 字段名  | 值类型 | 是否必传 | 描述及默认值                                                               |
| :------ | :----: | :------: | :------------------------------------------------------------------------- |
| code    | number |    否    | 自定义code 建议自定义code从2000开始,例：2001、2002、2003... 不传则默认2000 |
| message | string |    否    | 错误内容 默认空                                                            |

#### 调用示例
```javascript
        // type = info
        monitor.info({
            code:2000,
            message: "content:上报内容|error:错误内容",
        })
         // type = debug
        monitor.debug({
            code:2000,
            message: "content:上报内容|error:错误内容",
        })
         // type = warn
        monitor.warn({
            code:2000,
            message: "content:上报内容|error:错误内容",
        })
         // type = error
        monitor.error({
            code:2000,
            message: "content:上报内容|error:错误内容",
        })

```

### 日志最终上报内容

**接口及参数样例:**

#### POST https://logcollect.263cv.net/log

| 字段名    | 值类型 | 数据来源  | 描述及默认值                          |
| :-------- | :----: | :-------: | :------------------------------------ |
| code      | number | 内置/传参 | 错误code                              |
| type      | string | 内置/传参 | 错误级别 取值:(error,warn,info,debug) |
| timestamp | number |   内置    | 捕捉错误时间                          |
| traceId   | string |   内置    | 追踪id                                |
| logVer    | string |   内置    | 日志版本号                            |
| message   | string | 内置/传参 | 上报内容 字段间将用 \| 分开           |
| network   | string |   内置    | 网络情况                              |
| appName   | String |   传参    | appName 关键字2、关键字1、关键字3     |
| userName  | string |   传参    | 调用用户名                            |
| webcastId | String |   传参    | 直播间id                              |
| cid       | string |   传参    | cid                                   |
| uid       | string |   传参    | uid                                   |
| version   | string |   传参    | 版本号                                |

#### 请求示例
```json
[{
    appName: "11111"
    cid: "333333"
    code: 1000
    type: "error"
    logVer: "1.0.83"
    message: "message:Uncaught Error: 抛一个JS错误|filename:http://127.0.0.1:5500/example/index.html|position:73:19|stack:clickMe (http://127.0.0.1:5500/example/index.html:73:19)^HTMLButtonElement.onclick (http://127.0.0.1:5500/example/index.html:13:47)"
    network: "downlink:1.55;effectiveType:4g,onchange:null,rtt:100"
    timestamp: 1668664806979
    uid: "22222"
    userName: "sdfsfdf"
    version: "1.3.20"
    webcastId: "11111"
}]

```