import { BeanAtomBaseExportBulk } from './bean.atomBase_exportBulk.js';

export class BeanAtomBasePerformAction extends BeanAtomBaseExportBulk {
  async performAction({ key, atomClass, action, item, options: _options, user }: any) {
    // actionBase
    const actionBase = this.ctx.bean.base.action({
      module: atomClass.module,
      atomClassName: atomClass.atomClassName,
      name: action,
    });
    // fieldsMapping
    await this._performAction_fieldsMapping({ key, actionBase, item, user });
    // atomState
    await this._performAction_setAtomState({ key, actionBase, item });
    // cms
    await this._performAction_cms({ key, actionBase });
  }

  async _performAction_fieldsMapping({ key, actionBase, /* item,*/ user }: any) {
    const fieldsMapping = this.ctx.bean.util.getProperty(actionBase, 'params.fieldsMapping');
    if (!fieldsMapping) return;
    const keys = Object.keys(fieldsMapping);
    if (keys.length === 0) return;
    // data
    const data: any = {};
    for (const key of keys) {
      const conditionExpression = fieldsMapping[key];
      // evaluateExpression
      const fieldValue = this.ctx.bean.flow.evaluateExpression({
        expression: conditionExpression,
        globals: {
          user,
        },
      });
      if (fieldValue !== undefined) {
        data[key] = fieldValue;
      }
    }
    // write
    await this.ctx.bean.atom.write({
      key,
      item: data,
      options: { ignoreValidate: true },
      user,
    });
  }

  async _performAction_setAtomState({ key, actionBase, item }: any) {
    const atomState = this.ctx.bean.util.getProperty(actionBase, 'params.atomState');
    // allowed to be null
    if (atomState === undefined) return;
    // if (atomState === undefined || atomState === null) return;
    await this.ctx.bean.atom.atomState({
      key,
      atom: { atomState },
    });
    if (item) {
      item.atomState = atomState;
    }
  }

  async _performAction_cms({ key, actionBase }: any) {
    // render
    const cmsRender = this.ctx.bean.util.getProperty(actionBase, 'params.cms.render');
    if (cmsRender) {
      // render article
      await this.ctx.bean.cms.render._renderArticlePush({ key, inner: false });
    }
  }
}
