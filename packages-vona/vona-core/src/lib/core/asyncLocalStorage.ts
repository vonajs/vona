import type { VonaContext } from 'vona';
import type { VonaApplication } from './application.ts';
import { AsyncLocalStorage } from 'node:async_hooks';

export class VonaAsyncLocalStorage extends AsyncLocalStorage<VonaContext> {
  app: VonaApplication;

  constructor(app: VonaApplication) {
    super();
    this.app = app;
  }

  async run<R>(store: VonaContext, callback: () => R): Promise<R>;
  async run<R, TArgs extends any[]>(store: VonaContext, callback: (...args: TArgs) => R, ...args: TArgs): Promise<R> {
    if (store === this.app.currentContext) {
      return await callback(...args);
    }
    return super.run(store, async (...args) => {
      try {
        this.app.meta.ctxCounter.increment();
        return await callback(...args);
      } finally {
        await store.bean.dispose();
        this.app.meta.ctxCounter.decrement();
      }
    }, ...args);
  }
}
