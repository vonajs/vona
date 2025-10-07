# CRUD(魔术方法)

Vona ORM 采用魔术方法的机制进一步简化操作数据的代码

## 什么是魔术方法

系统自动从 method name 中解析出参数，然后调用实际的 CRUD 方法

* 举例 1

``` typescript
this.scope.model.student.getByName('Tom');
```

系统检测到`getBy`前缀，于是自动解析出参数名称`name`，参数值`'Tom'`，然后调用如下方法:

``` typescript
this.scope.model.student.get({ name: 'Tom' });
```

* 举例 2

``` typescript
this.scope.model.student.getByNameEqI('Tom');
```

系统检测到`getBy`前缀，于是自动解析出参数名称`name`，参数值`'Tom'`，条件操作符`eqI`，然后调用如下方法:

``` typescript
this.scope.model.student.get({ name: { _eqI_: 'Tom' } });
```

## 常用魔术方法






