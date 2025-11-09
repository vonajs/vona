# Schedule

VonaJS provides intuitive and easy-to-use schedule based on [BullMQ](https://github.com/taskforcesh/bullmq). Because schedule is a special case of queue

## Create Schedule

For example, create a schedule `log` in the module `demo-student`, which will output the current time to the console at specified time intervals

### 1. Cli Command

``` bash
$ vona :create:bean schedule log --module=demo-student
```

### 2. Menu Command

::: tip
Context menu - [Module Path]: `Vona Bean/Schedule`
:::

## Schedule Definition

``` typescript
@Schedule({ repeat: { every: 3000 } })
export class ScheduleLog extends BeanBase implements IScheduleExecute {
  async execute() {
    console.log(Date.now());
  }
}
```

- `execute`: Outputs the current time

## Schedule Parameters

Parameters can be configured for schedule

``` typescript

@Schedule({
queue: undefined,
repeat: {
every: 3000,
pattern: '0 15 3 * * *',

},
templateOptions: {},

dbInfo: undefined,

transaction: false,

})
class ScheduleLog {}

```

|Name|Type|Description|

|--|--|--|

|queue|string|The name of the queue used by the scheduled task. The default value is empty, thus using the system's built-in queue|

|repeat.every|number|Interval|

|repeat.pattern|string|cron expression. See: [cron-parser](https://github.com/harrisiirak/cron-parser)|

|templateOptions|Bull.JobSchedulerTemplateOptions|Bull JobScheduler options|

|dbInfo.level|number|Defaults to data source level `1`, see: [Data Source Level](./queue/db-level.md)|

|dbInfo.clientName|string|Defaults to the system's default data source name|

|transaction|boolean|Whether to enable database transactions, defaults to `false`|

## App Config Configuration

Scheduled task parameters can be configured in App Config

`src/backend/config/config/config.ts`

``` typescript

// onions

config.onions = {

schedule: {

'demo-student:log': {

repeat: {

every: 5000,

},

transaction: true,

},

},

};
```

## Enabling/Disabling Scheduled Tasks

You can control the enabling/disabling of scheduled tasks.

### 1. Enable

`src/backend/config/config/config.ts`

``` diff

// onions

config.onions = {

schedule: {

'demo-student:log': {

+ enable: false,

},

},

};

```

### 2. Meta

This allows scheduled tasks to take effect in a specified runtime environment.

|Name|Type|Description|

|--|--|--|

|flavor|string\|string[]|See: [Runtime Environment and Flavor](../env-config/mode-flavor/introduction.md)|

|mode|string\|string[]|See: [Runtime Environment and Flavor](../env-config/mode-flavor/introduction.md)|

* Example

``` diff

@Schedule({
repeat: {},

+ meta: {

+ flavor: 'normal',

+ mode: 'dev',

+ },

})

class ScheduleLog {}

```

## View the list of currently active scheduled tasks

You can directly output the list of currently active scheduled tasks

``` diff

class ControllerStudent {

@Web.get('test')

test() {

+ this.bean.onion.schedule.inspect();

}
}
```

- `this.bean.onion`: Gets the global Service instance `onion`

- `.schedule`: Gets the Service instance associated with the scheduled task

- `.inspect`: Outputs the list of currently active scheduled tasks

When accessing the `test` API When the timer is active, a list of currently active scheduled tasks will be automatically output to the console, as shown below:

![](../../assets/img/distributed/schedule-1.png)
