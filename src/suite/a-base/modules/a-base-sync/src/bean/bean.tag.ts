class Tag {
  get modelTag() {
    return this.ctx.model.module(moduleInfo.relativeName).tag;
  }

  get modelTagRef() {
    return this.ctx.model.module(moduleInfo.relativeName).tagRef;
  }

  async count({ atomClass, language }) {
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    const where = {
      atomClassId: atomClass.id,
    };
    if (language) {
      where.language = language;
    }
    return await this.modelTag.count(where);
  }

  async get({ tagId }) {
    return await this.modelTag.get({ id: tagId });
  }

  async item({ atomClass, language, tagName }) {
    const where = {
      tagName,
    };
    if (language) {
      where.language = language;
    }
    const options = {
      where,
    };
    const list = await this.list({ atomClass, options });
    return list[0];
  }

  async list({ atomClass, options }) {
    options = options || {};
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    if (!options.where) options.where = {};
    options.where.atomClassId = atomClass.id;
    if (!options.where.language) {
      delete options.where.language;
    }
    return await this.modelTag.select(options);
  }

  async add({ atomClass, data }) {
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    // add
    const res = await this.modelTag.insert({
      atomClassId: atomClass.id,
      language: data.language,
      tagName: data.tagName,
      tagAtomCount: data.tagAtomCount || 0,
    });
    return res.insertId;
  }

  async save({ tagId, data }) {
    await this.modelTag.update({
      id: tagId,
      tagName: data.tagName,
    });
  }

  async delete({ tagId }) {
    // check atoms
    const count = await this.modelTagRef.count({ tagId });
    if (count > 0) this.ctx.throw.module(moduleInfo.relativeName, 1012);

    // delete
    await this.modelTag.delete({ id: tagId });
  }

  async updateTagRefs({ atomId, atomTags }) {
    // tags
    if (typeof atomTags === 'string') {
      atomTags = JSON.parse(atomTags);
    }
    // force delete
    await this.deleteTagRefs({ atomId });
    // new
    if (atomTags && atomTags.length > 0) {
      for (const tagId of atomTags) {
        await this.modelTagRef.insert({
          atomId,
          tagId,
        });
      }
    }
    // ok
    return atomTags;
  }

  async deleteTagRefs({ atomId }) {
    await this.modelTagRef.delete({
      atomId,
    });
  }

  async setTagAtomCount({ tagsNew, tagsOld }) {
    // tags
    const tags = {};
    if (tagsNew) {
      const _tags = typeof tagsNew === 'string' ? JSON.parse(tagsNew) : tagsNew;
      for (const tagId of _tags) {
        tags[tagId] = true;
      }
    }
    if (tagsOld) {
      const _tags = typeof tagsOld === 'string' ? JSON.parse(tagsOld) : tagsOld;
      for (const tagId of _tags) {
        tags[tagId] = true;
      }
    }
    // loop
    for (const tagId in tags) {
      const tagAtomCount = await this.calcAtomCount({ tagId });
      // update
      await this.modelTag.update({ id: tagId, tagAtomCount });
    }
  }

  async calcAtomCount({ tagId }) {
    const res = await this.ctx.model.query(
      `
        select count(*) atomCount from aTagRef a
          inner join aAtom b on a.atomId=b.id
          where a.iid=? and a.tagId=? and b.iid=? and b.deleted=0 and b.atomStage=1
        `,
      [this.ctx.instance.id, tagId, this.ctx.instance.id],
    );
    return res[0].atomCount;
  }

  async parseTags({ atomClass, language, tagName, force = false }) {
    const tagNames = tagName.split(',');
    const tagIds = [];
    for (const _tagName of tagNames) {
      const tag = await this.item({ atomClass, language, tagName: _tagName });
      // next
      if (tag) {
        tagIds.push(tag.id);
        continue;
      }
      // null
      if (!force) continue;
      // create
      const tagId = await this._register({
        atomClass,
        language,
        tagName: _tagName,
      });
      tagIds.push(tagId);
    }
    return tagIds;
  }

  async _register({ atomClass, language, tagName }) {
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    return await this.ctx.meta.util.lock({
      resource: `${moduleInfo.relativeName}.tag.register.${atomClass.id}`,
      fn: async () => {
        return await this.ctx.meta.util.executeBeanIsolate({
          beanModule: moduleInfo.relativeName,
          beanFullName: 'tag',
          context: { atomClass, language, tagName },
          fn: '_registerLock',
        });
      },
    });
  }

  async _registerLock({ atomClass, language, tagName }) {
    // get again
    const tag = await this.item({ atomClass, language, tagName });
    if (tag) return tag.id;
    // add
    return await this.add({
      atomClass,
      data: {
        language,
        tagName,
      },
    });
  }
}
module.exports = Tag;
