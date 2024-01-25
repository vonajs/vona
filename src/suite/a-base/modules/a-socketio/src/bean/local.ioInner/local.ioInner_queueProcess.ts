module.exports = class IOInner {
  // queue: process
  async queueProcess({ path, options, message, messageClass }) {
    // messageClass
    const messageClassBase = this.messageClass.messageClass(messageClass);
    const beanMessage = this._getBeanMessage(messageClassBase);
    // messageSyncs
    const messageSyncs = await beanMessage.onSaveSyncs({ path, options, message, messageClass });
    // onProcess
    await beanMessage.onProcess({ path, options, message, messageSyncs, messageClass });
  }
};
