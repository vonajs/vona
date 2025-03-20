import { BeanBase } from 'vona';
import { UseFilterGlobal, UseGuardGlobal, UseMiddleware, UseMiddlewareGlobal } from 'vona-module-a-aspect';
import { Gate } from 'vona-module-a-core';
import { Transaction } from 'vona-module-a-database';
import { Api, Arg, v } from 'vona-module-a-openapi';
import { Public } from 'vona-module-a-user';
import { Controller, Web } from 'vona-module-a-web';
import { z } from 'zod';
import { $locale } from '../.metadata/index.ts';
import { DtoUser } from '../dto/user.ts';

@Controller({ path: 'onion', tags: ['Onion'], meta: { mode: ['local', 'test'] } })
export class ControllerOnion extends BeanBase {
  @Web.get('/')
  @UseMiddleware('a-database:transaction', { enable: true, meta: { mode: 'local' } })
  @UseGuardGlobal('a-user:passport', { public: true })
  index() {
    return this.ctx.dbMeta.transaction.inTransaction;
    // return 'Hello Vona';
  }

  @Web.post('//echo')
  @UseGuardGlobal('a-user:passport', { public: true })
  @UseMiddlewareGlobal('a-core:gate', { gate: { mode: 'local' } })
  @Gate({ gate: { mode: 'local' } })
  @UseMiddleware('a-database:transaction', { isolationLevel: 'serializable', readOnly: true })
  @Transaction({ isolationLevel: 'read committed', readOnly: false })
  @Api.body(v.optional(), z.string())
  echo(
    @Arg.query('id', v.default(0), z.number()) id: number,
    temp: string,
    @Arg.query('name', z.number().optional()) name: string,
    @Arg.body(v.description($locale('User')), z.object({ id: z.number().openapi({ description: $locale('UserId') }) }))
    _user: DtoUser,
  ): string | undefined {
    return `echo: ${id}:${temp}:${name}`;
  }

  @Web.post('echo2/:userId/:userName')
  // @UseMiddlewareGlobal('a-core:gate', { gate: { mode: 'local' } })
  @UseGuardGlobal('a-user:passport', { public: true })
  // echo2(@Arg.query(v.object(DtoUser, { passthrough: false, strict: false })) book: Partial<DtoUser>) {
  echo2(
    @Arg.param('userId', v.description($locale('UserId')), v.example('example:1')) _userId: number,
    @Arg.param('userName', v.description($locale('UserId')), v.example('example:1')) _userName: string,
    @Arg.query(DtoUser) _user: DtoUser,
    @Arg.body(v.description($locale('User')), z.object({ id: z.number().openapi({ description: $locale('UserId') }) }))
    user: DtoUser,
  ): DtoUser {
    // const ctx = this.app.currentContext;
    // this.$logger.silly(ctx === this.ctx);
    return user;
  }

  @Web.get('echo3/:userId')
  @UseGuardGlobal('a-user:passport', { public: true })
  echo3(
    @Arg.param('userId') _userId: number,
    @Arg.query('id', v.optional()) id: number,
    @Arg.headers('Accept', v.description($locale('UserId'))) accept: string,
  ) {
    // this.scope.util.combineApiPath

    this.$logger.silly(this.ctx.path);
    // const ctx = this.app.currentContext;
    // this.$logger.silly(ctx === this.ctx);
    return `${id}:${accept}`;
  }

  @Web.post('echo4')
  @UseGuardGlobal('a-user:passport', { public: true })
  @UseFilterGlobal('a-error:error', { enable: true, logs: { 422: true } })
  @Api.body(v.array(DtoUser))
  echo4(@Arg.body(v.optional(), v.array(DtoUser)) users: DtoUser[]): DtoUser[] {
    return users;
  }

  @Web.get('echo5')
  @Public()
  echo5(@Arg.query('ids', v.default([1]), v.array(Number, { separator: '-' })) ids: number[]) {
    // const ctx = this.app.currentContext;
    // this.$logger.silly(ctx === this.ctx);
    return ids;
  }

  @Web.post('echo6')
  echo6() {
    return this.bean.passport.isAuthenticated;
  }
}
