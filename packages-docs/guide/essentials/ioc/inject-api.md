# Dependency Lookup (API)

Vona also provides a set of APIs that allow us to lookup bean instances more flexibly

## _getBean

1. Lookup based on Bean class

``` typescript
import { ServiceMenu } from 'vona-module-home-base';
const serviceMenu = app.bean._getBean(ServiceMenu);
```

2. Lookup based on Bean identifier

``` typescript
const serviceMenu = app.bean._getBean('home-base.service.menu');
```

3. Lookup global beans

``` typescript
import { BeanJwt } from 'vona-module-a-jwt';
const beanJwt = app.bean._getBean(BeanJwt);

const beanJwt2 = app.bean._getBean('jwt');

const beanJwt3 = app.bean.jwt;
```

## _newBean

1. Lookup based on Bean class

``` typescript
import { ServiceMenu } from 'vona-module-home-base';
const serviceMenu = app.bean._newBean(ServiceMenu);
```

2. Lookup based on Bean identifier

``` typescript
const serviceMenu = app.bean._newBean('home-base.service.menu');
```

3. Lookup global beans

``` typescript
import { BeanJwt } from 'vona-module-a-jwt';
const beanJwt = app.bean._newBean(BeanJwt);

const beanJwt2 = app.bean._newBean('jwt');
```