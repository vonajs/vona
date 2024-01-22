// const moduleInfo = module.info;
module.exports = class IOInner {
  async queuePushDirect({ content, options, channel }) {
    // get channel base
    const channelFullName = `${channel.module}:${channel.name}`;
    const beanChannel = this._getBeanChannel(channelFullName);
    if (!beanChannel) {
      return false;
    }
    const pushDone = await beanChannel.onPush({ content, options });
    // done
    return pushDone;
  }
};
