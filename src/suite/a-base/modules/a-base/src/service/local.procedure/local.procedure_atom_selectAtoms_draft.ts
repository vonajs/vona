import { IModelSelectParamsJoin, Knex } from 'vona-module-a-database';
import { LocalProcedureAtomSelectAtoms0 } from './local.procedure_atom_selectAtoms_0.js';
import { SelectOptionsProSafe } from '../../types.js';

export class LocalProcedureAtomSelectAtomsDraft extends LocalProcedureAtomSelectAtoms0 {
  async _selectAtoms_draft({ options }: { options: SelectOptionsProSafe }) {
    const {
      iid,
      userIdWho,
      atomClass,
      atomClassBase,
      tableName,
      where,
      orders,
      page,
      // star,
      // label,
      comment,
      file,
      count,
      stage,
      language,
      category,
      tag,
      mode,
      cms,
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
    // -- p: aCmsArticle
    // -- q: aCmsContent

    const self = this;

    // for safe
    const _where: any = Object.assign({}, where);
    const _orders = orders ? orders.concat() : [];

    // vars
    let _tagJoin: IModelSelectParamsJoin | undefined;

    let _commentField: any[] | undefined, _commentJoin: IModelSelectParamsJoin | undefined;
    let _fileField: string[] | undefined, _fileJoin: IModelSelectParamsJoin | undefined;
    let _itemField: string[] | undefined, _itemJoin: IModelSelectParamsJoin | undefined;
    // let _atomField: string[] | undefined;
    // let _tableAlias: string;

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

    // tableName
    if (tableName) {
      _itemField = await this.self._prepare_fieldsRight({ options });
      _itemJoin = ['innerJoin', `${tableName} as f`, { 'f.atomId': 'a.id' }];
      this.self._prepare_orders_push(_orders, ['a.id', 'asc']);
    } else {
      _itemField = undefined;
      _itemJoin = undefined;
      this.self._prepare_orders_push(_orders, ['a.id', 'asc']);
    }

    // atom
    const _atomField = [
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
    const _tableAlias = 'aAtom as a';
    _where['a.deleted'] = 0;
    _where['a.iid'] = iid;
    _where['a.atomStage'] = stage;
    _where['a.userIdUpdated'] = userIdWho;
    _where['a.atomClosed'] = 0;
    // _where.__or__atomClosed = [
    //   { 'a.atomClosed': 0 },
    //   {
    //     'a.atomClosed': 1,
    //     'a.atomIdFormal': 0,
    //   },
    // ];

    // atomClass inner: need not
    // if (!atomClass) {
    //   _where['a.atomClassId'] = await this.self._prepare_atomClassIdsInner();
    // }
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
        _commentField,
        _fileField,
      ]);
      builder.select(_selectFields);
    }
    // join
    const _joins = this.self._combineJoins([
      //
      _itemJoin,
      _tagJoin,
      _commentJoin,
      _fileJoin,
      _cmsJoin,
    ]);
    this.bean.model.buildJoins(builder, _joins);
    // where
    const wheres = this.bean.model.checkWhere(_where);
    if (wheres === false) return [];
    if (wheres !== true) {
      this.bean.model.buildWhere(builder, wheres);
    }
    // orders/page
    if (!count) {
      this.bean.model.buildOrders(builder, _orders);
      this.bean.model.buildPage(builder, page);
    }
    // execute
    const debug = this.app.bean.debug.get('atom:sql');
    if (debug.enabled) {
      debug('===== selectAtoms =====\n%s', builder.toQuery());
    }
    return await builder;
  }
}
