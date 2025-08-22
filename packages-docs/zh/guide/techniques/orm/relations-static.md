# 静态关系

下面以模块`test-vona`为例，讲解`静态关系`的用法

## 4种关系

Vona ORM 提供了 4 种关系：

|名称|说明|
|--|--|
|hasOne|`1:1`|
|belongsTo|`1:1`/`n:1`|
|hasMany|`1:n`|
|belongsToMany|`n:n`|

## hasOne

### 1. 定义关系

``` typescript
import { ModelPostContent } from './postContent.ts';

@Model({
  entity: EntityPost,
  relations: {
    postContent: $relation.hasOne(ModelPostContent, 'postId', { columns: ['id', 'content'] }),
  },
})
class ModelPost {}
```

|名称|说明|
|--|--|
|relations.postContent|关系名|
|$relation.hasOne|定义`1:1`关系|
|ModelPostContent|目标Model|
|'postId'|外键|
|columns|要查询的字段列表|

::: warning
`relations`节点有任何变更，都需要执行菜单：`Vona Tools: Generate .metadata`，从而同步生成对应的类型定义
:::

### 2. 使用关系

在 Model 中定义的 hasOne 关系可以用于所有 CRUD 操作。通过`include`指定需要操作的关系，比如`postContent: true`，那么，系统在操作 Model Post 的同时，也会操作 Model PostContent

``` typescript
class ServicePost {
  async relationHasOne() {
    // insert
    const postCreate = await this.scope.model.post.insert(
      {
        title: 'Post001',
        postContent: {
          content: 'This is a post',
        },
      },
      {
        include: {
          postContent: true,
        },
      },
    );
    // get
    const post = await this.scope.model.post.get(
      {
        id: postCreate.id,
      },
      {
        include: {
          postContent: true,
        },
      },
    );
    // update
    await this.scope.model.post.update(
      {
        id: postCreate.id,
        title: 'Post001-Update',
        postContent: {
          content: 'This is a post-changed',
        },
      },
      {
        include: {
          postContent: true,
        },
      },
    );
    // delete
    await this.scope.model.post.delete(
      {
        id: postCreate.id,
      },
      {
        include: {
          postContent: true,
        },
      },
    );
  }
}  
```

## belongsTo

### 1. 定义关系

``` typescript
@Model({
  entity: EntityPostContent,
  relations: {
    post: $relation.belongsTo(() => ModelPostContent, () => ModelPost, 'postId'),
  },
})
class ModelPostContent {}
```

|名称|说明|
|--|--|
|relations.post|关系名|
|$relation.belongsTo|定义`1:1`关系|
|ModelPostContent|源Model|
|ModelPost|目标Model|
|'postId'|外键|

### 2. 使用关系

在 Model 中定义的 belongsTo 关系只用于查询操作。通过`include`指定需要查询的关系，比如`post: true`，那么，系统在查询 Model PostContent 的同时，也会查询 Model Post

``` typescript
class ServicePost {
  async relationBelongsTo() {
    const postContent = await this.scope.model.postContent.select({
      include: {
        post: true,
      },
    });
    console.log(postContent[0]?.post?.title);
  }
}
```

## hasMany

### 1. 定义关系

``` typescript
import { ModelProduct } from './product.ts';

@Model({
  entity: EntityOrder,
  relations: {
    products: $relation.hasMany(() => ModelProduct, 'orderId', {
      columns: ['id', 'name', 'price', 'quantity', 'amount'],
    }),
  },
})
class ModelOrder {}
```

|名称|说明|
|--|--|
|relations.products|关系名|
|$relation.hasMany|定义`1:n`关系|
|ModelProduct|目标Model|
|'orderId'|外键|
|columns|要查询的字段列表|

### 2. 使用关系

在 Model 中定义的 hasMany 关系可以用于所有 CRUD 操作。通过`include`指定需要操作的关系，比如`products: true`，那么，系统在操作 Model Order 的同时，也会操作 Model Product

``` typescript
class ServicePost {
  async relationHasMany() {
    // insert
    const orderCreate = await this.scope.model.order.insert(
      {
        orderNo: 'Order001',
        products: [
          { name: 'Apple' },
          { name: 'Pear' },
        ],
      },
      {
        include: {
          products: true,
        },
      },
    );
    // get
    const _order = await this.scope.model.order.get(
      {
        id: orderCreate.id,
      },
      {
        include: {
          products: true,
        },
      },
    );
    // update
    await this.scope.model.order.update(
      {
        id: orderCreate.id,
        orderNo: 'Order001-Update',
        products: [
          // create product: Peach
          { name: 'Peach' },
          // update product: Apple
          { id: orderCreate.products[0].id, name: 'Apple-Update' },
          // delete product: Pear
          { id: orderCreate.products[1].id, deleted: true },
        ],
      },
      {
        include: {
          products: true,
        },
      },
    );
    // delete
    await this.scope.model.order.delete(
      {
        id: orderCreate.id,
      },
      {
        include: {
          products: true,
        },
      },
    );
  }
}  
```

- 当更新主表数据时，可以同时更新明细表数据（包括 Insert/Update/Delete）
  - 参见：[CRUD(插入/更新/删除)-mutate](./crud-cud.md#mutate)

## belongsToMany

### 1. 定义关系

定义`n:n`关系需要中间 Model。比如，Model User 和 Model Role 是`n:n`，需要提供中间 Model RoleUser

``` typescript
@Model({
  entity: EntityUser,
  relations: {
    roles: $relation.belongsToMany('test-vona:roleUser', 'test-vona:role', 'userId', 'roleId', { columns: ['id', 'name'] }),
  },
})
class ModelUser {}
```

|名称|说明|
|--|--|
|relations.roles|关系名|
|$relation.belongsToMany|定义`n:n`关系|
|'test-vona:roleUser'|中间Model|
|'test-vona:role'|目标Model|
|'userId'|外键|
|'roleId'|外键|
|columns|要查询的字段列表|

### 2. 使用关系

在 Model 中定义的 belongsToMany 关系可以用于所有 CRUD 操作。需要强调的是，这里的 CRUD 操作是针对中间 Model，而不是目标 Model。通过`include`指定需要操作的关系，比如`roles: true`，那么，系统在操作 Model User 的同时，也会操作中间 Model RoleUser

``` typescript
export class ServiceUser extends BeanBase {
  async relationBelongsToMany() {
    // insert: roles
    const roles = await this.scope.model.role.insertBulk([
      { name: 'role-family' },
      { name: 'role-friend' },
    ]);
    const roleIdFamily = roles[0].id;
    const roleIdFriend = roles[1].id;
    // insert: user
    const userCreate = await this.scope.model.user.insert(
      {
        name: 'Tom',
        roles: [{
          id: roleIdFamily,
        }],
      },
      {
        include: {
          roles: true,
        },
      },
    );
    // get: user
    await this.scope.model.user.get(
      {
        id: userCreate.id,
      },
      {
        include: {
          roles: true,
        },
      },
    );
    // update: user
    await this.scope.model.user.update(
      {
        id: userCreate.id,
        roles: [
          // delete
          { id: roleIdFamily, deleted: true },
          // insert
          { id: roleIdFriend },
        ],
      },
      {
        include: {
          roles: true,
        },
      },
    );
    // delete: user
    await this.scope.model.user.delete(
      {
        id: userCreate.id,
      },
      {
        include: {
          roles: true,
        },
      },
    );
  }
}
```

## autoload

通过前面的演示可以看到，如果要对关系进行操作，需要通过`include`指定对应的关系选项

如果需要关联的关系属于频繁操作，那么可以设置关系`autoload: true`，从而省去`include`选项

## 树形结构

接下来我们实现一棵目录树，来演示如何利用`autoload`实现一个树形结构

### 1. 定义关系

``` typescript
import { ModelProduct } from './product.ts';

@Model({
  entity: EntityOrder,
  relations: {
    products: $relation.hasMany(() => ModelProduct, 'orderId', {
      columns: ['id', 'name', 'price', 'quantity', 'amount'],
    }),
  },
})
class ModelOrder {}
```

|名称|说明|
|--|--|
|relations.products|关系名|
|$relation.hasMany|定义`1:n`关系|
|ModelProduct|目标Model|
|'orderId'|外键|
|columns|要查询的字段列表|

### 2. 使用关系

在 Model 中定义的 hasMany 关系可以用于所有 CRUD 操作。通过`include`指定需要操作的关系，比如`products: true`，那么，系统在操作 Model Order 的同时，也会操作 Model Product


## 参数说明

1. Model 类型：三种形式+数组
2. columns