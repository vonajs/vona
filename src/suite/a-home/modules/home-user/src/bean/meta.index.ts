import type { IMetaOptionsIndex } from 'vona-module-a-index';
import { BeanBase } from 'vona';
import { $tableColumns } from 'vona-module-a-database';
import { Meta } from 'vona-module-a-meta';
import { EntityRole } from '../entity/role.ts';
import { EntityUser } from '../entity/user.ts';
import { EntityUserRole } from '../entity/userRole.ts';

@Meta<IMetaOptionsIndex>({
  indexes: {
    ...$tableColumns(() => EntityUser, entity => entity.name),
    ...$tableColumns(() => EntityRole, entity => entity.name),
    ...$tableColumns(() => EntityUserRole, entity => [entity.userId, entity.roleId]),
  },
})
export class MetaIndex extends BeanBase {}
