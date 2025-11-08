# App Startup Customization

VonaJS provides a `Hook/Monkey` mechanism that allows deep customization of the system during application startup

::: tip
Of course, for regular business needs, it is generally sufficient to just create a [Startup](../../distributed/startup/introduction.md)
:::

Before explaining the `Hook/Monkey` mechanism, it is necessary to first understand the timing of application startup and shutdown


## Application Startup Timing

![](../../../assets/img/app-start/app-start.png)

The application startup timing is divided into four steps:

1. `appLoad`: Loads all modules. For each module, it triggers the hooks `moduleLoading`, `configLoaded`, and `moduleLoaded`
2. `appStart`: Triggers the hook `appStart`. For example, the module a-startup responds to this hook and executes `app startups(after: false)`. See: [Startup](../../distributed/startup/introduction.md)
   - After `appStart` is executed, it sets `app.meta.appReady=true`
   - At this point, all API services provided by the system can accept client requests
3. `appReady`: Triggers the hook `appReady`. For example, the module a-startup responds to this hook and executes `app startups(after: true)`. See: [Startup](../../distributed/startup/introduction.md)
4. `appStarted`: Triggers the hook `appStarted`

