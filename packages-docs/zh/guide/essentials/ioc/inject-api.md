# 依赖查找(API)

Vona 还提供了一组 API，使我们可以更加灵活的查找 bean 实例

## _getBean

1. 基于 Bean class 查找

``` typescript
import { ServiceMenu } from 'vona-module-home-base';
const serviceMenu = app.bean._getBean(ServiceMenu);
```

2. 基于 Bean 标识查找

``` typescript
const serviceMenu = app.bean._getBean('home-base.service.menu');
```

3. 查找全局 Bean

``` typescript
import { BeanJwt } from 'vona-module-a-jwt';
const beanJwt = app.bean._getBean(BeanJwt);

const beanJwt2 = app.bean._getBean('jwt');

const beanJwt3 = app.bean.jwt;
```

## _newBean

1. 基于 Bean class 查找

``` typescript
import { ServiceMenu } from 'vona-module-home-base';
const serviceMenu = app.bean._newBean(ServiceMenu);
```

2. 基于 Bean 标识查找

``` typescript
const serviceMenu = app.bean._newBean('home-base.service.menu');
```

3. 查找全局 Bean

``` typescript
import { BeanJwt } from 'vona-module-a-jwt';
const beanJwt = app.bean._newBean(BeanJwt);

const beanJwt2 = app.bean._newBean('jwt');
```