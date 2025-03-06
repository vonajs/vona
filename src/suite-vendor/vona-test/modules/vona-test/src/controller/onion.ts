import { BeanBase } from 'vona';
import { UseFilterGlobal, UseGuardGlobal, UseMiddleware, UseMiddlewareGlobal } from 'vona-module-a-aspect';
import { Gate } from 'vona-module-a-core';
import { Transaction } from 'vona-module-a-database';
import { Api, Body, Headers, Param, Query, v } from 'vona-module-a-openapi';
import { Public } from 'vona-module-a-user';
import { Controller, Get, Post } from 'vona-module-a-web';
import { z } from 'zod';
import { locale } from '../.metadata/index.ts';
import { DtoUser } from '../dto/user.ts';

@Controller({ path: 'onion', tags: ['Onion'], meta: { mode: ['local', 'test'] } })
export class ControllerOnion extends BeanBase {
  @Get('/')
  @UseMiddleware('a-database:transaction')
  @UseGuardGlobal('a-user:passport', { public: true })
  index() {
    // return 'Hello Vona';
  }

  @Post('//echo')
  @UseGuardGlobal('a-user:passport', { public: true })
  @UseMiddlewareGlobal('a-core:gate', { gate: { mode: 'local' } })
  @Gate({ gate: { mode: 'local' } })
  @UseMiddleware('a-database:transaction', { isolationLevel: 'serializable', readOnly: true })
  @Transaction({ isolationLevel: 'read committed', readOnly: false })
  @Api.body(v.optional(), z.string())
  echo(
    @Query('id', v.default(0), z.number()) id: number,
    temp: string,
    @Query('name', z.number().optional()) name: string,
    @Body(v.description(locale('User')), z.object({ id: z.number().openapi({ description: locale('UserId') }) }))
    _user: DtoUser,
  ): string | undefined {
    return `echo: ${id}:${temp}:${name}`;
  }

  @Post('echo2/:userId/:userName')
  @UseGuardGlobal('a-user:passport', { public: true })
  // echo2(@Query(v.object(DtoUser, { passthrough: false, strict: false })) book: Partial<DtoUser>) {
  echo2(
    @Param('userId', v.description(locale('UserId')), v.example('example:1')) _userId: number,
    @Param('userName', v.description(locale('UserId')), v.example('example:1')) _userName: string,
    @Query(DtoUser) _user: DtoUser,
    @Body(v.description(locale('User')), z.object({ id: z.number().openapi({ description: locale('UserId') }) }))
    user: DtoUser,
  ): DtoUser {
    // const ctx = this.app.currentContext;
    // this.logger.silly(ctx === this.ctx);
    return user;
  }

  @Get('echo3/:userId')
  @UseGuardGlobal('a-user:passport', { public: true })
  echo3(
    @Param('userId') _userId: number,
    @Query('id', v.optional()) id: number,
    @Headers('Accept', v.description(locale('UserId'))) accept: string,
  ) {
    // this.scope.util.combineApiPath

    this.$logger.silly(this.ctx.path);
    // const ctx = this.app.currentContext;
    // this.logger.silly(ctx === this.ctx);
    return `${id}:${accept}`;
  }

  @Post('echo4')
  @UseGuardGlobal('a-user:passport', { public: true })
  @UseFilterGlobal('a-error:error', { enable: true, logs: { 422: true } })
  @Api.body(v.array(DtoUser))
  echo4(@Body(v.optional(), v.array(DtoUser)) users: DtoUser[]): DtoUser[] {
    return users;
  }

  @Get('echo5')
  @Public()
  echo5(@Query('ids', v.default([1]), v.array(Number, { separator: '-' })) ids: number[]) {
    // const ctx = this.app.currentContext;
    // this.logger.silly(ctx === this.ctx);
    return ids;
  }
}
