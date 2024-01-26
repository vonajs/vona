export default class BeanIoChannelBase {
  async onPush(/* { content, options, message, messageSync, messageClass }*/) {
    return false;
  }
}
