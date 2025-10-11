# Built-in Middleware

## Global Middleware

|Name|Description|
|--|--|
|a-core:gate|Enables the API to be effective in a specific runtime environment|

## System Middleware

|Name|Description|
|--|--|
|a-core:notfound|404|
|a-core:overrideMethod||
|a-instance:appReady|Initializes the app object|
|a-instance:instance|Initializes the instance object|
|a-logger:httpLog|Log output|
|a-security:cors|CORS|
|a-security:securities|Securities|
|a-static:static|Processes static resources|

## a-core:gate

Enables the API to be effective in a specific runtime environment

|Name|Type|Description|
|--|--|--|
|flavor|string\|string[]|See: [Runtime Environment and Flavor](../../techniques/mode-flavor/introduction.md)|
|mode|string\|string[]|See: [Runtime Environment and Flavor](../../techniques/mode-flavor/introduction.md)|
|instanceName|string\|string[]|See: [Multi-Instance/Multi-Tenant](../../techniques/instance/introduction.md)|
|host|string\|string[]|Host Name|

* Example

``` typescript
@Aspect.middlewareGlobal('a-core:gate', {
gate: {
flavor: 'normal',
mode: 'dev',
instanceName: '',
host: 'localhost:7102',
},
})
```