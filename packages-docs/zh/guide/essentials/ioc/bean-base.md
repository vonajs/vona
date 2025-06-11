# BeanBase

`BeanBase` 是所有 bean 的基类。通过继承自`BeanBase`，我们可以在书写代码时便利的访问到常用的工具和能力

`BeanBase`本身提供了一些`内置成员`，也允许其他模块通过`monkey`机制注入`扩展成员`

## Zova 的 IOC 容器为何代码更简洁？

原因就是优先使用`依赖查找`策略，从而使用更少的装饰器函数，使用更少的类型标注。向`BeanBase`注入系统能力对象，就是践行`依赖查找策略`的机制之一

## 内置成员

| 名称     | 说明                                        |
| -------- | ------------------------------------------- |
| app      | 全局 App 对象                               |
| ctx      | 当前 bean 实例所归属的 Context 对象         |
| bean     | 当前 bean 实例所归属的 bean 容器            |
| scope    | 当前 bean 实例所归属模块的 Scope 对象       |
| $el      | 当前 bean 实例所归属 Vue 组件的 dom element |
| $event   | 全局事件对象                                |
| $ssr     | SSR对象                                     |
| $useMeta | 用于SEO的Meta data                          |

## 页面组件

| 名称    | 说明                   |
| ------- | ---------------------- |
| $params | params参数，支持类型化 |
| $query  | query参数，支持类型化  |

## 子组件

| 名称   | 说明  |
| ------ | ----- |
| $props | props |
| $emit  | emit  |
| $slots | slots |
| $attrs | attrs |
