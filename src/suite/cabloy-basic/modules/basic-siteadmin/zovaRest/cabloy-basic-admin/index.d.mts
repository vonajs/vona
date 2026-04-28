import { ControllerIconProps, IIconRecord, IIconRecord as IIconRecord$1 } from "zova-module-a-icon";
import { BeanRouter, BeanRouterGuardsBase, IPagePathRecord, IRouteViewRouteItem, ModelPageData, TypePagePathSchema } from "zova-module-a-router";
import * as _$zova_jsx0 from "zova-jsx";
import { TypeRenderComponentJsx, TypeRenderComponentJsxPropsPublic } from "zova-jsx";
import { z } from "zod";
import * as _$vue from "vue";
import { VNode } from "vue";
import { BeanApiBase, IApiActionOptions, IApiSchemaOptions } from "zova-module-a-api";
import { BeanAopBase, BeanBase, BeanContainer, BeanControllerBase, BeanControllerPageBase, BeanRenderBase, BeanScopeBase, BeanScopeUtil, BeanSimple, BeanStyleBase, DefineModelOptions, IComponentOptions, IModuleMain, IMonkeyAppClose, IMonkeyAppInitialize, IMonkeyBeanInit, ISlot, TypeControllerInnerProps, TypeEventOff, TypeLocaleBase, TypeModuleConfig, TypeModuleLocales, TypePropUpdateFromModel, TypePropValueFromModel, ZovaSys } from "zova";
import * as _$zova_module_a_openapi0 from "zova-module-a-openapi";
import { IJsxRenderContextBase, IResourceActionRowOptionsBase, ISchemaRenderComponentLayoutOptions, ITablePaged, ITableQuery, ITableResPaged } from "zova-module-a-openapi";
import { IJwtAdapter, IJwtInfo } from "zova-module-a-interceptor";
import { AopActionDispose, AopActionInit, AopActionRender, IDecoratorAopOptions } from "zova-module-a-bean";
import * as _$_tanstack_vue_query0 from "@tanstack/vue-query";
import { BeanModelBase, IDecoratorModelOptions } from "zova-module-a-model";
import { BeanPiniaStoreBase, PiniaStore } from "zova-module-a-pinia";
import * as _$vue_jsx_runtime0 from "vue/jsx-runtime";
import * as _$zova_module_a_table0 from "zova-module-a-table";
import { BeanControllerTableBase, ControllerTable, ControllerTableProps, IDecoratorTableCellOptions, IDecoratorTableCellPresetOptions, IJsxRenderContextTableCell, ITableCellRender, NextTableCellRender, TypeTableGetColumnsNext } from "zova-module-a-table";
import * as _$zova_module_a_form0 from "zova-module-a-form";
import { BeanControllerPageFormBase, ControllerForm, ControllerFormField, ControllerFormFieldBlankProps, ControllerFormFieldProps, ControllerFormFieldWrapperProps, ControllerFormProps, IFormFieldComponentOptions, IFormFieldPresetOptions, IFormFieldRenderContext, IFormMeta, IFormProvider, TypeFormOnSubmitData } from "zova-module-a-form";
import * as _$openapi3_ts_oas310 from "openapi3-ts/oas31";
import { SchemaObject } from "openapi3-ts/oas31";
import { BeanBehaviorBase, ControllerBehaviorProps, IDecoratorBehaviorOptions, NextBehavior } from "zova-module-a-behavior";
import * as _$_tanstack_query_core0 from "@tanstack/query-core";
import { ControllerFormFieldCurrencyProps, ITableCellOptionsCurrency } from "zova-module-a-currency";
import { ControllerFormFieldDateProps, ITableCellOptionsDate } from "zova-module-a-date";
import { ScopeModuleASsr } from "zova-module-a-ssr";
import { ControllerRouterViewTabsProps, ModelTabs, RouteTab } from "zova-module-a-routertabs";
import { ToolV } from "zova-module-a-zod";
import { ControllerPageEntry, ControllerPageResource, IPageEntryWrapperScope, IPageWrapperScope, ModelResource } from "zova-module-rest-resource";
import { celEnvBase } from "@cabloy/utils";
import { TypeActionOptionsRest } from "zova-module-a-action";
import { IActionOptionsAlert, IActionOptionsConfirm, IActionOptionsCopy, IActionOptionsCreate, IActionOptionsDelete, IActionOptionsEdit, IActionOptionsSetValue, IActionOptionsView } from "zova-module-rest-actions";
import { IActionOptionsLog } from "zova-module-a-actions";
import { ControllerRouterViewStackProps } from "zova-module-a-routerstack";
export * from "zova-module-rest-resource";

//#region \0rolldown/runtime.js
//#endregion
//#region src/suite/a-home/modules/home-api/src/api/openapi/types.d.ts
interface paths {
  '/api/auth/mock/authorize': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['AuthMock_authorize'];
    put?: never;
    post: operations['AuthMock_authorizePost'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/captcha/create': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['Captcha_create'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/captcha/refresh': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['Captcha_refresh'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/captcha/verifyImmediate': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['Captcha_verifyImmediate'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/mailconfirm/mail/emailConfirmCallback': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['MailconfirmMail_emailConfirmCallback'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/mailconfirm/mail/passwordResetCallback': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['MailconfirmMail_passwordResetCallback'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/home/base/menu/{publicPath?}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['HomeBaseMenu_retrieveMenus'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/home/base/permission/{resource}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['HomeBasePermission_retrievePermissions'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    }; /** @description Home */
    get: operations['Home_index'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/home/user/passport/current': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['HomeUserPassport_current'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/home/user/passport/logout': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['HomeUserPassport_logout'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/home/user/passport/register': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['HomeUserPassport_register'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/home/user/passport/login': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['HomeUserPassport_login'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/home/user/passport/login/{module}/{providerName}/{clientName?}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['HomeUserPassport_loginOauth'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/home/user/passport/associate/{module}/{providerName}/{clientName?}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['HomeUserPassport_associate'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/home/user/passport/migrate/{module}/{providerName}/{clientName?}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['HomeUserPassport_migrate'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/home/user/passport/refreshAuthToken': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['HomeUserPassport_refreshAuthToken'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/home/user/passport/createPassportJwtFromOauthCode': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['HomeUserPassport_createPassportJwtFromOauthCode'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/home/user/passport/createTempAuthToken': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['HomeUserPassport_createTempAuthToken'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/auth/passport/isAuthenticated': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestAuthPassport_isAuthenticated'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/auth/passport/current': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestAuthPassport_current'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/rest/product': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestRestProduct_select'];
    put?: never;
    post: operations['TestRestProduct_create'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/rest/product/{id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestRestProduct_view'];
    put?: never;
    post?: never;
    delete: operations['TestRestProduct_delete'];
    options?: never;
    head?: never;
    patch: operations['TestRestProduct_update'];
    trace?: never;
  };
  '/api/test/ssr/toolOne/test/{id?}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestSsrToolOne_testGet'];
    put?: never;
    post: operations['TestSsrToolOne_test'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/ssr/toolTwo/test/{id?}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestSsrToolTwo_test'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/captcha/signin': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['TestCaptcha_signin'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/paypal/getRecord/{recordId}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['Paypal_getRecord'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/paypal/captureOrder/{recordId}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['Paypal_captureOrder'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/paypal/cancelOrder/{recordId}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['Paypal_cancelOrder'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/play': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['Play_index'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/dtoTest/getUserLazy': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestVonaDtoTest_getUserLazy'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/dtoTest/getUserDynamic': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestVonaDtoTest_getPostDynamic'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/dtoTest/getUserStats': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestVonaDtoTest_getUserStats'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/dtoTest/getUserStatsGroup': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestVonaDtoTest_getUserStatsGroup'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/dtoTest/createUser': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['TestVonaDtoTest_createUser'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/dtoTest/updateUser/{id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch: operations['TestVonaDtoTest_updateUser'];
    trace?: never;
  };
  '/api/test/vona/dtoTest/getCategoryTree': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestVonaDtoTest_getCategoryTree'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/dtoTest/getCategoryTree2': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestVonaDtoTest_getCategoryTree2'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/guardPassport/testUserName': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestVonaGuardPassport_testUserName'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/guardPassport/testUserNameFail': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestVonaGuardPassport_testUserNameFail'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/guardPassport/testRoleName': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestVonaGuardPassport_testRoleName'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/guardPassport/testRoleNameFail': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestVonaGuardPassport_testRoleNameFail'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['Onion_index'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/echo': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['Onion_echo'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/onion/echo2/{userId}/{userName}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['Onion_echo2'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/onion/echo3/{userId}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['Onion_echo3'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/onion/echo4': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['Onion_echo4'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/onion/echo5': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['Onion_echo5'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/onion/echo6': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['Onion_echo6'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/order/create': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['TestVonaOrder_create'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/order/update/{id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['TestVonaOrder_update'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/order/findAll': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestVonaOrder_findAll'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/order/findMany': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestVonaOrder_findMany'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/post/group': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestVonaPost_group'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/post/aggregate': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestVonaPost_aggregate'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/post/findManyEcho': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestVonaPost_findManyEcho'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/post/findMany': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['TestVonaPost_findMany'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/serializer/echoSimple': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['TestVonaSerializer_echoSimple'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/serializer/echoArray': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['TestVonaSerializer_echoArray'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/serializer/echoLazy': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['TestVonaSerializer_echoLazy'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/upload/fields': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['TestVonaUpload_fields'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/upload/file': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['TestVonaUpload_file'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/test/vona/upload/files': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['TestVonaUpload_files'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
interface components {
  schemas: {
    'test-vona.dto.postCreate': {
      /** @description Title */title: string;
      userId: number | string;
      stars?: number | undefined;
    };
    'test-vona.dto.userCreate': {
      name: string;
      age?: number | undefined;
      scores?: number | undefined;
      posts?: {
        /** @description Title */title: string;
      }[] | undefined;
      roles?: {
        id: number | string;
        deleted?: boolean | undefined;
      }[] | undefined;
    };
    'test-vona.entity.product': {
      /**
       * Format: date-time
       * @description Created At
       */
      createdAt: Date;
      /**
       * Format: date-time
       * @description Updated At
       */
      updatedAt: Date;
      /**
       * @description Deleted
       * @default false
       */
      deleted?: boolean;
      /**
       * @description Instance ID
       * @default 0
       */
      iid?: number; /** @description ID */
      id: number | string; /** @description Name */
      name: string; /** @description Price */
      price: number; /** @description Quantity */
      quantity: number; /** @description Amount */
      amount: number;
      orderId: number | string;
    };
    'a-captcha.dto.captchaData': {
      id: string;
      provider: string;
      token?: unknown;
      payload?: unknown;
    };
    'a-menu.dto.menus': {
      menus?: components['schemas']['a-menu.dto.menuItem'][] | undefined;
      groups?: components['schemas']['a-menu.dto.menuGroup'][] | undefined;
    };
    'a-menu.dto.menuItem': {
      name: string;
      title?: string | undefined;
      description?: string | undefined;
      icon?: string | undefined;
      order?: number | undefined;
      group?: string | string[] | undefined;
      separator?: boolean | undefined;
      link?: string | undefined;
      external?: boolean | undefined;
      target?: string | undefined;
      meta?: components['schemas']['a-menu.dto.menuItemMeta'];
    };
    'a-menu.dto.menuItemMeta': {
      params?: unknown;
      query?: unknown;
    } | undefined;
    'a-menu.dto.menuGroup': {
      name: string;
      title?: string | undefined;
      description?: string | undefined;
      icon?: string | undefined;
      order?: number | undefined;
      group?: string | string[] | undefined;
      collapsed?: boolean | undefined;
    };
    'a-permission.dto.permissions': {
      roleIds?: (number | string)[] | undefined;
      roleNames?: string[] | undefined;
      actions?: unknown;
    };
    'home-user.dto.passport': {
      user: components['schemas']['home-user.entity.user'];
      auth: components['schemas']['a-auth.dto.auth'];
      roles: components['schemas']['home-user.entity.role'][];
    } | undefined; /** @description User */
    'home-user.entity.user': {
      /**
       * Format: date-time
       * @description Created At
       */
      createdAt: Date;
      /**
       * Format: date-time
       * @description Updated At
       */
      updatedAt: Date;
      /**
       * @description Deleted
       * @default false
       */
      deleted?: boolean;
      /**
       * @description Instance ID
       * @default 0
       */
      iid?: number; /** @description ID */
      id: number | string; /** @description User Name */
      name: string; /** @description Avatar */
      avatar?: string | undefined; /** @description Email */
      email?: string | undefined; /** @description Mobile */
      mobile?: string | undefined;
      /**
       * @description Activated
       * @default false
       */
      activated?: boolean; /** @description Language */
      locale?: string | undefined; /** @description Timezone */
      tz?: string | undefined;
    };
    'a-auth.dto.auth': {
      /** @description ID */id: number | string;
      profileId: string;
      authProvider?: {
        /** @description ID */id: number;
        providerName: string;
        clientName: string;
      };
    }; /** @description Role */
    'home-user.entity.role': {
      /**
       * Format: date-time
       * @description Created At
       */
      createdAt: Date;
      /**
       * Format: date-time
       * @description Updated At
       */
      updatedAt: Date;
      /**
       * @description Deleted
       * @default false
       */
      deleted?: boolean;
      /**
       * @description Instance ID
       * @default 0
       */
      iid?: number; /** @description ID */
      id: number | string; /** @description Role Name */
      name: string;
    };
    'home-user.dto.passportJwt': {
      passport: components['schemas']['home-user.dto.passport'];
      jwt: components['schemas']['a-jwt.dto.jwtToken'];
    };
    'a-jwt.dto.jwtToken': {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
    'home-user.dto.register': {
      username: string; /** Format: email */
      email: string;
      password: string;
      passwordConfirm: string;
      captcha: components['schemas']['a-captcha.dto.captchaVerify_c3cd80b1eeafe39bfe4433491bb081d68e84797e'];
    };
    'a-captcha.dto.captchaVerify_c3cd80b1eeafe39bfe4433491bb081d68e84797e': {
      id: string;
      token: string;
    };
    'home-user.dto.login': {
      username: string;
      password: string;
      captcha: components['schemas']['a-captcha.dto.captchaVerify_c3cd80b1eeafe39bfe4433491bb081d68e84797e_3218e7d152830e08f6e764b9e0c3796df929ee2b'];
    };
    'a-captcha.dto.captchaVerify_c3cd80b1eeafe39bfe4433491bb081d68e84797e_3218e7d152830e08f6e764b9e0c3796df929ee2b': {
      id: string;
      token: string;
    }; /** @description Create Product */
    'test-rest.dto.productCreate': {
      /** @description Name */name: string; /** @description Description */
      description?: string | undefined; /** @description Price */
      price: number;
      /**
       * @description Quantity
       * @default 0
       */
      quantity?: number; /** @description Amount */
      amount: number; /** @description Custom */
      _custom?: unknown; /** @description Test */
      _test?: unknown;
    };
    'test-rest.dto.productQueryRes': {
      list: {
        /**
         * Format: date-time
         * @description Created At
         */
        createdAt: Date;
        /**
         * Format: date-time
         * @description Updated At
         */
        updatedAt: Date;
        /**
         * @description Deleted
         * @default false
         */
        deleted?: boolean;
        /**
         * @description Instance ID
         * @default 0
         */
        iid?: number; /** @description ID */
        id: number | string; /** @description Name */
        name: string; /** @description Description */
        description?: string | undefined; /** @description Price */
        price: number;
        /**
         * @description Quantity
         * @default 0
         */
        quantity?: number; /** @description Amount */
        amount: number; /** @description Custom */
        _custom?: unknown;
      }[];
      total: string;
      pageCount: number;
      pageSize: number;
      pageNo: number;
    }; /** @description Product Info */
    'test-rest.entity.product': {
      /**
       * Format: date-time
       * @description Created At
       */
      createdAt: Date;
      /**
       * Format: date-time
       * @description Updated At
       */
      updatedAt: Date;
      /**
       * @description Deleted
       * @default false
       */
      deleted?: boolean;
      /**
       * @description Instance ID
       * @default 0
       */
      iid?: number; /** @description ID */
      id: number | string; /** @description Name */
      name: string; /** @description Description */
      description?: string | undefined; /** @description Price */
      price: number;
      /**
       * @description Quantity
       * @default 0
       */
      quantity?: number; /** @description Amount */
      amount: number; /** @description Custom */
      _custom?: unknown;
    } | undefined; /** @description Update Product */
    'test-rest.dto.productUpdate': {
      /** @description Name */name: string; /** @description Description */
      description?: string | undefined; /** @description Price */
      price: number;
      /**
       * @description Quantity
       * @default 0
       */
      quantity?: number; /** @description Amount */
      amount: number; /** @description Custom */
      _custom?: unknown;
    };
    'test-ssr.dto.testResult': {
      id: number | string;
      /**
       * @description Name
       * @default tom
       */
      name?: string;
      married: boolean;
      details: components['schemas']['test-ssr.dto.testDetail'][]; /** @default custom */
      _custom1?: string | undefined; /** @default custom */
      _custom2?: string | undefined; /** @default custom */
      _custom3?: string | undefined; /** @default custom */
      _custom4?: string | undefined; /** @default custom */
      _custom5?: string | undefined;
      _customCopy?: string | undefined;
      _customCopied?: boolean | undefined;
    };
    'test-ssr.dto.testDetail': {
      name: string;
      price: number;
      quantity: number;
      amount: number;
    };
    'test-ssr.dto.testBody': {
      id: number | string;
      /**
       * @description Name
       * @default tom
       */
      name?: string;
      married: boolean;
      details: components['schemas']['test-ssr.dto.testDetail'][]; /** @default custom */
      _custom1?: string | undefined; /** @default custom */
      _custom2?: string | undefined; /** @default custom */
      _custom3?: string | undefined; /** @default custom */
      _custom4?: string | undefined; /** @default custom */
      _custom5?: string | undefined;
      _customCopy?: string | undefined;
      _customCopied?: boolean | undefined;
    };
    'test-captcha.dto.signin': {
      username: string;
      password: string;
      captcha?: unknown;
    };
    'a-paypal.entity.paypalRecord': {
      /**
       * Format: date-time
       * @description Created At
       */
      createdAt: Date;
      /**
       * Format: date-time
       * @description Updated At
       */
      updatedAt: Date;
      /**
       * @description Deleted
       * @default false
       */
      deleted?: boolean;
      /**
       * @description Instance ID
       * @default 0
       */
      iid?: number; /** @description ID */
      id: number | string;
      userId: number | string; /** @default 0 */
      status?: number;
      prepayId: string;
      payload: components['schemas']['a-paypal.dto.paypalOrderRecordPayload'];
      options: components['schemas']['a-paypal.dto.paypalOrderRecordOptions'];
    };
    'a-paypal.dto.paypalOrderRecordPayload': {
      remark: string;
      total: string;
      currencyCode: string;
    };
    'a-paypal.dto.paypalOrderRecordOptions': {
      brandName: string;
      returnUrl: string;
      cancelUrl: string;
      returnTo: string;
      scene: string;
      orderId: number | string;
    };
    'a-play.dto.play': {
      args: string[];
      projectPath: string;
    };
    'test-vona.dto.userLazy': {
      name: string;
      user?: components['schemas']['test-vona.dto.userLazy'];
      roles?: components['schemas']['test-vona.dto.roleLazy'][] | undefined;
    };
    'test-vona.dto.roleLazy': {
      name: string;
      users?: components['schemas']['test-vona.dto.userLazy'][] | undefined;
    };
    'test-vona.entity.user_2c7d642ee581efa300341e343180fbb0ecdc785d_1816ff740d81c738ec055c7038bbd93beb9405a7': {
      /** @description ID */id: number | string;
      name: string;
    };
    'test-vona.entity.post_a6ba2076b5b70a3c098374cc82d418bd1ab226c3': {
      count_all?: string | undefined;
      count_title?: string | undefined;
      sum_stars?: string | undefined;
    };
    'test-vona.entity.post_729883d7de16ce4401b26f75bebe618c8948ff64': {
      /** @description Title */title: string;
      count_all?: string | undefined;
      count_title?: string | undefined;
      sum_stars?: string | undefined;
    };
    'test-vona.dto.userUpdate': {
      name: string;
      age?: number | undefined;
      scores?: number | undefined;
      posts?: {
        /**
         * @description Deleted
         * @default false
         */
        deleted?: boolean | undefined; /** @description ID */
        id?: number | string | undefined; /** @description Title */
        title: string;
      }[] | undefined;
    };
    'test-vona.entity.category_2c7d642ee581efa300341e343180fbb0ecdc785d': {
      /** @description ID */id: number | string;
      name: string;
      children: components['schemas']['test-vona.entity.category_2c7d642ee581efa300341e343180fbb0ecdc785d'][];
    };
    'test-vona.dto.categoryTree': {
      /** @description ID */id: number | string;
      name: string;
      children: components['schemas']['test-vona.entity.category_2c7d642ee581efa300341e343180fbb0ecdc785d'][];
    }; /** @description User */
    'test-vona.dto.user': {
      /** @description User ID */id: number | string;
      name: string;
      married: boolean;
    };
    'test-vona.dto.orderCreate': {
      /**
       * @description Order No
       * @default
       */
      orderNo?: string; /** @description Remark */
      remark?: string | undefined;
      products?: components['schemas']['test-vona.entity.product_29731960f3f38d3572bc2f8a01a7498bfe927055'][] | undefined;
    };
    'test-vona.entity.product_29731960f3f38d3572bc2f8a01a7498bfe927055': {
      /** @description Name */name: string; /** @description Price */
      price: number; /** @description Quantity */
      quantity: number; /** @description Amount */
      amount: number;
    };
    'test-vona.dto.orderUpdate': {
      /**
       * @description Order No
       * @default
       */
      orderNo?: string; /** @description Remark */
      remark?: string | undefined;
      products?: components['schemas']['test-vona.entity.product_9cf2c6bcd41713270c34bcfce21b7b4942e3fbc6'][] | undefined;
    };
    'test-vona.entity.product_9cf2c6bcd41713270c34bcfce21b7b4942e3fbc6': {
      /**
       * @description Deleted
       * @default false
       */
      deleted?: boolean | undefined; /** @description ID */
      id?: number | string | undefined; /** @description Name */
      name: string; /** @description Price */
      price: number; /** @description Quantity */
      quantity: number; /** @description Amount */
      amount: number;
    };
    'test-vona.dto.orderResult': {
      /**
       * Format: date-time
       * @description Created At
       */
      createdAt: Date;
      /**
       * Format: date-time
       * @description Updated At
       */
      updatedAt: Date;
      /**
       * @description Deleted
       * @default false
       */
      deleted?: boolean;
      /**
       * @description Instance ID
       * @default 0
       */
      iid?: number; /** @description ID */
      id: number | string;
      /**
       * @description Order No
       * @default
       */
      orderNo?: string; /** @description Remark */
      remark?: string | undefined;
      userId: number | string;
      user?: components['schemas']['test-vona.entity.user_2c7d642ee581efa300341e343180fbb0ecdc785d_1816ff740d81c738ec055c7038bbd93beb9405a7'];
      products: components['schemas']['test-vona.entity.product_bce173590aaef19772f1ae3a82196493c2633e2e'][];
    };
    'test-vona.entity.product_bce173590aaef19772f1ae3a82196493c2633e2e': {
      /** @description ID */id: number | string; /** @description Name */
      name: string; /** @description Price */
      price: number; /** @description Quantity */
      quantity: number; /** @description Amount */
      amount: number;
    };
    'test-vona.dto.orderResultPage': {
      list: {
        /**
         * Format: date-time
         * @description Created At
         */
        createdAt: Date;
        /**
         * Format: date-time
         * @description Updated At
         */
        updatedAt: Date;
        /**
         * @description Deleted
         * @default false
         */
        deleted?: boolean;
        /**
         * @description Instance ID
         * @default 0
         */
        iid?: number; /** @description ID */
        id: number | string;
        /**
         * @description Order No
         * @default
         */
        orderNo?: string; /** @description Remark */
        remark?: string | undefined;
        userId: number | string;
        user?: components['schemas']['test-vona.entity.user_2c7d642ee581efa300341e343180fbb0ecdc785d_1816ff740d81c738ec055c7038bbd93beb9405a7'];
        products: components['schemas']['test-vona.entity.product_bce173590aaef19772f1ae3a82196493c2633e2e'][];
      }[];
      total: string;
      pageCount: number;
      pageSize: number;
      pageNo: number;
    };
    'test-vona.dto.postGroup': {
      userId: number | string;
      count_all?: string | undefined;
      sum_stars?: string | undefined;
    };
    'test-vona.dto.postAggregate': {
      count_all?: string | undefined;
      count_stars?: string | undefined;
      sum_stars?: string | undefined;
      avg_stars?: string | undefined;
      min_stars?: string | undefined;
      max_stars?: string | undefined;
    };
    'test-vona.dto.postQueryRes': {
      list: {
        /**
         * Format: date-time
         * @description Created At
         */
        createdAt: Date;
        /**
         * Format: date-time
         * @description Updated At
         */
        updatedAt: Date;
        /**
         * @description Deleted
         * @default false
         */
        deleted?: boolean;
        /**
         * @description Instance ID
         * @default 0
         */
        iid?: number; /** @description ID */
        id: number | string; /** @description Title */
        title: string;
        userId: number | string;
        stars?: number | undefined;
        postContent?: {
          /** @description ID */id: number | string;
          content: string;
        };
        user?: components['schemas']['test-vona.entity.user_2c7d642ee581efa300341e343180fbb0ecdc785d_1816ff740d81c738ec055c7038bbd93beb9405a7'];
      }[];
      total: string;
      pageCount: number;
      pageSize: number;
      pageNo: number;
    };
    'test-vona.dto.serializerSimple': {
      password: string;
      password2: string;
      email?: unknown; /** Format: email */
      email2: string; /** Format: email */
      email3: string;
      email4?: unknown; /** Format: email */
      email5: string; /** Format: email */
      email6: string; /** Format: email */
      email7: string;
      firstName: string;
      lastName: string;
      fullName?: string | undefined;
      fullName2?: string | undefined;
      fullName3?: string | undefined;
      fullName4?: string | undefined;
    };
    'test-vona.dto.serializerArray': {
      /** @description Simple */simples: components['schemas']['test-vona.dto.serializerSimple'][]; /** @description Simple */
      simplesLazy: components['schemas']['test-vona.dto.serializerSimple'][];
    };
    'test-vona.dto.serializerLazy': {
      simple: components['schemas']['test-vona.dto.serializerSimple_1c4b95bcfe8fe28a56dbcc7028097cf11836b4fc'];
      simpleLazy?: components['schemas']['test-vona.dto.serializerSimple_542f7be0da9b85a67248a6a1a3629e72de5fdb33_cff0ae112a392da58caf5aa905749f3c4444c4ab'];
    };
    'test-vona.dto.serializerSimple_1c4b95bcfe8fe28a56dbcc7028097cf11836b4fc': {
      password: string;
      password2: string;
      email?: unknown; /** Format: email */
      email2: string; /** Format: email */
      email3: string;
      email4?: unknown; /** Format: email */
      email5: string; /** Format: email */
      email6: string; /** Format: email */
      email7: string;
      firstName: string;
      lastName: string;
      fullName?: string | undefined;
      fullName2?: string | undefined;
      fullName3?: string | undefined;
      fullName4?: string | undefined;
    };
    /**
     * title
     * @description description
     */
    'test-vona.dto.serializerSimple_542f7be0da9b85a67248a6a1a3629e72de5fdb33_cff0ae112a392da58caf5aa905749f3c4444c4ab': {
      password: string;
      password2: string;
      email?: unknown; /** Format: email */
      email2: string; /** Format: email */
      email3: string;
      email4?: unknown; /** Format: email */
      email5: string; /** Format: email */
      email6: string; /** Format: email */
      email7: string;
      firstName: string;
      lastName: string;
      fullName?: string | undefined;
      fullName2?: string | undefined;
      fullName3?: string | undefined;
      fullName4?: string | undefined;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
interface operations {
  AuthMock_authorize: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
  };
  AuthMock_authorizePost: {
    parameters: {
      query: {
        redirect_uri: string;
        state: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          username: string;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
  };
  Captcha_create: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          scene: string;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['a-captcha.dto.captchaData'];
          };
        };
      };
    };
  };
  Captcha_refresh: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          id: string;
          scene: string;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['a-captcha.dto.captchaData'];
          };
        };
      };
    };
  };
  Captcha_verifyImmediate: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          id: string;
          token?: unknown;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: string;
          };
        };
      };
    };
  };
  MailconfirmMail_emailConfirmCallback: {
    parameters: {
      query: {
        token: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
  };
  MailconfirmMail_passwordResetCallback: {
    parameters: {
      query: {
        token: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
  };
  HomeBaseMenu_retrieveMenus: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        publicPath: ((string | undefined) | undefined) | undefined;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['a-menu.dto.menus'];
          };
        };
      };
    };
  };
  HomeBasePermission_retrievePermissions: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        resource: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['a-permission.dto.permissions'];
          };
        };
      };
    };
    authToken: true;
  };
  Home_index: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
  };
  HomeUserPassport_current: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: components['schemas']['home-user.dto.passport'];
          };
        };
      };
    };
  };
  HomeUserPassport_logout: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
    authToken: true;
  };
  HomeUserPassport_register: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['home-user.dto.register'];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['home-user.dto.passportJwt'];
          };
        };
      };
    };
  };
  HomeUserPassport_login: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['home-user.dto.login'];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['home-user.dto.passportJwt'];
          };
        };
      };
    };
  };
  HomeUserPassport_loginOauth: {
    parameters: {
      query?: {
        redirect?: string | undefined;
      };
      header?: never;
      path: {
        module: string;
        providerName: string;
        clientName: ((string | undefined) | undefined) | undefined;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
  };
  HomeUserPassport_associate: {
    parameters: {
      query?: {
        redirect?: string | undefined;
      };
      header?: never;
      path: {
        module: string;
        providerName: string;
        clientName: ((string | undefined) | undefined) | undefined;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['home-user.dto.passportJwt'];
          };
        };
      };
    };
    authToken: true;
  };
  HomeUserPassport_migrate: {
    parameters: {
      query?: {
        redirect?: string | undefined;
      };
      header?: never;
      path: {
        module: string;
        providerName: string;
        clientName: ((string | undefined) | undefined) | undefined;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['home-user.dto.passportJwt'];
          };
        };
      };
    };
    authToken: true;
  };
  HomeUserPassport_refreshAuthToken: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          refreshToken: string;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['a-jwt.dto.jwtToken'];
          };
        };
      };
    };
  };
  HomeUserPassport_createPassportJwtFromOauthCode: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          code: string;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['home-user.dto.passportJwt'];
          };
        };
      };
    };
  };
  HomeUserPassport_createTempAuthToken: {
    parameters: {
      query?: {
        path?: string | undefined;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: string;
          };
        };
      };
    };
    authToken: true;
  };
  TestAuthPassport_isAuthenticated: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: boolean;
          };
        };
      };
    };
    authToken: true;
  };
  TestAuthPassport_current: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
    authToken: true;
  };
  TestRestProduct_select: {
    parameters: {
      query?: {
        columns?: string[] | undefined;
        where?: {
          [key: string]: unknown;
        } | undefined;
        orders?: string | string[][] | undefined;
        pageNo?: number;
        pageSize?: number;
        createdAt?: string | undefined;
        name?: string | undefined;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['test-rest.dto.productQueryRes'];
          };
        };
      };
    };
    authToken: true;
  };
  TestRestProduct_create: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['test-rest.dto.productCreate'];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: number | string;
          };
        };
      };
    };
    authToken: true;
  };
  TestRestProduct_view: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: number | string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: components['schemas']['test-rest.entity.product'];
          };
        };
      };
    };
    authToken: true;
  };
  TestRestProduct_delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: number | string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
    authToken: true;
  };
  TestRestProduct_update: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: number | string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['test-rest.dto.productUpdate'];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
    authToken: true;
  };
  TestSsrToolOne_testGet: {
    parameters: {
      query: {
        name: string;
      };
      header?: never;
      path: {
        id: ((number | undefined) | (string | undefined) | (undefined | undefined)) | undefined;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
    authToken: true;
  };
  TestSsrToolOne_test: {
    parameters: {
      query: {
        name: string;
      };
      header?: never;
      path: {
        id: ((number | undefined) | (string | undefined) | (undefined | undefined)) | undefined;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['test-ssr.dto.testBody'];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['test-ssr.dto.testResult'];
          };
        };
      };
    };
    authToken: true;
  };
  TestSsrToolTwo_test: {
    parameters: {
      query: {
        name: string;
      };
      header?: never;
      path: {
        id: ((number | undefined) | (string | undefined) | (undefined | undefined)) | undefined;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['test-ssr.dto.testResult'];
          };
        };
      };
    };
  };
  TestCaptcha_signin: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['test-captcha.dto.signin'];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
  };
  Paypal_getRecord: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        recordId: number | string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['a-paypal.entity.paypalRecord'];
          };
        };
      };
    };
    authToken: true;
  };
  Paypal_captureOrder: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        recordId: number | string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
    authToken: true;
  };
  Paypal_cancelOrder: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        recordId: number | string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
    authToken: true;
  };
  Play_index: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['a-play.dto.play'];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
    authToken: true;
  };
  TestVonaDtoTest_getUserLazy: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['test-vona.dto.userLazy'];
          };
        };
      };
    };
    authToken: true;
  };
  TestVonaDtoTest_getPostDynamic: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: {
              /**
               * Created At
               * Format: date-time
               */
              createdAt: Date;
              /**
               * Updated At
               * Format: date-time
               */
              updatedAt: Date;
              /**
               * Deleted
               * @default false
               */
              deleted?: boolean;
              /**
               * Instance ID
               * @default 0
               */
              iid?: number; /** ID */
              id: number | string; /** Title */
              title: string;
              userId: number | string;
              stars?: number | undefined;
              user?: components['schemas']['test-vona.entity.user_2c7d642ee581efa300341e343180fbb0ecdc785d_1816ff740d81c738ec055c7038bbd93beb9405a7'];
            };
          };
        };
      };
    };
    authToken: true;
  };
  TestVonaDtoTest_getUserStats: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: {
              /**
               * Created At
               * Format: date-time
               */
              createdAt: Date;
              /**
               * Updated At
               * Format: date-time
               */
              updatedAt: Date;
              /**
               * Deleted
               * @default false
               */
              deleted?: boolean;
              /**
               * Instance ID
               * @default 0
               */
              iid?: number; /** ID */
              id: number | string;
              name: string;
              age?: number | undefined;
              scores?: number | undefined;
              posts?: components['schemas']['test-vona.entity.post_a6ba2076b5b70a3c098374cc82d418bd1ab226c3'];
            };
          };
        };
      };
    };
    authToken: true;
  };
  TestVonaDtoTest_getUserStatsGroup: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: {
              /**
               * Created At
               * Format: date-time
               */
              createdAt: Date;
              /**
               * Updated At
               * Format: date-time
               */
              updatedAt: Date;
              /**
               * Deleted
               * @default false
               */
              deleted?: boolean;
              /**
               * Instance ID
               * @default 0
               */
              iid?: number; /** ID */
              id: number | string;
              name: string;
              age?: number | undefined;
              scores?: number | undefined;
              posts: components['schemas']['test-vona.entity.post_729883d7de16ce4401b26f75bebe618c8948ff64'][];
            };
          };
        };
      };
    };
    authToken: true;
  };
  TestVonaDtoTest_createUser: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['test-vona.dto.userCreate'];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
    authToken: true;
  };
  TestVonaDtoTest_updateUser: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: unknown;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['test-vona.dto.userUpdate'];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
    authToken: true;
  };
  TestVonaDtoTest_getCategoryTree: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: {
              /** ID */id: number | string;
              name: string;
              children: components['schemas']['test-vona.entity.category_2c7d642ee581efa300341e343180fbb0ecdc785d'][];
            }[];
          };
        };
      };
    };
    authToken: true;
  };
  TestVonaDtoTest_getCategoryTree2: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['test-vona.dto.categoryTree'][];
          };
        };
      };
    };
    authToken: true;
  };
  TestVonaGuardPassport_testUserName: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
    authToken: true;
  };
  TestVonaGuardPassport_testUserNameFail: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
    authToken: true;
  };
  TestVonaGuardPassport_testRoleName: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
    authToken: true;
  };
  TestVonaGuardPassport_testRoleNameFail: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
    authToken: true;
  };
  Onion_index: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
  };
  Onion_echo: {
    parameters: {
      query?: {
        id?: number;
        name?: number | undefined;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          /** @description User ID */id: number;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: string | undefined;
          };
        };
      };
    };
  };
  Onion_echo2: {
    parameters: {
      query: {
        id: number | string;
        name: string;
        married: boolean;
      };
      header?: never;
      path: {
        userId: number;
        userName: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          /** @description User ID */id: number;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['test-vona.dto.user'];
          };
        };
      };
    };
  };
  Onion_echo3: {
    parameters: {
      query?: {
        id?: number | undefined;
      };
      header: {
        Accept: string;
      };
      path: {
        userId: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
  };
  Onion_echo4: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['test-vona.dto.user'][] | undefined;
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['test-vona.dto.user'][];
          };
        };
      };
    };
  };
  Onion_echo5: {
    parameters: {
      query?: {
        ids?: number[];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
  };
  Onion_echo6: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
    authToken: true;
  };
  TestVonaOrder_create: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['test-vona.dto.orderCreate'];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: number | string;
          };
        };
      };
    };
    authToken: true;
  };
  TestVonaOrder_update: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: unknown;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['test-vona.dto.orderUpdate'];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
    authToken: true;
  };
  TestVonaOrder_findAll: {
    parameters: {
      query?: {
        columns?: string[] | undefined;
        where?: {
          [key: string]: unknown;
        } | undefined;
        orders?: string | string[][] | undefined;
        orderNo?: string | undefined;
        remark?: string | undefined;
        userName?: string | undefined;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['test-vona.dto.orderResult'][];
          };
        };
      };
    };
    authToken: true;
  };
  TestVonaOrder_findMany: {
    parameters: {
      query?: {
        columns?: string[] | undefined;
        where?: {
          [key: string]: unknown;
        } | undefined;
        orders?: string | string[][] | undefined;
        pageNo?: number;
        orderNo?: string | undefined;
        remark?: string | undefined;
        pageSize?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['test-vona.dto.orderResultPage'];
          };
        };
      };
    };
    authToken: true;
  };
  TestVonaPost_group: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['test-vona.dto.postGroup'][];
          };
        };
      };
    };
    authToken: true;
  };
  TestVonaPost_aggregate: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['test-vona.dto.postAggregate'];
          };
        };
      };
    };
    authToken: true;
  };
  TestVonaPost_findManyEcho: {
    parameters: {
      query?: {
        columns?: string[] | undefined;
        where?: {
          [key: string]: unknown;
        } | undefined;
        orders?: string | string[][] | undefined;
        pageNo?: number;
        pageSize?: number;
        createdAt?: string | undefined;
        title?: string | undefined;
        userName?: string | undefined;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['test-vona.dto.postQueryRes'];
          };
        };
      };
    };
  };
  TestVonaPost_findMany: {
    parameters: {
      query?: {
        columns?: string[] | undefined;
        where?: {
          [key: string]: unknown;
        } | undefined;
        orders?: string | string[][] | undefined;
        pageNo?: number;
        pageSize?: number;
        createdAt?: string | undefined;
        title?: string | undefined;
        userName?: string | undefined;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['test-vona.dto.postQueryRes'];
          };
        };
      };
    };
  };
  TestVonaSerializer_echoSimple: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['test-vona.dto.serializerSimple'];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['test-vona.dto.serializerSimple'];
          };
        };
      };
    };
  };
  TestVonaSerializer_echoArray: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['test-vona.dto.serializerArray'][];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['test-vona.dto.serializerArray'][];
          };
        };
      };
    };
  };
  TestVonaSerializer_echoLazy: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['test-vona.dto.serializerLazy'];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data: components['schemas']['test-vona.dto.serializerLazy'];
          };
        };
      };
    };
  };
  TestVonaUpload_fields: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'multipart/form-data': {
          checkes: string[];
          /**
           * your name
           * @default zhennann
           */
          name?: string;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
  };
  TestVonaUpload_file: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'multipart/form-data': {
          /** @default zhennann */name?: string; /** Format: binary */
          welcome: Blob;
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
  };
  TestVonaUpload_files: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'multipart/form-data': {
          /** images */images: Blob[];
          /**
           * single file
           * Format: binary
           */
          welcome1: Blob; /** Format: binary */
          welcome2: Blob; /** more files */
          blobs: Blob[];
        };
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            code: string;
            message: string;
            data?: unknown;
          };
        };
      };
    };
  };
}
//#endregion
//#region src/suite/a-home/modules/home-api/src/api/openapi/schemas.d.ts
type ApiSchemaAMenuDtoMenuItem = components['schemas']['a-menu.dto.menuItem'];
type ApiSchemaAMenuDtoMenuGroup = components['schemas']['a-menu.dto.menuGroup'];
type ApiSchemaTestSsrDtoTestResult = components['schemas']['test-ssr.dto.testResult'];
type ApiSchemaTestSsrDtoTestBody = components['schemas']['test-ssr.dto.testBody'];
type ApiSchemaTestSsrDtoTestBodyPartial = Partial<ApiSchemaTestSsrDtoTestBody>;
//#endregion
//#region src/suite/a-home/modules/home-api/src/api/captcha.d.ts
type ApiApiCaptchacreateRequestBody = {
  scene: string;
};
type ApiApiCaptcharefreshRequestBody = {
  id: string;
  scene: string;
};
type ApiApiCaptchaverifyImmediateRequestBody = {
  id: string;
  token?: unknown;
};
declare class ApiCaptcha extends BeanApiBase {
  create(body: ApiApiCaptchacreateRequestBody, options?: IApiActionOptions): Promise<{
    id: string;
    provider: string;
    token?: unknown;
    payload?: unknown;
  }>;
  refresh(body: ApiApiCaptcharefreshRequestBody, options?: IApiActionOptions): Promise<{
    id: string;
    provider: string;
    token?: unknown;
    payload?: unknown;
  }>;
  verifyImmediate(body: ApiApiCaptchaverifyImmediateRequestBody, options?: IApiActionOptions): Promise<string>;
}
//#endregion
//#region src/suite/a-home/modules/home-api/src/api/home.d.ts
declare class ApiHome extends BeanApiBase {
  /** @description Home */
  index(options?: IApiActionOptions): Promise<unknown>;
}
//#endregion
//#region src/suite/a-home/modules/home-api/src/api/homeBaseMenu.d.ts
/** HomeBaseMenu_retrieveMenus */
declare const ApiApiHomeBaseMenuretrieveMenusPath = "/api/home/base/menu/{publicPath?}";
type ApiApiHomeBaseMenuretrieveMenusPath = '/api/home/base/menu/{publicPath?}';
type ApiApiHomeBaseMenuretrieveMenusMethod = 'get';
type ApiApiHomeBaseMenuretrieveMenusRequestParams = paths[ApiApiHomeBaseMenuretrieveMenusPath][ApiApiHomeBaseMenuretrieveMenusMethod]['parameters']['path'];
declare class ApiHomeBaseMenu extends BeanApiBase {
  retrieveMenus(options: {
    params: ApiApiHomeBaseMenuretrieveMenusRequestParams;
  } & IApiActionOptions): Promise<{
    menus?: components['schemas']['a-menu.dto.menuItem'][] | undefined;
    groups?: components['schemas']['a-menu.dto.menuGroup'][] | undefined;
  }>;
}
//#endregion
//#region src/suite/a-home/modules/home-api/src/api/homeBasePermission.d.ts
/** HomeBasePermission_retrievePermissions */
declare const ApiApiHomeBasePermissionretrievePermissionsPath = "/api/home/base/permission/{resource}";
type ApiApiHomeBasePermissionretrievePermissionsPath = '/api/home/base/permission/{resource}';
type ApiApiHomeBasePermissionretrievePermissionsMethod = 'get';
type ApiApiHomeBasePermissionretrievePermissionsRequestParams = paths[ApiApiHomeBasePermissionretrievePermissionsPath][ApiApiHomeBasePermissionretrievePermissionsMethod]['parameters']['path'];
declare class ApiHomeBasePermission extends BeanApiBase {
  retrievePermissions(options: {
    params: ApiApiHomeBasePermissionretrievePermissionsRequestParams;
  } & IApiActionOptions): Promise<{
    roleIds?: (number | string)[] | undefined;
    roleNames?: string[] | undefined;
    actions?: unknown;
  }>;
}
//#endregion
//#region src/suite/a-home/modules/home-api/src/api/homeUserPassport.d.ts
type ApiApiHomeUserPassportregisterRequestBody = components['schemas']['home-user.dto.register'];
type ApiApiHomeUserPassportloginRequestBody = components['schemas']['home-user.dto.login'];
/** HomeUserPassport_loginOauth */
declare const ApiApiHomeUserPassportloginOauthPath = "/api/home/user/passport/login/{module}/{providerName}/{clientName?}";
type ApiApiHomeUserPassportloginOauthPath = '/api/home/user/passport/login/{module}/{providerName}/{clientName?}';
type ApiApiHomeUserPassportloginOauthMethod = 'get';
type ApiApiHomeUserPassportloginOauthRequestParams = paths[ApiApiHomeUserPassportloginOauthPath][ApiApiHomeUserPassportloginOauthMethod]['parameters']['path'];
type ApiApiHomeUserPassportloginOauthRequestQuery = paths[ApiApiHomeUserPassportloginOauthPath][ApiApiHomeUserPassportloginOauthMethod]['parameters']['query'];
/** HomeUserPassport_associate */
declare const ApiApiHomeUserPassportassociatePath = "/api/home/user/passport/associate/{module}/{providerName}/{clientName?}";
type ApiApiHomeUserPassportassociatePath = '/api/home/user/passport/associate/{module}/{providerName}/{clientName?}';
type ApiApiHomeUserPassportassociateMethod = 'get';
type ApiApiHomeUserPassportassociateRequestParams = paths[ApiApiHomeUserPassportassociatePath][ApiApiHomeUserPassportassociateMethod]['parameters']['path'];
type ApiApiHomeUserPassportassociateRequestQuery = paths[ApiApiHomeUserPassportassociatePath][ApiApiHomeUserPassportassociateMethod]['parameters']['query'];
/** HomeUserPassport_migrate */
declare const ApiApiHomeUserPassportmigratePath = "/api/home/user/passport/migrate/{module}/{providerName}/{clientName?}";
type ApiApiHomeUserPassportmigratePath = '/api/home/user/passport/migrate/{module}/{providerName}/{clientName?}';
type ApiApiHomeUserPassportmigrateMethod = 'get';
type ApiApiHomeUserPassportmigrateRequestParams = paths[ApiApiHomeUserPassportmigratePath][ApiApiHomeUserPassportmigrateMethod]['parameters']['path'];
type ApiApiHomeUserPassportmigrateRequestQuery = paths[ApiApiHomeUserPassportmigratePath][ApiApiHomeUserPassportmigrateMethod]['parameters']['query'];
type ApiApiHomeUserPassportrefreshAuthTokenRequestBody = {
  refreshToken: string;
};
type ApiApiHomeUserPassportcreatePassportJwtFromOauthCodeRequestBody = {
  code: string;
};
/** HomeUserPassport_createTempAuthToken */
declare const ApiApiHomeUserPassportcreateTempAuthTokenPath = "/api/home/user/passport/createTempAuthToken";
type ApiApiHomeUserPassportcreateTempAuthTokenPath = '/api/home/user/passport/createTempAuthToken';
type ApiApiHomeUserPassportcreateTempAuthTokenMethod = 'post';
type ApiApiHomeUserPassportcreateTempAuthTokenRequestQuery = paths[ApiApiHomeUserPassportcreateTempAuthTokenPath][ApiApiHomeUserPassportcreateTempAuthTokenMethod]['parameters']['query'];
declare class ApiHomeUserPassport extends BeanApiBase {
  current(options?: IApiActionOptions): Promise<{
    user: components['schemas']['home-user.entity.user'];
    auth: components['schemas']['a-auth.dto.auth'];
    roles: components['schemas']['home-user.entity.role'][];
  } | undefined>;
  logout(body?: undefined, options?: IApiActionOptions): Promise<unknown>;
  register(body: ApiApiHomeUserPassportregisterRequestBody, options?: IApiActionOptions): Promise<{
    passport: components['schemas']['home-user.dto.passport'];
    jwt: components['schemas']['a-jwt.dto.jwtToken'];
  }>;
  login(body: ApiApiHomeUserPassportloginRequestBody, options?: IApiActionOptions): Promise<{
    passport: components['schemas']['home-user.dto.passport'];
    jwt: components['schemas']['a-jwt.dto.jwtToken'];
  }>;
  loginOauth(options: {
    params: ApiApiHomeUserPassportloginOauthRequestParams;
    query?: ApiApiHomeUserPassportloginOauthRequestQuery;
  } & IApiActionOptions): Promise<unknown>;
  associate(options: {
    params: ApiApiHomeUserPassportassociateRequestParams;
    query?: ApiApiHomeUserPassportassociateRequestQuery;
  } & IApiActionOptions): Promise<{
    passport: components['schemas']['home-user.dto.passport'];
    jwt: components['schemas']['a-jwt.dto.jwtToken'];
  }>;
  migrate(options: {
    params: ApiApiHomeUserPassportmigrateRequestParams;
    query?: ApiApiHomeUserPassportmigrateRequestQuery;
  } & IApiActionOptions): Promise<{
    passport: components['schemas']['home-user.dto.passport'];
    jwt: components['schemas']['a-jwt.dto.jwtToken'];
  }>;
  refreshAuthToken(body: ApiApiHomeUserPassportrefreshAuthTokenRequestBody, options?: IApiActionOptions): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }>;
  createPassportJwtFromOauthCode(body: ApiApiHomeUserPassportcreatePassportJwtFromOauthCodeRequestBody, options?: IApiActionOptions): Promise<{
    passport: components['schemas']['home-user.dto.passport'];
    jwt: components['schemas']['a-jwt.dto.jwtToken'];
  }>;
  createTempAuthToken(body?: undefined, options?: {
    query?: ApiApiHomeUserPassportcreateTempAuthTokenRequestQuery;
  } & IApiActionOptions): Promise<string>;
}
//#endregion
//#region src/suite/a-home/modules/home-api/src/api/testSsrToolOne.d.ts
/** TestSsrToolOne_testGet */
declare const ApiApiTestSsrToolOnetestGetPath = "/api/test/ssr/toolOne/test/{id?}";
type ApiApiTestSsrToolOnetestGetPath = '/api/test/ssr/toolOne/test/{id?}';
type ApiApiTestSsrToolOnetestGetMethod = 'get';
type ApiApiTestSsrToolOnetestGetRequestParams = paths[ApiApiTestSsrToolOnetestGetPath][ApiApiTestSsrToolOnetestGetMethod]['parameters']['path'];
type ApiApiTestSsrToolOnetestGetRequestQuery = paths[ApiApiTestSsrToolOnetestGetPath][ApiApiTestSsrToolOnetestGetMethod]['parameters']['query'];
/** TestSsrToolOne_test */
declare const ApiApiTestSsrToolOnetestPath = "/api/test/ssr/toolOne/test/{id?}";
type ApiApiTestSsrToolOnetestPath = '/api/test/ssr/toolOne/test/{id?}';
type ApiApiTestSsrToolOnetestMethod = 'post';
type ApiApiTestSsrToolOnetestRequestParams = paths[ApiApiTestSsrToolOnetestPath][ApiApiTestSsrToolOnetestMethod]['parameters']['path'];
type ApiApiTestSsrToolOnetestRequestQuery = paths[ApiApiTestSsrToolOnetestPath][ApiApiTestSsrToolOnetestMethod]['parameters']['query'];
type ApiApiTestSsrToolOnetestRequestBody = components['schemas']['test-ssr.dto.testBody'];
declare class ApiTestSsrToolOne extends BeanApiBase {
  testGet(options: {
    params: ApiApiTestSsrToolOnetestGetRequestParams;
    query: ApiApiTestSsrToolOnetestGetRequestQuery;
  } & IApiActionOptions): Promise<unknown>;
  test(body: ApiApiTestSsrToolOnetestRequestBody, options: {
    params: ApiApiTestSsrToolOnetestRequestParams;
    query: ApiApiTestSsrToolOnetestRequestQuery;
  } & IApiActionOptions): Promise<{
    id: number | string;
    name?: string;
    married: boolean;
    details: components['schemas']['test-ssr.dto.testDetail'][];
    _custom1?: string | undefined;
    _custom2?: string | undefined;
    _custom3?: string | undefined;
    _custom4?: string | undefined;
    _custom5?: string | undefined;
    _customCopy?: string | undefined;
    _customCopied?: boolean | undefined;
  }>;
}
//#endregion
//#region src/suite/a-home/modules/home-api/src/apiSchema/captcha.d.ts
declare class ApiSchemaCaptcha extends BeanBase {
  create(options?: IApiSchemaOptions): _$zova_module_a_openapi0.IOpenapiSchemas;
  refresh(options?: IApiSchemaOptions): _$zova_module_a_openapi0.IOpenapiSchemas;
  verifyImmediate(options?: IApiSchemaOptions): _$zova_module_a_openapi0.IOpenapiSchemas;
}
//#endregion
//#region src/suite/a-home/modules/home-api/src/apiSchema/home.d.ts
declare class ApiSchemaHome extends BeanBase {
  index(options?: IApiSchemaOptions): _$zova_module_a_openapi0.IOpenapiSchemas;
}
//#endregion
//#region src/suite/a-home/modules/home-api/src/apiSchema/homeBaseMenu.d.ts
declare class ApiSchemaHomeBaseMenu extends BeanBase {
  retrieveMenus(options?: IApiSchemaOptions): _$zova_module_a_openapi0.IOpenapiSchemas;
}
//#endregion
//#region src/suite/a-home/modules/home-api/src/apiSchema/homeBasePermission.d.ts
declare class ApiSchemaHomeBasePermission extends BeanBase {
  retrievePermissions(options?: IApiSchemaOptions): _$zova_module_a_openapi0.IOpenapiSchemas;
}
//#endregion
//#region src/suite/a-home/modules/home-api/src/apiSchema/homeUserPassport.d.ts
declare class ApiSchemaHomeUserPassport extends BeanBase {
  current(options?: IApiSchemaOptions): _$zova_module_a_openapi0.IOpenapiSchemas;
  logout(options?: IApiSchemaOptions): _$zova_module_a_openapi0.IOpenapiSchemas;
  register(options?: IApiSchemaOptions): _$zova_module_a_openapi0.IOpenapiSchemas;
  login(options?: IApiSchemaOptions): _$zova_module_a_openapi0.IOpenapiSchemas;
  loginOauth(options?: IApiSchemaOptions): _$zova_module_a_openapi0.IOpenapiSchemas;
  associate(options?: IApiSchemaOptions): _$zova_module_a_openapi0.IOpenapiSchemas;
  migrate(options?: IApiSchemaOptions): _$zova_module_a_openapi0.IOpenapiSchemas;
  refreshAuthToken(options?: IApiSchemaOptions): _$zova_module_a_openapi0.IOpenapiSchemas;
  createPassportJwtFromOauthCode(options?: IApiSchemaOptions): _$zova_module_a_openapi0.IOpenapiSchemas;
  createTempAuthToken(options?: IApiSchemaOptions): _$zova_module_a_openapi0.IOpenapiSchemas;
}
//#endregion
//#region src/suite/a-home/modules/home-api/src/apiSchema/testSsrToolOne.d.ts
declare class ApiSchemaTestSsrToolOne extends BeanBase {
  testGet(options?: IApiSchemaOptions): _$zova_module_a_openapi0.IOpenapiSchemas;
  test(options?: IApiSchemaOptions): _$zova_module_a_openapi0.IOpenapiSchemas;
}
//#endregion
//#region src/suite/a-home/modules/home-api/src/service/jwtAdapter.d.ts
declare class ServiceJwtAdapter extends BeanBase implements IJwtAdapter {
  protected __init__(): Promise<void>;
  getJwtInfo(): Promise<IJwtInfo | undefined>;
  refreshAuthToken(refreshToken: string): Promise<IJwtInfo>;
}
//#endregion
//#region src/suite/a-home/modules/home-api/src/.metadata/index.d.ts
declare module 'zova' {}
declare module 'zova-module-home-api' {
  interface ApiCaptcha {}
  interface ApiCaptcha {
    get $beanFullName(): 'home-api.api.captcha';
    get $onionName(): 'home-api:captcha';
  }
  interface ApiHome {}
  interface ApiHome {
    get $beanFullName(): 'home-api.api.home';
    get $onionName(): 'home-api:home';
  }
  interface ApiHomeBaseMenu {}
  interface ApiHomeBaseMenu {
    get $beanFullName(): 'home-api.api.homeBaseMenu';
    get $onionName(): 'home-api:homeBaseMenu';
  }
  interface ApiHomeBasePermission {}
  interface ApiHomeBasePermission {
    get $beanFullName(): 'home-api.api.homeBasePermission';
    get $onionName(): 'home-api:homeBasePermission';
  }
  interface ApiHomeUserPassport {}
  interface ApiHomeUserPassport {
    get $beanFullName(): 'home-api.api.homeUserPassport';
    get $onionName(): 'home-api:homeUserPassport';
  }
  interface ApiTestSsrToolOne {}
  interface ApiTestSsrToolOne {
    get $beanFullName(): 'home-api.api.testSsrToolOne';
    get $onionName(): 'home-api:testSsrToolOne';
  }
}
/** api: end */
/** api: begin */
interface IModuleApi$1 {
  'captcha': ApiCaptcha;
  'home': ApiHome;
  'homeBaseMenu': ApiHomeBaseMenu;
  'homeBasePermission': ApiHomeBasePermission;
  'homeUserPassport': ApiHomeUserPassport;
  'testSsrToolOne': ApiTestSsrToolOne;
}
declare module 'zova' {
  interface IBeanRecordGeneral {
    'home-api.api.captcha': ApiCaptcha;
    'home-api.api.home': ApiHome;
    'home-api.api.homeBaseMenu': ApiHomeBaseMenu;
    'home-api.api.homeBasePermission': ApiHomeBasePermission;
    'home-api.api.homeUserPassport': ApiHomeUserPassport;
    'home-api.api.testSsrToolOne': ApiTestSsrToolOne;
  }
}
/** api: end */
/** openapi: begin */
declare module 'zova' {}
declare module 'zova-module-home-api' {
  interface ApiSchemaCaptcha {}
  interface ApiSchemaCaptcha {
    get $beanFullName(): 'home-api.apiSchema.captcha';
    get $onionName(): 'home-api:captcha';
  }
  interface ApiSchemaHome {}
  interface ApiSchemaHome {
    get $beanFullName(): 'home-api.apiSchema.home';
    get $onionName(): 'home-api:home';
  }
  interface ApiSchemaHomeBaseMenu {}
  interface ApiSchemaHomeBaseMenu {
    get $beanFullName(): 'home-api.apiSchema.homeBaseMenu';
    get $onionName(): 'home-api:homeBaseMenu';
  }
  interface ApiSchemaHomeBasePermission {}
  interface ApiSchemaHomeBasePermission {
    get $beanFullName(): 'home-api.apiSchema.homeBasePermission';
    get $onionName(): 'home-api:homeBasePermission';
  }
  interface ApiSchemaHomeUserPassport {}
  interface ApiSchemaHomeUserPassport {
    get $beanFullName(): 'home-api.apiSchema.homeUserPassport';
    get $onionName(): 'home-api:homeUserPassport';
  }
  interface ApiSchemaTestSsrToolOne {}
  interface ApiSchemaTestSsrToolOne {
    get $beanFullName(): 'home-api.apiSchema.testSsrToolOne';
    get $onionName(): 'home-api:testSsrToolOne';
  }
}
/** apiSchema: end */
/** apiSchema: begin */
interface IModuleApiSchema {
  'captcha': ApiSchemaCaptcha;
  'home': ApiSchemaHome;
  'homeBaseMenu': ApiSchemaHomeBaseMenu;
  'homeBasePermission': ApiSchemaHomeBasePermission;
  'homeUserPassport': ApiSchemaHomeUserPassport;
  'testSsrToolOne': ApiSchemaTestSsrToolOne;
}
declare module 'zova' {
  interface IBeanRecordGeneral {
    'home-api.apiSchema.captcha': ApiSchemaCaptcha;
    'home-api.apiSchema.home': ApiSchemaHome;
    'home-api.apiSchema.homeBaseMenu': ApiSchemaHomeBaseMenu;
    'home-api.apiSchema.homeBasePermission': ApiSchemaHomeBasePermission;
    'home-api.apiSchema.homeUserPassport': ApiSchemaHomeUserPassport;
    'home-api.apiSchema.testSsrToolOne': ApiSchemaTestSsrToolOne;
  }
}
/** apiSchema: end */
/** service: begin */
declare module 'zova-module-a-bean' {
  interface IServiceRecord {
    'home-api:jwtAdapter': never;
  }
}
declare module 'zova-module-home-api' {
  interface ServiceJwtAdapter {}
  interface ServiceJwtAdapter {
    get $beanFullName(): 'home-api.service.jwtAdapter';
    get $onionName(): 'home-api:jwtAdapter';
  }
}
/** service: end */
/** service: begin */
declare module 'zova' {
  interface IBeanRecordGeneral {
    'home-api.service.jwtAdapter': ServiceJwtAdapter;
  }
}
/** service: end */
/** scope: begin */
declare class ScopeModuleHomeApi extends BeanScopeBase {}
interface ScopeModuleHomeApi {
  util: BeanScopeUtil;
  api: IModuleApi$1;
  apiSchema: IModuleApiSchema;
}
declare module 'zova' {
  interface IBeanScopeRecord {
    'home-api': ScopeModuleHomeApi;
  }
}
/** scope: end */
//#endregion
//#region src/suite/a-home/modules/home-api/src/types/api.d.ts
declare module 'zova' {
  interface BeanBase {
    $api: IModuleApi$1;
    $apiSchema: IModuleApiSchema;
  }
}
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/model/test.d.ts
interface IModelOptionsTest extends IDecoratorModelOptions {}
declare class ModelTest extends BeanModelBase {
  test(): _$vue.UnwrapNestedRefs<_$_tanstack_vue_query0.UseQueryReturnType<{
    id: number | string;
    name?: string;
    married: boolean;
    details: components['schemas']['test-ssr.dto.testDetail'][];
    _custom1?: string | undefined;
    _custom2?: string | undefined;
    _custom3?: string | undefined;
    _custom4?: string | undefined;
    _custom5?: string | undefined;
    _customCopy?: string | undefined;
    _customCopied?: boolean | undefined;
  }, Error>>;
}
declare namespace index_d_exports$2 {
  export { V$1 as Vue, Vue2, del, install, isVue2, isVue3, set };
}
import * as import_vue from "vue";
declare const isVue2: boolean;
declare const isVue3: boolean;
declare const Vue2: any;
declare const install: (vue?: any) => void;
/** 
 * @deprecated To avoid bringing in all the tree-shakable modules, this API has been deprecated. Use `Vue2` or named exports instead.
 * Refer to https://github.com/vueuse/vue-demi/issues/41
 */
declare const V$1: typeof _$vue;
declare function set<T>(target: any, key: any, val: T): T;
declare function del(target: any, key: any): void;
//#endregion
//#region node_modules/.pnpm/pinia@2.3.1_typescript@5.9.3_vue@3.5.32_typescript@5.9.3_/node_modules/pinia/dist/pinia.d.ts
/**
 * Type of an object of Actions. For internal usage only.
 * For internal use **only**
 */
declare type _ActionsTree = Record<string, _Method>;
declare type _Awaited<T> = T extends null | undefined ? T : T extends object & {
  then(onfulfilled: infer F): any;
} ? F extends ((value: infer V, ...args: any) => any) ? _Awaited<V> : never : T;
/**
 * Recursive `Partial<T>`. Used by {@link Store['$patch']}.
 *
 * For internal use **only**
 */
declare type _DeepPartial<T> = { [K in keyof T]?: _DeepPartial<T[K]> };
/**
 * Options parameter of `defineStore()` for option stores. Can be extended to
 * augment stores with the plugin API. @see {@link DefineStoreOptionsBase}.
 */
declare interface DefineStoreOptions<Id extends string, S extends StateTree, G, A> extends DefineStoreOptionsBase<S, Store<Id, S, G, A>> {
  /**
   * Unique string key to identify the store across the application.
   */
  id: Id;
  /**
   * Function to create a fresh state. **Must be an arrow function** to ensure
   * correct typings!
   */
  state?: () => S;
  /**
   * Optional object of getters.
   */
  getters?: G & ThisType<index_d_exports$2.UnwrapRef<S> & _StoreWithGetters<G> & PiniaCustomProperties> & _GettersTree<S>;
  /**
   * Optional object of actions.
   */
  actions?: A & ThisType<A & index_d_exports$2.UnwrapRef<S> & _StoreWithState<Id, S, G, A> & _StoreWithGetters<G> & PiniaCustomProperties>;
  /**
   * Allows hydrating the store during SSR when complex state (like client side only refs) are used in the store
   * definition and copying the value from `pinia.state` isn't enough.
   *
   * @example
   * If in your `state`, you use any `customRef`s, any `computed`s, or any `ref`s that have a different value on
   * Server and Client, you need to manually hydrate them. e.g., a custom ref that is stored in the local
   * storage:
   *
   * ```ts
   * const useStore = defineStore('main', {
   *   state: () => ({
   *     n: useLocalStorage('key', 0)
   *   }),
   *   hydrate(storeState, initialState) {
   *     // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/43826
   *     storeState.n = useLocalStorage('key', 0)
   *   }
   * })
   * ```
   *
   * @param storeState - the current state in the store
   * @param initialState - initialState
   */
  hydrate?(storeState: index_d_exports$2.UnwrapRef<S>, initialState: index_d_exports$2.UnwrapRef<S>): void;
}
/**
 * Options passed to `defineStore()` that are common between option and setup
 * stores. Extend this interface if you want to add custom options to both kinds
 * of stores.
 */
declare interface DefineStoreOptionsBase<S extends StateTree, Store> {}
/**
 * Available `options` when creating a pinia plugin.
 */
declare interface DefineStoreOptionsInPlugin<Id extends string, S extends StateTree, G, A> extends Omit<DefineStoreOptions<Id, S, G, A>, 'id' | 'actions'> {
  /**
   * Extracted object of actions. Added by useStore() when the store is built
   * using the setup API, otherwise uses the one passed to `defineStore()`.
   * Defaults to an empty object if no actions are defined.
   */
  actions: A;
}
/**
 * Type of an object of Getters that infers the argument. For internal usage only.
 * For internal use **only**
 */
declare type _GettersTree<S extends StateTree> = Record<string, ((state: index_d_exports$2.UnwrapRef<S> & index_d_exports$2.UnwrapRef<PiniaCustomStateProperties<S>>) => any) | (() => any)>;
/**
 * Generic type for a function that can infer arguments and return type
 *
 * For internal use **only**
 */
declare type _Method = (...args: any[]) => any;
/**
 * Possible types for SubscriptionCallback
 */
declare enum MutationType {
  /**
   * Direct mutation of the state:
   *
   * - `store.name = 'new name'`
   * - `store.$state.name = 'new name'`
   * - `store.list.push('new item')`
   */
  direct = "direct",
  /**
   * Mutated the state with `$patch` and an object
   *
   * - `store.$patch({ name: 'newName' })`
   */
  patchObject = "patch object",
  /**
   * Mutated the state with `$patch` and a function
   *
   * - `store.$patch(state => state.name = 'newName')`
   */
  patchFunction = "patch function"
}
/**
 * Every application must own its own pinia to be able to create stores
 */
declare interface Pinia {
  install: (app: index_d_exports$2.App) => void;
  /**
   * root state
   */
  state: index_d_exports$2.Ref<Record<string, StateTree>>;
  /**
   * Adds a store plugin to extend every store
   *
   * @param plugin - store plugin to add
   */
  use(plugin: PiniaPlugin): Pinia;
  /* Excluded from this release type: _p */
  /* Excluded from this release type: _a */
  /* Excluded from this release type: _e */
  /* Excluded from this release type: _s */
  /* Excluded from this release type: _testing */
}
/**
 * Interface to be extended by the user when they add properties through plugins.
 */
declare interface PiniaCustomProperties<Id extends string = string, S extends StateTree = StateTree, G = _GettersTree<S>, A = _ActionsTree> {}
/**
 * Properties that are added to every `store.$state` by `pinia.use()`.
 */
declare interface PiniaCustomStateProperties<S extends StateTree = StateTree> {}
/**
 * Plugin to extend every store.
 */
declare interface PiniaPlugin {
  /**
   * Plugin to extend every store. Returns an object to extend the store or
   * nothing.
   *
   * @param context - Context
   */
  (context: PiniaPluginContext): Partial<PiniaCustomProperties & PiniaCustomStateProperties> | void;
}
/**
 * Context argument passed to Pinia plugins.
 */
declare interface PiniaPluginContext<Id extends string = string, S extends StateTree = StateTree, G = _GettersTree<S>, A = _ActionsTree> {
  /**
   * pinia instance.
   */
  pinia: Pinia;
  /**
   * Current app created with `Vue.createApp()`.
   */
  app: index_d_exports$2.App;
  /**
   * Current store being extended.
   */
  store: Store<Id, S, G, A>;
  /**
   * Initial options defining the store when calling `defineStore()`.
   */
  options: DefineStoreOptionsInPlugin<Id, S, G, A>;
}
/**
 * Generic state of a Store
 */
declare type StateTree = Record<PropertyKey, any>;
/**
 * Store type to build a store.
 */
declare type Store<Id extends string = string, S extends StateTree = {}, G = {}, A = {}> = _StoreWithState<Id, S, G, A> & index_d_exports$2.UnwrapRef<S> & _StoreWithGetters<G> & (_ActionsTree extends A ? {} : A) & PiniaCustomProperties<Id, S, G, A> & PiniaCustomStateProperties<S>;
/**
 * Return type of `defineStore()`. Function that allows instantiating a store.
 */
declare interface StoreDefinition<Id extends string = string, S extends StateTree = StateTree, G = _GettersTree<S>, A = _ActionsTree> {
  /**
   * Returns a store, creates it if necessary.
   *
   * @param pinia - Pinia instance to retrieve the store
   * @param hot - dev only hot module replacement
   */
  (pinia?: Pinia | null | undefined, hot?: StoreGeneric): Store<Id, S, G, A>;
  /**
   * Id of the store. Used by map helpers.
   */
  $id: Id;
  /* Excluded from this release type: _pinia */
}
/**
 * Generic and type-unsafe version of Store. Doesn't fail on access with
 * strings, making it much easier to write generic functions that do not care
 * about the kind of store that is passed.
 */
declare type StoreGeneric = Store<string, StateTree, _GettersTree<StateTree>, _ActionsTree>;
/**
 * Argument of `store.$onAction()`
 */
declare type StoreOnActionListener<Id extends string, S extends StateTree, G, A> = (context: StoreOnActionListenerContext<Id, S, G, {} extends A ? _ActionsTree : A>) => void;
/**
 * Context object passed to callbacks of `store.$onAction(context => {})`
 * TODO: should have only the Id, the Store and Actions to generate the proper object
 */
declare type StoreOnActionListenerContext<Id extends string, S extends StateTree, G, A> = _ActionsTree extends A ? _StoreOnActionListenerContext<StoreGeneric, string, _ActionsTree> : { [Name in keyof A]: Name extends string ? _StoreOnActionListenerContext<Store<Id, S, G, A>, Name, A> : never }[keyof A];
/**
 * Actual type for {@link StoreOnActionListenerContext}. Exists for refactoring
 * purposes. For internal use only.
 * For internal use **only**
 */
declare interface _StoreOnActionListenerContext<Store, ActionName extends string, A> {
  /**
   * Name of the action
   */
  name: ActionName;
  /**
   * Store that is invoking the action
   */
  store: Store;
  /**
   * Parameters passed to the action
   */
  args: A extends Record<ActionName, _Method> ? Parameters<A[ActionName]> : unknown[];
  /**
   * Sets up a hook once the action is finished. It receives the return value
   * of the action, if it's a Promise, it will be unwrapped.
   */
  after: (callback: A extends Record<ActionName, _Method> ? (resolvedReturn: _Awaited<ReturnType<A[ActionName]>>) => void : () => void) => void;
  /**
   * Sets up a hook if the action fails. Return `false` to catch the error and
   * stop it from propagating.
   */
  onError: (callback: (error: unknown) => void) => void;
}
/**
 * Properties of a store.
 */
declare interface StoreProperties<Id extends string> {
  /**
   * Unique identifier of the store
   */
  $id: Id;
  /* Excluded from this release type: _p */
  /* Excluded from this release type: _getters */
  /* Excluded from this release type: _isOptionsAPI */
  /**
   * Used by devtools plugin to retrieve properties added with plugins. Removed
   * in production. Can be used by the user to add property keys of the store
   * that should be displayed in devtools.
   */
  _customProperties: Set<string>;
  /* Excluded from this release type: _hotUpdate */
  /* Excluded from this release type: _hotUpdating */
  /* Excluded from this release type: _hmrPayload */
}
/**
 * Store augmented with getters. For internal usage only.
 * For internal use **only**
 */
declare type _StoreWithGetters<G> = _StoreWithGetters_Readonly<G> & _StoreWithGetters_Writable<G>;
/**
 * Store augmented with readonly getters. For internal usage **only**.
 */
declare type _StoreWithGetters_Readonly<G> = { readonly [K in keyof G as G[K] extends ((...args: any[]) => any) ? K : index_d_exports$2.ComputedRef extends G[K] ? K : never]: G[K] extends ((...args: any[]) => infer R) ? R : index_d_exports$2.UnwrapRef<G[K]> };
/**
 * Store augmented with writable getters. For internal usage **only**.
 */
declare type _StoreWithGetters_Writable<G> = { [K in keyof G as G[K] extends index_d_exports$2.WritableComputedRef<any> ? K : never]: G[K] extends Readonly<index_d_exports$2.WritableComputedRef<infer R>> ? R : never };
/**
 * Base store with state and functions. Should not be used directly.
 */
declare interface _StoreWithState<Id extends string, S extends StateTree, G, A> extends StoreProperties<Id> {
  /**
   * State of the Store. Setting it will internally call `$patch()` to update the state.
   */
  $state: index_d_exports$2.UnwrapRef<S> & PiniaCustomStateProperties<S>;
  /**
   * Applies a state patch to current state. Allows passing nested values
   *
   * @param partialState - patch to apply to the state
   */
  $patch(partialState: _DeepPartial<index_d_exports$2.UnwrapRef<S>>): void;
  /**
   * Group multiple changes into one function. Useful when mutating objects like
   * Sets or arrays and applying an object patch isn't practical, e.g. appending
   * to an array. The function passed to `$patch()` **must be synchronous**.
   *
   * @param stateMutator - function that mutates `state`, cannot be asynchronous
   */
  $patch<F extends (state: index_d_exports$2.UnwrapRef<S>) => any>(stateMutator: ReturnType<F> extends Promise<any> ? never : F): void;
  /**
   * Resets the store to its initial state by building a new state object.
   */
  $reset(): void;
  /**
   * Setups a callback to be called whenever the state changes. It also returns a function to remove the callback. Note
   * that when calling `store.$subscribe()` inside of a component, it will be automatically cleaned up when the
   * component gets unmounted unless `detached` is set to true.
   *
   * @param callback - callback passed to the watcher
   * @param options - `watch` options + `detached` to detach the subscription from the context (usually a component)
   * this is called from. Note that the `flush` option does not affect calls to `store.$patch()`.
   * @returns function that removes the watcher
   */
  $subscribe(callback: SubscriptionCallback<S>, options?: {
    detached?: boolean;
  } & index_d_exports$2.WatchOptions): () => void;
  /**
   * Setups a callback to be called every time an action is about to get
   * invoked. The callback receives an object with all the relevant information
   * of the invoked action:
   * - `store`: the store it is invoked on
   * - `name`: The name of the action
   * - `args`: The parameters passed to the action
   *
   * On top of these, it receives two functions that allow setting up a callback
   * once the action finishes or when it fails.
   *
   * It also returns a function to remove the callback. Note than when calling
   * `store.$onAction()` inside of a component, it will be automatically cleaned
   * up when the component gets unmounted unless `detached` is set to true.
   *
   * @example
   *
   *```js
   *store.$onAction(({ after, onError }) => {
   *  // Here you could share variables between all of the hooks as well as
   *  // setting up watchers and clean them up
   *  after((resolvedValue) => {
   *    // can be used to cleanup side effects
   * .  // `resolvedValue` is the value returned by the action, if it's a
   * .  // Promise, it will be the resolved value instead of the Promise
   *  })
   *  onError((error) => {
   *    // can be used to pass up errors
   *  })
   *})
   *```
   *
   * @param callback - callback called before every action
   * @param detached - detach the subscription from the context this is called from
   * @returns function that removes the watcher
   */
  $onAction(callback: StoreOnActionListener<Id, S, G, A>, detached?: boolean): () => void;
  /**
   * Stops the associated effect scope of the store and remove it from the store
   * registry. Plugins can override this method to cleanup any added effects.
   * e.g. devtools plugin stops displaying disposed stores from devtools.
   * Note this doesn't delete the state of the store, you have to do it manually with
   * `delete pinia.state.value[store.$id]` if you want to. If you don't and the
   * store is used again, it will reuse the previous state.
   */
  $dispose(): void;
  /* Excluded from this release type: _r */
}
/**
 * Callback of a subscription
 */
declare type SubscriptionCallback<S> = (
/**
 * Object with information relative to the store mutation that triggered the
 * subscription.
 */

mutation: SubscriptionCallbackMutation<S>,
/**
 * State of the store when the subscription is triggered. Same as
 * `store.$state`.
 */

state: index_d_exports$2.UnwrapRef<S>) => void;
/**
 * Context object passed to a subscription callback.
 */
declare type SubscriptionCallbackMutation<S> = SubscriptionCallbackMutationDirect | SubscriptionCallbackMutationPatchObject<S> | SubscriptionCallbackMutationPatchFunction;
/**
 * Base type for the context passed to a subscription callback. Internal type.
 */
declare interface _SubscriptionCallbackMutationBase {
  /**
   * Type of the mutation.
   */
  type: MutationType;
  /**
   * `id` of the store doing the mutation.
   */
  storeId: string;
  /**
   * 🔴 DEV ONLY, DO NOT use for production code. Different mutation calls. Comes from
   * https://vuejs.org/guide/extras/reactivity-in-depth.html#reactivity-debugging and allows to track mutations in
   * devtools and plugins **during development only**.
   */
  events?: index_d_exports$2.DebuggerEvent[] | index_d_exports$2.DebuggerEvent;
}
/**
 * Context passed to a subscription callback when directly mutating the state of
 * a store with `store.someState = newValue` or `store.$state.someState =
 * newValue`.
 */
declare interface SubscriptionCallbackMutationDirect extends _SubscriptionCallbackMutationBase {
  type: MutationType.direct;
  events: index_d_exports$2.DebuggerEvent;
}
/**
 * Context passed to a subscription callback when `store.$patch()` is called
 * with a function.
 */
declare interface SubscriptionCallbackMutationPatchFunction extends _SubscriptionCallbackMutationBase {
  type: MutationType.patchFunction;
  events: index_d_exports$2.DebuggerEvent[];
}
/**
 * Context passed to a subscription callback when `store.$patch()` is called
 * with an object.
 */
declare interface SubscriptionCallbackMutationPatchObject<S> extends _SubscriptionCallbackMutationBase {
  type: MutationType.patchObject;
  events: index_d_exports$2.DebuggerEvent[];
  /**
   * Object passed to `store.$patch()`.
   */
  payload: _DeepPartial<index_d_exports$2.UnwrapRef<S>>;
}
// Extensions of Vue types to be appended manually
// https://github.com/microsoft/rushstack/issues/2090
// https://github.com/microsoft/rushstack/issues/1709
// @ts-ignore: works on Vue 2, fails in Vue 3
declare module 'vue/types/vue' {
  interface Vue {
    /**
     * Currently installed pinia instance.
     */
    $pinia: Pinia;
    /**
     * Cache of stores instantiated by the current instance. Used by map
     * helpers. Used internally by Pinia.
     *
     * @internal
     */
    _pStores?: Record<string, Store>;
  }
} // @ts-ignore: works on Vue 2, fails in Vue 3
declare module 'vue/types/options' {
  interface ComponentOptions<V> {
    /**
     * Pinia instance to install in your application. Should be passed to the
     * root Vue.
     */
    pinia?: Pinia;
  }
}
/**
 * NOTE: Used to be `@vue/runtime-core` but it break types from time to time. Then, in Vue docs, we started recommending
 * to use `vue` instead of `@vue/runtime-core` but that broke others' types so we reverted it. Now, local types do not
 * work if we use `@vue/runtime-core` so we are using `vue` again.
 */
// @ts-ignore: works on Vue 3, fails in Vue 2
declare module 'vue' {
  // This seems to be needed to not break auto import types based on the order
  // https://github.com/vuejs/pinia/pull/2730
  interface GlobalComponents {}
  interface ComponentCustomProperties {
    /**
     * Access to the application's Pinia
     */
    $pinia: Pinia;
    /**
     * Cache of stores instantiated by the current instance. Used by devtools to
     * list currently used stores. Used internally by Pinia.
     *
     * @internal
     */
    _pStores?: Record<string, StoreGeneric>;
  }
} // normally this is only needed in .d.ts files
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/bean/counterStore.d.ts
declare const useCounterStore: StoreDefinition<"counter", Pick<{
  count: _$vue.Ref<number, number>;
  name: _$vue.Ref<string, string>;
  doubleCount: _$vue.ComputedRef<number>;
  increment: () => void;
}, "count" | "name">, Pick<{
  count: _$vue.Ref<number, number>;
  name: _$vue.Ref<string, string>;
  doubleCount: _$vue.ComputedRef<number>;
  increment: () => void;
}, "doubleCount">, Pick<{
  count: _$vue.Ref<number, number>;
  name: _$vue.Ref<string, string>;
  doubleCount: _$vue.ComputedRef<number>;
  increment: () => void;
}, "increment">>;
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/bean/store.counter.d.ts
interface StoreCounter extends PiniaStore<typeof useCounterStore> {}
declare class StoreCounter extends BeanPiniaStoreBase {
  protected __init__(): Promise<void>;
}
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/component/actionView/controller.d.ts
interface ControllerActionViewProps {
  onClick?: () => void;
}
declare class ControllerActionView extends BeanControllerBase {
  static $propsDefault: {};
  $$renderContext: IJsxRenderContextTableCell;
  protected __init__(): Promise<void>;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/component/card/controller.d.ts
interface ControllerCardProps {
  header?: string;
  content?: string;
  footer?: string;
  onReset?: (time: Date) => void;
  slotHeader?: ISlot;
  slotFooter?: ISlot;
}
declare class ControllerCard extends BeanControllerBase {
  static $propsDefault: {
    header: string;
  };
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/component/formFieldTest/controller.d.ts
interface ControllerFormFieldTestProps extends IFormFieldComponentOptions {
  showLog?: boolean;
  slotHeader?: (scope: {
    name: string;
  }) => VNode;
  slotFooter?: (scope: {
    name: string;
  }) => VNode;
}
declare class ControllerFormFieldTest extends BeanControllerBase {
  static $propsDefault: {};
  static $componentOptions: IComponentOptions;
  protected __init__(): Promise<void>;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/component/tableCellTest/controller.d.ts
interface ControllerTableCellTestProps {
  showLog?: boolean;
  slotHeader?: (scope: {
    name: string;
  }) => VNode;
  slotFooter?: (scope: {
    name: string;
  }) => VNode;
}
declare class ControllerTableCellTest extends BeanControllerBase {
  static $propsDefault: {};
  $$renderContext: IJsxRenderContextTableCell;
  protected __init__(): Promise<void>;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/component/controller.d.ts
declare class ControllerPageComponent extends BeanControllerPageBase {
  resetTime: Date;
  cardRef?: ControllerCard;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/locale/controller.d.ts
declare class ControllerPageLocale extends BeanControllerPageBase {
  protected __init__(): Promise<void>;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/pinia/controller.d.ts
declare class ControllerPagePinia extends BeanControllerPageBase {
  $$counter: StoreCounter;
  protected __init__(): Promise<void>;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/routeParams/controller.d.ts
declare const ControllerPageRouteParamsSchemaParams: z.ZodObject<{
  id: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
declare const ControllerPageRouteParamsSchemaQuery: z.ZodObject<{}, z.core.$strip>;
declare class ControllerPageRouteParams extends BeanControllerPageBase {
  protected __init__(): Promise<void>;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/routeQuery/controller.d.ts
declare const ControllerPageRouteQuerySchemaParams: z.ZodObject<{}, z.core.$strip>;
declare const ControllerPageRouteQuerySchemaQuery: z.ZodObject<{
  name: z.ZodOptional<z.ZodString>;
  age: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare class ControllerPageRouteQuery extends BeanControllerPageBase {
  protected __init__(): Promise<void>;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/routeQueryB/controller.d.ts
declare const ControllerPageRouteQueryBSchemaParams: z.ZodObject<{}, z.core.$strip>;
declare const ControllerPageRouteQueryBSchemaQuery: z.ZodObject<{
  tabName: z.ZodDefault<z.ZodOptional<z.ZodString>>;
  private: z.ZodOptional<z.ZodBoolean>;
  user: z.ZodOptional<z.ZodObject<{
    name: z.ZodString;
    age: z.ZodNumber;
  }, z.core.$strip>>;
  todos: z.ZodOptional<z.ZodArray<z.ZodObject<{
    title: z.ZodString;
    done: z.ZodBoolean;
  }, z.core.$strip>>>;
}, z.core.$strip>;
declare class ControllerPageRouteQueryB extends BeanControllerPageBase {
  togglePrivate(): void;
  toggleUser(): void;
  toggleTodos(): void;
  toggleTab(event: any, tabName: string): void;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/state/controller.d.ts
declare class ControllerPageState extends BeanControllerPageBase {
  count: number;
  count2: string;
  protected __init__(): Promise<void>;
  increment(): void;
  decrement(): void;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/style/controller.d.ts
declare class ControllerPageStyle extends BeanControllerPageBase {
  active: boolean;
  cTextColor: string;
  cBlock: string;
  renderHello: any;
  renderHello2: any;
  protected __init__(): Promise<void>;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/toolOne/controller.d.ts
declare const ControllerPageToolOneSchemaParams: z.ZodObject<{
  id: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const ControllerPageToolOneSchemaQuery: z.ZodObject<{
  name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare class ControllerPageToolOne$1 extends BeanControllerPageFormBase {
  schemaUpdate?: SchemaObject;
  $$modelTest: ModelTest;
  controllerForm: ControllerForm;
  fieldName: string;
  formData: ApiSchemaTestSsrDtoTestBodyPartial;
  formMeta: IFormMeta;
  protected __init__(): Promise<void>;
  onSubmit(data: TypeFormOnSubmitData<ApiSchemaTestSsrDtoTestBodyPartial>): Promise<void>;
}
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/toolTwo/controller.d.ts
declare const ControllerPageToolTwoSchemaParams: z.ZodObject<{
  id: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const ControllerPageToolTwoSchemaQuery: z.ZodObject<{
  name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare class ControllerPageToolTwo extends BeanControllerPageBase {
  $$modelPageData: ModelPageData<ApiSchemaTestSsrDtoTestResult | undefined>;
  protected __init__(): Promise<void>;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/page/component.d.ts
declare const ZPageComponent: _$vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, _$vue.PublicProps>;
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/page/locale.d.ts
declare const ZPageLocale: _$vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, _$vue.PublicProps>;
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/page/pinia.d.ts
declare const ZPagePinia: _$vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, _$vue.PublicProps>;
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/page/routeParams.d.ts
declare namespace NSControllerPageRouteParams {
  const paramsSchema: z.ZodObject<{
    id: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
  }, z.core.$strip>;
  type ParamsInput = z.input<typeof ControllerPageRouteParamsSchemaParams>;
  type ParamsOutput = z.output<typeof ControllerPageRouteParamsSchemaParams>;
  const querySchema: z.ZodObject<{}, z.core.$strip>;
  type QueryInput = z.input<typeof ControllerPageRouteParamsSchemaQuery>;
  type QueryOutput = z.output<typeof ControllerPageRouteParamsSchemaQuery>;
}
declare const ZPageRouteParams: _$vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, _$vue.PublicProps>;
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/page/routeQuery.d.ts
declare namespace NSControllerPageRouteQuery {
  const paramsSchema: z.ZodObject<{}, z.core.$strip>;
  type ParamsInput = z.input<typeof ControllerPageRouteQuerySchemaParams>;
  type ParamsOutput = z.output<typeof ControllerPageRouteQuerySchemaParams>;
  const querySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    age: z.ZodOptional<z.ZodNumber>;
  }, z.core.$strip>;
  type QueryInput = z.input<typeof ControllerPageRouteQuerySchemaQuery>;
  type QueryOutput = z.output<typeof ControllerPageRouteQuerySchemaQuery>;
}
declare const ZPageRouteQuery: _$vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, _$vue.PublicProps>;
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/page/routeQueryB.d.ts
declare namespace NSControllerPageRouteQueryB {
  const paramsSchema: z.ZodObject<{}, z.core.$strip>;
  type ParamsInput = z.input<typeof ControllerPageRouteQueryBSchemaParams>;
  type ParamsOutput = z.output<typeof ControllerPageRouteQueryBSchemaParams>;
  const querySchema: z.ZodObject<{
    tabName: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    private: z.ZodOptional<z.ZodBoolean>;
    user: z.ZodOptional<z.ZodObject<{
      name: z.ZodString;
      age: z.ZodNumber;
    }, z.core.$strip>>;
    todos: z.ZodOptional<z.ZodArray<z.ZodObject<{
      title: z.ZodString;
      done: z.ZodBoolean;
    }, z.core.$strip>>>;
  }, z.core.$strip>;
  type QueryInput = z.input<typeof ControllerPageRouteQueryBSchemaQuery>;
  type QueryOutput = z.output<typeof ControllerPageRouteQueryBSchemaQuery>;
}
declare const ZPageRouteQueryB: _$vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, _$vue.PublicProps>;
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/page/state.d.ts
declare const ZPageState: _$vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, _$vue.PublicProps>;
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/page/style.d.ts
declare const ZPageStyle: _$vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, _$vue.PublicProps>;
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/page/toolOne.d.ts
declare namespace NSControllerPageToolOne {
  const paramsSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
  }, z.core.$strip>;
  type ParamsInput = z.input<typeof ControllerPageToolOneSchemaParams>;
  type ParamsOutput = z.output<typeof ControllerPageToolOneSchemaParams>;
  const querySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
  }, z.core.$strip>;
  type QueryInput = z.input<typeof ControllerPageToolOneSchemaQuery>;
  type QueryOutput = z.output<typeof ControllerPageToolOneSchemaQuery>;
}
declare module 'zova-module-demo-basic' {
  interface RenderPageToolOne extends ControllerPageToolOne {}
}
declare const ZPageToolOne: _$vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, _$vue.PublicProps>;
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/page/toolTwo.d.ts
declare namespace NSControllerPageToolTwo {
  const paramsSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
  }, z.core.$strip>;
  type ParamsInput = z.input<typeof ControllerPageToolTwoSchemaParams>;
  type ParamsOutput = z.output<typeof ControllerPageToolTwoSchemaParams>;
  const querySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
  }, z.core.$strip>;
  type QueryInput = z.input<typeof ControllerPageToolTwoSchemaQuery>;
  type QueryOutput = z.output<typeof ControllerPageToolTwoSchemaQuery>;
}
declare const ZPageToolTwo: _$vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, _$vue.PublicProps>;
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/component/actionView.d.ts
type TypeControllerActionViewPublicProps = {
  controllerRef?: (ref: ControllerActionView) => void;
} & ControllerActionViewProps;
type ControllerInnerProps$15 = TypeControllerInnerProps<ControllerActionViewProps, keyof typeof ControllerActionView.$propsDefault>;
declare module 'zova-module-demo-basic' {
  interface ControllerActionView {
    $props: ControllerInnerProps$15;
  }
}
declare const ZActionView: _$vue.DefineSetupFnComponent<TypeControllerActionViewPublicProps, _$vue.EmitsOptions, _$vue.SlotsType<Record<string, any>>, {
  controllerRef?: (ref: ControllerActionView) => void;
} & ControllerActionViewProps & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
}), _$vue.PublicProps>;
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/component/card.d.ts
type TypeControllerCardPublicProps = {
  controllerRef?: (ref: ControllerCard) => void;
} & ControllerCardProps;
type ControllerInnerProps$14 = TypeControllerInnerProps<ControllerCardProps, keyof typeof ControllerCard.$propsDefault>;
declare module 'zova-module-demo-basic' {
  interface ControllerCard {
    $props: ControllerInnerProps$14;
  }
}
declare const ZCard: _$vue.DefineSetupFnComponent<TypeControllerCardPublicProps, _$vue.EmitsOptions, _$vue.SlotsType<Record<string, any>>, {
  controllerRef?: (ref: ControllerCard) => void;
} & ControllerCardProps & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
}), _$vue.PublicProps>;
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/component/formFieldTest.d.ts
type TypeControllerFormFieldTestPublicProps = {
  controllerRef?: (ref: ControllerFormFieldTest) => void;
} & ControllerFormFieldTestProps;
type ControllerInnerProps$13 = TypeControllerInnerProps<ControllerFormFieldTestProps, keyof typeof ControllerFormFieldTest.$propsDefault>;
declare module 'zova-module-demo-basic' {
  interface ControllerFormFieldTest {
    $props: ControllerInnerProps$13;
  }
}
declare const ZFormFieldTest: _$vue.DefineSetupFnComponent<TypeControllerFormFieldTestPublicProps, _$vue.EmitsOptions, _$vue.SlotsType<Record<string, any>>, {
  controllerRef?: (ref: ControllerFormFieldTest) => void;
} & ControllerFormFieldTestProps & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
}), _$vue.PublicProps>;
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/component/tableCellTest.d.ts
type TypeControllerTableCellTestPublicProps = {
  controllerRef?: (ref: ControllerTableCellTest) => void;
} & ControllerTableCellTestProps;
type ControllerInnerProps$12 = TypeControllerInnerProps<ControllerTableCellTestProps, keyof typeof ControllerTableCellTest.$propsDefault>;
declare module 'zova-module-demo-basic' {
  interface ControllerTableCellTest {
    $props: ControllerInnerProps$12;
  }
}
declare const ZTableCellTest: _$vue.DefineSetupFnComponent<TypeControllerTableCellTestPublicProps, _$vue.EmitsOptions, _$vue.SlotsType<Record<string, any>>, {
  controllerRef?: (ref: ControllerTableCellTest) => void;
} & ControllerTableCellTestProps & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
}), _$vue.PublicProps>;
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/toolOne/render.d.ts
declare class RenderPageToolOne extends BeanRenderBase {
  private _renderAuto;
  private _renderManual;
  render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-home/modules/home-index/src/page/home/controller.d.ts
declare class ControllerPageHome extends BeanControllerPageBase {
  message: string;
  protected __init__(): Promise<void>;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-home/modules/home-index/src/.metadata/page/home.d.ts
declare const ZPageHome: _$vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, _$vue.PublicProps>;
//#endregion
//#region src/suite/a-home/modules/home-index/src/.metadata/index.d.ts
declare module 'zova' {}
declare module 'zova-module-home-index' {
  interface ControllerPageHome {}
}
/** controller: end */
/** controller: begin */
declare module 'zova' {
  interface IBeanRecordLocal {
    'home-index.controller.pageHome': ControllerPageHome;
  }
}
/** controller: end */
/** pages: begin */
declare module 'zova-module-a-router' {
  interface IPagePathRecord {
    '/home/index': TypePagePathSchema<undefined, undefined>;
  }
  interface IPageNameRecord {}
}
declare module 'zova-module-home-index' {}
/** pages: end */
/** scope: begin */
declare class ScopeModuleHomeIndex extends BeanScopeBase {}
interface ScopeModuleHomeIndex {
  util: BeanScopeUtil;
}
declare module 'zova' {
  interface IBeanScopeRecord {
    'home-index': ScopeModuleHomeIndex;
  }
}
/** scope: end */
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/bean/aop.home.d.ts
declare class AopHome extends BeanAopBase {
  protected __init__: AopActionInit<ControllerPageHome>;
  protected __dispose__: AopActionDispose<ControllerPageHome>;
  protected render: AopActionRender<ControllerPageHome>;
}
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/bean/aop.home3.d.ts
declare class AopHome3 extends BeanAopBase {
  protected render: AopActionRender<ControllerPageHome>;
}
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/bean/behavior.formFieldLayout.d.ts
interface IBehaviorPropsInputFormFieldLayout {}
interface IBehaviorPropsOutputFormFieldLayout {}
interface IBehaviorOptionsFormFieldLayout extends IDecoratorBehaviorOptions {}
declare class BehaviorFormFieldLayout extends BeanBehaviorBase<IBehaviorOptionsFormFieldLayout, IBehaviorPropsInputFormFieldLayout, IBehaviorPropsOutputFormFieldLayout> {
  $$formField: ControllerFormField;
  protected render(renderContext: IFormFieldRenderContext, next: NextBehavior<IBehaviorPropsOutputFormFieldLayout>): VNode;
}
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/bean/tableCell.test.d.ts
interface ITableCellOptionsTest extends IDecoratorTableCellOptions {
  iconPrefix?: string;
}
declare class TableCellTest extends BeanBase implements ITableCellRender {
  render(options: ITableCellOptionsTest, _renderContext: IJsxRenderContextTableCell, next: NextTableCellRender): any;
}
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/locales.d.ts
declare const locales$6: {
  'en-us': {
    HelloWorld: string;
    ChangeLanguage: string;
    YourName: string;
    Submit: string;
  };
  'zh-cn': {
    HelloWorld: string;
    ChangeLanguage: string;
    YourName: string;
    Submit: string;
  };
};
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/index.d.ts
declare module 'zova-module-a-model' {
  interface IModelRecord {
    'demo-basic:test': IModelOptionsTest;
  }
}
declare module 'zova-module-demo-basic' {
  interface ModelTest {}
  interface ModelTest {
    get $beanFullName(): 'demo-basic.model.test';
    get $onionName(): 'demo-basic:test';
    get $onionOptions(): IModelOptionsTest;
  }
}
/** model: end */
/** model: begin */
declare module 'zova' {
  interface IBeanRecordGeneral {
    'demo-basic.model.test': ModelTest;
  }
}
/** model: end */
/** store: begin */
declare module 'zova' {}
declare module 'zova-module-demo-basic' {
  interface StoreCounter {}
  interface StoreCounter {
    get $beanFullName(): 'demo-basic.store.counter';
    get $onionName(): 'demo-basic:counter';
  }
}
/** store: end */
/** store: begin */
declare module 'zova' {
  interface IBeanRecordGeneral {
    'demo-basic.store.counter': StoreCounter;
  }
}
/** store: end */
/** controller: begin */
declare module 'zova' {}
declare module 'zova-module-demo-basic' {
  interface ControllerActionView {}
  interface ControllerCard {}
  interface ControllerFormFieldTest {}
  interface ControllerTableCellTest {}
  interface ControllerPageComponent {}
  interface ControllerPageLocale {}
  interface ControllerPagePinia {}
  interface ControllerPageRouteParams {}
  interface ControllerPageRouteQuery {}
  interface ControllerPageRouteQueryB {}
  interface ControllerPageState {}
  interface ControllerPageStyle {}
  interface ControllerPageToolOne {}
  interface ControllerPageToolTwo {}
}
/** controller: end */
/** controller: begin */
declare module 'zova' {
  interface IBeanRecordLocal {
    'demo-basic.controller.actionView': ControllerActionView;
    'demo-basic.controller.card': ControllerCard;
    'demo-basic.controller.formFieldTest': ControllerFormFieldTest;
    'demo-basic.controller.tableCellTest': ControllerTableCellTest;
    'demo-basic.controller.pageComponent': ControllerPageComponent;
    'demo-basic.controller.pageLocale': ControllerPageLocale;
    'demo-basic.controller.pagePinia': ControllerPagePinia;
    'demo-basic.controller.pageRouteParams': ControllerPageRouteParams;
    'demo-basic.controller.pageRouteQuery': ControllerPageRouteQuery;
    'demo-basic.controller.pageRouteQueryB': ControllerPageRouteQueryB;
    'demo-basic.controller.pageState': ControllerPageState;
    'demo-basic.controller.pageStyle': ControllerPageStyle;
    'demo-basic.controller.pageToolOne': ControllerPageToolOne$1;
    'demo-basic.controller.pageToolTwo': ControllerPageToolTwo;
  }
}
/** controller: end */
/** pages: begin */
declare module 'zova-module-a-router' {
  interface IPagePathRecord {
    '/demo/basic/component': TypePagePathSchema<undefined, undefined>;
    '/demo/basic/locale': TypePagePathSchema<undefined, undefined>;
    '/demo/basic/pinia': TypePagePathSchema<undefined, undefined>;
    '/demo/basic/routeParams/:id?': TypePagePathSchema<NSControllerPageRouteParams.ParamsInput, NSControllerPageRouteParams.QueryInput>;
    '/demo/basic/routeQuery': TypePagePathSchema<NSControllerPageRouteQuery.ParamsInput, NSControllerPageRouteQuery.QueryInput>;
    '/demo/basic/routeQueryB': TypePagePathSchema<NSControllerPageRouteQueryB.ParamsInput, NSControllerPageRouteQueryB.QueryInput>;
    '/demo/basic/state': TypePagePathSchema<undefined, undefined>;
    '/demo/basic/style': TypePagePathSchema<undefined, undefined>;
    '/demo/basic/toolOne/:id?': TypePagePathSchema<NSControllerPageToolOne.ParamsInput, NSControllerPageToolOne.QueryInput>;
    '/demo/basic/toolTwo/:id?': TypePagePathSchema<NSControllerPageToolTwo.ParamsInput, NSControllerPageToolTwo.QueryInput>;
  }
  interface IPageNameRecord {
    'demo-basic:routeParams': undefined;
    'demo-basic:toolOne': undefined;
    'demo-basic:toolTwo': undefined;
  }
}
declare module 'zova-module-demo-basic' {
  interface ControllerPageRouteParams {
    $params: NSControllerPageRouteParams.ParamsOutput;
    $query: NSControllerPageRouteParams.QueryOutput;
  }
  interface ControllerPageRouteQuery {
    $params: NSControllerPageRouteQuery.ParamsOutput;
    $query: NSControllerPageRouteQuery.QueryOutput;
  }
  interface ControllerPageRouteQueryB {
    $params: NSControllerPageRouteQueryB.ParamsOutput;
    $query: NSControllerPageRouteQueryB.QueryOutput;
  }
  interface ControllerPageToolOne {
    $params: NSControllerPageToolOne.ParamsOutput;
    $query: NSControllerPageToolOne.QueryOutput;
  }
  interface ControllerPageToolTwo {
    $params: NSControllerPageToolTwo.ParamsOutput;
    $query: NSControllerPageToolTwo.QueryOutput;
  }
}
/** pages: end */
/** components: begin */
declare module 'zova' {
  interface IComponentRecord {
    'demo-basic:actionView': ControllerActionView;
    'demo-basic:card': ControllerCard;
    'demo-basic:formFieldTest': ControllerFormFieldTest;
    'demo-basic:tableCellTest': ControllerTableCellTest;
  }
  interface IZovaComponentRecord {
    'demo-basic:actionView': typeof ZActionView;
    'demo-basic:card': typeof ZCard;
    'demo-basic:formFieldTest': typeof ZFormFieldTest;
    'demo-basic:tableCellTest': typeof ZTableCellTest;
  }
}
/** components: end */
/** render: begin */
declare module 'zova' {}
declare module 'zova-module-demo-basic' {
  interface RenderPageToolOne {}
}
/** render: end */
/** render: begin */
declare module 'zova' {
  interface IBeanRecordLocal {
    'demo-basic.render.pageToolOne': RenderPageToolOne;
  }
}
/** render: end */
/** aop: begin */
declare module 'zova-module-a-bean' {
  interface IAopRecord {
    'demo-basic:home': IDecoratorAopOptions;
    'demo-basic:home3': IDecoratorAopOptions;
  }
}
declare module 'zova-module-demo-basic' {
  interface AopHome {}
  interface AopHome {
    get $beanFullName(): 'demo-basic.aop.home';
    get $onionName(): 'demo-basic:home';
    get $onionOptions(): IDecoratorAopOptions;
  }
  interface AopHome3 {}
  interface AopHome3 {
    get $beanFullName(): 'demo-basic.aop.home3';
    get $onionName(): 'demo-basic:home3';
    get $onionOptions(): IDecoratorAopOptions;
  }
}
/** aop: end */
/** aop: begin */
declare module 'zova' {
  interface IBeanRecordLocal {
    'demo-basic.aop.home': AopHome;
    'demo-basic.aop.home3': AopHome3;
  }
}
/** aop: end */
/** behavior: begin */
declare module 'zova-module-a-behavior' {
  interface IBehaviorRecord {
    'demo-basic:formFieldLayout': IBehaviorOptionsFormFieldLayout;
  }
}
declare module 'zova-module-demo-basic' {
  interface BehaviorFormFieldLayout {}
  interface BehaviorFormFieldLayout {
    get $beanFullName(): 'demo-basic.behavior.formFieldLayout';
    get $onionName(): 'demo-basic:formFieldLayout';
    get $onionOptions(): IBehaviorOptionsFormFieldLayout;
  }
}
/** behavior: end */
/** behavior: begin */
declare module 'zova' {
  interface IBeanRecordLocal {
    'demo-basic.behavior.formFieldLayout': BehaviorFormFieldLayout;
  }
}
/** behavior: end */
/** behaviors: begin */
declare module 'vue' {
  interface InputHTMLAttributes {
    'bs-demo-basic-formFieldLayout'?: IBehaviorOptionsFormFieldLayout | '' | boolean;
  }
}
declare module 'vue/jsx-runtime' {
  namespace JSX {
    interface IntrinsicAttributes {
      'bs-demo-basic-formFieldLayout'?: IBehaviorOptionsFormFieldLayout | '' | boolean;
    }
  }
}
/** behaviors: end */
/** tableCell: begin */
declare module 'zova-module-a-table' {
  interface ITableCellRecord {
    'demo-basic:test': ITableCellOptionsTest;
  }
}
declare module 'zova-module-demo-basic' {
  interface TableCellTest {}
  interface TableCellTest {
    get $beanFullName(): 'demo-basic.tableCell.test';
    get $onionName(): 'demo-basic:test';
    get $onionOptions(): ITableCellOptionsTest;
  }
}
/** tableCell: end */
/** tableCell: begin */
declare module 'zova' {
  interface IBeanRecordGeneral {
    'demo-basic.tableCell.test': TableCellTest;
  }
}
/** tableCell: end */
/** locale: begin */
declare class ScopeModuleDemoBasic extends BeanScopeBase {}
interface ScopeModuleDemoBasic {
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales$6)[TypeLocaleBase]>;
}
declare module 'zova' {
  interface IBeanScopeRecord {
    'demo-basic': ScopeModuleDemoBasic;
  }
  interface IBeanScopeLocale {
    'demo-basic': (typeof locales$6)[TypeLocaleBase];
  }
}
//#endregion
//#region src/suite/a-demo/modules/demo-basic/rest/component/actionView.d.ts
type TypeControllerActionViewPublicProps$1 = TypeRenderComponentJsxPropsPublic & ControllerActionViewProps;
declare function BBZDemoBasicActionView(_props: TypeControllerActionViewPublicProps$1): string;
//#endregion
//#region src/suite/a-demo/modules/demo-basic/rest/component/card.d.ts
type TypeControllerCardPublicProps$1 = TypeRenderComponentJsxPropsPublic & ControllerCardProps;
declare function BBZDemoBasicCard(_props: TypeControllerCardPublicProps$1): string;
//#endregion
//#region src/suite/a-demo/modules/demo-basic/rest/component/formFieldTest.d.ts
type TypeControllerFormFieldTestPublicProps$1 = TypeRenderComponentJsxPropsPublic & ControllerFormFieldTestProps;
declare function BBFDemoBasicTest(_props: TypeControllerFormFieldTestPublicProps$1): string;
//#endregion
//#region src/suite/a-demo/modules/demo-basic/rest/component/tableCellTest.d.ts
type TypeControllerTableCellTestPublicProps$1 = TypeRenderComponentJsxPropsPublic & ControllerTableCellTestProps;
declare function BBZDemoBasicTableCellTest(_props: TypeControllerTableCellTestPublicProps$1): string;
//#endregion
//#region src/suite/a-demo/modules/demo-basic/rest/tableCell/test.d.ts
declare function BBTDemoBasicTest(_props: ITableCellOptionsTest): string;
//#endregion
//#region src/suite/a-demo/modules/demo-todo/src/model/todo.d.ts
interface IModelOptionsTodo extends IDecoratorModelOptions {}
declare class ModelTodo extends BeanModelBase {
  findAll(): _$vue.UnwrapNestedRefs<_$_tanstack_vue_query0.UseQueryReturnType<ApiTodoEntity[], Error>>;
  findOne(id?: string): {
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isRefetching: boolean;
    isStale: boolean;
    isEnabled: boolean;
    refetch: (options?: _$_tanstack_query_core0.RefetchOptions) => Promise<_$_tanstack_query_core0.QueryObserverResult<ApiTodoEntity, Error>>;
    fetchStatus: _$_tanstack_query_core0.FetchStatus;
    promise: Promise<ApiTodoEntity>;
    data: undefined;
    error: Error;
    isError: true;
    isPending: false;
    isLoading: false;
    isLoadingError: true;
    isRefetchError: false;
    isSuccess: false;
    isPlaceholderData: false;
    status: 'error';
    suspense: () => Promise<_$_tanstack_query_core0.QueryObserverResult<ApiTodoEntity, Error>>;
  } | {
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isLoading: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isRefetching: boolean;
    isStale: boolean;
    isEnabled: boolean;
    refetch: (options?: _$_tanstack_query_core0.RefetchOptions) => Promise<_$_tanstack_query_core0.QueryObserverResult<ApiTodoEntity, Error>>;
    fetchStatus: _$_tanstack_query_core0.FetchStatus;
    promise: Promise<ApiTodoEntity>;
    data: undefined;
    error: null;
    isError: false;
    isPending: true;
    isLoadingError: false;
    isRefetchError: false;
    isSuccess: false;
    isPlaceholderData: false;
    status: 'pending';
    suspense: () => Promise<_$_tanstack_query_core0.QueryObserverResult<ApiTodoEntity, Error>>;
  } | {
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isRefetching: boolean;
    isStale: boolean;
    isEnabled: boolean;
    refetch: (options?: _$_tanstack_query_core0.RefetchOptions) => Promise<_$_tanstack_query_core0.QueryObserverResult<ApiTodoEntity, Error>>;
    fetchStatus: _$_tanstack_query_core0.FetchStatus;
    promise: Promise<ApiTodoEntity>;
    data: ApiTodoEntity;
    isError: false;
    error: null;
    isPending: false;
    isLoading: false;
    isLoadingError: false;
    isRefetchError: false;
    isSuccess: true;
    isPlaceholderData: true;
    status: 'success';
    suspense: () => Promise<_$_tanstack_query_core0.QueryObserverResult<ApiTodoEntity, Error>>;
  } | {
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isRefetching: boolean;
    isStale: boolean;
    isEnabled: boolean;
    refetch: (options?: _$_tanstack_query_core0.RefetchOptions) => Promise<_$_tanstack_query_core0.QueryObserverResult<ApiTodoEntity, Error>>;
    fetchStatus: _$_tanstack_query_core0.FetchStatus;
    promise: Promise<ApiTodoEntity>;
    data: ApiTodoEntity;
    error: Error;
    isError: true;
    isPending: false;
    isLoading: false;
    isLoadingError: false;
    isRefetchError: true;
    isSuccess: false;
    isPlaceholderData: false;
    status: 'error';
    suspense: () => Promise<_$_tanstack_query_core0.QueryObserverResult<ApiTodoEntity, Error>>;
  } | {
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isRefetching: boolean;
    isStale: boolean;
    isEnabled: boolean;
    refetch: (options?: _$_tanstack_query_core0.RefetchOptions) => Promise<_$_tanstack_query_core0.QueryObserverResult<ApiTodoEntity, Error>>;
    fetchStatus: _$_tanstack_query_core0.FetchStatus;
    promise: Promise<ApiTodoEntity>;
    data: ApiTodoEntity;
    error: null;
    isError: false;
    isPending: false;
    isLoading: false;
    isLoadingError: false;
    isRefetchError: false;
    isSuccess: true;
    isPlaceholderData: false;
    status: 'success';
    suspense: () => Promise<_$_tanstack_query_core0.QueryObserverResult<ApiTodoEntity, Error>>;
  } | undefined;
  create(): _$vue.UnwrapNestedRefs<_$_tanstack_vue_query0.UseMutationReturnType<void, Error, ApiTodoEntity, unknown>>;
  update(id: string): _$vue.UnwrapNestedRefs<_$_tanstack_vue_query0.UseMutationReturnType<void, Error, ApiTodoEntity, unknown>>;
  delete(id: string): _$vue.UnwrapNestedRefs<_$_tanstack_vue_query0.UseMutationReturnType<void, Error, void, unknown>>;
}
//#endregion
//#region src/suite/a-demo/modules/demo-todo/src/api/todo.d.ts
interface ApiTodoEntity {
  id: string;
  title: string;
  done: boolean;
}
type ApiTodoIntertBody = ApiTodoEntity;
type ApiTodoUpdateBody = ApiTodoEntity;
declare class ApiTodo extends BeanApiBase {
  findAll(): Promise<ApiTodoEntity[]>;
  findOne(id: string): Promise<ApiTodoEntity>;
  create(body: ApiTodoIntertBody): Promise<void>;
  update(id: string, body: ApiTodoUpdateBody): Promise<void>;
  delete(id: string): Promise<void>;
}
//#endregion
//#region src/suite/a-demo/modules/demo-todo/src/page/item/controller.d.ts
declare const ControllerPageItemSchemaParams: z.ZodObject<{
  id: z.ZodString;
}, z.core.$strip>;
declare const ControllerPageItemSchemaQuery: z.ZodObject<{}, z.core.$strip>;
declare class ControllerPageItem extends BeanControllerPageBase {
  $$modelTodo: ModelTodo;
  currentTodoId?: string;
  protected __init__(): Promise<void>;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-demo/modules/demo-todo/src/page/todo/controller.d.ts
declare class ControllerPageTodo extends BeanControllerPageBase {
  $$modelTodo: ModelTodo;
  newTitle: string;
  currentTodoId?: string;
  protected __init__(): Promise<void>;
  get queryTodos(): _$vue.UnwrapNestedRefs<_$_tanstack_vue_query0.UseQueryReturnType<ApiTodoEntity[], Error>>;
  get queryTodoCurrent(): {
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isRefetching: boolean;
    isStale: boolean;
    isEnabled: boolean;
    refetch: (options?: _$_tanstack_query_core0.RefetchOptions) => Promise<_$_tanstack_query_core0.QueryObserverResult<ApiTodoEntity, Error>>;
    fetchStatus: _$_tanstack_query_core0.FetchStatus;
    promise: Promise<ApiTodoEntity>;
    data: undefined;
    error: Error;
    isError: true;
    isPending: false;
    isLoading: false;
    isLoadingError: true;
    isRefetchError: false;
    isSuccess: false;
    isPlaceholderData: false;
    status: 'error';
    suspense: () => Promise<_$_tanstack_query_core0.QueryObserverResult<ApiTodoEntity, Error>>;
  } | {
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isLoading: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isRefetching: boolean;
    isStale: boolean;
    isEnabled: boolean;
    refetch: (options?: _$_tanstack_query_core0.RefetchOptions) => Promise<_$_tanstack_query_core0.QueryObserverResult<ApiTodoEntity, Error>>;
    fetchStatus: _$_tanstack_query_core0.FetchStatus;
    promise: Promise<ApiTodoEntity>;
    data: undefined;
    error: null;
    isError: false;
    isPending: true;
    isLoadingError: false;
    isRefetchError: false;
    isSuccess: false;
    isPlaceholderData: false;
    status: 'pending';
    suspense: () => Promise<_$_tanstack_query_core0.QueryObserverResult<ApiTodoEntity, Error>>;
  } | {
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isRefetching: boolean;
    isStale: boolean;
    isEnabled: boolean;
    refetch: (options?: _$_tanstack_query_core0.RefetchOptions) => Promise<_$_tanstack_query_core0.QueryObserverResult<ApiTodoEntity, Error>>;
    fetchStatus: _$_tanstack_query_core0.FetchStatus;
    promise: Promise<ApiTodoEntity>;
    data: ApiTodoEntity;
    isError: false;
    error: null;
    isPending: false;
    isLoading: false;
    isLoadingError: false;
    isRefetchError: false;
    isSuccess: true;
    isPlaceholderData: true;
    status: 'success';
    suspense: () => Promise<_$_tanstack_query_core0.QueryObserverResult<ApiTodoEntity, Error>>;
  } | {
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isRefetching: boolean;
    isStale: boolean;
    isEnabled: boolean;
    refetch: (options?: _$_tanstack_query_core0.RefetchOptions) => Promise<_$_tanstack_query_core0.QueryObserverResult<ApiTodoEntity, Error>>;
    fetchStatus: _$_tanstack_query_core0.FetchStatus;
    promise: Promise<ApiTodoEntity>;
    data: ApiTodoEntity;
    error: Error;
    isError: true;
    isPending: false;
    isLoading: false;
    isLoadingError: false;
    isRefetchError: true;
    isSuccess: false;
    isPlaceholderData: false;
    status: 'error';
    suspense: () => Promise<_$_tanstack_query_core0.QueryObserverResult<ApiTodoEntity, Error>>;
  } | {
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isRefetching: boolean;
    isStale: boolean;
    isEnabled: boolean;
    refetch: (options?: _$_tanstack_query_core0.RefetchOptions) => Promise<_$_tanstack_query_core0.QueryObserverResult<ApiTodoEntity, Error>>;
    fetchStatus: _$_tanstack_query_core0.FetchStatus;
    promise: Promise<ApiTodoEntity>;
    data: ApiTodoEntity;
    error: null;
    isError: false;
    isPending: false;
    isLoading: false;
    isLoadingError: false;
    isRefetchError: false;
    isSuccess: true;
    isPlaceholderData: false;
    status: 'success';
    suspense: () => Promise<_$_tanstack_query_core0.QueryObserverResult<ApiTodoEntity, Error>>;
  } | undefined;
  addTodo(): Promise<void>;
  completeTodo(item: ApiTodoEntity): Promise<void>;
  deleteTodo(item: ApiTodoEntity): Promise<void>;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-demo/modules/demo-todo/src/.metadata/page/item.d.ts
declare namespace NSControllerPageItem {
  const paramsSchema: z.ZodObject<{
    id: z.ZodString;
  }, z.core.$strip>;
  type ParamsInput = z.input<typeof ControllerPageItemSchemaParams>;
  type ParamsOutput = z.output<typeof ControllerPageItemSchemaParams>;
  const querySchema: z.ZodObject<{}, z.core.$strip>;
  type QueryInput = z.input<typeof ControllerPageItemSchemaQuery>;
  type QueryOutput = z.output<typeof ControllerPageItemSchemaQuery>;
}
declare const ZPageItem: _$vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, _$vue.PublicProps>;
//#endregion
//#region src/suite/a-demo/modules/demo-todo/src/.metadata/page/todo.d.ts
declare const ZPageTodo: _$vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, _$vue.PublicProps>;
//#endregion
//#region src/suite/a-demo/modules/demo-todo/src/.metadata/index.d.ts
declare module 'zova-module-a-model' {
  interface IModelRecord {
    'demo-todo:todo': IModelOptionsTodo;
  }
}
declare module 'zova-module-demo-todo' {
  interface ModelTodo {}
  interface ModelTodo {
    get $beanFullName(): 'demo-todo.model.todo';
    get $onionName(): 'demo-todo:todo';
    get $onionOptions(): IModelOptionsTodo;
  }
}
/** model: end */
/** model: begin */
declare module 'zova' {
  interface IBeanRecordGeneral {
    'demo-todo.model.todo': ModelTodo;
  }
}
/** model: end */
/** api: begin */
declare module 'zova' {}
declare module 'zova-module-demo-todo' {
  interface ApiTodo {}
  interface ApiTodo {
    get $beanFullName(): 'demo-todo.api.todo';
    get $onionName(): 'demo-todo:todo';
  }
}
/** api: end */
/** api: begin */
interface IModuleApi {
  'todo': ApiTodo;
}
declare module 'zova' {
  interface IBeanRecordGeneral {
    'demo-todo.api.todo': ApiTodo;
  }
}
/** api: end */
/** openapi: begin */
/** openapi: end */
/** controller: begin */
declare module 'zova' {}
declare module 'zova-module-demo-todo' {
  interface ControllerPageItem {}
  interface ControllerPageTodo {}
}
/** controller: end */
/** controller: begin */
declare module 'zova' {
  interface IBeanRecordLocal {
    'demo-todo.controller.pageItem': ControllerPageItem;
    'demo-todo.controller.pageTodo': ControllerPageTodo;
  }
}
/** controller: end */
/** pages: begin */
declare module 'zova-module-a-router' {
  interface IPagePathRecord {
    '/demo/todo/item/:id': TypePagePathSchema<NSControllerPageItem.ParamsInput, NSControllerPageItem.QueryInput>;
    '/demo/todo/todo': TypePagePathSchema<undefined, undefined>;
  }
  interface IPageNameRecord {
    'demo-todo:item': undefined;
  }
}
declare module 'zova-module-demo-todo' {
  interface ControllerPageItem {
    $params: NSControllerPageItem.ParamsOutput;
    $query: NSControllerPageItem.QueryOutput;
  }
}
/** pages: end */
/** scope: begin */
declare class ScopeModuleDemoTodo extends BeanScopeBase {}
interface ScopeModuleDemoTodo {
  util: BeanScopeUtil;
  api: IModuleApi;
}
declare module 'zova' {
  interface IBeanScopeRecord {
    'demo-todo': ScopeModuleDemoTodo;
  }
}
/** scope: end */
//#endregion
//#region src/suite-vendor/a-zova/modules/a-app/rest/component/app.d.ts
type TypeControllerAppPublicProps = TypeRenderComponentJsxPropsPublic;
declare function BBZApp(_props: TypeControllerAppPublicProps): string;
//#endregion
//#region src/suite-vendor/a-zova/modules/a-behavior/rest/component/behavior.d.ts
type TypeControllerBehaviorPublicProps = TypeRenderComponentJsxPropsPublic & ControllerBehaviorProps;
declare function BBZBehavior(_props: TypeControllerBehaviorPublicProps): string;
//#endregion
//#region src/suite-vendor/a-zova/modules/a-currency/rest/component/formFieldCurrency.d.ts
type TypeControllerFormFieldCurrencyPublicProps = TypeRenderComponentJsxPropsPublic & ControllerFormFieldCurrencyProps;
declare function BBFCurrency(_props: TypeControllerFormFieldCurrencyPublicProps): string;
//#endregion
//#region src/suite-vendor/a-zova/modules/a-currency/rest/tableCell/currency.d.ts
declare function BBTCurrency(_props: ITableCellOptionsCurrency): string;
//#endregion
//#region src/suite-vendor/a-zova/modules/a-date/rest/component/formFieldDate.d.ts
type TypeControllerFormFieldDatePublicProps = TypeRenderComponentJsxPropsPublic & ControllerFormFieldDateProps;
declare function BBFDate(_props: TypeControllerFormFieldDatePublicProps): string;
//#endregion
//#region src/suite-vendor/a-zova/modules/a-date/rest/tableCell/date.d.ts
declare function BBTDate(_props: ITableCellOptionsDate): string;
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/rest/component/form.d.ts
type TypeControllerFormPublicProps<TFormData extends {} = {}, TSubmitMeta = never> = TypeRenderComponentJsxPropsPublic & ControllerFormProps<TFormData, TSubmitMeta>;
declare function BBZForm<TFormData extends {} = {}, TSubmitMeta = never>(_props: TypeControllerFormPublicProps<TFormData, TSubmitMeta>): string;
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/rest/component/formField.d.ts
type TypeControllerFormFieldPublicProps<TParentData extends {} = {}> = TypeRenderComponentJsxPropsPublic & ControllerFormFieldProps<TParentData>;
declare function BBZFormField<TParentData extends {} = {}>(_props: TypeControllerFormFieldPublicProps<TParentData>): string;
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/rest/component/formFieldBlank.d.ts
type TypeControllerFormFieldBlankPublicProps<TParentData extends {} = {}, TSubmitMeta = never> = TypeRenderComponentJsxPropsPublic & ControllerFormFieldBlankProps<TParentData, TSubmitMeta>;
declare function BBFFormBlank<TParentData extends {} = {}, TSubmitMeta = never>(_props: TypeControllerFormFieldBlankPublicProps<TParentData, TSubmitMeta>): string;
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/rest/component/formFieldWrapper.d.ts
type TypeControllerFormFieldWrapperPublicProps<TParentData extends {} = {}> = TypeRenderComponentJsxPropsPublic & ControllerFormFieldWrapperProps<TParentData>;
declare function BBFFormWrapper<TParentData extends {} = {}>(_props: TypeControllerFormFieldWrapperPublicProps<TParentData>): string;
//#endregion
//#region src/suite-vendor/a-zova/modules/a-icon/rest/component/icon.d.ts
type TypeControllerIconPublicProps = TypeRenderComponentJsxPropsPublic & ControllerIconProps;
declare function BBZIcon(_props: TypeControllerIconPublicProps): string;
//#endregion
//#region src/suite-vendor/a-zova/modules/a-router/rest/component/routerViewEmpty.d.ts
type TypeControllerRouterViewEmptyPublicProps = TypeRenderComponentJsxPropsPublic;
declare function BBZRouterViewEmpty(_props: TypeControllerRouterViewEmptyPublicProps): string;
//#endregion
//#region src/suite-vendor/a-zova/modules/a-table/rest/component/table.d.ts
type TypeControllerTablePublicProps$1<TData extends {} = {}> = TypeRenderComponentJsxPropsPublic & ControllerTableProps<TData>;
declare function BBZTable<TData extends {} = {}>(_props: TypeControllerTablePublicProps$1<TData>): string;
//#endregion
//#region src/suite/a-home/modules/home-base/src/service/routerGuards.d.ts
declare class ServiceRouterGuards extends BeanRouterGuardsBase {
  protected onRouterGuards(router: BeanRouter): void;
}
//#endregion
//#region src/suite/a-home/modules/home-base/src/service/ssr.d.ts
declare class ServiceSsr extends BeanBase {
  initialize(): Promise<void>;
  private _ssrErrorHandler;
}
//#endregion
//#region src/suite/a-home/modules/home-base/src/service/ssrLayout.d.ts
interface IServiceSsrLayoutOptions {
  sidebarLeftOpenPC?: boolean;
}
declare class ServiceSsrLayout extends BeanBase {
  $$scopeSsr: ScopeModuleASsr;
  options?: IServiceSsrLayoutOptions;
  protected __init__(options?: IServiceSsrLayoutOptions): Promise<void>;
  private _getJsHandlerPageContainer;
  private _getJsHandlerSidebar;
}
//#endregion
//#region src/suite/a-home/modules/home-base/src/component/itemLink/controller.d.ts
interface ControllerItemLinkProps {
  title: string;
  description?: string;
  icon?: keyof IIconRecord$1;
  href?: string;
  to?: string | object;
}
declare class ControllerItemLink extends BeanControllerBase {
  static $propsDefault: {
    description: string;
    icon: string;
  };
  _renderLink(): _$vue_jsx_runtime0.JSX.Element;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-home/modules/home-base/src/component/page/controller.d.ts
interface ControllerPageProps {}
declare class ControllerPage extends BeanControllerBase {
  static $propsDefault: {};
  cPage: string;
  protected __init__(): Promise<void>;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-home/modules/home-base/src/page/authCallback/controller.d.ts
declare const ControllerPageAuthCallbackSchemaQuery: z.ZodObject<{
  returnTo: z.ZodOptional<z.ZodString>;
  'x-vona-oauth-code': z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare class ControllerPageAuthCallback extends BeanControllerPageBase {
  protected __init__(): Promise<void>;
  private _handleAuth;
  protected render(): null;
}
//#endregion
//#region src/suite/a-home/modules/home-base/src/page/errorExpired/controller.d.ts
declare const ControllerPageErrorExpiredSchemaQuery: z.ZodObject<{
  returnTo: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare class ControllerPageErrorExpired extends BeanControllerPageBase {
  $$jwtAdapter: ServiceJwtAdapter;
  protected __init__(): Promise<void>;
  private _refreshToken;
  protected render(): null;
}
//#endregion
//#region src/suite/a-home/modules/home-base/src/page/errorNotFound/controller.d.ts
declare class ControllerPageErrorNotFound extends BeanControllerPageBase {
  cTitle: string;
  cDescription: string;
  protected __init__(): Promise<void>;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-home/modules/home-base/src/.metadata/page/authCallback.d.ts
declare namespace NSControllerPageAuthCallback {
  const querySchema: z.ZodObject<{
    returnTo: z.ZodOptional<z.ZodString>;
    'x-vona-oauth-code': z.ZodOptional<z.ZodString>;
  }, z.core.$strip>;
  type QueryInput = z.input<typeof ControllerPageAuthCallbackSchemaQuery>;
  type QueryOutput = z.output<typeof ControllerPageAuthCallbackSchemaQuery>;
}
declare const ZPageAuthCallback: _$vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, _$vue.PublicProps>;
//#endregion
//#region src/suite/a-home/modules/home-base/src/.metadata/page/errorExpired.d.ts
declare namespace NSControllerPageErrorExpired {
  const querySchema: z.ZodObject<{
    returnTo: z.ZodOptional<z.ZodString>;
  }, z.core.$strip>;
  type QueryInput = z.input<typeof ControllerPageErrorExpiredSchemaQuery>;
  type QueryOutput = z.output<typeof ControllerPageErrorExpiredSchemaQuery>;
}
declare const ZPageErrorExpired: _$vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, _$vue.PublicProps>;
//#endregion
//#region src/suite/a-home/modules/home-base/src/.metadata/page/errorNotFound.d.ts
declare const ZPageErrorNotFound: _$vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, _$vue.PublicProps>;
//#endregion
//#region src/suite/a-home/modules/home-base/src/.metadata/component/itemLink.d.ts
type TypeControllerItemLinkPublicProps = {
  controllerRef?: (ref: ControllerItemLink) => void;
} & ControllerItemLinkProps;
type ControllerInnerProps$11 = TypeControllerInnerProps<ControllerItemLinkProps, keyof typeof ControllerItemLink.$propsDefault>;
declare module 'zova-module-home-base' {
  interface ControllerItemLink {
    $props: ControllerInnerProps$11;
  }
}
declare const ZItemLink: _$vue.DefineSetupFnComponent<TypeControllerItemLinkPublicProps, _$vue.EmitsOptions, _$vue.SlotsType<Record<string, any>>, {
  controllerRef?: (ref: ControllerItemLink) => void;
} & ControllerItemLinkProps & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
}), _$vue.PublicProps>;
//#endregion
//#region src/suite/a-home/modules/home-base/src/.metadata/component/page.d.ts
type TypeControllerPagePublicProps = {
  controllerRef?: (ref: ControllerPage) => void;
} & ControllerPageProps;
type ControllerInnerProps$10 = TypeControllerInnerProps<ControllerPageProps, keyof typeof ControllerPage.$propsDefault>;
declare module 'zova-module-home-base' {
  interface ControllerPage {
    $props: ControllerInnerProps$10;
  }
}
declare const ZPage: _$vue.DefineSetupFnComponent<TypeControllerPagePublicProps, _$vue.EmitsOptions, _$vue.SlotsType<Record<string, any>>, {
  controllerRef?: (ref: ControllerPage) => void;
} & ControllerPageProps & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
}), _$vue.PublicProps>;
//#endregion
//#region src/suite/a-home/modules/home-base/src/config/config.d.ts
declare const config: (_sys: ZovaSys) => {
  layout: {
    sidebar: {
      width: number;
    };
    navbar: {
      height: number;
    };
  };
};
//#endregion
//#region src/suite/a-home/modules/home-base/src/.metadata/locales.d.ts
declare const locales$5: {
  'en-us': {
    Home: string;
  };
  'zh-cn': {
    Home: string;
  };
};
//#endregion
//#region src/suite/a-home/modules/home-base/src/monkey.d.ts
declare class Monkey extends BeanSimple implements IMonkeyAppInitialize, IMonkeyAppClose, IMonkeyBeanInit {
  serviceRouterGuards: ServiceRouterGuards;
  serviceSsr: ServiceSsr;
  appInitialize(): Promise<void>;
  appClose(): void;
  beanInit(bean: BeanContainer, beanInstance: BeanBase): Promise<void>;
}
//#endregion
//#region src/suite/a-home/modules/home-base/src/monkeySys.d.ts
declare class MonkeySys extends BeanSimple implements IMonkeyBeanInit {
  beanInit(bean: BeanContainer, beanInstance: BeanBase): Promise<void>;
}
//#endregion
//#region src/suite/a-home/modules/home-base/src/main.d.ts
declare class Main extends BeanSimple implements IModuleMain {
  moduleLoading(): Promise<void>;
  moduleLoaded(): Promise<void>;
}
//#endregion
//#region src/suite/a-home/modules/home-base/src/.metadata/index.d.ts
declare module 'zova-module-a-bean' {
  interface IServiceRecord {
    'home-base:routerGuards': never;
    'home-base:ssr': never;
    'home-base:ssrLayout': never;
  }
}
declare module 'zova-module-home-base' {
  interface ServiceRouterGuards {}
  interface ServiceRouterGuards {
    get $beanFullName(): 'home-base.service.routerGuards';
    get $onionName(): 'home-base:routerGuards';
  }
  interface ServiceSsr {}
  interface ServiceSsr {
    get $beanFullName(): 'home-base.service.ssr';
    get $onionName(): 'home-base:ssr';
  }
  interface ServiceSsrLayout {}
  interface ServiceSsrLayout {
    get $beanFullName(): 'home-base.service.ssrLayout';
    get $onionName(): 'home-base:ssrLayout';
  }
}
/** service: end */
/** service: begin */
declare module 'zova' {
  interface IBeanRecordGeneral {
    'home-base.service.routerGuards': ServiceRouterGuards;
    'home-base.service.ssr': ServiceSsr;
    'home-base.service.ssrLayout': ServiceSsrLayout;
  }
}
/** service: end */
/** controller: begin */
declare module 'zova' {}
declare module 'zova-module-home-base' {
  interface ControllerItemLink {}
  interface ControllerPage {}
  interface ControllerPageAuthCallback {}
  interface ControllerPageErrorExpired {}
  interface ControllerPageErrorNotFound {}
}
/** controller: end */
/** controller: begin */
declare module 'zova' {
  interface IBeanRecordLocal {
    'home-base.controller.itemLink': ControllerItemLink;
    'home-base.controller.page': ControllerPage;
    'home-base.controller.pageAuthCallback': ControllerPageAuthCallback;
    'home-base.controller.pageErrorExpired': ControllerPageErrorExpired;
    'home-base.controller.pageErrorNotFound': ControllerPageErrorNotFound;
  }
}
/** controller: end */
/** pages: begin */
declare module 'zova-module-a-router' {
  interface IPagePathRecord {
    '/home/base/authCallback': TypePagePathSchema<undefined, NSControllerPageAuthCallback.QueryInput>;
    '/home/base/errorExpired': TypePagePathSchema<undefined, NSControllerPageErrorExpired.QueryInput>;
    '/home/base//:catchAll(.*)*': TypePagePathSchema<undefined, undefined>;
  }
  interface IPageNameRecord {}
}
declare module 'zova-module-home-base' {
  interface ControllerPageAuthCallback {
    $query: NSControllerPageAuthCallback.QueryOutput;
  }
  interface ControllerPageErrorExpired {
    $query: NSControllerPageErrorExpired.QueryOutput;
  }
}
/** pages: end */
/** components: begin */
declare module 'zova' {
  interface IComponentRecord {
    'home-base:itemLink': ControllerItemLink;
    'home-base:page': ControllerPage;
  }
  interface IZovaComponentRecord {
    'home-base:itemLink': typeof ZItemLink;
    'home-base:page': typeof ZPage;
  }
}
/** components: end */
/** config: begin */
declare class ScopeModuleHomeBase extends BeanScopeBase {}
interface ScopeModuleHomeBase {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales$5)[TypeLocaleBase]>;
}
declare module 'zova' {
  interface IBeanScopeRecord {
    'home-base': ScopeModuleHomeBase;
  }
  interface IBeanScopeConfig {
    'home-base': ReturnType<typeof config>;
  }
  interface IBeanScopeLocale {
    'home-base': (typeof locales$5)[TypeLocaleBase];
  }
}
//#endregion
//#region src/suite/a-home/modules/home-base/src/lib/utils.d.ts
declare function definePropertyScopeBase(bean: BeanContainer, beanInstance: BeanBase): void;
//#endregion
//#region src/suite/a-home/modules/home-base/src/types/scopeBase.d.ts
declare module 'zova' {
  interface BeanBase {
    $scopeBase: ScopeModuleHomeBase;
  }
}
//#endregion
//#region src/suite/a-home/modules/home-base/rest/component/itemLink.d.ts
type TypeControllerItemLinkPublicProps$1 = TypeRenderComponentJsxPropsPublic & ControllerItemLinkProps;
declare function BBZHomeBaseItemLink(_props: TypeControllerItemLinkPublicProps$1): string;
//#endregion
//#region src/suite/a-home/modules/home-base/rest/component/page.d.ts
type TypeControllerPagePublicProps$1 = TypeRenderComponentJsxPropsPublic & ControllerPageProps;
declare function BBZHomeBasePage(_props: TypeControllerPagePublicProps$1): string;
//#endregion
//#region src/suite/a-home/modules/home-icon/src/.metadata/index.d.ts
declare const icons: {
  auth: string;
  business: string;
  daisy: string;
  default: string;
  editor: string;
  emoji: string;
  flow: string;
  login: string;
  outline: string;
  role: string;
  social: string;
  tools: string;
};
declare module 'zova-module-a-icon' {
  interface IIconRecord {
    ':auth:dingtalk-square': true;
    ':auth:github': true;
    ':auth:password': true;
    ':auth:sms': true;
    ':auth:wechat-outline': true;
    ':auth:wxwork-outline': true;
    ':business:coupon': true;
    ':business:course': true;
    ':business:distribution': true;
    ':business:hotsprings': true;
    ':business:kitchen-set': true;
    ':business:money-bag': true;
    ':business:party': true;
    ':business:provider': true;
    ':business:purchase': true;
    ':business:store': true;
    ':daisy:lock': true;
    ':daisy:person': true;
    '::add': true;
    '::alert': true;
    '::archive': true;
    '::arrow-back': true;
    '::arrow-cycle': true;
    '::arrow-down-left': true;
    '::arrow-down-right': true;
    '::arrow-down': true;
    '::arrow-drop-down': true;
    '::arrow-drop-up': true;
    '::arrow-forward': true;
    '::arrow-left': true;
    '::arrow-repeat': true;
    '::arrow-right-left': true;
    '::arrow-right': true;
    '::arrow-shuffle': true;
    '::arrow-up-down': true;
    '::arrow-up-left': true;
    '::arrow-up-right': true;
    '::arrow-up': true;
    '::article': true;
    '::asterisk': true;
    '::attachment-line': true;
    '::book': true;
    '::checkbox-checked': true;
    '::checkbox-intermediate': true;
    '::checkbox-off': true;
    '::checkbox': true;
    '::chevron-left': true;
    '::chevron-right': true;
    '::close': true;
    '::comment-dots': true;
    '::construction': true;
    '::copyright': true;
    '::cross-circle': true;
    '::dark-theme': true;
    '::dashboard': true;
    '::database': true;
    '::delete-forever': true;
    '::delete': true;
    '::developer-board': true;
    '::done': true;
    '::dot': true;
    '::draft-add': true;
    '::draft-edit': true;
    '::draft': true;
    '::drive-file-move': true;
    '::edit': true;
    '::expand-more': true;
    '::export': true;
    '::fast-forward': true;
    '::flow-chart': true;
    '::folder-open': true;
    '::folder': true;
    '::fullscreen-exit': true;
    '::fullscreen': true;
    '::grading': true;
    '::group-work': true;
    '::group': true;
    '::groups': true;
    '::heart': true;
    '::home': true;
    '::identification': true;
    '::import': true;
    '::info-circle': true;
    '::information-filled': true;
    '::information': true;
    '::label': true;
    '::language': true;
    '::layers': true;
    '::layout-columns': true;
    '::location-on': true;
    '::lock-open': true;
    '::lock': true;
    '::mail': true;
    '::mark-as-unread': true;
    '::mark-email-read': true;
    '::menu': true;
    '::message': true;
    '::module': true;
    '::more-horiz': true;
    '::none': true;
    '::notebook': true;
    '::open-in-new': true;
    '::open-with': true;
    '::people': true;
    '::person': true;
    '::play-arrow': true;
    '::popup': true;
    '::preview': true;
    '::radio-button-checked': true;
    '::radio-button-unchecked': true;
    '::redo': true;
    '::remove': true;
    '::reply': true;
    '::reset': true;
    '::round-person-add': true;
    '::save-and-return': true;
    '::save-and-submit': true;
    '::save-as-draft': true;
    '::save': true;
    '::search': true;
    '::send': true;
    '::settings': true;
    '::share': true;
    '::sort': true;
    '::star': true;
    '::stats-chart': true;
    '::stop': true;
    '::text-fields': true;
    '::timeline': true;
    '::undo': true;
    '::view-list': true;
    '::visibility': true;
    '::zoom-in': true;
    '::zoom-out': true;
    ':editor:add-box-outline': true;
    ':editor:add-box': true;
    ':editor:bookmark-outline': true;
    ':editor:bookmark': true;
    ':editor:code-block': true;
    ':editor:code': true;
    ':editor:format-align-center': true;
    ':editor:format-align-left': true;
    ':editor:format-align-right': true;
    ':editor:format-bold': true;
    ':editor:format-italic': true;
    ':editor:format-list-bulleted': true;
    ':editor:format-list-numbered': true;
    ':editor:format-quote': true;
    ':editor:format-strikethrough': true;
    ':editor:format-underlined': true;
    ':editor:grid-on': true;
    ':editor:horizontal-rule': true;
    ':editor:image-outline': true;
    ':editor:image': true;
    ':editor:insert-link-outline': true;
    ':editor:paragraph-break': true;
    ':editor:paragraph': true;
    ':editor:redo': true;
    ':editor:source-outline': true;
    ':editor:subscript': true;
    ':editor:superscript': true;
    ':editor:task-alt': true;
    ':editor:title': true;
    ':editor:undo': true;
    ':emoji:flower': true;
    ':flow:activity-none': true;
    ':flow:activity-service': true;
    ':flow:activity-user-task': true;
    ':flow:end-event-atom': true;
    ':flow:end-event-none': true;
    ':flow:gateway-exclusive': true;
    ':flow:gateway-inclusive': true;
    ':flow:gateway-parallel': true;
    ':flow:start-event-atom': true;
    ':flow:start-event-none': true;
    ':flow:start-event-timer': true;
    ':login:call-outline': true;
    ':login:chevron-left': true;
    ':login:done': true;
    ':login:lock-outline': true;
    ':login:person-outline': true;
    ':outline:add-circle-outline': true;
    ':outline:alert-outline': true;
    ':outline:apps-outline': true;
    ':outline:archive-lock-outline': true;
    ':outline:archive-outline': true;
    ':outline:article-outline': true;
    ':outline:backspace-outline': true;
    ':outline:build-circle-outline': true;
    ':outline:calendar-today-outline': true;
    ':outline:check-circle-outline': true;
    ':outline:checkbox-checked-outline': true;
    ':outline:checkbox-off-outline': true;
    ':outline:checkbox-outline': true;
    ':outline:copy-outline': true;
    ':outline:data-list-outline': true;
    ':outline:database-lock-outline': true;
    ':outline:delete-forever-outline': true;
    ':outline:delete-outline': true;
    ':outline:dict-outline': true;
    ':outline:draft-outline': true;
    ':outline:folder-transfer-outline': true;
    ':outline:group-outline': true;
    ':outline:heart-outline': true;
    ':outline:insert-emoticon-outline': true;
    ':outline:key-reset-outline': true;
    ':outline:label-outline': true;
    ':outline:layout-outline': true;
    ':outline:login-outline': true;
    ':outline:logout-outline': true;
    ':outline:mail-outline': true;
    ':outline:note-outline': true;
    ':outline:software-resource-cluster-outline': true;
    ':outline:software-resource-outline': true;
    ':outline:star-outline': true;
    ':outline:theme-outline': true;
    ':outline:timer-outline': true;
    ':outline:visibility-off-outline': true;
    ':outline:visibility-outline': true;
    ':outline:work-history-outline': true;
    ':role:collaboration': true;
    ':role:level': true;
    ':role:organization': true;
    ':role:position': true;
    ':role:relation': true;
    ':role:role': true;
    ':role:shield-key': true;
    ':role:template': true;
    ':social:cabloy': true;
    ':social:chat': true;
    ':social:facebook': true;
    ':social:github': true;
    ':social:public': true;
    ':social:record-voice-over': true;
    ':social:school': true;
    ':social:twitter': true;
    ':social:vona': true;
    ':social:zova': true;
    ':tools:pomotodo': true;
    ':tools:spreadsheet': true;
  }
}
/** icons: end */
/** scope: begin */
declare class ScopeModuleHomeIcon extends BeanScopeBase {}
interface ScopeModuleHomeIcon {
  util: BeanScopeUtil;
}
declare module 'zova' {
  interface IBeanScopeRecord {
    'home-icon': ScopeModuleHomeIcon;
  }
}
/** scope: end */
//#endregion
//#region src/suite/a-home/modules/home-layoutempty/src/component/layoutEmpty/controller.d.ts
interface ControllerLayoutEmptyProps {}
declare class ControllerLayoutEmpty extends BeanControllerBase {
  static $propsDefault: {};
  $$serviceSsrLayout: ServiceSsrLayout;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-home/modules/home-layoutempty/src/.metadata/component/layoutEmpty.d.ts
type TypeControllerLayoutEmptyPublicProps$1 = {
  controllerRef?: (ref: ControllerLayoutEmpty) => void;
} & ControllerLayoutEmptyProps;
type ControllerInnerProps$9 = TypeControllerInnerProps<ControllerLayoutEmptyProps, keyof typeof ControllerLayoutEmpty.$propsDefault>;
declare module 'zova-module-home-layoutempty' {
  interface ControllerLayoutEmpty {
    $props: ControllerInnerProps$9;
  }
}
declare const ZLayoutEmpty: _$vue.DefineSetupFnComponent<TypeControllerLayoutEmptyPublicProps$1, _$vue.EmitsOptions, _$vue.SlotsType<Record<string, any>>, {
  controllerRef?: (ref: ControllerLayoutEmpty) => void;
} & ControllerLayoutEmptyProps & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
}), _$vue.PublicProps>;
//#endregion
//#region src/suite/a-home/modules/home-layoutempty/src/.metadata/index.d.ts
declare module 'zova' {}
declare module 'zova-module-home-layoutempty' {
  interface ControllerLayoutEmpty {}
}
/** controller: end */
/** controller: begin */
declare module 'zova' {
  interface IBeanRecordLocal {
    'home-layoutempty.controller.layoutEmpty': ControllerLayoutEmpty;
  }
}
/** controller: end */
/** components: begin */
declare module 'zova' {
  interface IComponentRecord {
    'home-layoutempty:layoutEmpty': ControllerLayoutEmpty;
  }
  interface IZovaComponentRecord {
    'home-layoutempty:layoutEmpty': typeof ZLayoutEmpty;
  }
}
/** components: end */
/** scope: begin */
declare class ScopeModuleHomeLayoutempty extends BeanScopeBase {}
interface ScopeModuleHomeLayoutempty {
  util: BeanScopeUtil;
}
declare module 'zova' {
  interface IBeanScopeRecord {
    'home-layoutempty': ScopeModuleHomeLayoutempty;
  }
}
/** scope: end */
//#endregion
//#region src/suite/a-home/modules/home-layoutempty/rest/component/layoutEmpty.d.ts
type TypeControllerLayoutEmptyPublicProps = TypeRenderComponentJsxPropsPublic & ControllerLayoutEmptyProps;
declare function BBZHomeLayoutemptyLayoutEmpty(_props: TypeControllerLayoutEmptyPublicProps): string;
//#endregion
//#region src/suite/a-home/modules/home-layouttabs/src/model/layout.d.ts
interface IModelOptionsLayout extends IDecoratorModelOptions {}
declare class ModelLayout extends BeanModelBase {
  leftDrawerOpenPC: boolean;
  $$scopeSsr: ScopeModuleASsr;
  protected __init__(): Promise<void>;
}
//#endregion
//#region src/suite/a-home/modules/home-layouttabs/src/model/menu.d.ts
type TypeMenuGroup = ApiSchemaAMenuDtoMenuGroup & {
  folder: true;
  children: TypeMenuItem[];
};
type TypeMenuItem = (ApiSchemaAMenuDtoMenuItem & {
  folder: false;
}) | TypeMenuGroup;
type TypeMenuTree = TypeMenuItem[];
interface IModelOptionsMenu extends IDecoratorModelOptions {}
declare class ModelMenu extends BeanModelBase {
  menuTree?: TypeMenuTree;
  private _eventSsrHmrReload;
  protected __init__(): Promise<void>;
  protected __dispose__(): void;
  retrieveMenus(): _$vue.UnwrapNestedRefs<_$_tanstack_vue_query0.UseQueryReturnType<{
    groups?: components['schemas']['a-menu.dto.menuGroup'][] | undefined;
    menus: {
      name: string;
      title?: string | undefined;
      description?: string | undefined;
      icon?: string | undefined;
      order?: number | undefined;
      group?: string | string[] | undefined;
      separator?: boolean | undefined;
      link?: string | undefined;
      external?: boolean | undefined;
      target?: string | undefined;
      meta?: components['schemas']['a-menu.dto.menuItemMeta'];
    }[] | undefined;
  }, Error>>;
  findMenuItem(search: {
    name?: string;
    link?: string;
  }): ApiSchemaAMenuDtoMenuItem | undefined;
  private _prepareMenuTree;
}
//#endregion
//#region src/suite/a-home/modules/home-layouttabs/src/component/layoutTabs/controller.d.ts
interface ControllerLayoutTabsProps {}
declare class ControllerLayoutTabs extends BeanControllerBase {
  static $propsDefault: {};
  $$modelTabs: ModelTabs;
  $$modelMenu: ModelMenu;
  $$modelLayout: ModelLayout;
  $$serviceSsrLayout: ServiceSsrLayout;
  leftDrawerOpen: boolean;
  leftDrawerOpenMobile: boolean;
  belowBreakpoint: boolean;
  protected __init__(): Promise<void>;
  private _initTabs;
  toggleLeftDrawer(): void;
}
//#endregion
//#region src/suite/a-home/modules/home-layouttabs/src/.metadata/component/layoutTabs.d.ts
type TypeControllerLayoutTabsPublicProps$1 = {
  controllerRef?: (ref: ControllerLayoutTabs) => void;
} & ControllerLayoutTabsProps;
type ControllerInnerProps$8 = TypeControllerInnerProps<ControllerLayoutTabsProps, keyof typeof ControllerLayoutTabs.$propsDefault>;
declare module 'zova-module-home-layouttabs' {
  interface ControllerLayoutTabs {
    $props: ControllerInnerProps$8;
  }
}
declare module 'zova-module-home-layouttabs' {
  interface StyleLayoutTabs extends ControllerLayoutTabs {}
  interface RenderLayoutTabs extends StyleLayoutTabs {}
  interface RenderContent extends StyleLayoutTabs {}
  interface RenderHeader extends StyleLayoutTabs {}
  interface RenderLocale extends StyleLayoutTabs {}
  interface RenderMenu extends StyleLayoutTabs {}
  interface RenderSidebar extends StyleLayoutTabs {}
  interface RenderTabs extends StyleLayoutTabs {}
  interface RenderTheme extends StyleLayoutTabs {}
  interface RenderUser extends StyleLayoutTabs {}
}
declare const ZLayoutTabs: _$vue.DefineSetupFnComponent<TypeControllerLayoutTabsPublicProps$1, _$vue.EmitsOptions, _$vue.SlotsType<Record<string, any>>, {
  controllerRef?: (ref: ControllerLayoutTabs) => void;
} & ControllerLayoutTabsProps & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
}), _$vue.PublicProps>;
//#endregion
//#region src/suite/a-home/modules/home-layouttabs/src/component/layoutTabs/render.header.d.ts
declare class RenderHeader extends BeanRenderBase {
  $$r: RenderLayoutTabs;
  render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-home/modules/home-layouttabs/src/component/layoutTabs/render.locale.d.ts
declare class RenderLocale extends BeanRenderBase {
  render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-home/modules/home-layouttabs/src/component/layoutTabs/render.menu.d.ts
declare class RenderMenu extends BeanRenderBase {
  _renderMenuItem(item: TypeMenuItem): _$vue_jsx_runtime0.JSX.Element;
  _renderMenuItems(items?: TypeMenuTree): VNode<_$vue.RendererNode, _$vue.RendererElement, {
    [key: string]: any;
  }>[] | undefined;
  render(): _$vue_jsx_runtime0.JSX.Element | undefined;
}
//#endregion
//#region src/suite/a-home/modules/home-layouttabs/src/component/layoutTabs/render.sidebar.d.ts
declare class RenderSidebar extends BeanRenderBase {
  $$r: RenderLayoutTabs;
  render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-home/modules/home-layouttabs/src/component/layoutTabs/render.tabs.d.ts
declare class RenderTabs extends BeanRenderBase {
  renderTabs(): _$vue_jsx_runtime0.JSX.Element | undefined;
  renderTabItems(): _$vue_jsx_runtime0.JSX.Element | undefined;
  getTabIcon(tab: RouteTab): string;
  getTabItemIcon(tabItem: IRouteViewRouteItem): keyof IIconRecord$1 | '';
  _renderRouterViewTabs(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-home/modules/home-layouttabs/src/component/layoutTabs/render.theme.d.ts
declare class RenderTheme extends BeanRenderBase {
  renderThemeDark(): _$vue_jsx_runtime0.JSX.Element;
  renderThemeName(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-home/modules/home-layouttabs/src/component/layoutTabs/render.user.d.ts
declare class RenderUser extends BeanRenderBase {
  render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-home/modules/home-layouttabs/src/component/layoutTabs/render.d.ts
declare class RenderLayoutTabs extends BeanRenderBase {
  $$renderHeader: RenderHeader;
  $$renderContent: RenderContent;
  $$renderSidebar: RenderSidebar;
  $$renderMenu: RenderMenu;
  $$renderTabs: RenderTabs;
  $$renderTheme: RenderTheme;
  $$renderLocale: RenderLocale;
  $$renderUser: RenderUser;
  render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-home/modules/home-layouttabs/src/component/layoutTabs/render.content.d.ts
declare class RenderContent extends BeanRenderBase {
  $$r: RenderLayoutTabs;
  render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-home/modules/home-layouttabs/src/component/layoutTabs/style.d.ts
declare class StyleLayoutTabs$1 extends BeanStyleBase {
  cTab: string;
  protected __init__(): Promise<void>;
}
//#endregion
//#region src/suite/a-home/modules/home-layouttabs/src/config/config.d.ts
declare const config$1: (_sys: ZovaSys) => {
  tabs: {
    scene: string;
    max: number;
    maxItems: number;
    cache: boolean;
  };
  tabItem: {
    maxWidth: string;
  };
};
//#endregion
//#region src/suite/a-home/modules/home-layouttabs/src/.metadata/locales.d.ts
declare const locales$4: {
  'en-us': {
    Home: string;
    Logout: string;
    LanguageEnglish: string;
    LanguageChinese: string;
    ThemeLight: string;
    ThemeDark: string;
    ThemeAuto: string;
    ThemeDefault: string;
    ThemeOrange: string;
    Basic: string;
    Business: string;
    State: string;
    Component: string;
    'Route Query': string;
    'Route Query(2)': string;
    'Route Params': string;
    Locale: string;
    'Todo: CRUD': string;
    Docs: string;
  };
  'zh-cn': {
    Home: string;
    Logout: string;
    LanguageEnglish: string;
    LanguageChinese: string;
    ThemeLight: string;
    ThemeDark: string;
    ThemeAuto: string;
    ThemeDefault: string;
    ThemeOrange: string;
    Basic: string;
    Business: string;
    State: string;
    Component: string;
    'Route Query': string;
    'Route Query(2)': string;
    'Route Params': string;
    Locale: string;
    'Todo: CRUD': string;
    Docs: string;
  };
};
//#endregion
//#region src/suite/a-home/modules/home-layouttabs/src/.metadata/index.d.ts
declare module 'zova-module-a-model' {
  interface IModelRecord {
    'home-layouttabs:layout': IModelOptionsLayout;
    'home-layouttabs:menu': IModelOptionsMenu;
  }
}
declare module 'zova-module-home-layouttabs' {
  interface ModelLayout {}
  interface ModelLayout {
    get $beanFullName(): 'home-layouttabs.model.layout';
    get $onionName(): 'home-layouttabs:layout';
    get $onionOptions(): IModelOptionsLayout;
  }
  interface ModelMenu {}
  interface ModelMenu {
    get $beanFullName(): 'home-layouttabs.model.menu';
    get $onionName(): 'home-layouttabs:menu';
    get $onionOptions(): IModelOptionsMenu;
  }
}
/** model: end */
/** model: begin */
declare module 'zova' {
  interface IBeanRecordGeneral {
    'home-layouttabs.model.layout': ModelLayout;
    'home-layouttabs.model.menu': ModelMenu;
  }
}
/** model: end */
/** controller: begin */
declare module 'zova' {}
declare module 'zova-module-home-layouttabs' {
  interface ControllerLayoutTabs {}
}
/** controller: end */
/** controller: begin */
declare module 'zova' {
  interface IBeanRecordLocal {
    'home-layouttabs.controller.layoutTabs': ControllerLayoutTabs;
  }
}
/** controller: end */
/** components: begin */
declare module 'zova' {
  interface IComponentRecord {
    'home-layouttabs:layoutTabs': ControllerLayoutTabs;
  }
  interface IZovaComponentRecord {
    'home-layouttabs:layoutTabs': typeof ZLayoutTabs;
  }
}
/** components: end */
/** render: begin */
declare module 'zova' {}
declare module 'zova-module-home-layouttabs' {
  interface RenderContent {}
  interface RenderHeader {}
  interface RenderLocale {}
  interface RenderMenu {}
  interface RenderSidebar {}
  interface RenderTabs {}
  interface RenderTheme {}
  interface RenderLayoutTabs {}
  interface RenderUser {}
}
/** render: end */
/** render: begin */
declare module 'zova' {
  interface IBeanRecordLocal {
    'home-layouttabs.render.content': RenderContent;
    'home-layouttabs.render.header': RenderHeader;
    'home-layouttabs.render.locale': RenderLocale;
    'home-layouttabs.render.menu': RenderMenu;
    'home-layouttabs.render.sidebar': RenderSidebar;
    'home-layouttabs.render.tabs': RenderTabs;
    'home-layouttabs.render.theme': RenderTheme;
    'home-layouttabs.render.layoutTabs': RenderLayoutTabs;
    'home-layouttabs.render.user': RenderUser;
  }
}
/** render: end */
/** style: begin */
declare module 'zova' {}
declare module 'zova-module-home-layouttabs' {
  interface StyleLayoutTabs {}
}
/** style: end */
/** style: begin */
declare module 'zova' {
  interface IBeanRecordLocal {
    'home-layouttabs.style.layoutTabs': StyleLayoutTabs$1;
  }
}
/** style: end */
/** config: begin */
declare class ScopeModuleHomeLayouttabs extends BeanScopeBase {}
interface ScopeModuleHomeLayouttabs {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config$1>;
  locale: TypeModuleLocales<(typeof locales$4)[TypeLocaleBase]>;
}
declare module 'zova' {
  interface IBeanScopeRecord {
    'home-layouttabs': ScopeModuleHomeLayouttabs;
  }
  interface IBeanScopeConfig {
    'home-layouttabs': ReturnType<typeof config$1>;
  }
  interface IBeanScopeLocale {
    'home-layouttabs': (typeof locales$4)[TypeLocaleBase];
  }
}
//#endregion
//#region src/suite/a-home/modules/home-layouttabs/rest/component/layoutTabs.d.ts
type TypeControllerLayoutTabsPublicProps = TypeRenderComponentJsxPropsPublic & ControllerLayoutTabsProps;
declare function BBZHomeLayouttabsLayoutTabs(_props: TypeControllerLayoutTabsPublicProps): string;
//#endregion
//#region src/suite/a-home/modules/home-login/src/page/login/controller.d.ts
declare class ControllerPageLogin$1 extends BeanControllerPageBase {
  user: ApiApiHomeUserPassportloginRequestBody;
  protected __init__(): Promise<void>;
  get schema(): _$openapi3_ts_oas310.SchemaObject | undefined;
  onSubmitLogin(data: TypeFormOnSubmitData<ApiApiHomeUserPassportloginRequestBody>): Promise<void>;
  onSubmitLoginGitHub(): Promise<void>;
}
//#endregion
//#region src/suite/a-home/modules/home-login/src/.metadata/page/login.d.ts
declare module 'zova-module-home-login' {
  interface RenderPageLogin extends ControllerPageLogin {}
}
declare const ZPageLogin: _$vue.DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, _$vue.PublicProps>;
//#endregion
//#region src/suite/a-home/modules/home-login/src/page/login/render.d.ts
declare class RenderPageLogin extends BeanRenderBase {
  render(): _$vue_jsx_runtime0.JSX.Element;
  _renderLandingInfo(): _$vue_jsx_runtime0.JSX.Element;
  _renderForm(): _$vue_jsx_runtime0.JSX.Element;
  _renderGithub(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/a-home/modules/home-login/src/bean/behavior.formFieldLayoutLogin.d.ts
interface IBehaviorPropsInputFormFieldLayoutLogin extends IFormFieldRenderContext {}
interface IBehaviorPropsOutputFormFieldLayoutLogin extends IBehaviorPropsInputFormFieldLayoutLogin {}
interface IBehaviorOptionsFormFieldLayoutLogin extends IDecoratorBehaviorOptions {}
declare class BehaviorFormFieldLayoutLogin extends BeanBehaviorBase<IBehaviorOptionsFormFieldLayoutLogin, IBehaviorPropsInputFormFieldLayoutLogin, IBehaviorPropsOutputFormFieldLayoutLogin> {
  $$formField: ControllerFormField;
  protected render(renderContext: IBehaviorPropsInputFormFieldLayoutLogin, next: NextBehavior<IBehaviorPropsOutputFormFieldLayoutLogin>): VNode;
}
//#endregion
//#region src/suite/a-home/modules/home-login/src/.metadata/locales.d.ts
declare const locales$3: {
  'en-us': {
    YourUsername: string;
    YourPassword: string;
    Login: string;
    LoginGitHub: string;
  };
  'zh-cn': {
    YourUsername: string;
    YourPassword: string;
    Login: string;
    LoginGitHub: string;
  };
};
//#endregion
//#region src/suite/a-home/modules/home-login/src/.metadata/index.d.ts
declare module 'zova' {}
declare module 'zova-module-home-login' {
  interface ControllerPageLogin {}
}
/** controller: end */
/** controller: begin */
declare module 'zova' {
  interface IBeanRecordLocal {
    'home-login.controller.pageLogin': ControllerPageLogin$1;
  }
}
/** controller: end */
/** pages: begin */
declare module 'zova-module-a-router' {
  interface IPagePathRecord {
    '/home/login': TypePagePathSchema<undefined, undefined>;
  }
  interface IPageNameRecord {}
}
declare module 'zova-module-home-login' {}
/** pages: end */
/** render: begin */
declare module 'zova' {}
declare module 'zova-module-home-login' {
  interface RenderPageLogin {}
}
/** render: end */
/** render: begin */
declare module 'zova' {
  interface IBeanRecordLocal {
    'home-login.render.pageLogin': RenderPageLogin;
  }
}
/** render: end */
/** behavior: begin */
declare module 'zova-module-a-behavior' {
  interface IBehaviorRecord {
    'home-login:formFieldLayoutLogin': IBehaviorOptionsFormFieldLayoutLogin;
  }
}
declare module 'zova-module-home-login' {
  interface BehaviorFormFieldLayoutLogin {}
  interface BehaviorFormFieldLayoutLogin {
    get $beanFullName(): 'home-login.behavior.formFieldLayoutLogin';
    get $onionName(): 'home-login:formFieldLayoutLogin';
    get $onionOptions(): IBehaviorOptionsFormFieldLayoutLogin;
  }
}
/** behavior: end */
/** behavior: begin */
declare module 'zova' {
  interface IBeanRecordLocal {
    'home-login.behavior.formFieldLayoutLogin': BehaviorFormFieldLayoutLogin;
  }
}
/** behavior: end */
/** behaviors: begin */
declare module 'vue' {
  interface InputHTMLAttributes {
    'bs-home-login-formFieldLayoutLogin'?: IBehaviorOptionsFormFieldLayoutLogin | '' | boolean;
  }
}
declare module 'vue/jsx-runtime' {
  namespace JSX {
    interface IntrinsicAttributes {
      'bs-home-login-formFieldLayoutLogin'?: IBehaviorOptionsFormFieldLayoutLogin | '' | boolean;
    }
  }
}
/** behaviors: end */
/** locale: begin */
declare class ScopeModuleHomeLogin extends BeanScopeBase {}
interface ScopeModuleHomeLogin {
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales$3)[TypeLocaleBase]>;
}
declare module 'zova' {
  interface IBeanScopeRecord {
    'home-login': ScopeModuleHomeLogin;
  }
  interface IBeanScopeLocale {
    'home-login': (typeof locales$3)[TypeLocaleBase];
  }
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-captcha/src/.metadata/locales.d.ts
declare const locales$2: {
  'en-us': {
    InputCaptcha: string;
  };
  'zh-cn': {
    InputCaptcha: string;
  };
};
//#endregion
//#region src/suite/cabloy-basic/modules/basic-openapi/src/.metadata/index.d.ts
declare class ScopeModuleBasicOpenapi extends BeanScopeBase {}
interface ScopeModuleBasicOpenapi {
  util: BeanScopeUtil;
}
declare module 'zova' {
  interface IBeanScopeRecord {
    'basic-openapi': ScopeModuleBasicOpenapi;
  }
}
/** scope: end */
//#endregion
//#region node_modules/.pnpm/@zhennann+currency@2.0.4/node_modules/@zhennann/currency/dist/index.d.ts
interface CurrencyOptions {
  fixed?: number;
  exp?: number;
  zero?: number;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-openapi/src/types/captcha.d.ts
interface ICaptchaSceneRecord {
  'captcha-simple:simple': never;
}
interface ICaptchaOptions {
  scene?: keyof ICaptchaSceneRecord;
}
interface ICaptchaProviderRecord {}
interface ICaptchaData {
  id: string;
  provider: keyof ICaptchaProviderRecord | string;
  token?: unknown;
  payload?: unknown;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-openapi/src/types/date.d.ts
type TypeDateFormatPreset = 'DATE_SHORT' | 'DATE_MED' | 'DATE_MED_WITH_WEEKDAY' | 'DATE_FULL' | 'DATE_HUGE' | 'TIME_SIMPLE' | 'TIME_WITH_SECONDS' | 'TIME_WITH_SHORT_OFFSET' | 'TIME_WITH_LONG_OFFSET' | 'TIME_24_SIMPLE' | 'TIME_24_WITH_SECONDS' | 'TIME_24_WITH_SHORT_OFFSET' | 'TIME_24_WITH_LONG_OFFSET' | 'DATETIME_SHORT' | 'DATETIME_MED' | 'DATETIME_MED_WITH_WEEKDAY' | 'DATETIME_FULL' | 'DATETIME_HUGE' | 'DATETIME_SHORT_WITH_SECONDS' | 'DATETIME_MED_WITH_SECONDS' | 'DATETIME_FULL_WITH_SECONDS' | 'DATETIME_HUGE_WITH_SECONDS';
interface IDateOptions {
  preset?: TypeDateFormatPreset;
  format?: string;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-openapi/src/types/dateRange.d.ts
interface IDateRangeOptions {
  separator?: string;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-openapi/src/types/input.d.ts
type HTMLInputElementType = 'text' | 'password' | 'number' | 'file' | 'hidden' | 'tel' | 'email';
interface IInputOptions {
  class?: any;
  value?: any;
  type?: HTMLInputElementType;
  readonly?: boolean;
  placeholder?: string;
  onChange?: (e: Event) => void;
  onInput?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-openapi/src/types/select.d.ts
interface ISelectChipsOptions {
  column?: boolean;
  filter?: boolean;
  selectedClass?: string;
}
interface ISelectOptions {
  mode?: 'default' | 'chips';
  chipsOptions?: ISelectChipsOptions;
  multiple?: boolean;
  chips?: boolean;
  items?: any[];
  itemTitle?: string;
  itemValue?: string;
  itemProps?: string;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-openapi/src/types/resourcePicker.d.ts
interface IResourcePickerOptions {
  resource?: string;
  actionPath?: string;
  query?: ITableQuery;
  selectOptions?: ISelectOptions;
  relation?: string;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-openapi/src/types/textarea.d.ts
interface ITextareaOptions {
  autoGrow?: boolean;
  maxRows?: number;
  maxHeight?: number;
  noResize?: boolean;
  rows?: number;
  color?: string;
  bgColor?: string;
  counter?: string | number | true;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-openapi/src/types/toggle.d.ts
interface IToggleOptions {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-openapi/src/types/actions.d.ts
declare module 'zova-module-a-openapi' {
  /** table */
  interface IResourceActionTableRecord {
    create?: never;
    operationsTable?: never;
  }
  /** row */
  interface IResourceActionRowRecord {
    view?: never;
    update?: never;
    delete?: never;
    operationsRow?: never;
  }
}
interface IResourceActionComponentRowRecord {
  actionView?: IResourceActionRowOptionsView;
  actionUpdate?: IResourceActionRowOptionsUpdate;
  actionDelete?: IResourceActionRowOptionsDelete;
  actionOperationsRow?: IResourceActionRowOptionsOperationsRow;
}
interface IResourceActionRowOptionsView extends IResourceActionRowOptionsBase {}
interface IResourceActionRowOptionsUpdate extends IResourceActionRowOptionsBase {}
interface IResourceActionRowOptionsDelete extends IResourceActionRowOptionsBase {}
interface IResourceActionRowOptionsOperationsRow extends IResourceActionRowOptionsBase {}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-openapi/src/types/preset.d.ts
declare module 'zova-module-a-openapi' {
  interface ISchemaRenderComponentPresetRecord extends IResourceActionComponentRowRecord {
    input?: IInputOptions;
    captcha?: ICaptchaOptions;
    currency?: CurrencyOptions;
    date?: IDateOptions;
    dateRange?: IDateRangeOptions;
    toggle?: IToggleOptions;
    select?: ISelectOptions;
    textarea?: ITextareaOptions;
    resourcePicker?: IResourcePickerOptions;
  }
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-openapi/src/types/fieldLayout.d.ts
declare module 'zova-module-a-openapi' {
  interface ISchemaRenderComponentLayoutOptions {
    class?: any;
    label?: string | false;
    inline?: boolean;
    bordered?: boolean;
    floating?: boolean;
    iconPrefix?: keyof IIconRecord$1;
    iconSuffix?: keyof IIconRecord$1;
    header?: TypeRenderComponentJsx | string;
    footer?: TypeRenderComponentJsx | string;
  }
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-captcha/src/component/formFieldCaptcha/controller.d.ts
interface ControllerFormFieldCaptchaProps extends IFormFieldPresetOptions {}
declare class ControllerFormFieldCaptcha extends BeanControllerBase {
  static $propsDefault: {};
  static $componentOptions: IComponentOptions;
  eventFormSubmission: TypeEventOff;
  captchaData?: ICaptchaData;
  $$v: ToolV;
  $$form: ControllerForm;
  protected __init__(): Promise<void>;
  protected __dispose__(): void;
  get captchaScene(): "captcha-simple:simple";
  private createCaptchaData;
  private refreshCaptchaData;
  private setFieldCaptchaData;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-captcha/src/.metadata/component/formFieldCaptcha.d.ts
type TypeControllerFormFieldCaptchaPublicProps$1 = {
  controllerRef?: (ref: ControllerFormFieldCaptcha) => void;
} & ControllerFormFieldCaptchaProps;
type ControllerInnerProps$7 = TypeControllerInnerProps<ControllerFormFieldCaptchaProps, keyof typeof ControllerFormFieldCaptcha.$propsDefault>;
declare module 'zova-module-basic-captcha' {
  interface ControllerFormFieldCaptcha {
    $props: ControllerInnerProps$7;
  }
}
declare const ZFormFieldCaptcha: _$vue.DefineSetupFnComponent<TypeControllerFormFieldCaptchaPublicProps$1, _$vue.EmitsOptions, _$vue.SlotsType<Record<string, any>>, {
  controllerRef?: (ref: ControllerFormFieldCaptcha) => void;
} & ControllerFormFieldCaptchaProps & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
}), _$vue.PublicProps>;
//#endregion
//#region src/suite/cabloy-basic/modules/basic-captcha/src/.metadata/index.d.ts
declare module 'zova' {}
declare module 'zova-module-basic-captcha' {
  interface ControllerFormFieldCaptcha {}
}
/** controller: end */
/** controller: begin */
declare module 'zova' {
  interface IBeanRecordLocal {
    'basic-captcha.controller.formFieldCaptcha': ControllerFormFieldCaptcha;
  }
}
/** controller: end */
/** components: begin */
declare module 'zova' {
  interface IComponentRecord {
    'basic-captcha:formFieldCaptcha': ControllerFormFieldCaptcha;
  }
  interface IZovaComponentRecord {
    'basic-captcha:formFieldCaptcha': typeof ZFormFieldCaptcha;
  }
}
/** components: end */
/** locale: begin */
declare class ScopeModuleBasicCaptcha extends BeanScopeBase {}
interface ScopeModuleBasicCaptcha {
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales$2)[TypeLocaleBase]>;
}
declare module 'zova' {
  interface IBeanScopeRecord {
    'basic-captcha': ScopeModuleBasicCaptcha;
  }
  interface IBeanScopeLocale {
    'basic-captcha': (typeof locales$2)[TypeLocaleBase];
  }
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-captcha/rest/component/formFieldCaptcha.d.ts
type TypeControllerFormFieldCaptchaPublicProps = TypeRenderComponentJsxPropsPublic & ControllerFormFieldCaptchaProps;
declare function BBFBasicCaptcha(_props: TypeControllerFormFieldCaptchaPublicProps): string;
//#endregion
//#region src/suite/cabloy-basic/modules/basic-date/src/component/dateRange/controller.d.ts
interface ControllerDateRangeProps {
  separator?: string;
}
interface ControllerDateRangeModels {
  vModel?: string | undefined;
}
declare class ControllerDateRange extends BeanControllerBase {
  static $propsDefault: {
    separator: string;
  };
  private cSeparator;
  modelValue: string | undefined;
  protected __init__(): Promise<void>;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
  _parseValue(value?: string): string[];
  _combineValue(dateStartStr: string | undefined, dateEndStr: string | undefined): string | undefined;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-date/src/component/formFieldDateRange/controller.d.ts
interface ControllerFormFieldDateRangeProps extends IFormFieldPresetOptions {}
declare class ControllerFormFieldDateRange extends BeanControllerBase {
  static $propsDefault: {};
  static $componentOptions: IComponentOptions;
  cContainer: string;
  protected __init__(): Promise<void>;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-date/src/.metadata/component/dateRange.d.ts
type TypeControllerDateRangePublicProps$1 = {
  controllerRef?: (ref: ControllerDateRange) => void;
} & ControllerDateRangeProps & ControllerDateRangeModels & { [KEY in keyof ControllerDateRangeModels as TypePropValueFromModel<KEY>]: ControllerDateRangeModels[KEY] } & { [KEY in keyof ControllerDateRangeModels as TypePropUpdateFromModel<KEY>]: (value: ControllerDateRangeModels[KEY]) => void };
type TypeModelArguments = { [KEY in keyof ControllerDateRangeModels as TypePropValueFromModel<KEY>]: ControllerDateRangeModels[KEY] };
type ControllerInnerProps$6 = TypeControllerInnerProps<ControllerDateRangeProps & { [KEY in keyof ControllerDateRangeModels as TypePropValueFromModel<KEY>]: ControllerDateRangeModels[KEY] }, keyof typeof ControllerDateRange.$propsDefault>;
declare module 'zova-module-basic-date' {
  interface ControllerDateRange {
    $props: ControllerInnerProps$6;
    $useModel<K extends keyof TypeModelArguments>(name: K, options?: DefineModelOptions<TypeModelArguments[K]>): ControllerInnerProps$6[K];
  }
}
declare const ZDateRange: _$vue.DefineSetupFnComponent<TypeControllerDateRangePublicProps$1, _$vue.EmitsOptions, _$vue.SlotsType<Record<string, any>>, {
  controllerRef?: (ref: ControllerDateRange) => void;
} & ControllerDateRangeProps & ControllerDateRangeModels & {
  modelValue?: string | undefined;
} & {
  "onUpdate:modelValue"?: ((value: string | undefined) => void) | undefined;
} & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
}), _$vue.PublicProps>;
//#endregion
//#region src/suite/cabloy-basic/modules/basic-date/src/.metadata/component/formFieldDateRange.d.ts
type TypeControllerFormFieldDateRangePublicProps$1 = {
  controllerRef?: (ref: ControllerFormFieldDateRange) => void;
} & ControllerFormFieldDateRangeProps;
type ControllerInnerProps$5 = TypeControllerInnerProps<ControllerFormFieldDateRangeProps, keyof typeof ControllerFormFieldDateRange.$propsDefault>;
declare module 'zova-module-basic-date' {
  interface ControllerFormFieldDateRange {
    $props: ControllerInnerProps$5;
  }
}
declare const ZFormFieldDateRange: _$vue.DefineSetupFnComponent<TypeControllerFormFieldDateRangePublicProps$1, _$vue.EmitsOptions, _$vue.SlotsType<Record<string, any>>, {
  controllerRef?: (ref: ControllerFormFieldDateRange) => void;
} & ControllerFormFieldDateRangeProps & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
}), _$vue.PublicProps>;
//#endregion
//#region src/suite/cabloy-basic/modules/basic-date/src/.metadata/index.d.ts
declare module 'zova' {}
declare module 'zova-module-basic-date' {
  interface ControllerDateRange {}
  interface ControllerFormFieldDateRange {}
}
/** controller: end */
/** controller: begin */
declare module 'zova' {
  interface IBeanRecordLocal {
    'basic-date.controller.dateRange': ControllerDateRange;
    'basic-date.controller.formFieldDateRange': ControllerFormFieldDateRange;
  }
}
/** controller: end */
/** components: begin */
declare module 'zova' {
  interface IComponentRecord {
    'basic-date:dateRange': ControllerDateRange;
    'basic-date:formFieldDateRange': ControllerFormFieldDateRange;
  }
  interface IZovaComponentRecord {
    'basic-date:dateRange': typeof ZDateRange;
    'basic-date:formFieldDateRange': typeof ZFormFieldDateRange;
  }
}
/** components: end */
/** scope: begin */
declare class ScopeModuleBasicDate extends BeanScopeBase {}
interface ScopeModuleBasicDate {
  util: BeanScopeUtil;
}
declare module 'zova' {
  interface IBeanScopeRecord {
    'basic-date': ScopeModuleBasicDate;
  }
}
/** scope: end */
//#endregion
//#region src/suite/cabloy-basic/modules/basic-date/rest/component/dateRange.d.ts
type TypeControllerDateRangePublicProps = TypeRenderComponentJsxPropsPublic & ControllerDateRangeProps & ControllerDateRangeModels & { [KEY in keyof ControllerDateRangeModels as TypePropValueFromModel<KEY>]: ControllerDateRangeModels[KEY] } & { [KEY in keyof ControllerDateRangeModels as TypePropUpdateFromModel<KEY>]: (value: ControllerDateRangeModels[KEY]) => void };
declare function BBZBasicDateRange(_props: TypeControllerDateRangePublicProps): string;
//#endregion
//#region src/suite/cabloy-basic/modules/basic-date/rest/component/formFieldDateRange.d.ts
type TypeControllerFormFieldDateRangePublicProps = TypeRenderComponentJsxPropsPublic & ControllerFormFieldDateRangeProps;
declare function BBFBasicDateRange(_props: TypeControllerFormFieldDateRangePublicProps): string;
//#endregion
//#region src/suite/cabloy-basic/modules/basic-input/src/component/formFieldInput/controller.d.ts
interface ControllerFormFieldInputProps extends IFormFieldPresetOptions {}
declare class ControllerFormFieldInput extends BeanControllerBase {
  static $propsDefault: {};
  static $componentOptions: IComponentOptions;
  protected __init__(): Promise<void>;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-input/src/.metadata/component/formFieldInput.d.ts
type TypeControllerFormFieldInputPublicProps$1 = {
  controllerRef?: (ref: ControllerFormFieldInput) => void;
} & ControllerFormFieldInputProps;
type ControllerInnerProps$4 = TypeControllerInnerProps<ControllerFormFieldInputProps, keyof typeof ControllerFormFieldInput.$propsDefault>;
declare module 'zova-module-basic-input' {
  interface ControllerFormFieldInput {
    $props: ControllerInnerProps$4;
  }
}
declare const ZFormFieldInput: _$vue.DefineSetupFnComponent<TypeControllerFormFieldInputPublicProps$1, _$vue.EmitsOptions, _$vue.SlotsType<Record<string, any>>, {
  controllerRef?: (ref: ControllerFormFieldInput) => void;
} & ControllerFormFieldInputProps & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
}), _$vue.PublicProps>;
//#endregion
//#region src/suite/cabloy-basic/modules/basic-input/src/.metadata/index.d.ts
declare module 'zova' {}
declare module 'zova-module-basic-input' {
  interface ControllerFormFieldInput {}
}
/** controller: end */
/** controller: begin */
declare module 'zova' {
  interface IBeanRecordLocal {
    'basic-input.controller.formFieldInput': ControllerFormFieldInput;
  }
}
/** controller: end */
/** components: begin */
declare module 'zova' {
  interface IComponentRecord {
    'basic-input:formFieldInput': ControllerFormFieldInput;
  }
  interface IZovaComponentRecord {
    'basic-input:formFieldInput': typeof ZFormFieldInput;
  }
}
/** components: end */
/** scope: begin */
declare class ScopeModuleBasicInput extends BeanScopeBase {}
interface ScopeModuleBasicInput {
  util: BeanScopeUtil;
}
declare module 'zova' {
  interface IBeanScopeRecord {
    'basic-input': ScopeModuleBasicInput;
  }
}
/** scope: end */
//#endregion
//#region src/suite/cabloy-basic/modules/basic-input/rest/component/formFieldInput.d.ts
type TypeControllerFormFieldInputPublicProps = TypeRenderComponentJsxPropsPublic & ControllerFormFieldInputProps;
declare function BBFBasicInput(_props: TypeControllerFormFieldInputPublicProps): string;
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/types/page.d.ts
interface IPageScope extends IPageWrapperScope {}
interface IJsxRenderContextPage<TData extends {} = {}> extends IJsxRenderContextBase {
  $celScope: IPageScope;
  $$page: ControllerRestPage<TData>;
}
declare module 'zova-module-a-table' {
  interface ITableScope extends IPageScope {}
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/component/restPage/controller.d.ts
interface ControllerRestPageProps<TData extends {} = {}> {
  showFilter?: boolean;
}
declare class ControllerRestPage<TData extends {} = {}> extends BeanControllerTableBase {
  static $propsDefault: {
    showFilter: boolean;
  };
  queryFilterData: {};
  queryPaged: ITablePaged;
  query: ITableQuery;
  $$pageWrapper: ControllerPageResource;
  $$modelResource: ModelResource<TData>;
  protected __init__(): Promise<void>;
  get resource(): string;
  get tableProvider(): _$zova_module_a_table0.ITableProvider;
  get pageScope(): IPageScope;
  get zovaJsx(): _$zova_jsx0.ZovaJsx;
  get pageCelEnv(): typeof celEnvBase;
  getJsxRenderContextPage(celScope: IPageScope): IJsxRenderContextPage<TData>;
  get queryData(): _$vue.UnwrapNestedRefs<_$_tanstack_vue_query0.UseQueryReturnType<_$zova_module_a_openapi0.ITableRes<TData>, Error>>;
  get data(): TData[] | undefined;
  get paged(): ITableResPaged | undefined;
  get schema(): _$openapi3_ts_oas310.SchemaObject | undefined;
  get permissions(): _$zova_module_a_openapi0.TypeOpenapiPermissions | undefined;
  getColumns(next: TypeTableGetColumnsNext<TData>, $$table: ControllerTable<TData>): Promise<_$zova_module_a_table0.TypeColumn<TData>[]>;
  gotoPage(pageNo: number): void;
  onFilter(data: any): void;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/types/pageEntry.d.ts
interface IPageEntryScope extends IPageEntryWrapperScope {}
interface IJsxRenderContextPageEntry<TData extends {} = {}> extends IJsxRenderContextBase {
  $celScope: IPageEntryScope;
  $$pageEntry: ControllerRestPageEntry<TData>;
}
declare module 'zova-module-a-form' {
  interface IFormScope extends IPageEntryScope {}
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/component/restPageEntry/controller.d.ts
interface ControllerRestPageEntryProps<TData extends {} = {}> {
  toolbarPosition?: 'top' | 'bottom';
}
declare class ControllerRestPageEntry<TData extends {} = {}> extends BeanControllerBase {
  static $propsDefault: {
    toolbarPosition: string;
  };
  controllerForm: ControllerForm<TData>;
  formSchema?: SchemaObject;
  formData?: TData;
  $$pageEntryWrapper: ControllerPageEntry;
  $$modelResource: ModelResource<TData>;
  protected __init__(): Promise<void>;
  get formProvider(): _$zova_module_a_form0.IFormProvider;
  get pageEntryScope(): IPageEntryScope;
  get zovaJsx(): _$zova_jsx0.ZovaJsx;
  get pageEntryCelEnv(): typeof celEnvBase;
  getJsxRenderContextPageEntry(celScope: IPageEntryScope): IJsxRenderContextPageEntry<TData>;
  get resource(): string;
  get entryId(): string | undefined;
  get formMeta(): _$zova_module_a_form0.IFormMeta;
  get queryData(): {
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isRefetching: boolean;
    isStale: boolean;
    isEnabled: boolean;
    refetch: (options?: _$_tanstack_query_core0.RefetchOptions) => Promise<_$_tanstack_query_core0.QueryObserverResult<NonNullable<Awaited<TData>> | null, Error>>;
    fetchStatus: _$_tanstack_query_core0.FetchStatus;
    promise: Promise<NonNullable<Awaited<TData>> | null>;
    data: undefined;
    error: Error;
    isError: true;
    isPending: false;
    isLoading: false;
    isLoadingError: true;
    isRefetchError: false;
    isSuccess: false;
    isPlaceholderData: false;
    status: 'error';
    suspense: () => Promise<_$_tanstack_query_core0.QueryObserverResult<NonNullable<Awaited<TData>> | null, Error>>;
  } | {
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isLoading: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isRefetching: boolean;
    isStale: boolean;
    isEnabled: boolean;
    refetch: (options?: _$_tanstack_query_core0.RefetchOptions) => Promise<_$_tanstack_query_core0.QueryObserverResult<NonNullable<Awaited<TData>> | null, Error>>;
    fetchStatus: _$_tanstack_query_core0.FetchStatus;
    promise: Promise<NonNullable<Awaited<TData>> | null>;
    data: undefined;
    error: null;
    isError: false;
    isPending: true;
    isLoadingError: false;
    isRefetchError: false;
    isSuccess: false;
    isPlaceholderData: false;
    status: 'pending';
    suspense: () => Promise<_$_tanstack_query_core0.QueryObserverResult<NonNullable<Awaited<TData>> | null, Error>>;
  } | {
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isRefetching: boolean;
    isStale: boolean;
    isEnabled: boolean;
    refetch: (options?: _$_tanstack_query_core0.RefetchOptions) => Promise<_$_tanstack_query_core0.QueryObserverResult<NonNullable<Awaited<TData>> | null, Error>>;
    fetchStatus: _$_tanstack_query_core0.FetchStatus;
    promise: Promise<NonNullable<Awaited<TData>> | null>;
    data: NonNullable<Awaited<TData>> | null;
    isError: false;
    error: null;
    isPending: false;
    isLoading: false;
    isLoadingError: false;
    isRefetchError: false;
    isSuccess: true;
    isPlaceholderData: true;
    status: 'success';
    suspense: () => Promise<_$_tanstack_query_core0.QueryObserverResult<NonNullable<Awaited<TData>> | null, Error>>;
  } | {
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isRefetching: boolean;
    isStale: boolean;
    isEnabled: boolean;
    refetch: (options?: _$_tanstack_query_core0.RefetchOptions) => Promise<_$_tanstack_query_core0.QueryObserverResult<NonNullable<Awaited<TData>> | null, Error>>;
    fetchStatus: _$_tanstack_query_core0.FetchStatus;
    promise: Promise<NonNullable<Awaited<TData>> | null>;
    data: NonNullable<Awaited<TData>> | null;
    error: Error;
    isError: true;
    isPending: false;
    isLoading: false;
    isLoadingError: false;
    isRefetchError: true;
    isSuccess: false;
    isPlaceholderData: false;
    status: 'error';
    suspense: () => Promise<_$_tanstack_query_core0.QueryObserverResult<NonNullable<Awaited<TData>> | null, Error>>;
  } | {
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isRefetching: boolean;
    isStale: boolean;
    isEnabled: boolean;
    refetch: (options?: _$_tanstack_query_core0.RefetchOptions) => Promise<_$_tanstack_query_core0.QueryObserverResult<NonNullable<Awaited<TData>> | null, Error>>;
    fetchStatus: _$_tanstack_query_core0.FetchStatus;
    promise: Promise<NonNullable<Awaited<TData>> | null>;
    data: NonNullable<Awaited<TData>> | null;
    error: null;
    isError: false;
    isPending: false;
    isLoading: false;
    isLoadingError: false;
    isRefetchError: false;
    isSuccess: true;
    isPlaceholderData: false;
    status: 'success';
    suspense: () => Promise<_$_tanstack_query_core0.QueryObserverResult<NonNullable<Awaited<TData>> | null, Error>>;
  } | undefined;
  onSubmit(data: TypeFormOnSubmitData<TData>): Promise<void>;
  setPageMeta(data: any | undefined, pageDirty?: boolean): void;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/component/wrapperFilter/controller.d.ts
interface ControllerWrapperFilterProps {
  formData?: any;
  formProvider?: IFormProvider;
  onFilter?: (data: any) => void;
}
declare class ControllerWrapperFilter extends BeanControllerBase {
  static $propsDefault: {};
  formMeta: IFormMeta;
  formFieldLayout: ISchemaRenderComponentLayoutOptions;
  $$modelResource: ModelResource;
  protected __init__(): Promise<void>;
  get schema(): _$openapi3_ts_oas310.SchemaObject | undefined;
  onSubmit(data: TypeFormOnSubmitData): void;
  onReset(data: any): void;
  _onFilter(dataOld: any): void;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/.metadata/component/restPage.d.ts
type ControllerInnerProps$3<TData extends {} = {}> = TypeControllerInnerProps<ControllerRestPageProps<TData>, keyof typeof ControllerRestPage.$propsDefault>;
declare module 'zova-module-basic-restpage' {
  interface ControllerRestPage<TData extends {} = {}> {
    $props: ControllerInnerProps$3<TData>;
  }
}
declare module 'zova-module-basic-restpage' {
  interface RenderRestPage<TData extends {} = {}> extends ControllerRestPage<TData> {}
}
declare const ZRestPage: new <TData extends {} = {}>(props: ({
  controllerRef?: ((ref: ControllerRestPage<TData>) => void) | undefined;
} & ControllerRestPageProps<TData> & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
})) & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps) => _$vue.CreateComponentPublicInstanceWithMixins<{
  controllerRef?: ((ref: ControllerRestPage<TData>) => void) | undefined;
} & ControllerRestPageProps<TData> & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
}), {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, _$vue.EmitsOptions, _$vue.PublicProps, {}, false, {}, _$vue.SlotsType<Record<string, any>>, {}, {}, string, {}, any, _$vue.ComponentProvideOptions, {
  P: {};
  B: {};
  D: {};
  C: {};
  M: {};
  Defaults: {};
}, {} & ({
  controllerRef?: ((ref: ControllerRestPage<TData>) => void) | undefined;
} & ControllerRestPageProps<TData> & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
})), {}, {}, {}, {}, {}>;
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/.metadata/component/restPageEntry.d.ts
type ControllerInnerProps$2<TData extends {} = {}> = TypeControllerInnerProps<ControllerRestPageEntryProps<TData>, keyof typeof ControllerRestPageEntry.$propsDefault>;
declare module 'zova-module-basic-restpage' {
  interface ControllerRestPageEntry<TData extends {} = {}> {
    $props: ControllerInnerProps$2<TData>;
  }
}
declare module 'zova-module-basic-restpage' {
  interface RenderRestPageEntry<TData extends {} = {}> extends ControllerRestPageEntry<TData> {}
}
declare const ZRestPageEntry: new <TData extends {} = {}>(props: ({
  controllerRef?: ((ref: ControllerRestPageEntry<TData>) => void) | undefined;
} & ControllerRestPageEntryProps<TData> & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
})) & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps) => _$vue.CreateComponentPublicInstanceWithMixins<{
  controllerRef?: ((ref: ControllerRestPageEntry<TData>) => void) | undefined;
} & ControllerRestPageEntryProps<TData> & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
}), {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, _$vue.EmitsOptions, _$vue.PublicProps, {}, false, {}, _$vue.SlotsType<Record<string, any>>, {}, {}, string, {}, any, _$vue.ComponentProvideOptions, {
  P: {};
  B: {};
  D: {};
  C: {};
  M: {};
  Defaults: {};
}, {} & ({
  controllerRef?: ((ref: ControllerRestPageEntry<TData>) => void) | undefined;
} & ControllerRestPageEntryProps<TData> & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
})), {}, {}, {}, {}, {}>;
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/.metadata/component/wrapperFilter.d.ts
type TypeControllerWrapperFilterPublicProps$1 = {
  controllerRef?: (ref: ControllerWrapperFilter) => void;
} & ControllerWrapperFilterProps;
type ControllerInnerProps$1 = TypeControllerInnerProps<ControllerWrapperFilterProps, keyof typeof ControllerWrapperFilter.$propsDefault>;
declare module 'zova-module-basic-restpage' {
  interface ControllerWrapperFilter {
    $props: ControllerInnerProps$1;
  }
}
declare module 'zova-module-basic-restpage' {
  interface RenderWrapperFilter extends ControllerWrapperFilter {}
}
declare const ZWrapperFilter: _$vue.DefineSetupFnComponent<TypeControllerWrapperFilterPublicProps$1, _$vue.EmitsOptions, _$vue.SlotsType<Record<string, any>>, {
  controllerRef?: (ref: ControllerWrapperFilter) => void;
} & ControllerWrapperFilterProps & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
}), _$vue.PublicProps>;
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/component/restPage/render.d.ts
declare class RenderRestPage<TData extends {} = {}> extends BeanRenderBase {
  private _renderFilter;
  private _renderOperationsTable;
  private _renderTable;
  private _renderPages;
  render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/component/restPageEntry/render.d.ts
declare class RenderRestPageEntry<TData extends {} = {}> extends BeanRenderBase {
  private _renderForm;
  private _renderToolbar;
  render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/component/wrapperFilter/render.d.ts
declare class RenderWrapperFilter extends BeanRenderBase {
  render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/.metadata/locales.d.ts
declare const locales$1: {
  'en-us': {
    Back: string;
    Close: string;
    Create: string;
    Submit: string;
    Search: string;
    Reset: string;
    TableActions: string;
    PagedTotalItems: string;
    PagedTotalPages: string;
    EntryNotExist: string;
  };
  'zh-cn': {
    Back: string;
    Close: string;
    Create: string;
    Submit: string;
    Search: string;
    Reset: string;
    TableActions: string;
    PagedTotalItems: string;
    PagedTotalPages: string;
    EntryNotExist: string;
  };
};
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/.metadata/index.d.ts
declare module 'zova' {}
declare module 'zova-module-basic-restpage' {
  interface ControllerRestPage {}
  interface ControllerRestPageEntry {}
  interface ControllerWrapperFilter {}
}
/** controller: end */
/** controller: begin */
declare module 'zova' {
  interface IBeanRecordLocal {
    'basic-restpage.controller.restPage': ControllerRestPage;
    'basic-restpage.controller.restPageEntry': ControllerRestPageEntry;
    'basic-restpage.controller.wrapperFilter': ControllerWrapperFilter;
  }
}
/** controller: end */
/** components: begin */
declare module 'zova' {
  interface IComponentRecord {
    'basic-restpage:restPage': ControllerRestPage;
    'basic-restpage:restPageEntry': ControllerRestPageEntry;
    'basic-restpage:wrapperFilter': ControllerWrapperFilter;
  }
  interface IZovaComponentRecord {
    'basic-restpage:restPage': typeof ZRestPage;
    'basic-restpage:restPageEntry': typeof ZRestPageEntry;
    'basic-restpage:wrapperFilter': typeof ZWrapperFilter;
  }
}
/** components: end */
/** render: begin */
declare module 'zova' {}
declare module 'zova-module-basic-restpage' {
  interface RenderRestPage {}
  interface RenderRestPageEntry {}
  interface RenderWrapperFilter {}
}
/** render: end */
/** render: begin */
declare module 'zova' {
  interface IBeanRecordLocal {
    'basic-restpage.render.restPage': RenderRestPage;
    'basic-restpage.render.restPageEntry': RenderRestPageEntry;
    'basic-restpage.render.wrapperFilter': RenderWrapperFilter;
  }
}
/** render: end */
/** locale: begin */
declare class ScopeModuleBasicRestpage extends BeanScopeBase {}
interface ScopeModuleBasicRestpage {
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales$1)[TypeLocaleBase]>;
}
declare module 'zova' {
  interface IBeanScopeRecord {
    'basic-restpage': ScopeModuleBasicRestpage;
  }
  interface IBeanScopeLocale {
    'basic-restpage': (typeof locales$1)[TypeLocaleBase];
  }
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/rest/component/restPage.d.ts
type TypeControllerRestPagePublicProps<TData extends {} = {}> = TypeRenderComponentJsxPropsPublic & ControllerRestPageProps<TData>;
declare function BBPBasicRestpage<TData extends {} = {}>(_props: TypeControllerRestPagePublicProps<TData>): string;
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/rest/component/restPageEntry.d.ts
type TypeControllerRestPageEntryPublicProps<TData extends {} = {}> = TypeRenderComponentJsxPropsPublic & ControllerRestPageEntryProps<TData>;
declare function BBPBasicRestpageEntry<TData extends {} = {}>(_props: TypeControllerRestPageEntryPublicProps<TData>): string;
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/rest/component/wrapperFilter.d.ts
type TypeControllerWrapperFilterPublicProps = TypeRenderComponentJsxPropsPublic & ControllerWrapperFilterProps;
declare function BBZBasicRestpageWrapperFilter(_props: TypeControllerWrapperFilterPublicProps): string;
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/rest/component/actionOperationsTable.d.ts
type TypeControllerActionOperationsTablePublicProps$1 = TypeRenderComponentJsxPropsPublic;
declare function BBZBasicTableActionOperationsTable(_props: TypeControllerActionOperationsTablePublicProps$1): string;
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/src/component/actionOperationsTable/controller.d.ts
declare class ControllerActionOperationsTable extends BeanControllerBase {
  protected __init__(): Promise<void>;
  $$renderContext: IJsxRenderContextPage;
  get permissions(): _$zova_module_a_openapi0.TypeOpenapiPermissions | undefined;
  private _renderCreate;
  protected render(): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/src/component/table/controller.d.ts
interface ControllerTableProps$1<TData extends {} = {}> extends ControllerTableProps<TData> {}
declare class ControllerTable$1 extends BeanControllerBase {
  static $propsDefault: {};
  protected __init__(): Promise<void>;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/src/.metadata/component/actionOperationsTable.d.ts
type TypeControllerActionOperationsTablePublicProps = {
  controllerRef?: (ref: ControllerActionOperationsTable) => void;
};
declare const ZActionOperationsTable: _$vue.DefineSetupFnComponent<TypeControllerActionOperationsTablePublicProps, _$vue.EmitsOptions, _$vue.SlotsType<Record<string, any>>, TypeControllerActionOperationsTablePublicProps & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
}), _$vue.PublicProps>;
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/src/.metadata/component/table.d.ts
type ControllerInnerProps<TData extends {} = {}> = TypeControllerInnerProps<ControllerTableProps$1<TData>, keyof typeof ControllerTable$1.$propsDefault>;
declare module 'zova-module-basic-table' {
  interface ControllerTable<TData extends {} = {}> {
    $props: ControllerInnerProps<TData>;
  }
}
declare module 'zova-module-basic-table' {
  interface RenderTable<TData extends {} = {}> extends ControllerTable$1<TData> {}
}
declare const ZTable: new <TData extends {} = {}>(props: ({
  controllerRef?: ((ref: ControllerTable$1<TData>) => void) | undefined;
} & ControllerTableProps$1<TData> & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
})) & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps) => _$vue.CreateComponentPublicInstanceWithMixins<{
  controllerRef?: ((ref: ControllerTable$1<TData>) => void) | undefined;
} & ControllerTableProps$1<TData> & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
}), {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, _$vue.EmitsOptions, _$vue.PublicProps, {}, false, {}, _$vue.SlotsType<Record<string, any>>, {}, {}, string, {}, any, _$vue.ComponentProvideOptions, {
  P: {};
  B: {};
  D: {};
  C: {};
  M: {};
  Defaults: {};
}, {} & ({
  controllerRef?: ((ref: ControllerTable$1<TData>) => void) | undefined;
} & ControllerTableProps$1<TData> & ({
  [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
  [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
})), {}, {}, {}, {}, {}>;
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/src/component/table/render.d.ts
declare class RenderTable<TData extends {} = {}> extends BeanRenderBase {
  render(): _$vue_jsx_runtime0.JSX.Element;
  _renderTable($$table: ControllerTable<TData>): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/src/bean/tableCell.actionOperationsRow.d.ts
interface ITableCellOptionsActionOperationsRow extends IDecoratorTableCellPresetOptions {}
declare class TableCellActionOperationsRow extends BeanBase implements ITableCellRender {
  render(_options: ITableCellOptionsActionOperationsRow, renderContext: IJsxRenderContextTableCell, _next: NextTableCellRender): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/src/bean/tableCell.actionView.d.ts
interface ITableCellOptionsActionView extends IDecoratorTableCellPresetOptions {}
declare class TableCellActionView extends BeanBase implements ITableCellRender {
  render(options: ITableCellOptionsActionView, renderContext: IJsxRenderContextTableCell, next: NextTableCellRender): _$vue_jsx_runtime0.JSX.Element;
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/src/.metadata/locales.d.ts
declare const locales: {
  'en-us': {
    Create: string;
    DeleteConfirm: string;
  };
  'zh-cn': {
    Create: string;
    DeleteConfirm: string;
  };
};
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/src/.metadata/index.d.ts
declare module 'zova' {}
declare module 'zova-module-basic-table' {
  interface ControllerActionOperationsTable {}
  interface ControllerTable {}
}
/** controller: end */
/** controller: begin */
declare module 'zova' {
  interface IBeanRecordLocal {
    'basic-table.controller.actionOperationsTable': ControllerActionOperationsTable;
    'basic-table.controller.table': ControllerTable$1;
  }
}
/** controller: end */
/** components: begin */
declare module 'zova' {
  interface IComponentRecord {
    'basic-table:actionOperationsTable': ControllerActionOperationsTable;
    'basic-table:table': ControllerTable$1;
  }
  interface IZovaComponentRecord {
    'basic-table:actionOperationsTable': typeof ZActionOperationsTable;
    'basic-table:table': typeof ZTable;
  }
}
/** components: end */
/** render: begin */
declare module 'zova' {}
declare module 'zova-module-basic-table' {
  interface RenderTable {}
}
/** render: end */
/** render: begin */
declare module 'zova' {
  interface IBeanRecordLocal {
    'basic-table.render.table': RenderTable;
  }
}
/** render: end */
/** tableCell: begin */
declare module 'zova-module-a-table' {
  interface ITableCellRecord {
    'basic-table:actionOperationsRow': ITableCellOptionsActionOperationsRow;
    'basic-table:actionView': ITableCellOptionsActionView;
  }
}
declare module 'zova-module-basic-table' {
  interface TableCellActionOperationsRow {}
  interface TableCellActionOperationsRow {
    get $beanFullName(): 'basic-table.tableCell.actionOperationsRow';
    get $onionName(): 'basic-table:actionOperationsRow';
    get $onionOptions(): ITableCellOptionsActionOperationsRow;
  }
  interface TableCellActionView {}
  interface TableCellActionView {
    get $beanFullName(): 'basic-table.tableCell.actionView';
    get $onionName(): 'basic-table:actionView';
    get $onionOptions(): ITableCellOptionsActionView;
  }
}
/** tableCell: end */
/** tableCell: begin */
declare module 'zova' {
  interface IBeanRecordGeneral {
    'basic-table.tableCell.actionOperationsRow': TableCellActionOperationsRow;
    'basic-table.tableCell.actionView': TableCellActionView;
  }
}
/** tableCell: end */
/** locale: begin */
declare class ScopeModuleBasicTable extends BeanScopeBase {}
interface ScopeModuleBasicTable {
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}
declare module 'zova' {
  interface IBeanScopeRecord {
    'basic-table': ScopeModuleBasicTable;
  }
  interface IBeanScopeLocale {
    'basic-table': (typeof locales)[TypeLocaleBase];
  }
}
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/rest/component/table.d.ts
type TypeControllerTablePublicProps<TData extends {} = {}> = TypeRenderComponentJsxPropsPublic & ControllerTableProps$1<TData>;
declare function BBZBasicTable<TData extends {} = {}>(_props: TypeControllerTablePublicProps<TData>): string;
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/rest/tableCell/actionOperationsRow.d.ts
declare function BBTBasicTableActionOperationsRow(_props: ITableCellOptionsActionOperationsRow): string;
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/rest/tableCell/actionView.d.ts
declare function BBTBasicTableActionView(_props: ITableCellOptionsActionView): string;
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-actions/rest/action/alert.d.ts
declare function BBARestActionsAlert(_props: TypeActionOptionsRest<IActionOptionsAlert>): string;
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-actions/rest/action/confirm.d.ts
declare function BBARestActionsConfirm(_props: TypeActionOptionsRest<IActionOptionsConfirm>): string;
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-actions/rest/action/copy.d.ts
declare function BBARestActionsCopy(_props: TypeActionOptionsRest<IActionOptionsCopy>): string;
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-actions/rest/action/create.d.ts
declare function BBARestActionsCreate(_props: TypeActionOptionsRest<IActionOptionsCreate>): string;
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-actions/rest/action/delete.d.ts
declare function BBARestActionsDelete(_props: TypeActionOptionsRest<IActionOptionsDelete>): string;
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-actions/rest/action/edit.d.ts
declare function BBARestActionsEdit(_props: TypeActionOptionsRest<IActionOptionsEdit>): string;
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-actions/rest/action/setValue.d.ts
declare function BBARestActionsSetValue(_props: TypeActionOptionsRest<IActionOptionsSetValue>): string;
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-actions/rest/action/view.d.ts
declare function BBARestActionsView(_props: TypeActionOptionsRest<IActionOptionsView>): string;
//#endregion
//#region src/suite-vendor/a-zova/modules/a-actions/rest/action/log.d.ts
declare function BBAActionsLog(_props: TypeActionOptionsRest<IActionOptionsLog>): string;
//#endregion
//#region src/suite-vendor/a-zova/modules/a-routerstack/rest/component/routerViewStack.d.ts
type TypeControllerRouterViewStackPublicProps = TypeRenderComponentJsxPropsPublic & ControllerRouterViewStackProps;
declare function BBZRouterstackRouterViewStack(_props: TypeControllerRouterViewStackPublicProps): string;
//#endregion
//#region src/suite-vendor/a-zova/modules/a-routertabs/rest/component/routerViewTabs.d.ts
type TypeControllerRouterViewTabsPublicProps = TypeRenderComponentJsxPropsPublic & ControllerRouterViewTabsProps;
declare function BBZRoutertabsRouterViewTabs(_props: TypeControllerRouterViewTabsPublicProps): string;
declare namespace index_d_exports {
  export { $iconName, AopHome, AopHome3, ApiTodo, ApiTodoEntity, ApiTodoIntertBody, ApiTodoUpdateBody, BBAActionsLog, BBARestActionsAlert, BBARestActionsConfirm, BBARestActionsCopy, BBARestActionsCreate, BBARestActionsDelete, BBARestActionsEdit, BBARestActionsSetValue, BBARestActionsView, BBFBasicCaptcha, BBFBasicDateRange, BBFBasicInput, BBFCurrency, BBFDate, BBFDemoBasicTest, BBFFormBlank, BBFFormWrapper, BBPBasicRestpage, BBPBasicRestpageEntry, BBTBasicTableActionOperationsRow, BBTBasicTableActionView, BBTCurrency, BBTDate, BBTDemoBasicTest, BBZApp, BBZBasicDateRange, BBZBasicRestpageWrapperFilter, BBZBasicTable, BBZBasicTableActionOperationsTable, BBZBehavior, BBZDemoBasicActionView, BBZDemoBasicCard, BBZDemoBasicTableCellTest, BBZForm, BBZFormField, BBZHomeBaseItemLink, BBZHomeBasePage, BBZHomeLayoutemptyLayoutEmpty, BBZHomeLayouttabsLayoutTabs, BBZIcon, BBZRouterViewEmpty, BBZRouterstackRouterViewStack, BBZRoutertabsRouterViewTabs, BBZTable, BehaviorFormFieldLayout, BehaviorFormFieldLayoutLogin, ControllerActionView, ControllerActionViewProps, ControllerCard, ControllerCardProps, ControllerFormFieldTest, ControllerFormFieldTestProps, ControllerItemLink, ControllerItemLinkProps, ControllerPage, ControllerPageAuthCallback, ControllerPageAuthCallbackSchemaQuery, ControllerPageComponent, ControllerPageErrorExpired, ControllerPageErrorExpiredSchemaQuery, ControllerPageErrorNotFound, ControllerPageHome, ControllerPageItem, ControllerPageItemSchemaParams, ControllerPageItemSchemaQuery, ControllerPageLocale, ControllerPageLogin$1 as ControllerPageLogin, ControllerPagePinia, ControllerPageProps, ControllerPageRouteParams, ControllerPageRouteParamsSchemaParams, ControllerPageRouteParamsSchemaQuery, ControllerPageRouteQuery, ControllerPageRouteQueryB, ControllerPageRouteQueryBSchemaParams, ControllerPageRouteQueryBSchemaQuery, ControllerPageRouteQuerySchemaParams, ControllerPageRouteQuerySchemaQuery, ControllerPageState, ControllerPageStyle, ControllerPageTodo, ControllerPageToolOne$1 as ControllerPageToolOne, ControllerPageToolOneSchemaParams, ControllerPageToolOneSchemaQuery, ControllerPageToolTwo, ControllerPageToolTwoSchemaParams, ControllerPageToolTwoSchemaQuery, ControllerTableCellTest, ControllerTableCellTestProps, IBehaviorOptionsFormFieldLayout, IBehaviorOptionsFormFieldLayoutLogin, IBehaviorPropsInputFormFieldLayout, IBehaviorPropsInputFormFieldLayoutLogin, IBehaviorPropsOutputFormFieldLayout, IBehaviorPropsOutputFormFieldLayoutLogin, IIconRecord, IModelOptionsTest, IModelOptionsTodo, IModuleApi, IPagePathRecord, IServiceSsrLayoutOptions, ITableCellOptionsTest, Main, ModelTest, ModelTodo, Monkey, MonkeySys, NSControllerPageAuthCallback, NSControllerPageErrorExpired, NSControllerPageItem, NSControllerPageRouteParams, NSControllerPageRouteQuery, NSControllerPageRouteQueryB, NSControllerPageToolOne, NSControllerPageToolTwo, RenderPageLogin, RenderPageToolOne, ScopeModuleDemoBasic, ScopeModuleDemoTodo, ScopeModuleHomeBase, ScopeModuleHomeIcon, ScopeModuleHomeIndex, ScopeModuleHomeLogin, ServiceRouterGuards, ServiceSsr, ServiceSsrLayout, StoreCounter, TableCellTest, TypeControllerActionViewPublicProps, TypeControllerCardPublicProps, TypeControllerFormFieldTestPublicProps, TypeControllerItemLinkPublicProps, TypeControllerPagePublicProps, TypeControllerTableCellTestPublicProps, ZActionView, ZCard, ZFormFieldTest, ZItemLink, ZPage, ZPageAuthCallback, ZPageComponent, ZPageErrorExpired, ZPageErrorNotFound, ZPageHome, ZPageItem, ZPageLocale, ZPageLogin, ZPagePinia, ZPageRouteParams, ZPageRouteQuery, ZPageRouteQueryB, ZPageState, ZPageStyle, ZPageTodo, ZPageToolOne, ZPageToolTwo, ZTableCellTest, config, definePropertyScopeBase, icons };
}
declare function $iconName<K extends keyof IIconRecord$1>(name: K): any;
declare module 'zova-module-a-router' {
  interface IPagePathRecord {
    '/': TypePagePathSchema<undefined, undefined>;
    'presetLogin': TypePagePathSchema<undefined, undefined>;
    'presetErrorExpired': TypePagePathSchema<undefined, undefined>;
    'presetResource': TypePagePathSchema<undefined, undefined>;
  }
}
//#endregion
export { $iconName, AopHome, AopHome3, ApiTodo, ApiTodoEntity, ApiTodoIntertBody, ApiTodoUpdateBody, BBAActionsLog, BBARestActionsAlert, BBARestActionsConfirm, BBARestActionsCopy, BBARestActionsCreate, BBARestActionsDelete, BBARestActionsEdit, BBARestActionsSetValue, BBARestActionsView, BBFBasicCaptcha, BBFBasicDateRange, BBFBasicInput, BBFCurrency, BBFDate, BBFDemoBasicTest, BBFFormBlank, BBFFormWrapper, BBPBasicRestpage, BBPBasicRestpageEntry, BBTBasicTableActionOperationsRow, BBTBasicTableActionView, BBTCurrency, BBTDate, BBTDemoBasicTest, BBZApp, BBZBasicDateRange, BBZBasicRestpageWrapperFilter, BBZBasicTable, BBZBasicTableActionOperationsTable, BBZBehavior, BBZDemoBasicActionView, BBZDemoBasicCard, BBZDemoBasicTableCellTest, BBZForm, BBZFormField, BBZHomeBaseItemLink, BBZHomeBasePage, BBZHomeLayoutemptyLayoutEmpty, BBZHomeLayouttabsLayoutTabs, BBZIcon, BBZRouterViewEmpty, BBZRouterstackRouterViewStack, BBZRoutertabsRouterViewTabs, BBZTable, BehaviorFormFieldLayout, BehaviorFormFieldLayoutLogin, ControllerActionView, ControllerActionViewProps, ControllerCard, ControllerCardProps, ControllerFormFieldTest, ControllerFormFieldTestProps, ControllerItemLink, ControllerItemLinkProps, ControllerPage, ControllerPageAuthCallback, ControllerPageAuthCallbackSchemaQuery, ControllerPageComponent, ControllerPageErrorExpired, ControllerPageErrorExpiredSchemaQuery, ControllerPageErrorNotFound, ControllerPageHome, ControllerPageItem, ControllerPageItemSchemaParams, ControllerPageItemSchemaQuery, ControllerPageLocale, ControllerPageLogin$1 as ControllerPageLogin, ControllerPagePinia, ControllerPageProps, ControllerPageRouteParams, ControllerPageRouteParamsSchemaParams, ControllerPageRouteParamsSchemaQuery, ControllerPageRouteQuery, ControllerPageRouteQueryB, ControllerPageRouteQueryBSchemaParams, ControllerPageRouteQueryBSchemaQuery, ControllerPageRouteQuerySchemaParams, ControllerPageRouteQuerySchemaQuery, ControllerPageState, ControllerPageStyle, ControllerPageTodo, ControllerPageToolOne$1 as ControllerPageToolOne, ControllerPageToolOneSchemaParams, ControllerPageToolOneSchemaQuery, ControllerPageToolTwo, ControllerPageToolTwoSchemaParams, ControllerPageToolTwoSchemaQuery, ControllerTableCellTest, ControllerTableCellTestProps, IBehaviorOptionsFormFieldLayout, IBehaviorOptionsFormFieldLayoutLogin, IBehaviorPropsInputFormFieldLayout, IBehaviorPropsInputFormFieldLayoutLogin, IBehaviorPropsOutputFormFieldLayout, IBehaviorPropsOutputFormFieldLayoutLogin, type IIconRecord, IModelOptionsTest, IModelOptionsTodo, IModuleApi, type IPagePathRecord, IServiceSsrLayoutOptions, ITableCellOptionsTest, Main, ModelTest, ModelTodo, Monkey, MonkeySys, NSControllerPageAuthCallback, NSControllerPageErrorExpired, NSControllerPageItem, NSControllerPageRouteParams, NSControllerPageRouteQuery, NSControllerPageRouteQueryB, NSControllerPageToolOne, NSControllerPageToolTwo, RenderPageLogin, RenderPageToolOne, ScopeModuleDemoBasic, ScopeModuleDemoTodo, ScopeModuleHomeBase, ScopeModuleHomeIcon, ScopeModuleHomeIndex, ScopeModuleHomeLogin, ServiceRouterGuards, ServiceSsr, ServiceSsrLayout, StoreCounter, TableCellTest, TypeControllerActionViewPublicProps, TypeControllerCardPublicProps, TypeControllerFormFieldTestPublicProps, TypeControllerItemLinkPublicProps, TypeControllerPagePublicProps, TypeControllerTableCellTestPublicProps, ZActionView, ZCard, ZFormFieldTest, ZItemLink, ZPage, ZPageAuthCallback, ZPageComponent, ZPageErrorExpired, ZPageErrorNotFound, ZPageHome, ZPageItem, ZPageLocale, ZPageLogin, ZPagePinia, ZPageRouteParams, ZPageRouteQuery, ZPageRouteQueryB, ZPageState, ZPageStyle, ZPageTodo, ZPageToolOne, ZPageToolTwo, ZTableCellTest, config, definePropertyScopeBase, icons };