import debounce from 'debounce';
import { VonaApplication } from '../../../types/application/app.js';
import { cast } from '../../../types/utils/cast.js';
import { BeanSimple } from '../../bean/beanSimple.js';

export class AppReload extends BeanSimple {
  _freezeCounter: number;
  _needReload: boolean;
  _reloadDebounceInAgent: any;

  now() {
    if (this.app.meta.inApp) {
      this._reloadInApp({ action: 'now' });
    } else {
      this._reloadInAgent({ action: 'now' });
    }
  }
  freeze() {
    if (this.app.meta.inApp) {
      this._reloadInApp({ action: 'freeze' });
    } else {
      this._reloadInAgent({ action: 'freeze' });
    }
  }
  unfreeze() {
    if (this.app.meta.inApp) {
      this._reloadInApp({ action: 'unfreeze' });
    } else {
      this._reloadInAgent({ action: 'unfreeze' });
    }
  }

  initialize() {
    if (this.app.meta.inAgent) {
      //
      this._freezeCounter = 0;
      this._needReload = false;
      this._reloadDebounceInAgent = debounce(() => {
        if (this._freezeCounter === 0 && this._needReload) {
          this._needReload = false;
          this._reloadImmediateInAgent();
        }
      }, 1000);
      //
      this.app.meta.messenger.addProvider({
        name: 'core:reload',
        handler: info => {
          this._reloadInAgent(info);
        },
      });
    }
  }

  // invoked in app
  _reloadInApp({ action }: any) {
    this.app.meta.messenger.callAgent({ name: 'core:reload', data: { action } });
  }

  // invoked in agent
  _reloadInAgent({ action }: any) {
    if (action === 'now') {
      if (this._freezeCounter > 0) {
        this._needReload = true;
      } else {
        this._reloadImmediateInAgent();
      }
    } else if (action === 'freeze') {
      this._freezeCounter++;
    } else if (action === 'unfreeze') {
      this._freezeCounter--;
      if (this._freezeCounter === 0 && this._needReload) {
        this._reloadDebounceInAgent();
      }
    }
  }

  // invoked in agent
  _reloadImmediateInAgent() {
    cast(process).send({
      to: 'master',
      action: 'reload-worker',
    });
  }
}

export default function (app: VonaApplication) {
  app.meta.reload.initialize();
}
