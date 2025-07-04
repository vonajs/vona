# 字段索引

Vona 提供了创建字段索引的机制。只需声明字段索引，系统就会自动创建

## 创建meta.index

Vona 使用 Bean `meta.index`统一配置模块的字段索引

### 1. Cli命令

``` bash
$ vona :create:bean meta index --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Meta/Index`
:::

## meta.index定义

``` typescript
@Meta()
export class MetaIndex extends BeanBase {}
```

- 继承自 BeanBase 基类
- 使用 Meta 装饰器

## 配置字段索引：普通风格

```typescript
@Meta({
  indexes: {
    demoStudent: 'name',
  },
})
class MetaIndex {}
```

- demoStudent: 数据表名
- 'name': 字段名，类型为`string | string[]`

## 配置字段索引：类型化风格

``` typescript
@Meta({
  indexes: {
    ...$tableColumns(
      () => EntityStudent,
      entity => entity.name,
    ),
  },
})
class MetaIndex {}
```

