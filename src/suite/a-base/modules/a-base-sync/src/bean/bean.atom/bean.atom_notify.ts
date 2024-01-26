import { BeanAtomSubmit } from './bean.atom_submit.js';

export class BeanAtomNotify extends BeanAtomSubmit {
  _notifyDraftsDrafting(user, atomClass) {
    this.ctx.bean.stats.notify({
      module: ,
      name: 'draftsDrafting',
      nameSub: `${atomClass.module}_${atomClass.atomClassName}`,
      user,
    });
  }

  _notifyDraftsFlowing(user, atomClass) {
    this.ctx.bean.stats.notify({
      module: ,
      name: 'draftsFlowing',
      nameSub: `${atomClass.module}_${atomClass.atomClassName}`,
      user,
    });
  }

  _notifyStars(user) {
    this.ctx.bean.stats.notify({
      module: ,
      name: 'stars',
      user,
    });
  }

  _notifyLabels(user) {
    this.ctx.bean.stats.notify({
      module: ,
      name: 'labels',
      user,
    });
  }
}
