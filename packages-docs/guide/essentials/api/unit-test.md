# Unit Test

Vona strongly recommends test-driven development. Test-driven development can effectively accumulate development results and identify potential problems as soon as possible when code changes occur, thereby significantly improving the robustness of the code

Vona uses a `parallel mechanism` to run test files, thereby significantly improving test efficiency

## Create test file

### 1. Cli command

``` bash
$ vona :create:test student --module=demo-student
```

### 2. Menu command

::: tip
Context menu - [Module Path]: `Vona Create/Test`
:::

## Execute unit tests

``` bash
$ npm run test
```

When this command is executed, the system will perform the following steps:

1. Create a global `app` object
2. Clean up `Redis` data
3. Delete the old database and recreate a new database
4. Execute migration code
5. `Parallel` execute unit test files

``` bash
$ npm run db:reset
```

Unlike the `test` command, `db:reset` only executes the first `four` steps and does not execute the unit test files

## Test coverage

``` bash
$ npm run cov
```

## Example

### 1. Simulate the request context object

``` typescript
describe('student.test.ts', () => {
  it('action:student', async () => {
    await app.bean.executor.mockCtx(async () => {
      // do something
    });
  });
});
```

* Specify the current language for ctx

``` typescript
describe('student.test.ts', () => {
  it('action:student', async () => {
    await app.bean.executor.mockCtx(async () => {
      // do something
    }, { locale: 'zh-cn' });
  });
});
```

### 2. Get the module Scope object

``` typescript
await app.bean.executor.mockCtx(async () => {
  const scopeTest = app.bean.scope('demo-student');
});
```

### 3. Use Service

```typescript
const scopeTest = app.bean.scope('demo-student');
const students = await scopeTest.service.student.findAll();
```

### 4. Use Model

```typescript
const scopeTest = app.bean.scope('demo-student');
const students = await scopeTest.model.student.select();
```

### 5. Using Entity

``` typescript
const scopeTest = app.bean.scope('demo-student');
const tableName = scopeTest.entity.student.$table;
const fieldName = scopeTest.entity.student.name;
```

### 6. Access API to test Controller

``` typescript
await app.bean.executor.mockCtx(async () => {
  const students = await app.bean.executor.performAction('get', '/demo/student');
});
```

### 7. Simulate authentication

* Simulate login

``` typescript
await app.bean.executor.mockCtx(async () => {
await app.bean.passport.signinMock();
});
```

You can specify the login username, the default is `admin`

``` typescript
await app.bean.passport.signinMock('admin');
```

* Get current user information

``` typescript
await app.bean.passport.signinMock();
const passport = app.bean.passport.getCurrent();
const auth = app.bean.passport.getCurrentAuth();
const user = app.bean.passport.getCurrentUser();
const roles = app.bean.passport.getCurrentRoles();
```

* Simulate logout

``` typescript
await app.bean.passport.signinMock();
await app.bean.passport.signout();
```

### 8. Tools: assert

Vona uses Node's built-in assertion library

``` typescript
import assert from 'node:assert';

await app.bean.executor.mockCtx(async () => {
  assert.equal(app.config.server.listen.port, 7102);
});
```

### 9. Tool: catchError

`catchError` can capture error exception more elegantly

* General writing

``` typescript
await app.bean.executor.mockCtx(async () => {
  const scopeTest = app.bean.scope('demo-student');
  try {
    const students = await scopeTest.service.student.findAll();
  } catch (err) {
    // do something
  }
});
```

* Use catchError

``` typescript
import { catchError } from '@cabloy/utils';

await app.bean.executor.mockCtx(async () => {
  const scopeTest = app.bean.scope('demo-student');
  const [students, err] = await catchError(() => {
    return scopeTest.service.student.findAll();
  });
  // do somthing on err
});
```

### 10. Complete Crud test

``` typescript
describe('student.test.ts', () => {
  it('action:student', async () => {
    await app.bean.executor.mockCtx(async () => {
      // data
      const data: DtoStudentCreate = {
        name: '__Tom__',
        description: 'This is a test',
      };
      const dataUpdate: DtoStudentUpdate = {
        name: '__TomNew__',
        description: 'This is a test',
      };
      // login
      await app.bean.passport.signinMock();
      // create
      const student: EntityStudent = await app.bean.executor.performAction('post', '/demo/student', { body: data });
      assert.equal(student.name, data.name);
      // findAll
      const students: EntityStudent[] = await app.bean.executor.performAction('get', '/demo/student');
      assert.equal(students.findIndex(item => item.name === data.name) > -1, true);
      // update
      await app.bean.executor.performAction('patch', '/demo/student/:id', {
        params: { id: student.id },
        body: dataUpdate,
      });
      // findOne
      const studentOne: EntityStudent = await app.bean.executor.performAction('get', '/demo/student/:id', { params: { id: student.id } });
      assert.equal(studentOne.name, dataUpdate.name);
      // delete
      await app.bean.executor.performAction('delete', '/demo/student/:id', { params: { id: studentOne.id } });
      // findOne
      const [_, err] = await catchError(() => {
        return app.bean.executor.performAction('get', '/demo/student/:id', { params: { id: studentOne.id } });
      });
      assert.equal(err?.code, 404);
      // logout
      await app.bean.passport.signout();
    });
  });
});
```
