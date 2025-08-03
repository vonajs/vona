import type { IMetaOptionsIndex } from 'vona-module-a-index';
import { BeanBase } from 'vona';
import { Meta } from 'vona-module-a-meta';
import { $tableColumns } from 'vona-module-a-orm';
import { EntityRole } from '../entity/role.ts';
import { EntityRoleUser } from '../entity/roleUser.ts';
import { EntityUser } from '../entity/user.ts';

@Meta<IMetaOptionsIndex>({
  indexes: {
    ...$tableColumns(() => EntityUser, 'name'),
    ...$tableColumns(() => EntityRole, 'name'),
    ...$tableColumns(() => EntityRoleUser, ['userId', 'roleId']),
  },
})
export class MetaIndex extends BeanBase {}
