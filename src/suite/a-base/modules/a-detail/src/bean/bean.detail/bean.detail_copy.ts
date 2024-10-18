import { Cast } from 'vona';
import { BeanDetail0 } from './bean.detail_0.js';

export class BeanDetailCopy extends BeanDetail0 {
  async _copyDetails({ atomClass, target, srcKeyAtom, destKeyAtom, srcAtom, destAtom, options, user }: any) {
    await this._loopDetailClasses({
      atomClass,
      fn: async ({ atomClassDetail, atomClassBaseDetail }) => {
        // only copy inline details
        if (!atomClassBaseDetail.detail.inline) return;
        await this._copyDetails_Class({
          atomClassDetail,
          atomClassBaseDetail,
          atomClass,
          target,
          srcKeyAtom,
          destKeyAtom,
          srcAtom,
          destAtom,
          options,
          user,
        });
      },
    });
  }

  async _copyDetails_Class({
    atomClassDetail,
    atomClassBaseDetail,
    atomClass,
    target,
    srcKeyAtom,
    destKeyAtom,
    srcAtom,
    destAtom,
    options,
    user,
  }) {
    // select all details src
    const detailsSrc = await this.ctx.bean.atom.select({
      atomClass: atomClassDetail,
      options: {
        atomIdMain: srcKeyAtom.atomId,
        mode: 'full',
      },
      pageForce: false,
    });
    // special for clone
    if (target === 'clone') {
      for (const detailSrc of detailsSrc) {
        await this._copyDetail({
          atomClassDetail,
          atomClassBaseDetail,
          atomClass,
          target,
          srcKeyAtom,
          destKeyAtom,
          srcAtom,
          destAtom,
          options,
          user,
          detailSrc,
        });
      }
      return;
    }
    // select all details dest
    const detailsDest = await this.ctx.bean.atom.select({
      atomClass: atomClassDetail,
      options: {
        atomIdMain: destKeyAtom.atomId,
        // mode: 'full',
      },
    });
    // detailStaticKey
    const detailBasesSrc = await this._copyDetails_prepareStaticKey({
      atomClassDetail,
      atomClassBaseDetail,
      atomClass,
      target,
      srcKeyAtom,
      destKeyAtom,
      srcAtom,
      destAtom,
      options,
      user,
      detailsSrc,
    });
    // select all details base dest
    const detailBasesDest = await this.modelDetailBase.select({
      where: {
        atomIdMain: destKeyAtom.atomId,
        atomClassIdMain: atomClass.id,
      },
    });
    // loop
    for (const detailBaseDest of detailBasesDest) {
      const detailDest = detailsDest.find(item => item.atomId === detailBaseDest.detailId);
      const detailKeyDest = {
        atomId: detailDest.atomId,
        itemId: detailDest.itemId,
      };
      const detailBaseSrc = detailBasesSrc.find(item => item.detailStaticKey === detailBaseDest.detailStaticKey);
      if (!detailBaseSrc) {
        // delete
        await this.ctx.bean.atom.delete({
          key: detailKeyDest,
          atomClass: atomClassDetail,
          user,
        });
      } else {
        const detailSrc = detailsSrc.find(item => item.atomId === detailBaseSrc.detailId);
        // write
        await this._copyDetail({
          atomClassDetail,
          atomClassBaseDetail,
          atomClass,
          target,
          srcKeyAtom,
          destKeyAtom,
          srcAtom,
          destAtom,
          options,
          user,
          detailSrc,
          detailKeyDest,
        });
        // set flag
        Cast(detailBaseSrc).__copied = true;
      }
    }
    // loop: append the remains
    for (const detailBaseSrc of detailBasesSrc) {
      if (Cast(detailBaseSrc).__copied) continue;
      const detailSrc = detailsSrc.find(item => item.atomId === detailBaseSrc.detailId);
      await this._copyDetail({
        atomClassDetail,
        atomClassBaseDetail,
        atomClass,
        target,
        srcKeyAtom,
        destKeyAtom,
        srcAtom,
        destAtom,
        options,
        user,
        detailBaseSrc,
        detailSrc,
      });
    }
  }

  async _copyDetail({
    atomClassDetail,
    atomClassBaseDetail,
    atomClass,
    target,
    srcKeyAtom: _srcKeyAtom,
    destKeyAtom,
    srcAtom: _srcAtom,
    destAtom,
    options: _options,
    user,
    detailBaseSrc,
    detailSrc,
    detailKeyDest,
  }: any) {
    // create detail
    if (!detailKeyDest) {
      detailKeyDest = await this.ctx.bean.atom.create({
        atomClass: atomClassDetail,
        item: null,
        options: { atomIdMain: destKeyAtom.atomId },
        user,
      });
    }
    // create detail base
    if (detailBaseSrc) {
      const data = {
        atomIdMain: destKeyAtom.atomId,
        atomClassIdMain: atomClass.id,
        atomStage: destAtom.atomStage,
        detailId: detailKeyDest.atomId,
        detailClassId: atomClassDetail.id,
        detailStaticKey: detailBaseSrc.detailStaticKey,
      };
      await this.modelDetailBase.insert(data);
    }
    // write
    const fieldNameAtomIdMain = atomClassBaseDetail.fields?.mappings?.atomIdMain;
    const item = {
      ...detailSrc,
      atomId: detailKeyDest.atomId,
      itemId: detailKeyDest.itemId,
      [fieldNameAtomIdMain]: destKeyAtom.atomId,
    };
    if (target === 'clone') {
      item.createdAt = new Date();
      item.updatedAt = new Date();
    }
    await this.ctx.bean.atom.write({
      key: detailKeyDest,
      atomClass: atomClassDetail,
      item,
      options: { ignoreValidate: true },
      user,
    });
  }

  async _copyDetails_prepareStaticKey({
    atomClassDetail,
    atomClassBaseDetail: _atomClassBaseDetail,
    atomClass,
    target: _target,
    srcKeyAtom,
    destKeyAtom: _destKeyAtom,
    srcAtom,
    destAtom: _destAtom,
    options: _options,
    user: _user,
    detailsSrc,
  }: any) {
    // detailBasesSrc
    const detailBasesSrc = await this.modelDetailBase.select({
      where: {
        atomIdMain: srcKeyAtom.atomId,
        atomClassIdMain: atomClass.id,
      },
    });
    // find missing detailStaticKey
    const detailBasesId = detailBasesSrc.map(item => item.detailId);
    const detailsSrcMissing = detailsSrc.filter(item => !detailBasesId.includes(item.id));
    // create detail base
    for (const detailSrcMissing of detailsSrcMissing) {
      const data: any = {
        atomIdMain: srcKeyAtom.atomId,
        atomClassIdMain: atomClass.id,
        atomStage: srcAtom.atomStage,
        detailId: detailSrcMissing.atomId,
        detailClassId: atomClassDetail.id,
        detailStaticKey: this.ctx.bean.util.uuidv4(),
      };
      const res = await this.modelDetailBase.insert(data);
      data.id = res[0];
      detailBasesSrc.push(data);
    }
    return detailBasesSrc;
  }
}
