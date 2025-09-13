import type { IQueryParams } from 'vona-module-a-orm';
import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isNil } from '@cabloy/utils';
import { app } from 'vona-mock';

describe('dtoQuery.test.ts', () => {
  it.only('action:dtoQuery', async () => {
    await app.bean.executor.mockCtx(async () => {
      // findManyEcho
      const resEcho: IQueryParams = await app.bean.executor.performAction('get', '/test/vona/post/findManyEcho', {
        query: {
          columns: 'id,title', // ['id', 'title'],
          where: {
            stars: {
              _gt_: 12,
            },
          },
          // orders: [['userName', 'asc']],
          // orders: [['testVonaPost.createdAt', 'asc']],
          pageNo: 2,
          pageSize: 30,
          title: 'ai',
          userName: 'tom',
        },
      });
      assert.deepEqual(resEcho.columns, ['id', 'title']);
      assert.deepEqual(resEcho.where, {
        'stars': { _gt_: 12 },
        'title': { _includesI_: 'ai' },
        'testVonaUser.name': { _eqI_: 'tom' },
      });
      assert.deepEqual(resEcho.orders, [['testVonaPost.createdAt', 'desc']]);
      assert.equal(resEcho.offset, 30);
      assert.equal(resEcho.limit, 30);
      // findMany
      const res = await app.bean.executor.performAction('get', '/test/vona/post/findMany', {
        query: {
          columns: 'id,title', // ['id', 'title'],
          where: {
            stars: {
              _gt_: 12,
            },
          },
          orders: [['testVonaPost.createdAt', 'desc']],
          pageNo: 2,
          pageSize: 30,
          title: 'ai',
          userName: 'tom',
        },
      });
      assert.equal(Array.isArray(res.list), true);
      assert.equal(!isNil(res.total), true);
    });
  });
});
