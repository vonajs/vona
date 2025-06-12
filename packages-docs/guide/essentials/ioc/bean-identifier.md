# Bean Identifier

The system will automatically assign an identifier to each bean class as the following format:

```bash
{moduleName}.{sceneName}.{beanName}
```

For example, the module home-base provides a Service bean: ServiceMenu. Then the corresponding identifier of this bean is: `home-base.service.menu`

## Advantages of Bean-identifier-based injection

When using named beans cross-module, we do not recommend injecting directly based on `class type`, but rather on `bean identifier`. `Bean-identifier-based` injection has the following advantages:

1. `Avoid circular reference errors`: In complex business scenarios, multiple named beans often reference each other. `Bean-identifier-based` injection can intuitively support circular reference scenarios without error prompts and without any mental burden
