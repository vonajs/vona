import { IModule } from '../interface/module.js';

export interface ContextBase {
  get module(): IModule | null;
  get meta();
  get db();
  set db(value);
  get dbMeta();
  set dbMeta(metaCaller);
  get transaction();
  get innerAccess();
  set innerAccess(value);
  get dbLevel();
  set dbLevel(value);
  get subdomain();
  set subdomain(value);
  get ctxCaller();
  set ctxCaller(value);
  get cache();
  tail(cb);
  tailDone(): Promise<any>;
  get tailCallbacks();
  successMore(list, index, size);
  getPayload(options?): Promise<any>;
}
