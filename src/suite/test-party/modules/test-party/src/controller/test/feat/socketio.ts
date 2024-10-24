import { __ThisModule__ } from '../../../.metadata/this.js';
import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../../../resource/this.js';
const _subscribePathTest = '/test/party/test';
const _subscribePathSimpleChat = '/test/party/simpleChat';

@Controller()
export class ControllerTestFeatSocketio extends BeanBase<ScopeModule> {
  async publish() {
    const options = this.ctx.request.body.options;
    const message = this.ctx.request.body.message;
    message.userIdFrom = this.ctx.state.user.op.id;
    const res = await this.ctx.bean.io.publish({
      path: _subscribePathTest,
      message,
      messageClass: {
        module: __ThisModule__,
        messageClassName: 'test',
      },
      options,
    });
    // done
    this.ctx.success(res);
  }

  async simpleChat() {
    const options = this.ctx.request.body.options;
    const message = this.ctx.request.body.message;
    message.userIdFrom = this.ctx.state.user.op.id;
    message.userIdsTo = await this._collectUserIds();
    // message.userIdTo = -1;
    const res = await this.ctx.bean.io.publish({
      path: _subscribePathSimpleChat,
      message,
      messageClass: {
        module: __ThisModule__,
        messageClassName: 'simpleChat',
      },
      options,
    });
    // done
    this.ctx.success(res);
  }

  async _collectUserIds() {
    const ioRedis = this.bean.scope('a-socketio').service.redis;
    const userIds = await ioRedis._getPathUsersOnline({ path: _subscribePathSimpleChat });
    const userAdmin = await this.ctx.bean.user.get({ userName: 'admin' });
    if (userAdmin && !userIds.includes(userAdmin.id)) {
      userIds.push(userAdmin.id);
    }
    return userIds;
  }
}
