# BeanBase

`BeanBase` is the base class for all beans. By inheriting from `BeanBase`, we can easily access commonly used tools and capabilities when writing code

`BeanBase` itself provides some built-in members and allows other modules to inject extended members through the `monkey` mechanism

## Why is Zova's IOC container code more concise?

The reason is to prioritize the use of the `dependency lookup` strategy, resulting in fewer decorator functions and fewer type annotations. Injecting system capability objects into `BeanBase` is one of the mechanisms for implementing `dependency lookup` strategies

## Built-in Members

| Name     | Description                                                                     |
| -------- | ------------------------------------------------------------------------------- |
| app      | Global App object                                                               |
| ctx      | The Context object which the current bean instance belongs to                   |
| bean     | The bean container which the current bean instance belongs to                   |
| scope    | The Scope object of the module which the current bean instance belongs to       |
| $el      | The dom element of the Vue component which the current bean instance belongs to |
| $event   | Global event object                                                             |
| $ssr     | SSR object                                                                      |
| $useMeta | Meta data for SEO                                                               |

## Page Component

| Name    | Description             |
| ------- | ----------------------- |
| $params | Typed params parameters |
| $query  | Typed query parameters  |

## Child Component

| Name   | Description |
| ------ | ----------- |
| $props | props       |
| $emit  | emit        |
| $slots | slots       |
| $attrs | attrs       |
