# Built-in Guard

## Local Guard

|Name|Description|
|--|--|
|a-user:userName|Determines the current user name|
|a-user:roleName|Determines the current user's role name|

## Global Guard

|Name|Description|
|--|--|
|a-user:passport|Initializes the current user information and performs basic checks|

## Allow anonymous users to access the API

By default, only authenticated users can access the API. To allow anonymous users to access the API, the code is as follows:

* General usage:

``` typescript
import { Aspect } from 'vona-module-a-aspect';

@Aspect.guardGlobal('a-user:passport', { public: true })
```

* Shorthand:

``` typescript
import { Passport } from 'vona-module-a-user';

@Passport.public()
```

* Shorthand principle:

`@Passport.public` still calls `@Aspect.guardGlobal` internally. The code is as follows:

``` typescript
function Public(_public: boolean = true): ClassDecorator & MethodDecorator {
  return Aspect.guardGlobal('a-user:passport', { public: _public });
}
```

## Allow inactive users to access the API

By default, only activated users can access the API. To allow inactive users to access the API, the code is as follows:

* General usage:

``` typescript
import { Aspect } from 'vona-module-a-aspect';

@Aspect.guardGlobal('a-user:passport', { activated: false })
```

* Shorthand:

``` typescript
import { Passport } from 'vona-module-a-user';

@Passport.activated(false)
```

## Determine the current username

Determine the current username. If it is `admin`, complete the check. If it is not, throw an exception

* General usage:

``` typescript
import { Aspect } from 'vona-module-a-aspect';

@Aspect.guard('a-user:userName', { name: 'admin' })
```

* Shorthand:

``` typescript
import { Passport } from 'vona-module-a-user';

@Passport.userName({ name: 'admin' })
```

## Determine the current user's role name

Determine the current role name. If it is `admin`, complete the check. If it is not, throw an exception

* General usage:

``` typescript
import { Aspect } from 'vona-module-a-aspect';

@Aspect.guard('a-user:roleName', { name: 'admin' })
```

* Shorthand method 1:

``` typescript
import { Passport } from 'vona-module-a-user';

@Passport.roleName({ name: 'admin' })
```

* Shorthand method 2:

Because determining whether the role name is `admin` is frequently used, we have provided a shorthand method as follows:

``` typescript
import { Passport } from 'vona-module-a-user';

@Passport.admin()
```

## Combining Uses

For example, let's use both the `a-user:userName` and `a-user:roleName` local guards. The validation rules are as follows:

- First, check the username. If it is `admin`, complete the validation.
- If the username is not `admin`, do not throw an exception and continue executing the subsequent local guards.
- Then, check the role name. If it is `admin`, complete the validation.
- If the role name is not `admin`, throw an exception.

``` typescript
@Passport.userName({ name: 'admin', rejectWhenDismatched: false })
@Passport.roleName({ name: 'admin' })
```

|Name|Description|
|--|--|
|rejectWhenDismatched|Whether to throw an exception when there is a mismatch. Defaults to `true`.
|passWhenMatched|Whether to complete the validation when there is a match. Defaults to `true`.
