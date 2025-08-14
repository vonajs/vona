# 多实例/多租户

Vona 通过`多实例`的概念来支持多租户 SAAS 系统的开发。只需启动一个后端服务，即可支持多个实例同时运行。实例共享数据表架构，但运行中产生的数据是相互隔离的

## 实例配置

### 1. 测试环境、开发环境

在测试环境和开发环境中，系统默认分配了一个缺省实例：

`src/backend/config/config/config.test.ts`

`src/backend/config/config/config.dev.ts`

``` typescript
// instances
config.instances = [
  { name: '', password: '', title: '', config: {} },
];
```

|名称|说明|
|--|--|
|name|实例名|
|password|实例中用户`admin`的初始密码，默认是`123456`|
|title|网站标题|
|config|实例的配置信息|

### 2. 生产环境

在生产环境，需要自行配置实例信息

`src/backend/config/config/config.prod.ts`

``` typescript
config.instances = [
  { name: '', password: '', title: '', config: {} },
  { name: 'vona', password: '', title: '', config: {} },
];
```

## 获取当前实例名的规则

当用户访问后端 Api 时，后端会自动根据规则获取当前实例名，然后根据实例名获取实例信息

### 1. 模块配置

多实例是由模块 a-instance 提供的核心能力，可以在 App config 中修改模块的配置：

`src/backend/config/config/config.prod.ts`

``` typescript
// modules
config.modules = {
  'a-instance': {
    getInstanceName: undefined,
    headerField: 'x-vona-instance-name',
    queryField: 'x-vona-instance-name',
  },
};
```

|名称|说明|
|--|--|
|getInstanceName|提供自定义函数，用于获取当前实例名|
|headerField|从request header中获取当前实例名，header key默认为'x-vona-instance-name'|
|queryField|从request query中获取当前实例名，query key默认为'x-vona-instance-name'|

### 2. 规则次序

系统按以下次序，依次判断当前实例名，当获取到实例名时则停止判断流程

1. 如果提供了`getInstanceName`，则调用此函数
2. 如果`queryField`不为空，则从 request query 中获取
3. 如果`headerField`不为空，则从 request header 中获取
4. 从域名中解析实例名

### 3. 如何从域名中解析实例名

比如，域名为`https://cabloy.com`，那么对应的实例名是`cabloy`。可以通过配置`SERVER_SUBDOMAINOFFSET`来修改计算规则

`env/.env`

``` typescript
# server
SERVER_SUBDOMAINOFFSET = 1
```

* 当`SERVER_SUBDOMAINOFFSET = 1`时，域名与实例名对应关系如下：

|域名|实例名|
|--|--|
|cabloy.com|cabloy|
|store.cabloy.com|cabloy.store|

* 当`SERVER_SUBDOMAINOFFSET = 2`时，域名与实例名对应关系如下：

|域名|实例名|
|--|--|
|cabloy.com|空字符串|
|store.cabloy.com|store|

## 使用多实例

### 1. 访问当前实例信息

``` typescript
// 当前实例名
const name = this.ctx.instanceName;
// 当前实例对象
const instance = this.ctx.instance;
// 当前实例Id
const iid = this.ctx.instance.id;
```

### 2. 使用Model操作数据库

由于多实例的数据是相互隔离的，因此在操作数据库时，需要指定`实例Id`。Vona 提供了非常强大的`Model`对象，从而可以透明的处理多实例

``` typescript
// create
await this.scope.model.student.insert({ name: 'Tom' });
// select
await this.scope.model.student.select();
// get
await this.scope.model.student.get({ id: 1 });
// update
await this.scope.model.student.update({ id: 1, name: 'Jimmy' });
// delete
await this.scope.model.student.delete({ id: 1 });
```

当我们使用 Model `student`操作数据时，系统会自动设置`实例Id`

### 3. 使用Query Builder操作数据库

如果使用`builder()`方法操作数据库，就需要自行添加`实例Id`

``` typescript
await this.scope.model.student.builder().where({
  iid: this.ctx.instance.id,
  name: 'Tom',
});
```

如果使用`builderSelect()`方法操作数据库，系统会自动添加`实例Id`

``` typescript
await this.scope.model.student.builderSelect().where({
  name: 'Tom',
});
```

### 4. 使用原生Sql操作数据库

如果使用`原生Sql`操作数据库，就需要自行添加`实例Id`

``` typescript
await this.scope.model.student.query(
  'select * from demoStudent where iid=?',
  [this.ctx.instance.id],
);
await this.scope.model.student.queryOne(
  'select * from demoStudent where iid=? and id=?',
  [this.ctx.instance.id, 1],
);
```
