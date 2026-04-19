# Comparison with Other Frameworks

## Comparison with Next

| Feature                      | Vona                                    | Next                             |
| ---------------------------- | --------------------------------------- | -------------------------------- |
| Fullstack Mechanism          | Frontend and backend separation         | Frontend and backend integration |
| Backend Capability           | Powerful, comparable to `Nest`/`Spring` | General                          |
| Admin-Dashboard Supports SSR | ✅                                      | ❌                               |
| Dual-layer Tabs Navigation   | ✅                                      | ❌                               |

- `Fullstack Mechanism`: Vona works perfectly with Zova, continuing the frontend-backend separation architecture. Frontend projects built with Zova can run independently or have their JS bundle copied into the Vona backend for SSR rendering directly on the backend
  - Vona can generate a complete OpenAPI Schema, enabling the generation of API SDKs in Zova
  - Zova can generate types for routes and components, providing type hints in Vona
- `Backend Capability`: Vona provides more powerful and complete backend capabilities, easily handling the development of large business systems, including `multi-tenancy`, `multi-database`, `multi-datasource`, `two-layer cache`, `queues`, `broadcast`, `scheduled tasks`, `distributed locks`, `DTO dynamic inference and generation`, and more
- `Admin-Dashboard Supports SSR`: Vona provides full SSR support for the `Admin-Dashboard` applications. Interface elements such as the `sidebar`, `multi-language`, `light and dark themes`, and `brand color themes` all support SSR, significantly reducing interface flicker when refreshing the page and improving user interaction experience
- `Dual-layer Tabs Navigation `: Vona pioneers dual-layer tabs navigation, allowing more convenient switching between multiple pages while maintaining page states, enabling the simultaneous handling of multiple tasks and enhancing user interaction experience

## Comparison with Nest

| Feature                                        | Vona                                                | Nest              |
| ---------------------------------------------- | --------------------------------------------------- | ----------------- |
| Validation/OpenAPI                             | One mechanism                                       | Two mechanisms    |
| DTO Dynamic Inference and Generation           | ✅                                                  | ❌                |
| Multi-Tenant, Multi-Database, Multi-Datasource | Built-in                                            | Third-party       |
| AOP Programming                                | Controller Aspect, Internal Aspect, External Aspect | Controller Aspect |

- `Zod Schema`: Vona generates a unified schema based on Zod4, which can be used for `validation`, `Swagger/OpenAPI documentation generation`, `Form/Table dynamic rendering`, `Response data serialization`, and other scenarios
- `DTO Dynamic Inference and Generation`: Vona pioneers dynamic DTO inference and generation capabilities, significantly improving development efficiency and experience
- `Multi-Tenant, Multi-Database, Multi-Datasource`: Vona has built-in capabilities for multi-tenancy, multi-database, and multi-Datasource, making it easy to handle large-scale business system development
- `AOP Programming`: Vona provides more complete AOP programming capabilities, including `controller aspect`, `internal aspect`, and `external aspect`. Nest only implements `controller aspect`

> What is controller aspect?
>
> - Middleware, Guard, Interceptor, Pipe, and Filter are all designed to enhance the controller’s capabilities, so they are collectively referred to as `controller aspect`

## Comparison with Django Admin

| Feature                    | Vona                             | Django Admin                           |
| -------------------------- | -------------------------------- | -------------------------------------- |
| Backend Tech Stack         | NodeJS + Typescript              | Python + server-side template language |
| Frontend Tech Stack        | Zova + Vue3 + Vite8 + Typescript | HTML + CSS + JS                        |
| SSR Mechanism              | Isomorphic SSR                   | Server-side template rendering         |
| Dual-layer Tabs Navigation | ✅                               | ❌                                     |

- Vona uses a frontend and backend separated architecture. The frontend uses the Zova framework, offering a more beautiful interface, cleaner code, and greater freedom to customize the interface and add new features
