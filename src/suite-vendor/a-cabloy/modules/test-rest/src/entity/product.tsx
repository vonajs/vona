import type { IDecoratorEntityOptions } from 'vona-module-a-orm';
// import { cel } from '@cabloy/utils';
// import React from 'react';
import { Api, v } from 'vona-module-a-openapiutils';
import { Entity, EntityBase } from 'vona-module-a-orm';
// import { ZZDemoBasicActionView } from 'zova-rest-cabloy-basic-admin';
import { $locale } from '../.metadata/locales.ts';

export interface IEntityOptionsProduct extends IDecoratorEntityOptions<'_custom'> {}

@Entity<IEntityOptionsProduct>('testRestProduct', {
  openapi: { title: $locale('ProductInfo') },
  fields: {
    _custom: {
      title: 'Custom',
      rest: {
        render: 'text',
      },
    },
  },
})
export class EntityProduct extends EntityBase {
  @Api.field(
    v.title($locale('Name')),
    v.order(1),
    // v.render(
    //   <ZZDemoBasicActionView>
    //     <div className="mock">{cel('displayValue')}</div>
    //     <div>{cel('get(permissions,"actions.create")')}</div>
    //   </ZZDemoBasicActionView>,
    //   'table',
    // ),
    // v.render(
    //   <a
    //     className="hover:text-blue-500"
    //     href="#"
    //     onClick={(
    //       <action prevent>
    //         <ActionView></ActionView>
    //         <ActionVar name="var1" value={cel('getValue("id")')}></ActionVar>
    //         <ActionLog message={cel('var1+":var1 hello world"')}></ActionLog>
    //         <ActionExpr expression={cel('displayValue+"!"')}></ActionExpr>
    //         <ActionLog message={cel('res[3]')}></ActionLog>
    //         <ActionLog message={cel('getEventProp("x")+":"+getEventProp("y")')}></ActionLog>
    //         <action res="resAction">
    //           <ActionVar name="var2" value={cel('getValue("id")')}></ActionVar>
    //           <ActionLog message={cel('var2+":var2 hello world"')}></ActionLog>
    //           <ActionExpr expression={cel('displayValue+"!"')}></ActionExpr>
    //           <ActionLog message={cel('res[6]')}></ActionLog>
    //           <ActionLog message={cel('res[6][2]')}></ActionLog>
    //           <ActionExpr expression={cel('res[6][2]')}></ActionExpr>
    //         </action>
    //         <ActionLog message={cel('res[6]')}></ActionLog>
    //         <ActionLog message={cel('resAction')}></ActionLog>
    //         <AAActionsLog message={cel('"log: "+resAction')}></AAActionsLog>
    //       </action>
    //     )}
    //   >
    //     {cel('displayValue')}
    //   </a>,
    //   'table',
    // ),
    v.render('actionView', 'table'),
    v.min(3, $locale('ZodErrorStringMin')),
    v.required(),
  )
  name: string;

  @Api.field(
    v.title($locale('Description')),
    v.order(2),
    v.optional(),
  )
  description?: string;

  @Api.field(
    v.title($locale('Price')),
    v.order(3),
    // v.render(<TTCurrency currency={{ exp: 4, fixed: 4 }}></TTCurrency>, 'table'),
    // v.currency({ exp: 3, fixed: 3 }),
    // v.render(
    //   <ZZDemoBasicTableCellTest showLog={true}>
    //     <div>{cel('displayValue')}</div>
    //     <div v-slot="header" v-slot-scope="item">{cel('name + ":header:" + item.name')}</div>
    //     <div v-slot="footer" v-slot-scope="scope">{cel('name + ":footer:" + scope.name')}</div>
    //   </ZZDemoBasicTableCellTest>,
    // ),
    v.currency(),
    v.min(0, $locale('ZodErrorNumberMin')),
    v.required(),
  )
  price: number;

  @Api.field(
    v.title($locale('Quantity')),
    v.order(4),
    v.default(0),
  )
  quantity: number;

  @Api.field(
    v.title($locale('Amount')),
    v.order(5),
    v.currency(),
    v.required(),
  )
  amount: number;
}
