import beanValidation from './bean/bean.validation.js';
import middlewareValidate from './bean/middleware.validate.js';

export default {
  // middleware
  'middleware.validate': {
    bean: middlewareValidate,
  },
  // global
  validation: {
    bean: beanValidation,
    global: true,
  },
};
