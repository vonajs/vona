import { BeanAtomDraft } from './bean.atom_draft.js';

export class BeanAtomFormal extends BeanAtomDraft {
  async closeFormal({ key }: any) {
    // update atomClosed
    await this.modelAtom.update({
      id: key.atomId,
      atomClosed: 1,
    });
  }
}
