# Env

Zova exposes env variables on the special `process.env` object, which are statically replaced at build time

Zova loads environment files based on multi-dimensional variables, providing a more flexible configuration mechanism and supporting more complex business scenarios

## meta & .env file

Zova uses [dotenv](https://github.com/motdotla/dotenv) to load additional environment variables from the following files in the directory `env`:

```txt
.env                # loaded in all cases
.env.[meta]         # only loaded in specified condition
.env.mine           # loaded in all cases, ignored by git
.env.[meta].mine    # only loaded in specified condition, ignored by git
```

- `[meta]` can be `any combination` of the following three field values

| Name    | Description                                                                          |
| ------- | ------------------------------------------------------------------------------------ |
| mode    | 'development' \| 'production' \| string;                                             |
| flavor  | 'front' \| 'admin' \| string;                                                        |
| appMode | 'spa' \| 'ssr' \| 'pwa' \| 'cordova' \| 'capacitor' \| 'electron' \| 'bex' \| string |

- `appMode`: for more info, see [Commands List: Mode](https://quasar.dev/quasar-cli-vite/commands-list#mode)

## npm scripts

Corresponding to the multi-dimensional variables, the command line script is also divided into three parts, such as:

```bash
$ npm run dev:ssr:admin
$ npm run build:ssr:admin
```

For convenience, we can set the most commonly used scripts as aliases, for example:

```json
"scripts": {
  "dev": "npm run dev:ssr:admin",
  "build": "npm run build:ssr:admin",
  "preview": "npm run preview:ssr",
  "dev:ssr:admin": "npm run prerun && quasar dev --mode ssr --flavor admin",
  "build:ssr:admin": "npm run prerun && quasar build --mode ssr --flavor admin",
  "preview:ssr": "concurrently \"node ./dist-mock/index.js\" \"node ./dist/ssr/index.js\"",
},
```

### For example

Execute `npm run dev` on the command line, then the corresponding meta variable values are:

| Name    | Value         |
| ------- | ------------- |
| mode    | 'development' |
| flavor  | 'admin'       |
| appMode | 'ssr'         |

The system will automatically load the environment variables in the following files and merge them:

```txt
.env
.env.admin
.env.admin.development
.env.admin.development.ssr
.env.mine
.env.admin.mine
.env.admin.development.mine
.env.admin.development.ssr.mine
```

## Built-in env variables

To further achieve out-of-box functionality, Zova provides several built-in env variables:

### meta

| Name          | Description       |
| ------------- | ----------------- |
| META_MODE     | mode              |
| META_FLAVOR   | flavor            |
| META_APP_MODE | appMode           |
| NODE_ENV      | equal `META_MODE` |

### App

| Name            | Description                                                                              |
| --------------- | ---------------------------------------------------------------------------------------- |
| APP_ROUTER_MODE | [Vue Router: History Modes](https://router.vuejs.org/guide/essentials/history-mode.html) |
| APP_ROUTER_BASE | [Vue Router: base](https://router.vuejs.org/api/interfaces/RouterHistory.html#base)      |
| APP_PUBLIC_PATH | [Vite: Public Base Path](https://vitejs.dev/guide/build.html#public-base-path)           |
| APP_NAME        | App Name                                                                                 |
| APP_TITLE       | App Title                                                                                |
| APP_VERSION     | App Version                                                                              |

### Dev server

| Name            | Description                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------- |
| DEV_SERVER_HOSTNAME | Dev server host [Vite: server.host](https://vitejs.dev/config/server-options.html#server-host) |
| DEV_SERVER_PORT | Dev server port                                                                                |

### Build

| Name          | Description                         |
| ------------- | ----------------------------------- |
| BUILD_OUTDIR  | Specify the output directory        |
| BUILD_MINIFY  | Whether to enable minify            |
| BUILD_ANALYZE | Whether to display the analyze info |

### Suite/Module

| Name                     | Description              |
| ------------------------ | ------------------------ |
| PROJECT_DISABLED_MODULES | List of disabled modules |
| PROJECT_DISABLED_SUITES  | List of disabled suites  |

### API

| Name         | Description           |
| ------------ | --------------------- |
| API_BASE_URL |                       |
| API_PREFIX   |                       |
| API_JWT      | Whether to enable JWT |

### PINIA

| Name          | Description             |
| ------------- | ----------------------- |
| PINIA_ENABLED | Whether to enable Pinia |

### Proxy

| Name               | Description                                                                                               |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| PROXY_API_ENABLED  | Whether to enable proxy: [Vite: server.proxy](https://vitejs.dev/config/server-options.html#server-proxy) |
| PROXY_API_BASE_URL | proxy target                                                                                              |
| PROXY_API_PREFIX   | proxy key                                                                                                 |

### SSR

See: [SSR](../ssr/env.md)

### Mock

See: [Mock](../mock/introduction.md)

## Dynamic environment variables

The following are the environment variables set according to the runtime environment:

| Name   | Description    |
| ------ | -------------- |
| SSR    | If SSR mode    |
| DEV    | If Development |
| PROD   | If Production  |
| CLIENT | If Client      |
| SERVER | If Server      |
