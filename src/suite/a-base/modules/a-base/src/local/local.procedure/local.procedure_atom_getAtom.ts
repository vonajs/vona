import { AtomReadQueryParams } from '../../types.js';
import { LocalProcedureAtomSelectAtomsFormal } from './local.procedure_atom_selectAtoms_formal.js';

export class LocalProcedureAtomGetAtom extends LocalProcedureAtomSelectAtomsFormal {
  async getAtom({ atomClass, options, key, user }: AtomReadQueryParams) {
    let {
      iid,
      // userIdWho,
      // atomClass,
      atomClassBase,
      tableName,
      // atomId,
      resource,
      /* resourceLocale,*/
      mode,
      cms /* , forAtomUser*/,
      atomIdMain,
    } = options;
    // -- tables
    // -- a: aAtom
    // -- d: aAtomStar
    // -- e: aAtomLabelRef
    // -- f: {item}
    // -- m: aResourceLocale
    // -- p: aCmsArticle
    // -- q: aCmsContent

    // for safe
    // tableName = tableName ? this.bean.model.format('??', tableName) : null; // not format tableName

    iid = parseInt(iid);
    resource = parseInt(resource);
    atomIdMain = this.ctx.bean.util.parseIdSafe(atomIdMain);
    const atomId = this.ctx.bean.util.parseIdSafe(key.atomId);
    const userIdWho = parseInt(user.id);

    // where
    const _where: any = {};

    // vars
    let _starField, _labelField;
    let _itemField, _itemJoin;
    let _atomField, _atomJoin;

    const _resourceField = '',
      _resourceJoin = '';

    // cms
    const { _cmsField, _cmsJoin, _cmsWhere } = this.self._prepare_cms({
      tableName,
      iid,
      mode,
      cms,
    });
    _where.__and__cms = _cmsWhere;

    // star
    if (userIdWho && !atomClassBase.itemOnly) {
      _starField = `,(select d.star from aAtomStar d where d.iid=${iid} and d.atomId=a.id and d.userId=${userIdWho}) as star`;
    } else {
      _starField = '';
    }

    // label
    if (userIdWho && !atomClassBase.itemOnly) {
      _labelField = `,(select e.labels from aAtomLabel e where e.iid=${iid} and e.atomId=a.id and e.userId=${userIdWho}) as labels`;
    } else {
      _labelField = '';
    }

    // resource
    if (resource) {
      // not check atomDisabled
      // _where['a.atomDisabled'] = 0;
    }
    // need not join aResourceLocale
    // if (resource && resourceLocale) {
    //   const _locale = this.bean.model.format('?', resourceLocale);
    //   _resourceField = ',m.atomNameLocale';
    //   // _resourceJoin = ' inner join aResourceLocale m on m.atomId=a.id';
    //   _resourceJoin = ` inner join aResourceLocale m on m.atomId=a.id and m.locale=${_locale}`;
    // } else {
    //   _resourceField = '';
    //   _resourceJoin = '';
    // }

    // tableName
    if (tableName) {
      const _fields = await this.self._prepare_fieldsRight({ options });
      _itemField = `${_fields},`;
      if (!atomClassBase || !atomClassBase.itemOnly) {
        _itemJoin = ` inner join ${tableName} f on f.atomId=a.id`;
      } else {
        _itemJoin = `from ${tableName} f`;
      }
    } else {
      _itemField = '';
      _itemJoin = '';
    }

    // atom
    if (!atomClassBase.itemOnly) {
      _atomField = `a.id as atomId,a.itemId,a.atomStage,a.atomFlowId,a.atomClosed,a.atomIdDraft,a.atomIdFormal,a.roleIdOwner,a.atomClassId,a.atomName,
          a.atomStatic,a.atomStaticKey,a.atomRevision,a.atomLanguage,a.atomCategoryId,a.atomTags,
          a.atomSimple,a.atomDisabled,a.atomState,
          a.allowComment,a.starCount,a.commentCount,a.attachmentCount,a.readCount,a.userIdCreated,a.userIdUpdated,a.createdAt as atomCreatedAt,a.updatedAt as atomUpdatedAt`;
      _atomJoin = 'from aAtom a';
      _where['a.id'] = atomId;
      _where['a.deleted'] = 0;
      _where['a.iid'] = iid;
    } else {
      _atomField = 'f.id as atomId,f.id as itemId';
      _atomJoin = '';
      _where['f.id'] = atomId;
      _where['f.deleted'] = 0;
      _where['f.iid'] = iid;
    }

    // atomClass
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
    const _selectFields = this.self._combineFields([
      _itemField,
      _cmsField,
      _atomField,
      _starField,
      _labelField,
      _resourceField,
    ]);

    // where clause
    let _whereClause = this.bean.model._formatWhere(_where);
    if (_whereClause === false) return false;
    _whereClause = _whereClause === true ? '' : ` WHERE (${_whereClause})`;

    // sql
    const _sql = `select ${_selectFields} ${_atomJoin}
            ${_itemJoin}
            ${_resourceJoin}
            ${_cmsJoin}

          ${_whereClause}
        `;

    // ok
    return _sql;
  }
}
