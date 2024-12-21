import { BeanBase } from 'vona';
import { Body, Query, v } from 'vona-module-a-validation';
import { z } from 'zod';
import { DtoUser } from '../dto/user.js';
import { Controller, Get, Post } from 'vona-module-a-web';
import { UseFilterGlobal, UseGuardGlobal, UseMiddleware, UseMiddlewareGlobal } from 'vona-module-a-aspect';
import { Transaction } from 'vona-module-a-database';
import { Gate } from 'vona-module-a-core';

@Controller({ path: 'onion', meta: { mode: ['local', 'unittest'] } })
export class ControllerOnion extends BeanBase {
  @Get('/')
  @UseMiddleware('a-database:transaction')
  @UseGuardGlobal('a-core:user', { public: true })
  index() {
    //return 'Hello Vona';
  }

  @Get('//echo')
  @UseGuardGlobal('a-core:user', { public: true })
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
  @UseGuardGlobal('a-core:user', { public: true })
  //async echo2(@Query(v.object(DtoUser, { passthrough: false, strict: false })) book: Partial<DtoUser>) {
  async echo2(@Query(DtoUser) book: Partial<DtoUser>) {
    //const ctx = this.app.currentContext;
    //console.log(ctx === this.ctx);
    return book;
  }

  @Get('echo3/:userId')
  @UseGuardGlobal('a-core:user', { public: true })
  async echo3(@Query('id', v.optional()) id: number) {
    //this.scope.util.combineApiPath
    console.log(this.ctx.path);
    //const ctx = this.app.currentContext;
    //console.log(ctx === this.ctx);
    return id;
  }

  @Post('echo4')
  @UseGuardGlobal('a-core:user', { public: true })
  @UseFilterGlobal('a-core:error', { enable: true, logs: { 422: true } })
  async echo4(@Body(v.array(DtoUser)) users: DtoUser[]) {
    return users;
  }

  @Get('echo5')
  @UseGuardGlobal('a-core:user', { public: true })
  async echo5(@Query('ids', v.default([1]), v.array(Number, { separator: '-' })) ids: number[]) {
    //const ctx = this.app.currentContext;
    //console.log(ctx === this.ctx);
    return ids;
  }
}
