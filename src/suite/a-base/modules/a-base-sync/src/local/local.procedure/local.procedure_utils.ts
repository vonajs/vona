import { LocalProcedureUtilsRights } from './local.procedure_utils_rights.js';

export class LocalProcedureUtils extends LocalProcedureUtilsRights {
  _prepare_cms({ tableName, iid, mode, cms }) {
    let _cmsField, _cmsJoin;
    const _cmsWhere = {};

    // cms
    if (cms) {
      _cmsField = `${
        tableName ? '' : 'p.createdAt,p.updatedAt,'
      }p.sticky,p.keywords,p.description,p.summary,p.url,p.editMode,p.slug,p.sorting,p.flag,p.extra,p.imageCover,p.imageFirst,p.audioFirst,p.audioCoverFirst,p.uuid,p.renderAt,`;
      _cmsJoin = ' inner join aCmsArticle p on p.atomId=a.id';
      _cmsWhere['p.iid'] = iid;
      _cmsWhere['p.deleted'] = 0;
      if (mode && mode !== 'default') {
        // full/search/others
        _cmsField += 'q.content,q.html,';
        _cmsJoin += ' inner join aCmsContent q on q.atomId=a.id';
        _cmsWhere['q.iid'] = iid;
        _cmsWhere['q.deleted'] = 0;
      }
    } else {
      _cmsField = '';
      _cmsJoin = '';
    }

    return { _cmsField, _cmsJoin, _cmsWhere };
  }

  async _prepare_atomClassIdsInner() {
    return await this.ctx.bean.atomClass.getAtomClassIdsInner({ inner: false });
  }

  async _prepare_roleScopesMineOfUser({ atomClass, action, userIdWho }) {
    const roleScopesMine = await this.ctx.bean.atomRightAux.getRoleScopesMineOfUser({
      atomClass: { id: atomClass.id },
      action,
      userId: userIdWho,
    });
    return !!roleScopesMine;
  }

  async _prepare_roleScopesOfUser({ atomClass, action, userIdWho }) {
    const roleScopes = await this.ctx.bean.atomRightAux.getRoleScopesOfUser({
      atomClass: { id: atomClass.id },
      action,
      userId: userIdWho,
    });
    return roleScopes;
  }

  async _prepare_roleScopesOfRole({ atomClass, action, roleIdWho }) {
    const roleScopes = await this.ctx.bean.atomRightAux.getRoleScopesOfRole({
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

  _combineFields(fields) {
    const _fields = fields.filter(field => !!field).map(field => field.trim().replace(/(^,)|(,$)/g, ''));
    return _fields.join(',');
  }

  _prepare_needResourceLocale(_where) {
    const __or__atomNameResource = _where.__or__atomNameResource;
    if (!__or__atomNameResource) return false;
    const atomNameLocale = __or__atomNameResource.find(item => !!item['m.atomNameLocale']);
    return !!atomNameLocale;
  }
}
