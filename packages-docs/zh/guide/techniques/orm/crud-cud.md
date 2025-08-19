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
  async update() {
    const post = await this.scope.model.post.update({
      id: 1,
      title: 'Post001-Update',
    });
    return post;
  }
}
```

``` typescript
class ServicePost {
  async update2() {
    const post = await this.scope.model.post.update(
      {
        title: 'Post001-Update',
      },
      {
        where: {
          title: { _startsWith_: 'Post001' },
        },
      },
    );
    return post;
  }
}
```

## updateBulk

``` typescript
class ServicePost {
  async updateBulk() {
    const posts = await this.scope.model.post.updateBulk([
      { id: 1, title: 'Post001-Update' },
      { id: 2, title: 'Post002-Update' },
    ]);
    return posts;
  }
}
```

## delete

``` typescript
class ServicePost {
  async delete() {
    await this.scope.model.post.delete({
      id: 1,
    });
  }
}
```

``` typescript
class ServicePost {
  async delete2() {
    await this.scope.model.post.delete({
      title: {
        _startsWith_: 'Post',
      },
    });
  }
}
```

## deleteBulk

``` typescript
class ServicePost {
  async deleteBulk() {
    await this.scope.model.post.deleteBulk([1, 2]);
  }
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
