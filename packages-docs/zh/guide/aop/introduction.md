# 介绍

VonaJS AOP 编程包括三个方面的能力：

1. `控制器切面`: 为 Controller 方法切入逻辑
2. `内部切面`: 在 Class 内部，为任何 Class 的任何方法切入逻辑
3. `外部切面`: 在不改变 Class 源码的前提下，从外部为任何 Class 的任何方法切入逻辑


## 控制器切面

控制器切面包括：

* Middleware
* Guard
* Intercepter
* Pipe
* Filter

## 内部切面

内部切面包括：

### 1. AOP Method

直接在 Class Method 上通过装饰器切入逻辑

#### 举例：数据库事务

``` diff
class ServiceStudent {
+  @Database.transaction()
  async update(id: TableIdentity, student: DtoStudentUpdate) {
    return await this.scope.model.student.update({
      ...student,
      id,
    });
  }
}
```

- `@Database.transaction`：通过`AOP Method`机制实现的装饰器，可以直接提供数据库事务能力

#### 举例：日志

``` diff
class ServiceStudent {
+  @Log()
  async update(id: TableIdentity, student: DtoStudentUpdate) {
    return await this.scope.model.student.update({
      ...student,
      id,
    });
  }
}
```

- `@Log`：通过`AOP Method`机制实现的装饰器，可以直接日志能力

### 2. 魔术方法

可以在 Class 内部通过`__get__`和`__set__`切入动态属性或方法

#### 举例：获取 model 实例

``` diff
class ServiceStudent {
  async update(id: TableIdentity, student: DtoStudentUpdate) {
+    return await this.scope.model.student.update({
      ...student,
      id,
    });
  }
}
```

- `this.scope.model.xxx`: 没有使用`依赖注入`，而是使用`依赖查找`，直接通过 scope 对象获取 model 实例，从而简化代码的书写风格

#### 实现思路

系统提供了一个 Class `ServiceModelResolver`，用于实现 model 实例的动态解析，代码如下：

``` typescript
class ServiceModelResolver {
  protected __get__(prop: string) {
    const beanFullName = `${this[SymbolModuleScope]}.model.${prop}`;
    return this.bean._getBean(beanFullName as any);
  }
}
```

1. 当调用`this.scope.model.student`时，会自动执行`__get__`方法
2. 将传入的`prop = student`与当前模块名称合并成`beanFullName`
3. 通过`beanFullName`从全局容器中获取 model 实例，并返回给调用者


## 外部切面

仍以`ServiceStudent`的`update`方法为例，通过`外面切面`来实现日志能力：

