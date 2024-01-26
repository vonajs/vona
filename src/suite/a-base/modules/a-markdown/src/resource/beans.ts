export * from '../bean/version.manager.js';
export * from '../bean/bean.markdown.js';

import { BeanMarkdown } from '../bean/bean.markdown.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    markdown: BeanMarkdown;
  }
}
