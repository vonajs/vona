module.exports = class Cms {
  get render() {
    return this.ctx.bean._getBean('a-cms.local.render');
  }

  get site() {
    return this.ctx.bean._getBean('a-cms.local.site');
  }

  build({ atomClass }) {
    return this.ctx.bean._newBean(`a-cms.local.build`, atomClass);
  }
};
