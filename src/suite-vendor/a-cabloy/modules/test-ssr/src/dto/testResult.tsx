import type { TableIdentity } from 'table-identity';
import type { IDecoratorDtoOptions } from 'vona-module-a-web';

import { cel } from '@cabloy/utils';
import React from 'react';
import { text } from 'vona';
import { ActionExpr, ActionLog } from 'vona-module-a-actions';
import { $makeSchema, Api, v } from 'vona-module-a-openapiutils';
import { Dto } from 'vona-module-a-web';
import z from 'zod';
import { $iconName, AARestActionsCopy, AARestActionsSetValue, ZZIcon } from 'zova-rest-test-second';

import { $locale } from '../.metadata/locales.ts';
import { DtoTestDetail } from './testDetail.ts';

export interface IDtoOptionsTestResult extends IDecoratorDtoOptions<
  '_custom1' | '_custom2' | '_custom3' | '_custom4' | '_custom5' | '_customCopy' | '_customCopied'
> {}

@Dto<IDtoOptionsTestResult>({
  fields: {
    _custom1: $makeSchema(
      v.openapi({
        rest: {
          form: {
            // render: (
            //   <FFDemoBasicTest v-if={cel('getValue("name")!="kevin"')} name="_custom1" showLog={true} class="text-center">
            //     <div>{$locale('ChildOne')}</div>
            //     <div>{cel('name + ":" + value')}</div>
            //     <div v-for={['a', 'b', 'c']} key={cel('int(eachIndex)+1')}>{cel('each + eachIndex')}</div>
            //     <div v-slot="header" v-slot-scope="item">{cel('name + ":header:" + item.name')}</div>
            //     <div v-slot="footer" v-slot-scope="scope">{cel('name + ":footer:" + scope.name')}</div>
            //   </FFDemoBasicTest>
            // ),
          },
          label: 'Custom1',
        },
      }),
      v.default('custom'),
      v.optional(),
      v.min(6),
      z.string(),
    ),
    _custom2: $makeSchema(
      v.openapi({
        rest: {
          form: {
            render: (
              <div className="text-center">
                <div>{$locale('ChildOne')}</div>
                <div>{$locale('ChildTwo')}</div>
                <div>{$locale('TestApples_', 0)}</div>
                <div>{text`I have ${$locale('TestApples_', 1)}`}</div>
                <div>{text`cel://name+": ${$locale('TestApples_', 2)}"`}</div>
                <ZZIcon
                  name={$iconName('::home')}
                  nativeOnClick={
                    <action>
                      <ActionLog message="sss"></ActionLog>
                    </action>
                  }
                ></ZZIcon>
              </div>
            ),
          },
          label: 'Custom2',
          header: <div>{cel('name + ":containerHeader:" + value')}</div>,
          footer: <div>{cel('name + ":containerFooter:" + value')}</div>,
        },
      }),
      v.default('custom'),
      v.optional(),
      v.min(6),
      z.string(),
    ),
    _custom3: $makeSchema(
      v.openapi({
        rest: {
          render: cel('getValue("name")!="kevin"?"text":"password"'),
          label: 'Custom3',
        },
      }),
      v.default('custom'),
      v.optional(),
      v.min(6),
      z.string(),
    ),
    _custom4: $makeSchema(
      v.openapi({
        rest: {
          // render: 'text',
          label: 'Custom4',
          displayValue: cel('"!"+value'),
          onSetDisplayValue: (
            <action>
              <ActionLog message={cel('getEvent()')}></ActionLog>
              <ActionExpr expression={cel('getEvent().substring(1)')}></ActionExpr>
            </action>
          ),
        },
      }),
      v.default('custom'),
      v.optional(),
      v.min(6),
      z.string(),
    ),
    _custom5: $makeSchema(
      v.openapi({
        rest: {
          form: {
            render: (
              <div>
                <var name="varTest" value={cel('getValue("name") + "!!"')}></var>
                <div>{cel('"var: " + varTest')}</div>
              </div>
            ),
          },
          label: 'Custom5',
        },
      }),
      v.default('custom'),
      v.optional(),
      v.min(6),
      z.string(),
    ),
    _customCopy: $makeSchema(
      v.openapi({
        rest: {
          form: {
            render: (
              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <input
                  className="input"
                  value={cel('getValue("name")')}
                  onInput={
                    <action>
                      <AARestActionsSetValue name="name"></AARestActionsSetValue>
                      <AARestActionsSetValue name="_customCopied" value={false}></AARestActionsSetValue>
                    </action>
                  }
                ></input>
                <ZZIcon
                  v-if={cel('getValue("_customCopied")==false')}
                  style={{ cursor: 'pointer' }}
                  name={$iconName(':outline:copy-outline')}
                  nativeOnClick={
                    <action>
                      <AARestActionsCopy text={cel('getValue("name")')}></AARestActionsCopy>
                      <AARestActionsSetValue name="_customCopied" value={true}></AARestActionsSetValue>
                    </action>
                  }
                ></ZZIcon>
                <span v-if={cel('getValue("_customCopied")==true')}>Copied!</span>
              </div>
            ),
          },
          label: 'Custom Copy',
        },
      }),
      v.optional(),
      v.min(6),
      z.string(),
    ),
    _customCopied: $makeSchema(
      v.openapi({
        rest: {
          visible: false,
        },
      }),
      v.optional(),
      z.boolean(),
    ),
  },
})
export class DtoTestResult {
  @Api.field(v.tableIdentity())
  id: TableIdentity;

  @Api.field(
    v.openapi({
      title: $locale('Name'),
      rest: {
        form: {
          render: <input className="text-center"></input>,
        },
        label: cel('name+"!!"'),
        class: 'text-center-2',
        classContainer: 'test-layout',
      },
    }),
    v.default('tom'),
    v.min(3),
  )
  name: string;

  @Api.field()
  married: boolean;

  @Api.field(v.array(DtoTestDetail))
  details: DtoTestDetail[];
}
