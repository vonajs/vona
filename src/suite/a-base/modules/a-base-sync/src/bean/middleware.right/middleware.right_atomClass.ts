import MiddlewareRightAtom from './middleware.right_atom.js';

export class MiddlewareRightAtomClass extends MiddlewareRightAtom {
  async checkAtomClass(options) {
    // user
    const user = this.ctx.state.user.op;
    // atomClass
    const { atomClass } = await this._checkAtom_checkAtomClassExpect({ options });
    // checkRightAtomClass
    const res = await this.ctx.bean.atomClass.checkRightAtomClass({ atomClass, user });
    if (!res) this.ctx.throw(403);
  }
}
