import type { TableIdentity } from 'table-identity';
import type { IDecoratorDtoOptions } from 'vona-module-a-web';

import { cel } from '@cabloy/utils';
import React from 'react';
import { text } from 'vona';
import { Event } from 'vona-module-a-actions';
import { $makeSchema, Api, v } from 'vona-module-a-openapiutils';
import { Dto } from 'vona-module-a-web';
import z from 'zod';
import { Action, Component, render } from 'zova-rest-cabloy-basic-admin';

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
        },
      }),
      render.layout({ label: 'Custom1' }),
      v.default('custom'),
      v.optional(),
      v.min(6),
      z.string(),
    ),
    _custom2: $makeSchema(
      render.fieldJsx(
        <div className="text-center">
          <div>{$locale('ChildOne')}</div>
          <div>{$locale('ChildTwo')}</div>
          <div>{$locale('TestApples_', 0)}</div>
          <div>{text`I have ${$locale('TestApples_', 1)}`}</div>
          <div>{text`cel://name+": ${$locale('TestApples_', 2)}"`}</div>
          <Component
            name="a-icon:icon"
            options={{
              name: '::home',
              width: 24,
            }}
            nativeOnClick={
              <Event>
                <Action name="basic-actionssync:log" options={{ message: 'sss' }}></Action>
              </Event>
            }
          ></Component>
        </div>,
      ),
      render.layout({
        label: 'Custom2',
        header: <div>{cel('name + ":containerHeader:" + value')}</div>,
        footer: <div>{cel('name + ":containerFooter:" + value')}</div>,
      }),
      v.default('custom'),
      v.optional(),
      v.min(6),
      z.string(),
    ),
    _custom5: $makeSchema(
      render.fieldJsx(
        <div>
          <var name="varTest" value={cel('getValue("name") + "!!"')}></var>
          <div>{cel('"var: " + varTest')}</div>
        </div>,
      ),
      render.layout({ label: 'Custom5' }),
      v.default('custom'),
      v.optional(),
      v.min(6),
      z.string(),
    ),
    _customCopy: $makeSchema(
      v.renderFieldJsx(
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <input
            className="input"
            value={cel('getValue("name")')}
            onInput={
              <Event>
                <Action name="basic-actions:setValue" options={{ name: 'name' }}></Action>
                <Action
                  name="basic-actions:setValue"
                  options={{ name: '_customCopied', value: false, disableNotifyChanged: true }}
                ></Action>
              </Event>
            }
          ></input>
          <Component
            v-if={cel('getValue("_customCopied")==false')}
            name="a-icon:icon"
            style={{ cursor: 'pointer' }}
            options={{
              name: ':outline:copy-outline',
            }}
            nativeOnClick={
              <Event>
                <Action
                  name="basic-actions:copy"
                  options={{ text: cel('getValue("name")') }}
                ></Action>
                <Action
                  name="basic-actions:setValue"
                  options={{ name: '_customCopied', value: true }}
                ></Action>
              </Event>
            }
          ></Component>
          <span v-if={cel('getValue("_customCopied")==true')}>Copied!</span>
        </div>,
      ),
      render.layout({ label: 'Custom Copy' }),
      v.optional(),
      v.min(6),
      z.string(),
    ),
    _customCopied: $makeSchema(render.visible(false), v.optional(), z.boolean()),
  },
})
export class DtoTestResult {
  @Api.field(v.tableIdentity())
  id: TableIdentity;

  @Api.field(
    v.title($locale('Name')),
    v.renderFieldJsx(<input className="text-center-2 text-center"></input>),
    render.layout({ label: cel('name+"!!"'), class: 'test-layout' }),
    v.default('tom'),
    v.min(3),
  )
  name: string;

  @Api.field()
  married: boolean;

  @Api.field(v.array(DtoTestDetail))
  details: DtoTestDetail[];
}
