import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run() {
    await this._update12Migration();
  }

  async _update12Migration() {
    // all instances
    const instances = await this.ctx.bean.instance.list({ where: {} });
    for (const instance of instances) {
      await this.ctx.meta.util.executeBean({
        subdomain: instance.name,
        fn: async ({ ctx }) => {
          const selfInstance = ctx.bean._newBean(VersionUpdate);
          await selfInstance._update12MigrationInstance();
        },
      });
    }
  }

  async _update12MigrationInstance() {
    // articles/post
    await this._update12Migration_articles();
  }

  async _update12Migration_articles() {
    // first, hold articles
    const articles = await this.bean.model.select('aAtom as a', {
      columns: ['a.id as atomId', 'a.atomClassId', 'a.atomStage', 'a.userIdCreated', 'b.content'],
      joins: [['leftJoin', 'aCmsContent as b', { 'a.id': 'b.atomId' }]],
      where: {
        'a.atomStage': 1,
        __or__: [
          { 'b.content': { op: 'like', val: 'cms-pluginblock:blockAudio' } },
          {
            'b.content': { op: 'like', val: 'cms-pluginblock:blockIFrame' },
          },
          {
            'b.content': { op: 'like', val: 'cabloy-dashboard:blockCourse' },
          },
        ],
      },
    });
    // then, update all articles
    await this.bean.model.update(
      'aCmsContent',
      {
        content: this.bean.model.raw(`replace (??,?,?)`, [
          'content',
          'cms-pluginblock:blockAudio',
          'a-markdownblock:audio',
        ]),
      },
      {
        where: {
          content: { op: 'like', val: 'cms-pluginblock:blockAudio' },
        },
      },
    );
    await this.bean.model.update(
      'aCmsContent',
      {
        content: this.bean.model.raw(`replace (??,?,?)`, [
          'content',
          'cms-pluginblock:blockIFrame',
          'a-markdownblock:iframe',
        ]),
      },
      {
        where: {
          content: { op: 'like', val: 'cms-pluginblock:blockIFrame' },
        },
      },
    );
    await this.bean.model.update(
      'aCmsContent',
      {
        content: this.bean.model.raw(`replace (??,?,?)`, [
          'content',
          'cabloy-dashboard:blockCourse',
          'cabloy-course:blockCourseCodes',
        ]),
      },
      {
        where: {
          content: { op: 'like', val: 'cabloy-dashboard:blockCourse' },
        },
      },
    );
    // loop
    for (const article of articles) {
      await this._update12Migration_article({ article });
    }
  }

  async _update12Migration_article({ article }: any) {
    // user
    const user = { id: article.userIdCreated };
    // open
    const res = await this.ctx.bean.atom.openDraft({ key: { atomId: article.atomId }, user });
    const draftKey = res.draft.key;
    // content
    let content = article.content;
    content = content.replace(/cms-pluginblock:blockAudio/gi, 'a-markdownblock:audio');
    content = content.replace(/cms-pluginblock:blockIFrame/gi, 'a-markdownblock:iframe');
    content = content.replace(/cabloy-dashboard:blockCourse/gi, 'cabloy-course:blockCourseCodes');
    // write
    await this.ctx.bean.atom.write({
      key: draftKey,
      target: null,
      item: {
        content,
      },
      options: {
        ignoreRender: true,
      },
      user,
    });
    // submit
    await this.ctx.bean.atom.submit({
      key: draftKey,
      options: {
        ignoreRender: true,
        ignoreFlow: true,
      },
      user,
    });
  }
}
