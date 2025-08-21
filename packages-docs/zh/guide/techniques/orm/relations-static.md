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
    post: $relation.belongsTo(ModelPostContent, () => ModelPost, 'postId'),
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
import { ModelPost } from './post.ts';

@Model({
  entity: EntityUser,
  relations: {
    posts: $relation.hasMany(() => ModelPost, 'userId', { columns: ['id', 'title'] }),
  },
})
class ModelUser {}
```

|名称|说明|
|--|--|
|relations.posts|关系名|
|$relation.hasMany|定义`1:n`关系|
|ModelPost|目标Model|
|'userId'|外键|
|columns|要查询的字段列表|

### 2. 使用关系

在 Model 中定义的 hasMany 关系可以用于所有 CRUD 操作。通过`include`指定需要操作的关系，比如`posts: true`，那么，系统在操作 Model User 的同时，也会操作 Model Post

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


## 参数说明

1. Model 类型：三种形式+数组
2. columns