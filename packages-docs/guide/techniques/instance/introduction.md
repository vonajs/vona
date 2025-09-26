# Multi-Instance/Multi-Tenancy

Vona supports the development of `multi-tenancy` SaaS systems through the concept of `multi-instance`. Simply launch a single backend service and you can run multiple instances simultaneously. Instances share the same database schema, but the data generated during operation is isolated from each other

## Instance Configuration

### 1. Test Environment and Development Environment

In the test and development environments, a default instance is assigned by default:

`src/backend/config/config/config.test.ts`

`src/backend/config/config/config.dev.ts`

``` typescript
// instances
config.instances = [
  { name: '', password: '', title: '', config: {} },
];
```

|Name|Description|
|--|--|
|name|Instance name|
|password|Initial password for the `admin` user in the instance, defaults to `123456`|
|title|Website title|
|config|Instance configuration information|

### 2. Production Environment

In the production environment, you need to configure instance information yourself

`src/backend/config/config/config.prod.ts`

``` typescript
config.instances = [
  { name: '', password: '', title: '', config: {} },
  { name: 'cabloy.store', password: '', title: '', config: {} },
];
```

## Rules for Obtaining the Current Instance Name

When a user accesses the backend API, the backend automatically obtains the current instance name based on the rules and then retrieves instance information based on the instance name

### 1. Module Configuration

Multi-instance is provided by the `a-instance` module. You can modify the module configuration in App Config:

`src/backend/config/config/config.ts`

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

|Name|Description|
|--|--|
|getInstanceName|Provides a custom function for obtaining the current instance name|
|headerField|Gets the current instance name from the request header. The header key defaults to `x-vona-instance-name`|
|queryField|Gets the current instance name from the request query. The query key defaults to `x-vona-instance-name`|

### 2. Rule Order

The system determines the current instance name in the following order. The determination process stops when the instance name is obtained

1. If `getInstanceName` is provided, this function is called
2. If `queryField` is not empty, the instance name is obtained from the request query
3. If `headerField` is not empty, the instance name is obtained from the request header
4. Resolve the instance name from the domain name

### 3. How to resolve the instance name from the domain name

For example, if the domain name is `https://cabloy.com`, the corresponding instance name is `cabloy`. You can modify the calculation rules by configuring `SERVER_SUBDOMAINOFFSET`

`env/.env`

``` typescript
# server
SERVER_SUBDOMAINOFFSET = 1
```

* When `SERVER_SUBDOMAINOFFSET = 1`, the domain name and instance name correspond as follows:

|Domain Name|Instance Name|
|--|--|
|cabloy.com|cabloy|
|store.cabloy.com|cabloy.store|

* When `SERVER_SUBDOMAINOFFSET = 2`, the domain name and instance name correspond as follows:

|Domain Name|Instance Name|
|--|--|
|cabloy.com|Empty String|
|store.cabloy.com|store|

## Using Multi-Instance

### 1. Accessing Current Instance Information

``` typescript
// Current Instance Name
const name = this.ctx.instanceName;
// Current instance object
const instance = this.ctx.instance;
// Current instance Id
const iid = this.ctx.instance.id;
```

### 2. Using the Model to Operate the Database

Since data across multi-instance is isolated, you must specify the `instance id` when operating the database. Vona provides a very powerful `Model` object, which can transparently handle multi-instance

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

When we use the `student` model to manipulate data, the system automatically sets the `Instance Id`

### 3. Using Query Builder to Operate the Database

If you use the `builder()` method to operate on the database, you need to add `Instance Id` yourself

``` typescript
await this.scope.model.student.builder().where({
  iid: this.ctx.instance.id,
  name: 'Tom',
});
```

If you use the `builderSelect()` method to access the database, the system will automatically add `Instance Id`

``` typescript
await this.scope.model.student.builderSelect().where({
  name: 'Tom',
});
```

### 4. Using Raw SQL to Access the Database

If you use `Raw SQL` to access the database, you will need to add `Instance Id` yourself

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
