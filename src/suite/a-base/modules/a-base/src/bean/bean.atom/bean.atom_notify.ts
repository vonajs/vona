import { __ThisModule__ } from '../../.metadata/this.js';
import { BeanAtomSubmit } from './bean.atom_submit.js';

export class BeanAtomNotify extends BeanAtomSubmit {
  _notifyDraftsDrafting(user, atomClass) {
    this.app.bean.stats.notify({
      module: __ThisModule__,
      name: 'draftsDrafting',
      nameSub: `${atomClass.module}_${atomClass.atomClassName}`,
      user,
    });
  }

  _notifyDraftsFlowing(user, atomClass) {
    this.app.bean.stats.notify({
      module: __ThisModule__,
      name: 'draftsFlowing',
      nameSub: `${atomClass.module}_${atomClass.atomClassName}`,
      user,
    });
  }

  _notifyStars(user?) {
    this.app.bean.stats.notify({
      module: __ThisModule__,
      name: 'stars',
      user,
    });
  }

  _notifyLabels(user?) {
    this.app.bean.stats.notify({
      module: __ThisModule__,
      name: 'labels',
      user,
    });
  }
}
