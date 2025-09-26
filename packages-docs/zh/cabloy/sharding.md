# 读写分离

此模块允许我们提供一组`写数据源`和一组`读数据源`。当用户访问后端 API 时，系统会按照规则自动选择`写数据源`或`读数据源`，访问相应的数据库，从而分摊压力，提升系统性能

## 安装模块

``` bash
$ pnpm add vona-module-a-datasharding -w
```

## 添加数据源

首先，需要添加一组数据源

### 1. 添加类型定义

为新数据源添加类型定义

`src/backend/config/config/config.ts`

``` typescript
declare module 'vona-module-a-orm' {
  export interface IDatabaseClientRecord {
    read1: never;
    read2: never;
    write1: never;
    write2: never;
  }
}
```

### 2. 增加数据源配置

`src/backend/config/config/config.ts`

``` typescript
// database
config.database = {
  clients: {
    read1: {
      client: 'pg',
      connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: '',
        database: 'xxxx-read1',
      },
    },
    read2: {...},
    write1: {...},
    write2: {...},
  },
};
```

## 配置读写数据源

然后配置模块的读写数据源

`src/backend/config/config/config.ts`

``` typescript
// modules
config.modules = {
  'a-datasharding': {
    client: {
      reads: ['read1', 'read2'],
      writes: ['write1', 'write2'],
      randomRead: undefined,
      randomWrite: undefined,
    },
  },
};    
```

|名称|说明|
|--|--|
|reads|指定一组读数据源|
|writes|指定一组写数据源|
|randomRead|可指定自定义函数，从`reads`中提取一个读数据源。默认为`undefined`，由系统随机提取|
|randomWrite|可指定自定义函数，从`writes`中提取一个写数据源。默认为`undefined`，由系统随机提取|

## 读写分离的运行机制

当配置好读写数据源之后，读写分离机制就自动生效了

现在，解释一下读写分离的运行机制：

1. 


