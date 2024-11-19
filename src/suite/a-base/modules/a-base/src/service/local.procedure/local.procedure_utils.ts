import { IModelSelectParamsJoin } from 'vona-module-a-database';
import { LocalProcedureUtilsRights } from './local.procedure_utils_rights.js';

export class LocalProcedureUtils extends LocalProcedureUtilsRights {
  _prepare_cms({ tableName, iid, mode, cms }: any) {
    let _cmsField: string[] | undefined, _cmsJoin: Array<IModelSelectParamsJoin> | undefined;
    const _cmsWhere: any = {};

    // cms
    if (cms) {
      _cmsField = [
        'p.sticky',
        'p.keywords',
        'p.description',
        'p.summary',
        'p.url',
        'p.editMode',
        'p.slug',
        'p.sorting',
        'p.flag',
        'p.extra',
        'p.imageCover',
        'p.imageFirst',
        'p.audioFirst',
        'p.audioCoverFirst',
        'p.uuid',
        'p.renderAt',
      ];
      if (!tableName) {
        _cmsField = ['p.createdAt', 'p.updatedAt'].concat(_cmsField);
      }
      _cmsJoin = [['innerJoin', 'aCmsArticle as p', { 'p.atomId': 'a.id' }]];
      _cmsWhere['p.iid'] = iid;
      _cmsWhere['p.deleted'] = 0;
      if (mode && mode !== 'default') {
        // full/search/others
        _cmsField = _cmsField.concat(['q.content', 'q.html']);
        _cmsJoin.push(['innerJoin', 'aCmsContent as q', { 'q.atomId': 'a.id' }]);
        _cmsWhere['q.iid'] = iid;
        _cmsWhere['q.deleted'] = 0;
      }
    } else {
      _cmsField = undefined;
      _cmsJoin = undefined;
    }

    return { _cmsField, _cmsJoin, _cmsWhere };
  }

  async _prepare_atomClassIdsInner() {
    return await this.app.bean.atomClass.getAtomClassIdsInner({ inner: false });
  }

  async _prepare_roleScopesMineOfUser({ atomClass, action, userIdWho }: any) {
    const roleScopesMine = await this.app.bean.atomRightAux.getRoleScopesMineOfUser({
      atomClass: { id: atomClass.id },
      action,
      userId: userIdWho,
    });
    return !!roleScopesMine;
  }

  async _prepare_roleScopesOfUser({ atomClass, action, userIdWho }: any) {
    const roleScopes = await this.app.bean.atomRightAux.getRoleScopesOfUser({
      atomClass: { id: atomClass.id },
      action,
      userId: userIdWho,
    });
    return roleScopes;
  }

  async _prepare_roleScopesOfRole({ atomClass, action, roleIdWho }: any) {
    const roleScopes = await this.app.bean.atomRightAux.getRoleScopesOfRole({
      atomClass: { id: atomClass.id },
      action,
      roleId: roleIdWho,
    });
    return roleScopes;
  }

  _prepare_orders_push(_orders, order) {
    if (_orders.length > 0) {
      _orders.push(order);
    }
  }

  _combineFields(fields: any[]): any[] {
    let result = [];
    for (const field of fields) {
      if (field) {
        result = result.concat(field);
      }
    }
    return result;
  }

  _combineJoins(joins: any[]): IModelSelectParamsJoin[] {
    let result: IModelSelectParamsJoin[] = [];
    for (const join of joins) {
      if (join) {
        if (Array.isArray(join[0])) {
          result = result.concat(join);
        } else {
          result.push(join);
        }
      }
    }
    return result;
  }

  _prepare_needResourceLocale(_where) {
    const __or__atomNameResource = _where.__or__atomNameResource;
    if (!__or__atomNameResource) return false;
    const atomNameLocale = __or__atomNameResource.find(item => !!item['m.atomNameLocale']);
    return !!atomNameLocale;
  }
}
