import { LocalProcedureAtomSelectAtomsDraft } from './local.procedure_atom_selectAtoms_draft.js';

export class LocalProcedureAtomSelectAtomsFormal extends LocalProcedureAtomSelectAtomsDraft {
  async _selectAtoms_formal({ action, options }: any) {
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

    // for safe
    // tableName = tableName ? this.ctx.model.format('??', tableName) : null; // not format tableName
    const _where = Object.assign({}, where);
    const _orders = orders ? orders.concat() : [];

    // vars
    let _tagJoin;

    let _starField, _starJoin;
    let _labelField, _labelJoin;

    let _commentField, _commentJoin;
    let _fileField, _fileJoin;
    let _itemField, _itemJoin;
    let _atomField, _atomJoin;

    let _resourceField, _resourceJoin;

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
      _tagJoin = ' inner join aTagRef k on k.atomId=a.id';
      _where['k.iid'] = iid;
      _where['k.tagId'] = tag;
    } else {
      _tagJoin = '';
    }

    // star
    if (star) {
      _starJoin = ' inner join aAtomStar d on a.id=d.atomId';
      _where['d.iid'] = iid;
      _where['d.userId'] = userIdWho;
      _where['d.star'] = 1;
    } else {
      _starJoin = '';
    }
    if (!atomClassBase || !atomClassBase.itemOnly) {
      _starField = `,(select d2.star from aAtomStar d2 where d2.iid=${iid} and d2.atomId=a.id and d2.userId=${userIdWho}) as star`;
    } else {
      _starField = '';
    }

    // label
    if (label) {
      _labelJoin = ' inner join aAtomLabelRef e on a.id=e.atomId';
      _where['e.iid'] = iid;
      _where['e.userId'] = userIdWho;
      _where['e.labelId'] = label;
    } else {
      _labelJoin = '';
    }
    if (!atomClassBase || !atomClassBase.itemOnly) {
      _labelField = `,(select e2.labels from aAtomLabel e2 where e2.iid=${iid} and e2.atomId=a.id and e2.userId=${userIdWho}) as labels`;
    } else {
      _labelField = '';
    }

    // comment
    if (comment) {
      _commentField = `,h.id h_id,h.createdAt h_createdAt,h.updatedAt h_updatedAt,h.userId h_userId,h.sorting h_sorting,h.heartCount h_heartCount,h.replyId h_replyId,h.replyUserId h_replyUserId,h.replyContent h_replyContent,h.content h_content,h.summary h_summary,h.html h_html,h.userName h_userName,h.avatar h_avatar,h.replyUserName h_replyUserName,
               (select h2.heart from aCommentHeart h2 where h2.iid=${iid} and h2.commentId=h.id and h2.userId=${userIdWho}) as h_heart`;

      _commentJoin = ' inner join aViewComment h on h.atomId=a.id';
      _where['h.iid'] = iid;
      _where['h.deleted'] = 0;
    } else {
      _commentField = '';
      _commentJoin = '';
    }

    // file
    if (file) {
      _fileField =
        ',i.id i_id,i.createdAt i_createdAt,i.updatedAt i_updatedAt,i.userId i_userId,i.downloadId i_downloadId,i.mode i_mode,i.fileSize i_fileSize,i.width i_width,i.height i_height,i.filePath i_filePath,i.fileName i_fileName,i.realName i_realName,i.fileExt i_fileExt,i.encoding i_encoding,i.mime i_mime,i.attachment i_attachment,i.flag i_flag,i.userName i_userName,i.avatar i_avatar';
      _fileJoin = ' inner join aViewFile i on i.atomId=a.id';
      _where['i.iid'] = iid;
      _where['i.deleted'] = 0;
    } else {
      _fileField = '';
      _fileJoin = '';
    }

    // resource
    if (resource) {
      //   in this scene, only select atomDisabled=0
      _where['a.atomDisabled'] = 0;
    }
    if (needResourceLocale) {
      const _locale = this.ctx.model.format('?', resourceLocale || this.ctx.locale);
      _resourceField = ',m.atomNameLocale';
      _resourceJoin = ` inner join aResourceLocale m on m.atomId=a.id and m.locale=${_locale}`;
    } else {
      _resourceField = '';
      _resourceJoin = '';
    }

    // tableName
    if (tableName) {
      const _fields = await this.self._prepare_fieldsRight({ options });
      _itemField = `${_fields},`;
      if (!atomClassBase || !atomClassBase.itemOnly) {
        _itemJoin = ` inner join ${tableName} f on f.atomId=a.id`;
        this.self._prepare_orders_push(_orders, ['a.id', 'asc']);
      } else {
        _itemJoin = `from ${tableName} f`;
        this.self._prepare_orders_push(_orders, ['f.id', 'asc']);
      }
    } else {
      _itemField = '';
      _itemJoin = '';
      this.self._prepare_orders_push(_orders, ['a.id', 'asc']);
    }

    // atom
    if (!atomClassBase || !atomClassBase.itemOnly) {
      _atomField = `a.id as atomId,a.itemId,a.atomStage,a.atomFlowId,a.atomClosed,a.atomIdDraft,a.atomIdFormal,a.roleIdOwner,a.atomClassId,a.atomName,
          a.atomStatic,a.atomStaticKey,a.atomRevision,a.atomLanguage,a.atomCategoryId,a.atomTags,
          a.atomSimple,a.atomDisabled,a.atomState,
          a.allowComment,a.starCount,a.commentCount,a.attachmentCount,a.readCount,a.userIdCreated,a.userIdUpdated,a.createdAt as atomCreatedAt,a.updatedAt as atomUpdatedAt`;
      _atomJoin = 'from aAtom a';
      _where['a.deleted'] = 0;
      _where['a.iid'] = iid;
      _where['a.atomStage'] = stage;
    } else {
      _atomField = 'f.id as atomId,f.id as itemId';
      _atomJoin = '';
      _where['f.deleted'] = 0;
      _where['f.iid'] = iid;
    }

    // atomClass inner
    if (!atomClass && !star && !label) {
      _where['a.atomClassId'] = await this.self._prepare_atomClassIdsInner();
    }
    if (atomClass && !atomClassBase.itemOnly) {
      _where['a.atomClassId'] = atomClass.id;
    }

    // atomIdMain
    if (atomClass && atomClassBase.detail) {
      if (atomIdMain) {
        const atomIdMainField = atomClassBase.fields?.mappings?.atomIdMain;
        _where[`f.${atomIdMainField}`] = atomIdMain;
      }
    }

    // fields
    let _selectFields;
    if (count) {
      _selectFields = 'count(*) as _count';
    } else {
      _selectFields = this.self._combineFields([
        _itemField,
        _cmsField,
        _atomField,
        _starField,
        _labelField,
        _commentField,
        _fileField,
        _resourceField,
      ]);
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

    // where clause
    let _whereClause = this.ctx.model._formatWhere(_where);
    if (_whereClause === false) return false;
    _whereClause = _whereClause === true ? '' : ` WHERE (${_whereClause})`;

    // orders
    const _orders2 = this.ctx.model._orders(_orders);
    // limit
    const _limit = page ? this.ctx.model._limit(page.size, page.index) : '';

    // sql
    const _sql = `select ${_selectFields} ${_atomJoin}
            ${_itemJoin}
            ${_tagJoin}
            ${_starJoin}
            ${_labelJoin}
            ${_commentJoin}
            ${_fileJoin}
            ${_resourceJoin}
            ${_cmsJoin}

          ${_whereClause}

          ${count ? '' : _orders2}
          ${count ? '' : _limit}
        `;

    // ok
    return _sql;
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
      return this.ctx.model.raw(`
          exists(
            select c.resourceAtomId from aViewUserRightResource c where c.iid=${iid} and ${_itemKeyName}=c.resourceAtomId and c.userIdWho=${userIdWho}
          )
        `);
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
