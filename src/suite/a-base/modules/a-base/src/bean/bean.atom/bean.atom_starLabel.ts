import { __ThisModule__ } from '../../resource/this.js';
import { BeanAtom0Write } from './bean.atom_0_write.js';
import { BeanAtomNotify } from './bean.atom_notify.js';

export class BeanAtomStarLabel extends BeanAtom0Write {
  async star({ key, atom: { star = 1 }, user }) {
    // get
    const atom = await this.get({ atomId: key.atomId });
    if (atom.atomStage !== 1) this.ctx.throw.module(__ThisModule__, 1010);
    // check if exists
    let diff = 0;
    const items = await this.modelAtomStar.select({
      where: {
        userId: user.id,
        atomId: key.atomId,
      },
    });
    const item = items[0];
    if (items.length > 1) {
      // remove others
      for (let index = 1; index < items.length; index++) {
        const _item = items[index];
        await this.modelAtomStar.delete({
          id: _item.id,
        });
      }
    }
    if (item && !star) {
      diff = -1;
      // delete
      await this.modelAtomStar.delete({
        id: item.id,
      });
    } else if (!item && star) {
      diff = 1;
      // new
      await this.modelAtomStar.insert({
        userId: user.id,
        atomId: key.atomId,
        star: 1,
      });
    }
    // starCount
    let starCount = atom.starCount;
    if (diff !== 0) {
      starCount += diff;
      await this.modelAtom.update({
        id: key.atomId,
        starCount,
      });
    }
    // notify
    (this as unknown as BeanAtomNotify)._notifyStars();
    // ok
    return { star, starCount };
  }

  async labels({ key, atom: { labels = null }, user }) {
    // get
    const atom = await this.get({ atomId: key.atomId });
    if (atom.atomStage !== 1) this.ctx.throw.module(__ThisModule__, 1010);
    // atomLabel
    await this._labels_atomLabel({ atomId: key.atomId, labels, user });
    // atomLabelRef
    await this._labels_atomLabelRef({ atomId: key.atomId, labels, user });
    // notify
    (this as unknown as BeanAtomNotify)._notifyLabels();
  }

  async _labels_atomLabel({ atomId, labels, user }: any) {
    // delete
    if (!labels || labels.length === 0) {
      await this.modelAtomLabel.delete({
        userId: user.id,
        atomId,
      });
      return;
    }
    // insert/update
    const items = await this.modelAtomLabel.select({
      where: {
        userId: user.id,
        atomId,
      },
    });
    const item = items[0];
    if (items.length > 1) {
      // remove others
      for (let index = 1; index < items.length; index++) {
        const _item = items[index];
        await this.modelAtomLabel.delete({
          id: _item.id,
        });
      }
    }
    // update
    if (item) {
      // update
      await this.modelAtomLabel.update({
        id: item.id,
        labels: JSON.stringify(labels),
      });
    } else {
      // create
      await this.modelAtomLabel.insert({
        userId: user.id,
        atomId,
        labels: JSON.stringify(labels),
      });
    }
  }

  async _labels_atomLabelRef({ atomId, labels, user }: any) {
    // force delete
    await this.modelAtomLabelRef.delete({
      userId: user.id,
      atomId,
    });
    // new
    if (labels && labels.length > 0) {
      for (const labelId of labels) {
        await this.modelAtomLabelRef.insert({
          userId: user.id,
          atomId,
          labelId,
        });
      }
    }
  }

  async getLabels({ user }: any) {
    const data = await this.modelLabel.get({
      userId: user.id,
    });
    let labels = data ? JSON.parse(data.labels) : null;
    if (!labels || Object.keys(labels).length === 0) {
      // append default labels
      labels = {
        1: {
          color: 'red',
          text: this.ctx.text('Red'),
        },
        2: {
          color: 'orange',
          text: this.ctx.text('Orange'),
        },
      };
      await this.setLabels({ labels, user });
    }
    return labels;
  }

  async setLabels({ labels, user }: any) {
    const labels2 = JSON.stringify(labels);
    const res = await this.modelLabel.get({
      userId: user.id,
    });
    if (!res) {
      await this.modelLabel.insert({
        userId: user.id,
        labels: labels2,
      });
    } else {
      await this.modelLabel.update({
        id: res.id,
        labels: labels2,
      });
    }
  }
}
