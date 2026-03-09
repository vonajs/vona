import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Passport } from 'vona-module-a-user';
import { Controller, Web } from 'vona-module-a-web';

export interface IControllerOptionsMock extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsMock>('mock', { meta: { mode: ['dev'] } })
export class ControllerMock extends BeanBase {
  @Web.get('authorize')
  @Passport.public()
  async authorize() {
    return `<html>
<head>
  <title>GitHub Mock</title>
  <style>
    body, input {
      font-size: 18px;
    }
  </style>
</head>
<body>
  <form method="post">
    <lable>Username: </label><input size="40" name="username" placeholder="Please input your mock username" />
    <button type="submit">Submit</button>
  </form>
</body>
</html>`;
  }
}
