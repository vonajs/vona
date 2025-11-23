import type { IStartupExecute } from 'vona-module-a-startup';
import type { IMetaRuntimeExecute } from '../types/runtime.ts';
import path from 'node:path';
import { writeJson } from 'fs-extra';
import { BeanBase, getRuntimePathPhysicalRoot, instanceDesp } from 'vona';
import { Startup } from 'vona-module-a-startup';

@Startup({
  instance: true,
  debounce: true,
  after: true,
})
export class StartupRuntime extends BeanBase implements IStartupExecute {
  async execute() {
    const runtime = await this._collectRuntime();
    const runtimeDir = getRuntimePathPhysicalRoot(this.app);
    const runtimeFile = path.join(runtimeDir, `${instanceDesp}.json`);
    await writeJson(runtimeFile, runtime, {});
  }

  async _collectRuntime() {
    //
    const runtime = {};
    const onions = this.bean.onion.meta.getOnionsEnabledOfMeta(true, 'runtime');
    for (const onion of onions) {
      const beanInstance = this.bean._getBean<IMetaRuntimeExecute>(onion.beanOptions.beanFullName as any);
      const res = await beanInstance.execute();
      if (!res) continue;
      const moduleName = onion.beanOptions.module;
      runtime[moduleName] = res;
    }
    return runtime;
  }
}
