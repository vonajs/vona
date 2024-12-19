import { Bean } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanModuleScopeBase } from 'vona';

@Bean()
export class BeanProgress extends BeanModuleScopeBase {
  get configModule() {
    return this.scope.config;
  }

  get redis() {
    return this.app.bean.redis.get('io');
  }

  _getRedisKey({ progressId }: any) {
    return `progress:${this.ctx.instance.id}:${progressId}`;
  }

  async _getRedisValue({ progressId }: any) {
    const key = this._getRedisKey({ progressId });
    const content = await this.redis.get(key);
    return content ? JSON.parse(content) : null;
  }

  async _setRedisValue({ progressId, content, contentOld }: any) {
    const expireTime = this.configModule.progress.expireTime;
    const key = this._getRedisKey({ progressId });
    if (contentOld) {
      content = Object.assign({}, contentOld, content);
    }
    await this.redis.set(key, JSON.stringify(content), 'PX', expireTime);
  }

  async _updateRedisValue({ progressId, content }: any) {
    const contentOld = await this._getRedisValue({ progressId });
    await this._setRedisValue({ progressId, content, contentOld });
  }

  async _deleteRedisValue({ progressId }: any) {
    const key = this._getRedisKey({ progressId });
    await this.redis.del(key);
  }

  async create(options?) {
    if (!this.ctx.state.user || !this.ctx.state.user.op) return this.app.throw(403);
    let progressId = options && options.progressId;
    // create
    if (!progressId) {
      progressId = this.app.bean.util.uuidv4();
    } else {
      // check if exists
      const item = await this._getRedisValue({ progressId });
      if (item) return this.app.throw(403);
    }
    // redis
    await this._setRedisValue({
      progressId,
      content: {
        userId: this.ctx.state.user.op.id,
        counter: 0,
        done: 0,
        abort: 0,
        data: null,
      },
    });
    // ok
    return progressId;
  }

  async update({ progressId, progressNo = 0, total, progress, text }: any) {
    if (!progressId) return;
    const item = await this._getRedisValue({ progressId });
    if (!item) {
      // same as abort
      // 1001: 'Operation Aborted',
      this.scope.error.OperationAborted.throw();
    }
    // abort
    if (item.abort) {
      // 1001: 'Operation Aborted',
      this.scope.error.OperationAborted.throw();
    }
    // data
    const data = item.data || [];
    if (data.length > progressNo + 1) {
      data.splice(progressNo + 1, data.length - progressNo - 1);
    }
    data[progressNo] = { total, progress, text };
    // update
    await this._setRedisValue({
      progressId,
      content: {
        counter: item.counter + 1,
        data,
      },
      contentOld: item,
    });
    // publish
    const ioMessage = {
      userIdTo: item.userId,
      content: {
        ...item,
        counter: item.counter + 1,
        data,
      },
    };
    await this._publish({ progressId, ioMessage });
  }

  async done({ progressId, message }: any) {
    if (!progressId) return;
    const item = await this._getRedisValue({ progressId });
    if (!item) {
      // same as abort
      // 1001: 'Operation Aborted',
      this.scope.error.OperationAborted.throw();
    }
    // data
    const data = { message };
    // update
    await this._setRedisValue({
      progressId,
      content: {
        counter: item.counter + 1,
        done: 1,
        data,
      },
      contentOld: item,
    });
    // publish
    const ioMessage = {
      userIdTo: item.userId,
      content: {
        ...item,
        counter: item.counter + 1,
        done: 1,
        data,
      },
    };
    await this._publish({ progressId, ioMessage });
  }

  async error({ progressId, message }: any) {
    if (!progressId) return;
    const item = await this._getRedisValue({ progressId });
    if (!item) {
      // same as abort
      // 1001: 'Operation Aborted',
      this.scope.error.OperationAborted.throw();
    }
    // data
    const data = { message };
    // update
    await this._setRedisValue({
      progressId,
      content: {
        counter: item.counter + 1,
        done: -1,
        data,
      },
      contentOld: item,
    });
    // publish
    const ioMessage = {
      userIdTo: item.userId,
      content: {
        ...item,
        counter: item.counter + 1,
        done: -1,
        data,
      },
    };
    await this._publish({ progressId, ioMessage });
  }

  async check({ progressId, counter, user }: any) {
    if (!progressId) return null;
    const item = await this._getRedisValue({ progressId });
    if (!item || item.userId !== user.id || item.counter <= counter) return null;
    return item;
  }

  async abort({ progressId, user }: any) {
    if (!progressId) return;
    const item = await this._getRedisValue({ progressId });
    if (!item || item.userId !== user.id) return;
    await this._setRedisValue({
      progressId,
      content: {
        abort: 1,
      },
      contentOld: item,
    });
  }

  async delete({ progressId, user }: any) {
    if (!progressId) return;
    const item = await this._getRedisValue({ progressId });
    if (!item || item.userId !== user.id) return;
    await this._deleteRedisValue({ progressId });
  }

  async _publish({ progressId, ioMessage }: any) {
    await this.app.bean.io.publish({
      path: `/a/progress/update/${progressId}`,
      message: ioMessage,
      messageClass: {
        module: __ThisModule__,
        messageClassName: 'progress',
      },
    });
  }
}
