# Directory Structure

## Directory Structure

```bash
project
├── docker-compose
├── env
├── src
│  ├── backend
│  │  ├── config
│  │  │  ├── config
│  │  │  └── locales.ts
│  │  ├── demo
│  │  ├── typing
│  ├── module
│  ├── module-vendor
│  ├── suite
│  │  └── a-home
│  │    ├── modules
│  │    │  ├── home-base
│  │    │  ├── home-index
│  │    │  └── home-user
│  └── suite-vendor
```

## Module/Suite

| Name              | Description                             |
| ----------------- | --------------------------------------- |
| src/module        | Standalone module (not part of a suite) |
| src/module-vendor | Standalone module (from third-party)    |
| src/suite         | Suite                                   |
| src/suite-vendor  | Suite (from third-party)                |

## Development suggestions

Vona has planned the modules/suites so that we can start business development immediately in the specified directory. The following conventions are only suggestions and are not mandatory:

1. Suite `suite/a-demo`: Contains some test or demo code, which can be disabled during build
2. Suite `suite/a-home`: Development in this suite
3. `Grow into a large-scale system`: As the business expands, more suites and modules can be created to split the system business

## Directory cheat sheet

| Name                                 | Description                                                                                                   |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
|docker-compose|docker-compose templates|
| env                                  | [Env](../../techniques/env/introduction.md)                                                                   |
| src/front/config/config              | [Config](../../techniques/config/introduction.md)                                                             |
| src/front/config/locales.ts          | [I18n](../scope/locale.md)                                                                                    |
| src/backend/demo          | Demo playground                                                                    |
| src/backend/typing         | Project-level type definitions                                                                    |