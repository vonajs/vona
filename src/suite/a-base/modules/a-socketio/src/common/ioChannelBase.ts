module.exports = class IOChannelBase {
  async onPush(/* { content, options, message, messageSync, messageClass }*/) {
    return false;
  }
};
