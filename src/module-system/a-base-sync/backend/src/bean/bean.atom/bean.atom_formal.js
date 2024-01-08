// const moduleInfo = module.info;
module.exports = class Atom {
  async closeFormal({ key }) {
    // update atomClosed
    await this.modelAtom.update({
      id: key.atomId,
      atomClosed: 1,
    });
  }
};
