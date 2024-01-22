const moduleInfo = module.info;
module.exports = class Atom {
  _notifyDraftsDrafting(user, atomClass) {
    this.ctx.bean.stats.notify({
      module: moduleInfo.relativeName,
      name: 'draftsDrafting',
      nameSub: `${atomClass.module}_${atomClass.atomClassName}`,
      user,
    });
  }

  _notifyDraftsFlowing(user, atomClass) {
    this.ctx.bean.stats.notify({
      module: moduleInfo.relativeName,
      name: 'draftsFlowing',
      nameSub: `${atomClass.module}_${atomClass.atomClassName}`,
      user,
    });
  }

  _notifyStars(user) {
    this.ctx.bean.stats.notify({
      module: moduleInfo.relativeName,
      name: 'stars',
      user,
    });
  }

  _notifyLabels(user) {
    this.ctx.bean.stats.notify({
      module: moduleInfo.relativeName,
      name: 'labels',
      user,
    });
  }
};
