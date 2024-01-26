import emailConfirm from './schema/emailConfirm.js';
import passwordChange from './schema/passwordChange.js';
import passwordForgot from './schema/passwordForgot.js';
import passwordReset from './schema/passwordReset.js';
import signin from './schema/signin.js';
import signup from './schema/signup.js';

const schemas = {};
Object.assign(schemas, emailConfirm);
Object.assign(schemas, passwordChange);
Object.assign(schemas, passwordForgot);
Object.assign(schemas, passwordReset);
Object.assign(schemas, signin);
Object.assign(schemas, signup);
// ok
export default schemas;
