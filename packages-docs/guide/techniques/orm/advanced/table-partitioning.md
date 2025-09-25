# Table-partitioning

For scenarios with high concurrency and large amounts of data, table-partitioning is often considered for optimization. Below, we take the `User/Order` model as an example to demonstrate how to use table-partitioning by querying the user's order list

## Partitioning rules

For example, if you need to split the order table, you can design the table partitioning rules based on the actual business needs. Here, the table name is dynamically generated based on the `user ID`. For example, if the table is split into `16` tables and the `user ID` is `129`, the corresponding table names are as follows:

``` typescript
const tableName = `Order_${129 % 16}`;  // Order_1
```

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

### 1. 直接查询订单列表

``` typescript
class ServiceOrder {
  async selectOrdersDirectly() {
    const userId = 129;
    const orders = await this.scope.model.order.select({
      where: {
        userId,
      },
    });
  }
}  
``` 

到目前为止，使用`默认表名`查询`userId=129`的订单列表

### 2. 基于关系查询订单列表

``` typescript
class ServiceOrder {
  async selectOrdersByRelation() {
    const userId = 129;
    const userAndOrders = await this.scope.model.user.get({
      id: userId,
    }, {
      include: {
        orders: true,
      },
    });
  }
}  
```

到目前为止，使用`默认表名`查询`userId=129`的用户信息，使用`默认表名`查询该用户的订单列表

## 使用分表：动态方式

可以在代码中动态使用分表：

``` diff
class ServiceOrder {
  async selectOrdersDirectly() {
    const userId = 129;
+   const tableName = `Order_${userId % 16}`;
+   const modelOrder = this.scope.model.order.newInstance(undefined, tableName as any);
    const orders = await modelOrder.select({
      where: {
        userId,
      },
    });
  }
}  
```

- `newInstance`: 传入要使用的表名，返回新的 Model 实例

到目前为止，使用`分表`查询`userId=129`的订单列表

## 使用分表：Relation动态选项

可以在 relation 选项中动态指定表名：

``` diff
class ServiceOrder {
  async selectOrdersByRelation() {
    const userId = 129;
+   const tableName = `Order_${userId % 16}`;
    const userAndOrders = await this.scope.model.user.get({
      id: userId,
    }, {
      include: {
        orders: {
+         meta: {
+           table: tableName as any,
+         },
        },
      },
    });
  }
}  
```

- `meta.table`: 指定 relation `orders`要使用的表名

到目前为止，使用`默认表名`查询`userId=129`的用户信息，使用`分表`查询该用户的订单列表

## 使用分表：Model配置

也可以直接在 Model 中配置分表规则，从而简化查询代码

1. Model Order

``` diff
@Model({
  entity: EntityOrder,
+ table(_ctx: VonaContext, where: EntityOrder | undefined, defaultTable: keyof ITableRecord) {
+   const userId = where?.userId;
+   if (!userId) return defaultTable;
+   return `Order_${Number(userId) % 16}`;
+ },
})
class ModelOrder{}
```

- `table`: 指定函数，实现分表规则

2. 查询数据

现在，又可以使用常规的方式查询用户的订单列表

``` typescript
class ServiceOrder {
  async selectOrdersDirectly() {
    const userId = 129;
    const orders = await this.scope.model.order.select({
      where: {
        userId,
      },
    });
  }
}  
```

``` typescript
class ServiceOrder {
  async selectOrdersByRelation() {
    const userId = 129;
    const userAndOrders = await this.scope.model.user.get({
      id: userId,
    }, {
      include: {
        orders: true,
      },
    });
  }
}  
```

## 使用分表：App Config配置

也可以在 App config 中配置 Model options:

`src/backend/config/config/config.ts`

``` typescript
// onions
config.onions = {
  model: {
    'test-vona:order': {
      table(_ctx: VonaContext, where: EntityOrder | undefined, defaultTable: keyof ITableRecord) {
        const userId = where?.userId;
        if (!userId) return defaultTable;
        return `Order_${Number(userId) % 16}`;
      },
    },
  },
};
```

于是，也可以使用常规的方式查询用户的订单列表

## 使用分表：Relation静态选项

也可以在定义 Relation 时指定静态选项：

``` diff
@Model({
  entity: EntityUser,
  relations: {
    orders: $relation.hasMany(() => ModelOrder, 'userId', {
+     meta: {
+       table(_ctx: VonaContext, where: EntityOrder | undefined, defaultTable: keyof ITableRecord) {
+         const userId = where?.userId;
+         if (!userId) return defaultTable;
+         return `Order_${Number(userId) % 16}`;
+       },
+     },
    }),
  },
})
class ModelUser {}
```

同样，也可以使用常规的方式查询用户的订单列表
