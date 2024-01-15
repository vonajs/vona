export function Local<T>(options: IDecoratorBeanOptions<T>): ClassDecorator {
  return function (target) {
    const module = parseModuleName(ParseModuleNameLevel);
    if (!module) throw new Error(`module name not parsed for bean: ${options.scene}.${options.name}`);
    // fullName
    const fullName = options.scene ? `${module}.${options.scene}.${options.name}` : options.name;
    // options
    const beanOptions: IDecoratorBeanOptionsBase<T> = {
      fullName,
      module,
      scene: options.scene,
      name: options.name,
      scope: options.scope,
      beanClass: target as unknown as Constructable<T>,
    };
    appResource.beans[fullName] = beanOptions;
  };
}
