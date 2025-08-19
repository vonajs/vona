import type { TableIdentity } from 'table-identity';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServicePost extends BeanBase {
  async create() {
    const post = await this.scope.model.post.insert({
      title: 'Post001',
    });
    console.log(post.id);
    return post;
  }

  async createBulk() {
    const posts = await this.scope.model.post.insertBulk([
      { title: 'Post001' },
      { title: 'Post002' },
    ]);
    console.log(posts[0].id, posts[1].id);
    return posts;
  }

  async select() {
    return await this.scope.model.post.select({
      where: {
        stars: '_skip_',
      },
    });
  }

  async select2() {
    return await this.scope.model.post.select({
      columns: ['id', 'title', 'userId'],
      where: {
        'id': { _gt_: 1 },
        'testVonaUser.id': 1,
      },
      joins: [['innerJoin', 'testVonaUser', ['userId', 'testVonaUser.id']]],
      offset: 0,
      limit: 20,
      orders: [['createdAt', 'desc']],
    }, {
      disableDeleted: false,
    }, 'test-vona:user');
  }

  async get(id: TableIdentity) {
    return await this.scope.model.post.get({ id });
  }

  async mget(ids: TableIdentity[]) {
    return await this.scope.model.post.mget(ids);
  }

  async count() {
    return await this.scope.model.post.count();
  }
}
