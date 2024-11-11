import {
  BeanBase,
  Controller,
  Get,
  UseGuard,
  UseGuardGlobal,
  UseInterceptor,
  UseInterceptorGlobal,
  UseMiddleware,
  UsePipe,
  UsePipeGlobal,
} from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerIndex extends BeanBase<ScopeModule> {
  @Get('//')
  @UseMiddleware('a-core:transaction')
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
}
