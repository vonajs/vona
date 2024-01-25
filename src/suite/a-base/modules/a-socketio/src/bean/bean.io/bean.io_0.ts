module.exports = class IO {
  get messageClass() {
    return this.ctx.bean.local.module(moduleInfo.relativeName).messageClass;
  }

  get message() {
    return this.ctx.bean.local.module(moduleInfo.relativeName).message;
  }

  get localRedis() {
    return this.ctx.bean.local.module(moduleInfo.relativeName).redis;
  }

  get localIOInner() {
    return this.ctx.bean.local.module(moduleInfo.relativeName).ioInner;
  }

  _getBeanMessage(messageClassBase) {
    return this.localIOInner._getBeanMessage(messageClassBase);
  }

  _getBeanChannel(channelFullName) {
    return this.localIOInner._getBeanChannel(channelFullName);
  }
};
