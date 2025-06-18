# Controller

## 创建Controller

比如，我们在模块 demo-student 中创建一个 Controller: `student`

### 1. Cli命令

``` bash
$ vona :create:bean controller student --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Create/Controller`
:::

## Controller定义

``` typescript{1,3}
@Controller<IControllerOptionsStudent>('student')
export class ControllerStudent extends BeanBase {
  @Web.post('')
  @Api.body(v.object(EntityStudent))
  async create(@Arg.body() student: DtoStudentCreate): Promise<EntityStudent> {
    return await this.scope.service.student.create(student);
  }
}
```

- Controller Path: `'student'`
- Action Path : `''`

## 路由

与`Fastify`一样，Vona 也采用[find-my-way](https://github.com/delvedor/find-my-way)作为路由库。所有使用了`@Web`装饰器的 Controller Action，会自动注册到路由表中

路由路径由 Controller Path 和 Action Path 组合而成

### 常规格式

``` bash
Route Path = GlobalPrefix + Module Url + Controller Path + Action Path
```

- GlobalPrefix: 项目配置：`app.config.server.globalPrefix`，默认为`/api`
- Module Url: 通过模块名称生成的 Url 片段。比如，模块 demo-student 的 module Url 就是`demo/student`

比如，模块 demo-student 中的 Controller `teacher`，路由如下：

|Controller Path|Action Path| Route Path|
|--|--|--|
|teacher|empty|/api/demo/student/teacher|
|teacher|:id|/api/demo/student/teacher/:id|

### 简化规则1

如果 Controller Path 与模块名称重名，那么自动去除重复部分

比如，模块 demo-student 中的 Controller `student`，路由如下：

|Controller Path|Action Path| Route Path|
|--|--|--|
|student|empty|/api/demo/student|
|student|:id|/api/demo/student/:id|

### 简化规则2

如果 Controller Path 或者 Action Path 以`/`为前缀，那么就自动去除 Module Url

|Controller Path|Action Path| Route Path|
|--|--|--|
|/student|empty|/api/student|
|/student|:id|/api/student/:id|

### 简化规则3

如果 Controller Path 或者 Action Path 以`//`为前缀，那么就自动去除 GlobalPrefix 和 Module Url

|Controller Path|Action Path| Route Path|
|--|--|--|
|//student|empty|/student|
|//student|:id|/student/:id|

再比如，项目的首页，路由如下：

|Controller Path|Action Path| Route Path|
|--|--|--|
|any value|//|/|

## Request Query

## Request Params

## Request Body

## Request Headers

## Response Body
