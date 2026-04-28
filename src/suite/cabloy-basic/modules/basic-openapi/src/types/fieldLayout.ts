import type { TypeRenderComponentJsx } from 'vona-module-a-openapi';

import 'vona-module-a-openapi';
import type { IIconRecord } from 'zova-rest-cabloy-basic-admin';

declare module 'vona-module-a-openapi' {
  export interface ISchemaRenderComponentLayoutOptions {
    disable?: boolean;
    class?: any;
    label?: string | false;
    inline?: boolean;
    bordered?: boolean;
    floating?: boolean;
    iconPrefix?: keyof IIconRecord;
    iconSuffix?: keyof IIconRecord;
    header?: TypeRenderComponentJsx | string;
    footer?: TypeRenderComponentJsx | string;
  }
}
