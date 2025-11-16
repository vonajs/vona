# Events

VonaJS provides an event mechanism, consisting of `Event` and `Event listener`

An `event` can have multiple `event listeners`, which execute using the `onion model`

## Creating an Event

For example, create an `event: `echo` in the module `demo-student`, passing the event parameter `Hello World` when the event is triggered.

### 1. CLI Commands

``` bash

$ vona :create:bean event echo --module=demo-student

```

### 2. Menu Commands

::: tip
Right-click menu - [module path]: `Vona Bean/Event`

:::

## Event Definition

``` typescript

export type TypeEventEchoData = string;

export type TypeEventEchoResult = string | undefined;

@Event()

export class EventEcho extends BeanEventBase<

TypeEventEchoData,

TypeEventEchoResult

> {}

```

- `TypeEventEchoData`: Defines the parameter type

- `TypeEventEchoResult`: Defines the result type

## Triggering Asynchronous Events: emit

### 1. emit

Passing the event parameter `Hello World` when triggering the event, and returning the result

``` diff

class ControllerStudent {

@Web.get('test')

async test() {

+ const result = await this.scope.event.echo.emit('Hello World');

console.log(result);

}
}
```

- `this.scope.event.echo`: Gets the `echo` event instance through the Scope object

### 2. Default Method

A default method can be provided when triggering the event

``` diff

class ControllerStudent {

@Web.get('test')

async test() {

+ const result = await this.scope.event.echo.emit('Hello World', async data => {

+ return `default: ${data}`;

+ });

console.log(result);

}
}
```

- Default method parameter `data`: Event listeners can pass new event parameters when executing, so the `data` parameter is required to ensure that new event parameters are received.

## Triggering the event: emit

### 1. emit

Pass the event parameter `Hello World` when triggering the event and return the result.

``` diff

class ControllerStudent {

@Web.get('test')

async test() {

+ const result = this.scope.event.echo.emitSync('Hello World');

console.log(result);

}
}
```

- `this.scope.event.echo`: Get the `echo` event instance through the Scope object.

### 2. Default method

A default method can be provided when triggering the event.

``` diff

class ControllerStudent {
@Web.get('test')

async test() {

+ const result = this.scope.event.echo.emitSync('Hello World', data => {

+ return `default: ${data}`;

+ });

console.log(result);

}
}
```

- Default method parameter `data`: Event listeners can pass new event parameters when executing, so the `data` parameter is required to ensure that new event parameters are received
