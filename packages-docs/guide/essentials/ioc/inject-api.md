# Dependency Lookup (API)

Vona also provides a set of APIs that allow us to lookup bean instances more flexibly

## _getBean

1. Lookup based on Bean class

``` typescript
import { ServiceMenu } from 'vona-module-home-base';

class ControllerMenu {
  async test() {
    const serviceMenu = this.bean._getBean(ServiceMenu);
  }
}
```

- this.bean === this.app.bean, which is the global ioc container

2. Lookup based on Bean identifier

``` typescript
class ControllerMenu {
  async test() {
    const serviceMenu = this.bean._getBean('home-base.service.menu');
  }
}
```

3. Lookup global beans

``` typescript
import { BeanJwt } from 'vona-module-a-jwt';

class ControllerMenu {
  async test() {
    const beanJwt1 = this.bean._getBean(BeanJwt);
    const beanJwt2 = this.bean._getBean('jwt');
    const beanJwt3 = this.bean.jwt;
    // beanJwt1 === beanJwt2 === beanJwt3
  }
}
```

4. Request scope

If we want to create a request-scope Bean instance, we only need to invoke the `_getBean` method of the ctx container

``` typescript
class ControllerMenu {
  async test() {
    const serviceMenu1 = this.ctx.bean._getBean(ServiceMenu);
    const serviceMenu2 = this.ctx.bean._getBean('home-base.service.menu');
    // serviceMenu1 === serviceMenu2
  }
}
```

## _newBean

1. Create new instance based on Bean class

``` typescript
import { ServiceMenu } from 'vona-module-home-base';

class ControllerMenu {
  async test() {
    const serviceMenu = this.bean._newBean(ServiceMenu);
  }
}
```

2. Create new instance based on Bean identifier

``` typescript
class ControllerMenu {
  async test() {
    const serviceMenu = this.bean._newBean('home-base.service.menu');
  }
}
```

3. Create new instance of global beans

``` typescript
import { BeanJwt } from 'vona-module-a-jwt';

class ControllerMenu {
  async test() {
    const beanJwt1 = this.bean._newBean(BeanJwt);
    const beanJwt2 = this.bean._newBean('jwt');
  }
}
```
