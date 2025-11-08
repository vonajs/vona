# App Startup Customization

VonaJS provides a `Hook/Monkey` mechanism that allows deep customization of the system during application startup

::: tip
Of course, for regular business needs, it is generally sufficient to just create a [Startup](../../distributed/startup/introduction.md)
:::

Before explaining the `Hook/Monkey` mechanism, it is necessary to first understand the timing of application startup and shutdown


## Application Startup Timing

![](../../../assets/img/app-start/app-start.png)

The application startup timing is divided into four steps:


