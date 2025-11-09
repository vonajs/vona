# Redlock

VonaJS provides an intuitive and easy-to-use distributed lock based on [Redlock](https://github.com/sesamecare/redlock/)

## Create Redlock

For example, creating a distributed lock in the module demo-student

### 1. CLI Command

``` bash

$ vona :create:bean meta redlock --module=demo-student

```

### 2. Menu Command

::: tip
Right-click menu - [Module Path]: `Vona Meta/Redlock`

:::

## Distributed Lock Definition

``` typescript

export type TypeRedlockLockResource = never;

export type TypeRedlockLockIsolateResource = never;

@Meta()

export class MetaRedlock extends BeanRedlockBase<TypeRedlockLockResource, TypeRedlockLockIsolateResource> {}

```

- `TypeRedlockLockResource`: Defines the lock resource used by the `lock` method.

- `TypeRedlockLockIsolateResource`: Defines the lock resource used by the `lockIsolate` method.

## Defining Lock Resources

When using distributed locks, we need to specify the corresponding lock resource. For example, defining a lock resource `name` for the `lock` method:

``` diff

- export type TypeRedlockLockResource = never;

+ export type TypeRedlockLockResource = 'name';

```

## Using Distributed Locks

``` typescript

class ControllerStudent {

async test() {

const res = await this.scope.redlock.lock('name', async () => {

// do something in lock

return 'some result';

});

}

}

```

- `redlock.lock`: Passing in the lock resource `name`

## `lock/lockIsolate`

VonaJS provides two lock methods: `lock/lockIsolate`. The difference between the two is that `lockIsolate` automatically implements `data source hierarchy`, thus avoiding deadlocks caused by data source contention.

- See: [Data Source Hierarchy](./queue/db-level.md)

### Defining Lock Resources: lockIsolate

Defining lock resources for the `lockIsolate` method:

``` diff

- export type TypeRedlockLockIsolateResource = never;

+ export type TypeRedlockLockIsolateResource = 'name';

```

### Using Distributed Locks: lockIsolate

``` typescript
class ControllerStudent {
async test() {
const res = await this.scope.redlock.lockIsolate('name', async () => {
// do something in lock
return 'some result';

});

}

```

## Defining Lock Resources: Literal Templates

Lock resources can also be literal templates.

For example, if you want to provide separate lock resources for different users, you can use a string like `user-${userId}` as the lock resource name.

``` diff

- export type TypeRedlockLockIsolateResource = 'name';

+ export type TypeRedlockLockIsolateResource = 'name' | `user-${string}`;

```

This way, type hints can also be provided when using the `lockIsolate` method.

``` typescript

class ControllerStudent {

async test() {

const userId = 1;

const res = await this.scope.redlock.lockIsolate(`user-${userId}`, async () => {

// do something in lock

return 'some result';

});

}

```

## View the list of currently active distributed locks

You can directly output the list of currently active distributed locks

``` diff

class ControllerStudent {

@Web.get('test')

test() {

+ this.bean.onion.meta.inspectMeta('redlock');

}
}
```

- `this.bean.onion`: Gets the global Service instance `onion`

- `.meta`: Gets the Service instance related to the meta tag

- `.inspectMeta`: Outputs the list of currently active distributed locks

When you access the `test` API, the list of currently active distributed locks will be automatically output to the console, as shown below:

![](../../assets/img/distributed/redlock-1.png)
