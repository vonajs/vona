import { IModelSelectParamsJoin, Knex } from 'cabloy-module-api-a-database';
import { AtomReadQueryParams } from '../../types.js';
import { LocalProcedureAtomSelectAtomsFormal } from './local.procedure_atom_selectAtoms_formal.js';

export class LocalProcedureAtomGetAtom extends LocalProcedureAtomSelectAtomsFormal {
  async getAtom({ atomClass: _atomClass, options, key, user: _user }: AtomReadQueryParams) {
    let {
      iid,
      userIdWho,
      atomClass,
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

    const self = this;

    // for safe
    // tableName = tableName ? this.bean.model.format('??', tableName) : null; // not format tableName

    iid = parseInt(iid);
    userIdWho = parseInt(userIdWho);
    resource = parseInt(resource);
    atomIdMain = this.ctx.bean.util.parseIdSafe(atomIdMain);
    const atomId = this.ctx.bean.util.parseIdSafe(key.atomId);

    // where
    const _where: any = {};

    // vars
    let _starField: any[] | undefined, _labelField: any[] | undefined;
    let _itemField: string[] | undefined, _itemJoin: IModelSelectParamsJoin | undefined;
    let _atomField: string[] | undefined;

    let _tableAlias: string = '';

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
    if (userIdWho && !atomClassBase.itemOnly) {
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
      _itemField = await this.self._prepare_fieldsRight({ options });
      if (!atomClassBase || !atomClassBase.itemOnly) {
        _itemJoin = ['innerJoin', `${tableName} as f`, { 'f.atomId': 'a.id' }];
      } else {
        _itemJoin = undefined;
        _tableAlias = `${tableName} as f`;
      }
    } else {
      _itemField = undefined;
      _itemJoin = undefined;
    }

    // atom
    if (!atomClassBase.itemOnly) {
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
      _where['a.id'] = atomId;
      _where['a.deleted'] = 0;
      _where['a.iid'] = iid;
    } else {
      _atomField = ['f.id as atomId', 'f.id as itemId'];
      // _tableAlias = '';
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

    // builder
    const builder = this.bean.model.builder(_tableAlias);
    // select:fields
    const _selectFields = this.self._combineFields([
      //
      _itemField,
      _cmsField,
      _atomField,
      _starField,
      _labelField,
      _resourceField,
    ]);
    builder.select(_selectFields);
    // join
    const _joins = this.self._combineJoins([
      //
      _itemJoin,
      _resourceJoin,
      _cmsJoin,
    ]);
    this.bean.model.buildJoins(builder, _joins);
    // where
    const wheres = this.bean.model.checkWhere(_where);
    if (wheres === false) return undefined;
    if (wheres !== true) {
      this.bean.model.buildWhere(builder, wheres);
    }
    // limit
    builder.limit(1);
    // execute
    const debug = this.app.bean.debug.get('atom:sql');
    if (debug.enabled) {
      debug('===== getAtom =====\n%s', builder.toQuery());
    }
    const res = await builder;
    return res[0];
  }
}
