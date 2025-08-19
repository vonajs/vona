# CRUD(插入/更新/删除)

下面以模块`test-vona`为例，讲解 CRUD 中 Insert/Update/Delete 的用法

## insert

``` typescript
class ServicePost {
  async create() {
    const post = await this.scope.model.post.insert({
      title: 'Post001',
    });
    console.log(post.id);
    return post;
  }
}
```

## insertBulk

``` typescript
class ServicePost {
  async createBulk() {
    const posts = await this.scope.model.post.insertBulk([
      { title: 'Post001' },
      { title: 'Post002' },
    ]);
    console.log(posts[0].id, posts[1].id);
    return posts;
  }
}
```

## update

``` typescript
class ServicePost {
}
```

## updateBulk

``` typescript
class ServicePost {
}
```

## delete

``` typescript
class ServicePost {
}
```

## deleteBulk

``` typescript
class ServicePost {
}
```

## mutate

``` typescript
class ServicePost {
}
```

## mutateBulk

``` typescript
class ServicePost {
}
```
