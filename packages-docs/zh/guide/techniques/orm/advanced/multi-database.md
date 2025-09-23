# 多数据库/多数据源

Vona ORM 支持`多数据库/多数据源`，特性如下：

1. 支持多数据库
    - 例如：Postgresql/MySQL
    - 持续增加新的数据库支持
2. 支持多数据源
3. 支持跨数据库的关联查询

下面以 Model User/Order 为例，查询用户的订单列表，演示`多数据库/多数据源`的使用方法

## 准备Models

我们先准备两个 Models：User/Order

1. Model Order

``` typescript
@Model({
  entity: EntityOrder,
})
class ModelOrder{}
```

2. Model User

``` typescript
@Model<IModelOptionsUser>({
  entity: EntityUser,
  relations: {
    orders: $relation.hasMany(() => ModelOrder, 'userId'),
  },
})
class ModelUser {}
```

## 查询数据

然后查询用户的订单列表

``` typescript
class ServiceOrder {
  async selectUserOrders() {
    const userId = 1;
    const userAndOrders = await this.scope.model.user.get(
      {
        id: userId,
      },
      {
        include: {
          orders: true,
        },
      },
    );
  }
}  
```

于是，我们查询到了`userId=1`的用户信息，和该用户的所有订单列表

到目前为止，是使用系统默认数据源进行的数据查询

## 创建多数据源

接下来，我们创建两个数据源： `user-pg`和`order-mysql`

1. 添加数据源的类型定义

``` typescript
declare module 'vona-module-a-orm' {
  export interface IDatabaseClientRecord {
    'user-pg': never;
    'order-mysql': never;
  }
}
```

2. 数据源配置

`src/backend/config/config/config.ts`

``` typescript
// database
config.database = {
  clients: {
    'user-pg': {
      client: 'pg',
      connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: '',
        database: 'user-xxx',
      },
    },
    'order-mysql': {
      client: 'mysql2',
      connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'order-xxx',
      },
    },
  },
};
```

## 使用数据源：动态方式

我们可以在代码中动态使用数据源：

``` typescript

```


## 使用数据源：Relation配置

## 使用数据源：Model配置