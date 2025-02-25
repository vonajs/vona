import type { VonaApplication } from 'vona';
import { AsyncLocalStorage } from 'node:async_hooks';

export class VonaAsyncLocalStorage<T> extends AsyncLocalStorage<T> {
  app: VonaApplication;

  constructor(app: VonaApplication) {
    super();
    this.app = app;
  }

  run<R>(store: T, callback: () => R): R;
  run<R, TArgs extends any[]>(store: T, callback: (...args: TArgs) => R, ...args: TArgs): R {
    return super.run(store, (...args) => {
      try {
        this.app.meta.ctxCounter.increment();
        return callback(...args);
      } finally {
        this.app.meta.ctxCounter.decrement();
      }
    }, ...args);
  }
}
