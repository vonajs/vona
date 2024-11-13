import {
  BeanBase,
  Controller,
  Get,
  Query,
  UseGuard,
  UseGuardGlobal,
  UseInterceptor,
  UseInterceptorGlobal,
  UseMiddleware,
  UsePipe,
  UsePipeGlobal,
} from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import { ParseIntPipe } from 'vona-module-a-pipe';

@Controller()
@UseGuard('a-b4:test')
export class ControllerIndex extends BeanBase<ScopeModule> {
  @Get('//')
  @UseMiddleware('a-database:transaction')
  @UseGuard('a-b4:test')
  @UseGuard('a-b4:test1')
  @UseGuardGlobal('a-core:user', { public: true })
  @UseInterceptor('a-b4:test')
  @UseInterceptor('a-b4:test1')
  @UseInterceptorGlobal('a-b4:test2', { test: 'from action' })
  @UsePipe('a-b4:test')
  @UsePipe('a-b4:test1')
  @UsePipeGlobal('a-b4:test2', { transform: true })
  index() {
    //return 'Hello Vona';
  }

  @Get('echo')
  @UseGuardGlobal('a-core:user', { public: true })
  @UseMiddleware('a-database:transaction')
  echo(
    @Query('id', ParseIntPipe) id: number,
    temp: string,
    @Query('name', ParseIntPipe({ optional: true })) name: string,
  ) {
    return 'echo: ' + id + ':' + temp + ':' + name;
  }
}
