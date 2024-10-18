export * from '../bean/version.manager.js';
export * from '../bean/startup.cacheMailScenes.js';
export * from '../bean/io.message.mail.js';
export * from '../bean/io.channel.mail.js';
export * from '../bean/broadcast.mailSceneChanged.js';
export * from '../bean/bean.mailSceneCache.js';
export * from '../bean/bean.mail.js';

import { BeanMailSceneCache } from '../bean/bean.mailSceneCache.js';
import { BeanMail } from '../bean/bean.mail.js';

declare module 'vona' {
  export interface IBeanRecord {
    mailSceneCache: BeanMailSceneCache;
    mail: BeanMail;
  }
}
