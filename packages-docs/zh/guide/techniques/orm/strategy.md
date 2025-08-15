# 数据库策略

为了进一步优化日常的开发体验，提升开发效率，Vona 针对不同的运行环境采用不同的数据库策略：

## 测试环境

在`测试环境`不必指定数据库名称，而是由系统自动创建`测试数据库`。每当执行单元测试时，系统总是删除旧的测试数据库，然后创建一个新的测试数据库

* 重建数据库 + 单元测试

``` bash
$ npm run test
```

* 仅重建数据库

``` bash
$ npm run db:reset
```

比如，项目的名称是`cabloy-demo`，当执行单元测试时，系统会自动创建一个测试数据库，数据库名称为`egg-born-test-cabloy-demo-20210703-110520`

> * `这样设计的好处`：在项目的开发迭代当中，难免会频繁的修改数据库架构。那么一般的做法是，打开数据库管理工具进行手工修改。在CabloyJS中，只需要在模块的Bean组件`version.manager`中编写变更逻辑，然后执行一遍`单元测试`就生效了。换句话说，在CabloyJS开发当中，很少用到数据库管理工具
>
> * `有人会问一个问题`：如果执行`单元测试`会重新创建一个新的数据库，那么之前的测试数据是不是又需要重新手工输入一遍？
>
>   * 针对这个问题，CabloyJS也提出了相应的解决方案：就是在模块的Bean组件`version.manager`中直接编写测试数据的初始化逻辑。每当创建新的测试数据库时，这些测试数据都会自动生成

> 关于模块的Bean组件`version.manager`，请参见：[模块数据版本与变更](https://cabloy.com/zh-cn/articles/module-fileversion.html)

### 2\. 开发环境

在`开发环境`也不必指定数据库名称。每当启动后端开发服务时，总是查找可用的测试数据库，如果没有找到（比如，没有执行过单元测试）就自动创建一个新的测试数据库

``` bash
# 启动后端开发服务
$ npm run dev:backend
```

### 3\. 生产环境

在`生产环境`需要手工创建数据库，并在`config.prod.js`中指定数据库名称

``` bash
# 启动服务
$ npm run start:backend
# 启动服务（后台运行）
$ npm run start:backend-daemon
# 停止服务
$ npm run stop:backend
```

## MySQL连接配置

> 注意：以下均是默认配置，一般不用变更，只要确保`host`、`port`、`user`和`password`符合实际值即可

### 1\. 测试环境

`src/backend/config/config.unittest.js`

``` javascript
  // mysql
  config.mysql = {
    clients: {
      // donnot change the name
      __ebdb: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '',
        database: 'mysql', // donnot change the name
      },
    },
  };
```

| 名称 | 说明 |
|----|----|
| \__ebdb | 这是系统内置的MySQL节点名，不允许变更 |
| database | 指定为`mysql`，在执行单元测试时，会自动删除旧的测试数据库，然后创建一个新的测试数据库 |

### 2\. 开发环境

`src/backend/config/config.local.js`

``` javascript
  // mysql
  config.mysql = {
    clients: {
      // donnot change the name
      __ebdb: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '',
        database: 'mysql', // recommended
      },
    },
  };
```

| 名称 | 说明 |
|----|----|
| database | 推荐指定为`mysql`，在启动后端开发服务时，查找可用的测试数据库，如果没有找到就创建一个新的测试数据库。如果指定为其他具体的数据库名，就直接使用此数据库 |

### 3\. 生产环境

`src/backend/config/config.prod.js`

``` javascript
  // mysql
  config.mysql = {
    clients: {
      // donnot change the name
      __ebdb: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '',
        database: '{{name}}',
      },
    },
  };
```

| 名称 | 说明 |
|----|----|
| database | 此数据库需要手工创建 |

## SQL语句输出

在 CabloyJS 中只需指定一个参数即可实现 SQL 语句的输出，从而方便我们排查 SQL 方面的问题

`src/backend/config/config.{env}.js`

``` javascript
  // mysql
  config.mysql = {
    clients: {
      // donnot change the name
      __ebdb: {
        ...
        hook: {
          meta: {
            long_query_time: 200,
          },
        },
      },

    },
  };
```

| 名称 | 单位 | 说明 |
|----|----|----|
| long_query_time | 毫秒 | 当SQL语句执行时间超过该值，就会输出到控制台。如果设置为0，就相当于输出所有的SQL语句 |
