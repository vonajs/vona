# Env

Vona exposes env variables on the special `process.env` object

Vona loads environment files based on multi-dimensional variables, providing a more flexible configuration mechanism and supporting more complex business scenarios

## meta & .env file

Vona uses [dotenv](https://github.com/motdotla/dotenv) to load additional environment variables from the following files in the directory `env`:

```txt
.env                # loaded in all cases
.env.[meta]         # only loaded in specified condition
.env.mine           # loaded in all cases, ignored by git
.env.[meta].mine    # only loaded in specified condition, ignored by git
```

- `[meta]` can be `any combination` of the following two variables

| Name    | Description                                                                          |
| ------- | ------------------------------------------------------------------------------------ |
| mode    | 'test' \|'dev' \| 'prod'                                            |
| flavor  | 'normal' \|'docker' \| 'ci' \| keyof VonaMetaFlavorExtend                                                    |

## npm scripts

Corresponding to the multi-dimensional variables, the command line script is also divided into three parts, such as:

Corresponding to the multidimensional variables, the correspondence between the commands and the scripts are as follows:

```bash
$ npm run test
$ npm run dev
$ npm run build
$ npm run build:docker
```

``` json
"scripts": {
  "test": "vona :bin:test --flavor=normal",
  "dev": "vona :bin:dev --flavor=normal",
  "build": "vona :bin:build --flavor=normal",
  "build:docker": "vona :bin:build --flavor=docker", 
}
```

### For example

Execute `npm run dev` on the command line, then the corresponding meta variable values are:

| Name    | Value         |
| ------- | ------------- |
| mode    | 'dev' |
| flavor  | 'normal'       |

The system will automatically load the environment variables in the following files and merge them:

```txt
.env
.env.normal
.env.normal.dev
.env.mine
.env.normal.mine
.env.normal.dev.mine
```

## Built-in env variables

To further achieve out-of-box functionality, Vona provides several built-in env variables:

### meta

| Name          | Description       |
| ------------- | ----------------- |
| META_MODE     | mode              |
| META_FLAVOR   | flavor            |
| NODE_ENV      | `test`/`development`/`production` |

### App

| Name            | Description                                                                              |
| --------------- | ---------------------------------------------------------------------------------------- |
| APP_NAME        | App Name                                                                                 |
| APP_TITLE       | App Title                                                                                |
| APP_VERSION     | App Version                                                                              |

### Build

| Name          | Description                         |
| ------------- | ----------------------------------- |
| BUILD_OUTDIR  | Specify the output directory        |
|BUILD_SOURCEMAP| Sourcemap|
| BUILD_MINIFY  | Whether to enable minify            |
|BUILD_COPY_DIST|Copy dist to the specified directory|
|BUILD_COPY_RELEASE|Copy dist-releases to the specified directory|

### Suite/Module

| Name                     | Description              |
| ------------------------ | ------------------------ |
| PROJECT_DISABLED_MODULES | List of disabled modules |
| PROJECT_DISABLED_SUITES  | List of disabled suites  |

### database

Vona supports multiple databases. In order to use it out of the box, two datasource definitions are provided: `pg`/`mysql`, and the default datasource is `pg`

| Name                     | Description          |
| ------------------------ | -------------- |
| DATABASE_DEFAULT_CLIENT |the default datasource |

* pg

| Name                     | Description         |
| ------------------------ | -------------- |
| DATABASE_CLIENT_PG_HOST  |  |
| DATABASE_CLIENT_PG_PORT |  |
| DATABASE_CLIENT_PG_USER  |  |
| DATABASE_CLIENT_PG_PASSWORD |  |
| DATABASE_CLIENT_PG_DATABASE  |  |

* mysql

| Name                     | Description           |
| ------------------------ | -------------- |
| DATABASE_CLIENT_MYSQL_HOST |  |
|  DATABASE_CLIENT_MYSQL_PORT |  |
| DATABASE_CLIENT_MYSQL_USER |  |
|  DATABASE_CLIENT_MYSQL_PASSWORD |  |
| DATABASE_CLIENT_MYSQL_DATABASE |  |

### redis

| Name                     | Description        |
| ------------------------ | -------------- |
|REDIS_DEFAULT_HOST||
|REDIS_DEFAULT_PORT||
|REDIS_DEFAULT_PASSWORD||
|REDIS_DEFAULT_DB||
