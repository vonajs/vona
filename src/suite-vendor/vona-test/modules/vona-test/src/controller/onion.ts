import { BeanBase } from 'vona';
import { UseFilterGlobal, UseGuardGlobal, UseMiddleware, UseMiddlewareGlobal } from 'vona-module-a-aspect';
import { Gate } from 'vona-module-a-core';
import { Transaction } from 'vona-module-a-database';
import { Api, Body, Param, Query, v, Headers } from 'vona-module-a-openapi';
import { Public } from 'vona-module-a-user';
import { Controller, Get, Post } from 'vona-module-a-web';
import { z } from 'zod';
import { DtoUser } from '../dto/user.js';
import { locale } from '../.metadata/index.js';

@Controller({ path: 'onion', tags: ['Onion'], meta: { mode: ['local', 'unittest'] } })
export class ControllerOnion extends BeanBase {
  @Get('/')
  @UseMiddleware('a-database:transaction')
  @UseGuardGlobal('a-user:passport', { public: true })
  index() {
    //return 'Hello Vona';
  }

  @Get('//echo')
  @UseGuardGlobal('a-user:passport', { public: true })
  @UseMiddlewareGlobal('a-core:gate', { gate: { mode: 'local' } })
  @Gate({ gate: { mode: 'local' } })
  @UseMiddleware('a-database:transaction', { isolationLevel: 'serializable', readOnly: true })
  @Transaction({ isolationLevel: 'read committed', readOnly: false })
  echo(
    @Query('id', v.default(0), z.number()) id: number,
    temp: string,
    @Query('name', z.number().optional()) name: string,
  ) {
    return 'echo: ' + id + ':' + temp + ':' + name;
  }

  @Get('echo2/:userId/:userName')
  @UseGuardGlobal('a-user:passport', { public: true })
  //echo2(@Query(v.object(DtoUser, { passthrough: false, strict: false })) book: Partial<DtoUser>) {
  echo2(
    @Param('id', v.description(locale('UserId')), v.example('example:1')) _userId: number,
    @Query(DtoUser) book: Partial<DtoUser>,
    @Body(v.description(locale('User')), z.object({ id: z.number().openapi({ description: locale('UserId') }) }))
    _book: Partial<DtoUser>,
  ) {
    //const ctx = this.app.currentContext;
    //console.log(ctx === this.ctx);
    return book;
  }

  @Get('echo3/:userId')
  @UseGuardGlobal('a-user:passport', { public: true })
  echo3(@Query('id', v.optional()) id: number, @Headers('Accept', v.description(locale('UserId'))) accept: string) {
    //this.scope.util.combineApiPath
    console.log(this.ctx.path);
    //const ctx = this.app.currentContext;
    //console.log(ctx === this.ctx);
    return id + ':' + accept;
  }

  @Post('echo4')
  @UseGuardGlobal('a-user:passport', { public: true })
  @UseFilterGlobal('a-core:error', { enable: true, logs: { 422: true } })
  @Api.body(v.array(DtoUser))
  echo4(@Body(v.optional(), v.array(DtoUser)) users: DtoUser[]): DtoUser[] {
    return users;
  }

  @Get('echo5')
  @Public()
  echo5(@Query('ids', v.default([1]), v.array(Number, { separator: '-' })) ids: number[]) {
    //const ctx = this.app.currentContext;
    //console.log(ctx === this.ctx);
    return ids;
  }
}
