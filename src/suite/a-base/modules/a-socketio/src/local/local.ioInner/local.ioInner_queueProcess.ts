import { LocalIoInnerQueueDelivery } from './local.ioInner_queueDelivery.js';

export class LocalIoInnerQueueProcess extends LocalIoInnerQueueDelivery {
  // queue: process
  async queueProcess({ path, options, message, messageClass }: any) {
    // messageClass
    const messageClassBase = this.messageClass.messageClass(messageClass);
    const beanMessage = this._getBeanMessage(messageClassBase);
    // messageSyncs
    const messageSyncs = await beanMessage.onSaveSyncs({ path, options, message, messageClass });
    // onProcess
    await beanMessage.onProcess({ path, options, message, messageSyncs, messageClass });
  }
}
