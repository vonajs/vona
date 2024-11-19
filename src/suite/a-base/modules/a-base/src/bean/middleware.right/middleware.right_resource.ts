import { MiddlewareRightAtomClass } from './middleware.right_atomClass.js';

export class MiddlewareRightResource extends MiddlewareRightAtomClass {
  async checkResource(options) {
    if (this.ctx.innerAccess) return;
    // useKey
    if (options.useKey) {
      const resourceAtomId = this.ctx.request.body.key.atomId;
      const res = await this._checkResource({ resourceAtomId });
      if (!res) this.app.throw(403);
      return;
    }
    // atomStaticKey/name
    if (!options.atomStaticKey && !options.name) this.app.throw(403);
    let atomStaticKeys = options.atomStaticKey;
    if (!atomStaticKeys && options.name) {
      const names = options.name.split(',');
      atomStaticKeys = names.map(name => {
        return `${options.module || this.ctx.module.info.relativeName}:${name}`;
      });
    }
    if (!Array.isArray(atomStaticKeys)) {
      atomStaticKeys = atomStaticKeys.split(',');
    }
    let res;
    for (const atomStaticKey of atomStaticKeys) {
      res = await this._checkResource({ atomStaticKey });
      if (res) break; // ok when any passed
    }
    if (!res) this.app.throw(403);
  }

  async _checkResource({ resourceAtomId, atomStaticKey }: any) {
    return await this.app.bean.resource.checkRightResource({
      resourceAtomId,
      atomStaticKey,
      user: this.ctx.state.user.op,
    });
  }
}
