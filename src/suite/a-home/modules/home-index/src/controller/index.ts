import {
  BeanBase,
  Controller,
  Get,
  UseGuard,
  UseGuardGlobal,
  UseInterceptor,
  UseInterceptorGlobal,
  UseMiddleware,
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
  index() {
    return 'Hello Vona';
  }
}
