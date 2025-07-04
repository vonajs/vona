# Field Indexes

Vona provides a mechanism to create field indexes. Just declare the field indexes and the system will automatically create them

## Create meta.index

Vona uses Bean `meta.index` to uniformly configure the field indexes of the module

### 1. Cli command

``` bash
$ vona :create:bean meta index --module=demo-student
```

### 2. Menu command

::: tip
Context Menu - [Module Path]: `Vona Meta/Index`
:::

## meta.index Definition

``` typescript
@Meta()
export class MetaIndex extends BeanBase {}
```

- Inherited from `BeanBase` class
- Use `Meta` decorator

## Configure field indexes: normal style

```typescript
@Meta({
  indexes: {
    demoStudent: 'name',
  },
})
class MetaIndex {}
```

- `demoStudent`: Table name
- `'name'`: field name, type is `string | string[]`

## Configure field indexes: typed style

In order to make the code higher quality and easier to maintain, we can also use a typed code style

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

- `$tableColumns`: Generate typed table name and field name/names

## App config configuration

Field indexes can be configured in App config

`src/backend/config/config/config.dev.ts`

``` typescript
// onions
config.onions = {
  meta: {
    'demo-student:index': {
      indexes: {
        ...$tableColumns(
          () => EntityStudent,
          entity => entity.name,
        ),
      },
    },
  },
};
```
