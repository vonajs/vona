import { BeanBase, Controller, Get, Post, UseGuardGlobal, UseMiddleware, UsePipeGlobal } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import { array, Body, defaultValue, Query, required, valid } from 'vona-module-a-validator';
import { z } from 'zod';
import { DtoUser } from '../dto/user.js';

@Controller('onion')
export class ControllerOnion extends BeanBase<ScopeModule> {
  @Get('/')
  @UseMiddleware('a-database:transaction')
  @UseGuardGlobal('a-core:user', { public: true })
  index() {
    //return 'Hello Vona';
  }

  @Get('echo')
  @UseGuardGlobal('a-core:user', { public: true })
  @UseMiddleware('a-database:transaction', { isolationLevel: 'serializable', readOnly: true })
  echo(
    @Query('id', defaultValue(0), z.number()) id: number,
    temp: string,
    @Query('name', z.number().optional()) name: string,
  ) {
    return 'echo: ' + id + ':' + temp + ':' + name;
  }

  @Get('echo2')
  @UseGuardGlobal('a-core:user', { public: true })
  @UsePipeGlobal('a-validator:validation', { strict: true })
  async echo2(@Query(valid({ class: DtoUser })) book: Partial<DtoUser>) {
    //const ctx = this.app.currentContext;
    //console.log(ctx === this.ctx);
    return book;
  }

  @Get('echo3')
  @UseGuardGlobal('a-core:user', { public: true })
  async echo3(@Query('id', required()) id: number) {
    //const ctx = this.app.currentContext;
    //console.log(ctx === this.ctx);
    return id;
  }

  @Post('echo4')
  @UseGuardGlobal('a-core:user', { public: true })
  async echo4(@Body(array(DtoUser)) users: DtoUser[]) {
    const a = await this.bean.$scope.validator.service.validator.validateSchema(array(DtoUser), {});

    console.log(typeof users);
    return users;
  }
}
