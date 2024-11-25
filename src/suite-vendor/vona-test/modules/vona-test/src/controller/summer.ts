import { BeanBase, Controller, Post } from 'vona';
import { __ThisModule__, ScopeModule } from '../.metadata/this.js';
import assert from 'assert';

@Controller('summer')
export class ControllerSummer extends BeanBase<ScopeModule> {
  @Post()
  async test() {
    // name
    const name = 'test';
    const key1 = { id: 1 };
    const key2 = { id: 2 };
    const key3 = { id: 3 };

    // getCache
    const cache = this.app.bean.summer.getCache({ name });
    assert.equal(!!cache, true);
    let cacheOtherModule = this.app.bean.summer.module(__ThisModule__).getCache({ name });
    assert.equal(!!cacheOtherModule, true);
    cacheOtherModule = this.app.bean.summer.getCache({ module: __ThisModule__, name });
    assert.equal(!!cacheOtherModule, true);

    let value;
    let values;

    // get: peek
    value = await cache.peek(key1);
    assert.equal(value, undefined);

    // get
    value = await cache.get(key1);
    assert.equal(value.id, key1.id);

    // get: peek
    value = await cache.peek(key1);
    assert.equal(value.id, key1.id);
    value = await cache.peek(key1, { mode: 'mem' });
    assert.equal(value.id, key1.id);
    value = await cache.peek(key1, { mode: 'redis' });
    assert.equal(value.id, key1.id);

    // get: peek sleep for mem stale
    await this.app.bean.util.sleep(1000);

    // get: peek again
    value = await cache.peek(key1, { mode: 'mem' });
    assert.equal(value, undefined);
    value = await cache.peek(key1, { mode: 'redis' });
    assert.equal(value.id, key1.id);

    // get: peek sleep for redis stale
    await this.app.bean.util.sleep(2000);

    // get: peek again
    value = await cache.peek(key1, { mode: 'mem' });
    assert.equal(value, undefined);
    value = await cache.peek(key1, { mode: 'redis' });
    assert.equal(value, undefined);

    // mget
    //   mem cache graph: key1
    value = await cache.get(key1);
    assert.equal(value.id, key1.id);
    //   mem cache graph: key2 key3
    values = await cache.mget([key1, key2, key3]); // todo: maybe has bug
    assert.equal(values[0].id, key1.id); // todo: maybe has bug
    assert.equal(values[1].id, key2.id);
    assert.equal(values[2].id, key3.id);
    //   mem cache graph: key3 key1
    values = await cache.mget([key1, key2, key3]);
    assert.equal(values[0].id, key1.id);
    assert.equal(values[1].id, key2.id);
    assert.equal(values[2].id, key3.id);

    // mget: peek
    value = await cache.peek(key2, { mode: 'mem' });
    assert.equal(value, undefined);
    value = await cache.peek(key2, { mode: 'redis' });
    assert.equal(value.id, key2.id);

    // del
    await cache.del(key1);
    await cache.del(key2);

    // mdel
    await cache.mdel([key1, key2, key3]);

    // mdel: peek
    value = await cache.peek(key3, { mode: 'mem' });
    assert.equal(value, undefined);
    value = await cache.peek(key3, { mode: 'redis' });
    assert.equal(value, undefined);

    // clear
    values = await cache.mget([key1, key2, key3]);
    assert.equal(values[2].id, key3.id);
    value = await cache.peek(key3, { mode: 'mem' });
    assert.equal(value.id, key3.id);
    value = await cache.peek(key3, { mode: 'redis' });
    assert.equal(value.id, key3.id);

    await cache.clear();

    value = await cache.peek(key3, { mode: 'mem' });
    assert.equal(value, undefined);
    value = await cache.peek(key3, { mode: 'redis' });
    assert.equal(value, undefined);
  }
}
