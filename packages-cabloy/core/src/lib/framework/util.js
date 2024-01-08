const MixinClassesFn = require('mixin-classes');

export default function () {
  return {
    mixinClasses(classMain, classesMore, ...args) {
      return MixinClassesFn(classMain, classesMore, ...args);
    },
  };
}
