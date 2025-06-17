# Config配置

Vona 基于多维变量加载 Config 配置，从而提供更加灵活的配置机制，支持更复杂的业务场景

## meta与config文件

Vona 从`src/backend/config/config`目录中加载 config 文件。同样支持基于`meta`条件的文件加载，具体规则参见：[meta与.env文件](../env/introduction.md)

### 举例

在命令行执行`npm run dev`，那么，对应的 meta 变量值是：

| 名称    | 值            |
| ------- | ------------- |
| mode    | 'local' |
| flavor  | 'normal'       |

系统就会自动加载下列文件中的 Config 配置，并进行合并:

```txt
config.ts
config.normal.ts
config.normal.local.ts
config.mine.ts
config.normal.mine.ts
config.normal.local.mine.ts
```

## 访问全局config

在任何 bean 实例中可以直接通过`this.app.config`访问全局 config 对象

```typescript{4}
@Service()
export class ServiceDatabase extends BeanBase {
  get configDatabase() {
    return this.app.config.database;
  }
}  
```

## 访问模块config

模块可以单独提供自己的 config 配置，可以通过 Scope 实例获取模块的 config 配置，参见：[Config配置](../../essentials/scope/config.md)

## 覆盖模块config

可以使用项目级别的 config 配置覆盖模块级别的 config 配置，参见：[Config配置](../../essentials/scope/config.md)

## env与config的关系

有些变量同时存在于 env 和 config 中，基本逻辑如下：

1. 在 env 中配置变量的值
2. 让 config 中的值等于 env 中的值
3. 在代码中优先通过 config 来访问变量的值
4. 如果需要使用构建时 tree shaking 的能力，就通过`process.env.xxx`来访问变量的值

### 变量对照表

| env中的变量     | config中的变量    |
| --------------- | ----------------- |
| process.env.META_MODE       | app.config.meta.mode         |
| process.env.META_FLAVOR     | app.config.meta.flavor       |
