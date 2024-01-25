import LocalIoInnerQueueProcess from './local.ioInner_queueProcess.js';

export class LocalIoInnerQueuePush extends LocalIoInnerQueueProcess {
  // queue: push
  async queuePush({ options, message, messageSyncs, messageClass }) {
    // bean
    const messageClassBase = this.messageClass.messageClass(messageClass);
    const beanMessage = this._getBeanMessage(messageClassBase);
    // loop
    await this._loopMessageSyncs({
      options,
      message,
      messageSyncs,
      messageClass,
      onHandle: async messageSync => {
        await beanMessage.onPush({ options, message, messageSync, messageClass });
      },
    });
  }
}
