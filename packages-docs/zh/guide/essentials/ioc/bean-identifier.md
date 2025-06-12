# Bean标识

系统会为每一个 bean class 自动分配一个标识，格式如下：

```bash
{moduleName}.{sceneName}.{beanName}
```

比如，模块 home-base 提供了一个 Service bean：ServiceMenu。那么该 bean 对应的标识为：`home-base.service.menu`

## 基于Bean标识注入的优点

在跨模块注入 bean 时，我们不建议直接`基于Class类型`注入，而是`基于Bean标识`注入。基于 Bean 标识注入有以下优点：

1. `避免出现循环引用出错的问题`：在复杂的业务场景中，经常会出现多个 Bean 之间相互引用的情况。基于 Bean 标识注入可以非常直观的支持循环引用的场景，不会出现错误提示，没有任何心智负担
