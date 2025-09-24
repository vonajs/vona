# Multi-database/Multi-datasource

Vona ORM supports `Multi-database/Multi-datasource`, with the following features:

1. Multi-database
    - For example: PostgreSQL/MySQL
    - Support for new database dialects is continuously being added
2. Multi-datasource
3. Cross-datasource relation queries

The following example uses the `User/Order` model to query a user's order list to demonstrate how to use `Multi-database/Multi-datasource`

## Preparing Models

First prepare two Models: `User/Order`

1. Model Order

``` typescript
@Model({
  entity: EntityOrder,
})
class ModelOrder{}
```

2. Model User

``` typescript
@Model({
  entity: EntityUser,
  relations: {
    orders: $relation.hasMany(() => ModelOrder, 'userId'),
  },
})
class ModelUser {}
```

## Query data

Then query the user's order list

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

So far, `system default datasource` has been used to query the user information of `userId=1` and a list of all orders for this user

## Create Datasources

Next, create two datasources: `user-pg` and `order-mysql`

### 1. Add datasource type definition

* In VSCode, create a type file in the module through the context menu `Vona Init/Types`

* Then add the type definition in the type file

`{module path}/src/types/index.ts`

``` typescript
declare module 'vona-module-a-orm' {
  export interface IDatabaseClientRecord {
    'user-pg': never;
    'order-mysql': never;
  }
}
```

### 2. Datasources configuration

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

## Using Datasources: Dynamic Way

You can use datasources dynamically in your code:

``` diff
class ServiceOrder {
  async selectUserOrders() {
    const userId = 1;
+   const modelUser = this.scope.model.user.newInstance('user-pg');
    const userAndOrders = await modelUser.get(
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

- `newInstance`: Passes the datasource to use and returns a new model instance

So far, we've used the `user-pg` datasource to query user information and the `system default datasource` to query order lists

## 使用数据源：Relation动态选项

可以在 relation 选项中动态指定数据源：

``` diff
class ServiceOrder {
  async selectUserOrders() {
    const userId = 1;
    const modelUser = this.scope.model.user.newInstance('user-pg');
    const userAndOrders = await modelUser.get(
      {
        id: userId,
      },
      {
        include: {
          orders: {
+           meta: {
+             client: 'order-mysql',
+           },
          },
        },
      },
    );
  }
}  
```

- `meta.client`: 指定 relation `orders`要使用的数据源

到目前为止，使用数据源`user-pg`查询用户信息，使用数据源`order-mysql`查询订单列表

## 使用数据源：Model配置

也可以直接在 Model 中配置数据源，从而简化查询代码

1. Model Order

``` diff
@Model({
  entity: EntityOrder,
+ client: 'order-mysql',
})
class ModelOrder{}
```

2. Model User

``` diff
@Model({
  entity: EntityUser,
+ client: 'user-pg',
  relations: {
    orders: $relation.hasMany(() => ModelOrder, 'userId'),
  },
})
class ModelUser {}
```

3. 查询数据

现在，又可以使用常规的方式查询用户的订单列表

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

## 使用数据源：App Config配置

也可以在 App config 中配置 Model options:

`src/backend/config/config/config.ts`

``` typescript
// onions
config.onions = {
  model: {
    'test-vona:user': {
      client: 'user-pg',
    },
    'test-vona:order': {
      client: 'order-mysql',
    },
  },
};
```

于是，也可以使用常规的方式查询用户的订单列表

## 使用数据源：Relation静态选项

也可以在定义 Relation 时指定静态选项：

``` diff
@Model({
  entity: EntityUser,
  client: 'user-pg',
  relations: {
    orders: $relation.hasMany(() => ModelOrder, 'userId', {
+     meta: {
+       client: 'order-mysql',
+     },
    }),
  },
})
class ModelUser {}
```

同样，也可以使用常规的方式查询用户的订单列表
