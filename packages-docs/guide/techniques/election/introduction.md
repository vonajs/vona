# Election

How can you start a standalone service in the backend using VonaJS?

Since VonaJS uses a distributed architecture, multiple Workers can be started in the backend. So, on which Worker should the standalone service be started?

VonaJS provides `Election` for this scenario, which works as follows:

1. All Workers compete to acquire ownership
2. You can specify the number of Workers that can acquire ownership simultaneously
3. The Worker that acquires ownership can start the service
4. If a Worker that owns ownership exits normally or terminates abnormally, other Workers will continue to compete for ownership

## Create meta.election

For example, create `meta.election` in the module demo-student. Start a timer in the selected Worker to output `Hello World` every 2 seconds

### 1. Cli Command

``` bash
$ vona :create:bean meta election --module=demo-student
```

### 2. Menu Command

::: tip
Context menu - [Module Path]: `Vona Meta/Election`
:::

## meta.election Definition

``` typescript
export type TypeElectionObtainResource = 'echo';

@Meta()
export class MetaElection extends BeanElectionBase<TypeElectionObtainResource> {}
```

- `TypeElectionObtainResource`: Defines the type of Election resource

## Create Module Monkey

Next, create a `Module Monkey` that responds to the `appStarted` and `appClose` hooks

- See also: [App Startup Customization](../../env-config/app-start/introduction.md)

``` typescript
export class Monkey extends BeanSimple implements IMonkeyAppStarted, IMonkeyAppClose {
  private _fnRelease: FunctionAsync<void> | undefined;

  async appStarted() {
    const scope = this.app.scope(__ThisModule__);
    scope.election.obtain('echo', fnRelease => {
      this._fnRelease = fnRelease;
      this._doCustomLogic();
    });
  }

  async appClose() {
    await this._fnRelease?.();
  }

  private _doCustomLogic() {
    setInterval(() => {
      console.log('Hello World, pid: ', process.pid);
    }, 2000);
  }
}
```

- `_fnRelease`: This variable is a function used to release ownership of the specified resource
- `appStarted`: Calls `election.obtain` to acquire ownership of the specified resource. A callback function is invoked upon acquisition of ownership. This callback function provides a `fnRelease` parameter for subsequent ownership release
- `appClose`: Releases ownership so other Workers can participate in subsequent competition
- `_doCustomLogic`: Implements custom logic or services

## Tickets

When calling `election.obtain`, you can specify that multiple Workers are allowed to acquire ownership:

``` diff
async appStarted() {
  const scope = this.app.scope(__ThisModule__);
  scope.election.obtain(
    'echo',
    fnRelease => {
      this._fnRelease = fnRelease;
      this._doCustomLogic();
    },
+   { tickets: 2 },
  );
}
```


|Name|Description|
|--|--|
|tickets|Allows a specified number of Workers to acquire ownership. Defaults to `1`|
