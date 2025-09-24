# 分表

针对高并发、数据量大的场景，通常会考虑采用分表机制进行优化。下面以 Model User/Order 为例，通过查询用户的订单列表，来演示`分表`的使用方法

## 分表规则

比如需要对订单表进行分表操作。可以根据实际业务需求设计分表规则，在这里，根据`用户Id`取模动态生成表名。比如，拆分为`16`张表，`用户Id`为`129`，对应的表名如下：

``` typescript
const tableName = `Order_${129 % 16}`;  // Order_1
```

## 准备Models

先准备两个 Models：User/Order

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

## 查询数据

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

