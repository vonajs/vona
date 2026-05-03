import 'vona-module-a-openapi';
import type { IResourceBlockOptionsPageEntry } from 'vona-module-a-openapi';

declare module 'vona-module-a-openapi' {
  export interface IResourceComponentBlockRecord {
    BlockPageEntry?: IResourceBlockOptionsPageEntry;
  }
}
