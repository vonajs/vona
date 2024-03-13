import { Knex } from 'knex';
import { IModelSelectParamsJoin } from 'cabloy-module-api-a-database';
import { SelectOptionsProSafe } from '../../types.js';
import { LocalProcedureAtomSelectAtomsDraft } from './local.procedure_atom_selectAtoms_draft.js';

export class LocalProcedureAtomSelectAtomsFormal extends LocalProcedureAtomSelectAtomsDraft {
  async _selectAtoms_formal({ action, options }: { action: number; options: SelectOptionsProSafe }) {
    const {
      iid,
      userIdWho,
      atomClass,
      atomClassBase,
      tableName,
      where,
      orders,
      page,
      star,
      label,
      comment,
      file,
      count,
      stage,
      language,
      category,
      tag,
      mine,
      resource,
      resourceLocale,
      mode,
      cms,
      forAtomUser,
      role,
      atomIdMain,
    } = options;
    // -- tables
    // -- a: aAtom
    // -- c: aViewUserRightAtomClassRole
    // -- d: aAtomStar
    // -- e: aAtomLabelRef
    // -- f: {item}
    // -- h: aComment
    // -- i: aFile
    // -- k: aTagRef
    // -- m: aResourceLocale
    // -- p: aCmsArticle
    // -- q: aCmsContent

    // important
    if (!atomClass && !star && !label && !mine) {
      this.ctx.throw(403);
    }

    const self = this;

    // for safe
    // tableName = tableName ? this.bean.model.format('??', tableName) : null; // not format tableName
    const _where: any = Object.assign({}, where);
    const _orders = orders ? orders.concat() : [];

    // vars
    let _tagJoin: IModelSelectParamsJoin | undefined;

    let _starField: any[] | undefined, _starJoin: IModelSelectParamsJoin | undefined;
    let _labelField: any[] | undefined, _labelJoin: IModelSelectParamsJoin | undefined;

    let _commentField: any[] | undefined, _commentJoin: IModelSelectParamsJoin | undefined;
    let _fileField: string[] | undefined, _fileJoin: IModelSelectParamsJoin | undefined;
    let _itemField: string[] | undefined, _itemJoin: IModelSelectParamsJoin | undefined;
    let _atomField: string[] | undefined;

    let _tableAlias: string;

    let _resourceField: string[] | undefined, _resourceJoin: IModelSelectParamsJoin | undefined;

    // needResourceLocale
    const needResourceLocale = this.self._prepare_needResourceLocale(_where);

    // cms
    const { _cmsField, _cmsJoin, _cmsWhere } = this.self._prepare_cms({
      tableName,
      iid,
      mode,
      cms,
    });
    _where.__and__cms = _cmsWhere;

    // language
    if (language) {
      _where['a.atomLanguage'] = language;
    }

    // category
    if (category) {
      _where['a.atomCategoryId'] = category;
    }

    // tag
    if (tag) {
      _tagJoin = ['innerJoin', 'aTagRef as k', { 'k.atomId': 'a.id' }];
      _where['k.iid'] = iid;
      _where['k.tagId'] = tag;
    } else {
      _tagJoin = undefined;
    }

    // star
    if (star) {
      _starJoin = ['innerJoin', 'aAtomStar as d', { 'a.id': 'd.atomId' }];
      _where['d.iid'] = iid;
      _where['d.userId'] = userIdWho;
      _where['d.star'] = 1;
    } else {
      _starJoin = undefined;
    }
    if (!atomClassBase || !atomClassBase.itemOnly) {
      _starField = [
        function (this: Knex.QueryBuilder) {
          return this.select('d2.star')
            .from('aAtomStar as d2')
            .where({
              'd2.iid': iid,
              'd2.atomId': self.bean.model.ref('a.id'),
              'd2.userId': userIdWho,
            })
            .as('star');
        },
      ];
    } else {
      _starField = undefined;
    }

    // label
    if (label) {
      _labelJoin = ['innerJoin', 'aAtomLabelRef as e', { 'a.id': 'e.atomId' }];
      _where['e.iid'] = iid;
      _where['e.userId'] = userIdWho;
      _where['e.labelId'] = label;
    } else {
      _labelJoin = undefined;
    }
    if (!atomClassBase || !atomClassBase.itemOnly) {
      _labelField = [
        function (this: Knex.QueryBuilder) {
          return this.select('e2.labels')
            .from('aAtomLabel as e2')
            .where({
              'e2.iid': iid,
              'e2.atomId': self.bean.model.ref('a.id'),
              'e2.userId': userIdWho,
            })
            .as('labels');
        },
      ];
    } else {
      _labelField = undefined;
    }

    // comment
    if (comment) {
      _commentField = [
        'h.id as h_id',
        'h.createdAt as h_createdAt',
        'h.updatedAt as h_updatedAt',
        'h.userId as h_userId',
        'h.sorting as h_sorting',
        'h.heartCount as h_heartCount',
        'h.replyId as h_replyId',
        'h.replyUserId as h_replyUserId',
        'h.replyContent as h_replyContent',
        'h.content as h_content',
        'h.summary as h_summary',
        'h.html as h_html',
        'h.userName as h_userName',
        'h.avatar as h_avatar',
        'h.replyUserName as h_replyUserName',
        function (this: Knex.QueryBuilder) {
          return this.select('h2.heart')
            .from('aCommentHeart as h2')
            .where({ 'h2.iid': iid, 'h2.commentId': self.bean.model.ref('h.id'), 'h2.userId': userIdWho })
            .as('h_heart');
        },
      ];
      _commentJoin = ['innerJoin', 'aViewComment as h', { 'h.atomId': 'a.id' }];
      _where['h.iid'] = iid;
      _where['h.deleted'] = 0;
    } else {
      _commentField = undefined;
      _commentJoin = undefined;
    }

    // file
    if (file) {
      _fileField = [
        'i.id as i_id',
        'i.createdAt as i_createdAt',
        'i.updatedAt as i_updatedAt',
        'i.userId as i_userId',
        'i.downloadId as i_downloadId',
        'i.mode as i_mode',
        'i.fileSize as i_fileSize',
        'i.width as i_width',
        'i.height as i_height',
        'i.filePath as i_filePath',
        'i.fileName as i_fileName',
        'i.realName as i_realName',
        'i.fileExt as i_fileExt',
        'i.encoding as i_encoding',
        'i.mime as i_mime',
        'i.attachment as i_attachment',
        'i.flag as i_flag',
        'i.userName as i_userName',
        'i.avatar as i_avatar',
      ];
      _fileJoin = ['innerJoin', 'aViewFile as i', { 'i.atomId': 'a.id' }];
      _where['i.iid'] = iid;
      _where['i.deleted'] = 0;
    } else {
      _fileField = undefined;
      _fileJoin = undefined;
    }

    // resource
    if (resource) {
      //   in this scene, only select atomDisabled=0
      _where['a.atomDisabled'] = 0;
    }
    if (needResourceLocale) {
      const _locale = resourceLocale || this.ctx.locale;
      _resourceField = ['m.atomNameLocale'];
      _resourceJoin = ['innerJoin', 'aResourceLocale as m', { 'm.atomId': 'a.id', 'm.locale': _locale }];
    } else {
      _resourceField = undefined;
      _resourceJoin = undefined;
    }

    // tableName
    if (tableName) {
      _itemField = await this.self._prepare_fieldsRight({ options });
      if (!atomClassBase || !atomClassBase.itemOnly) {
        _itemJoin = ['innerJoin', `${tableName} as f`, { 'f.atomId': 'a.id' }];
        this.self._prepare_orders_push(_orders, ['a.id', 'asc']);
      } else {
        _itemJoin = undefined;
        _tableAlias = `${tableName} as f`;
        this.self._prepare_orders_push(_orders, ['f.id', 'asc']);
      }
    } else {
      _itemField = undefined;
      _itemJoin = undefined;
      this.self._prepare_orders_push(_orders, ['a.id', 'asc']);
    }

    // atom
    if (!atomClassBase || !atomClassBase.itemOnly) {
      _atomField = [
        'a.id as atomId',
        'a.itemId',
        'a.atomStage',
        'a.atomFlowId',
        'a.atomClosed',
        'a.atomIdDraft',
        'a.atomIdFormal',
        'a.roleIdOwner',
        'a.atomClassId',
        'a.atomName',
        'a.atomStatic',
        'a.atomStaticKey',
        'a.atomRevision',
        'a.atomLanguage',
        'a.atomCategoryId',
        'a.atomTags',
        'a.atomSimple',
        'a.atomDisabled',
        'a.atomState',
        'a.allowComment',
        'a.starCount',
        'a.commentCount',
        'a.attachmentCount',
        'a.readCount',
        'a.userIdCreated',
        'a.userIdUpdated',
        'a.createdAt as atomCreatedAt',
        'a.updatedAt as atomUpdatedAt',
      ];
      _tableAlias = 'aAtom as a';
      _where['a.deleted'] = 0;
      _where['a.iid'] = iid;
      _where['a.atomStage'] = stage;
    } else {
      _atomField = ['f.id as atomId', 'f.id as itemId'];
      _tableAlias = '';
      _where['f.deleted'] = 0;
      _where['f.iid'] = iid;
    }

    // atomClass inner
    if (!atomClass && !star && !label) {
      _where['a.atomClassId'] = await this.self._prepare_atomClassIdsInner();
    }
    if (atomClass && atomClassBase && !atomClassBase.itemOnly) {
      _where['a.atomClassId'] = atomClass.id;
    }

    // atomIdMain
    if (atomClassBase && atomClassBase.detail) {
      if (atomIdMain) {
        const atomIdMainField = atomClassBase.fields?.mappings?.atomIdMain;
        _where[`f.${atomIdMainField}`] = atomIdMain;
      }
    }

    // _rightWhere
    const _rightWhere = await this._selectAtoms_formal_rightWhere({
      action,
      iid,
      userIdWho,
      atomClass,
      atomClassBase,
      tableName,
      star,
      label,
      mine,
      resource,
      needResourceLocale,
      forAtomUser,
      role,
    });
    _where.__and__right = _rightWhere;

    // builder
    const builder = this.bean.model.builder(_tableAlias);
    // count/select:fields
    if (count) {
      builder.count();
    } else {
      const _selectFields = this.self._combineFields([
        //
        _itemField,
        _cmsField,
        _atomField,
        _starField,
        _labelField,
        _commentField,
        _fileField,
        _resourceField,
      ]);
      builder.select(_selectFields);
    }
    // join
    const _joins = this.self._combineJoins([
      //
      _itemJoin,
      _tagJoin,
      _starJoin,
      _labelJoin,
      _commentJoin,
      _fileJoin,
      _resourceJoin,
      _cmsJoin,
    ]);
    this.bean.model.buildJoins(builder, _joins);
    // where
    const wheres = this.bean.model.checkWhere(where);
    if (wheres === false) return [];
    if (wheres !== true) {
      this.bean.model.buildWhere(builder, wheres);
    }
    // orders/page
    if (!count) {
      this.bean.model.buildOrders(builder, _orders);
      if (page) {
        this.bean.model.buildLimit(builder, page.size);
        this.bean.model.buildOffset(builder, page.index);
      }
    }
    // execute
    const debug = this.app.bean.debug.get('atom:sql');
    if (debug.enabled) {
      debug('===== selectAtoms =====\n%s', builder.toQuery());
    }
    return await builder;
  }

  async _selectAtoms_formal_rightWhere({
    action,
    iid,
    userIdWho,
    atomClass,
    atomClassBase,
    tableName,
    star,
    label,
    mine,
    resource,
    needResourceLocale,
    forAtomUser,
    role,
  }) {
    const self = this;
    // pass through for star/label
    if (star || label) return true;

    // resource
    if (resource) {
      // _itemKeyName
      let _itemKeyName;
      if (needResourceLocale) {
        _itemKeyName = 'm.atomId';
      } else if (tableName) {
        _itemKeyName = 'f.atomId';
      } else {
        _itemKeyName = 'a.id';
      }
      return {
        __exists__resource(this: Knex.QueryBuilder) {
          return this.select('c.resourceAtomId')
            .from('aViewUserRightResource as c')
            .where({ 'c.iid': iid, [_itemKeyName]: self.bean.model.ref('c.resourceAtomId'), 'c.userIdWho': userIdWho });
        },
      };
    }

    // mine
    if (mine) {
      return await this.self._prepareRightMine({
        iid,
        atomClass,
        atomClassBase,
        action,
        userIdWho,
      });
    }

    // right
    return await this.self._prepareRight({
      iid,
      atomClass,
      atomClassBase,
      action,
      userIdWho,
      forAtomUser,
      role,
    });
  }
}

// ${_where}
//    (
//      ${_atomWhere}
//      ${_atomClassWhere}
//      ${_languageWhere}
//      ${_categoryWhere}
//      ${_tagWhere}
//      ${_starWhere}
//      ${_labelWhere}
//      ${_commentWhere}
//      ${_fileWhere}
//      ${_resourceWhere}
//      ${_cmsWhere}
//      ${_rightWhere}
//    )
