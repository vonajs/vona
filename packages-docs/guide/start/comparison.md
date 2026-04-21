# Comparison with Other Frameworks

## Comparison with Next

| Feature                      | Vona                                    | Next                             |
| ---------------------------- | --------------------------------------- | -------------------------------- |
| Fullstack Mechanism          | Frontend and backend separation         | Frontend and backend integration |
| Backend Capability           | Powerful, comparable to `Nest`/`Spring` | General                          |
| Admin-Dashboard Supports SSR | ✅                                      | ❌                               |
| Dual-layer Tabs Navigation   | ✅                                      | ❌                               |

- `Fullstack Mechanism`: Vona adopts a frontend-backend separation architecture. The frontend uses the Zova framework, and the built JS bundle is placed into the Vona backend for direct SSR rendering on the backend
  - The backend generates Swagger/OpenAPI Schema for generating API SDK on the frontend
  - The frontend generates types for icons, routes, and components for providing type hints on the backend
- `Backend Capability`: Vona provides more powerful and complete backend capabilities, easily handling the development of large business systems, including `multi-tenancy`, `multi-database`, `multi-datasource`, `two-layer cache`, `queues`, `broadcast`, `scheduled tasks`, `distributed locks`, `DTO infer and generation`, and more
- `Admin-Dashboard Supports SSR`: Provides full SSR support for Admin-Dashboard applications, including sidebar, multilingual support, light/dark themes, and brand color themes. This reduces page flicker on refresh and delivers a smoother user interaction experience
- `Dual-layer Tabs Navigation`: Vona supports dual-layer tabs navigation, enabling efficient page switching while maintaining page state

## Comparison with Nest

| Feature                                        | Vona                                                | Nest                        |
| ---------------------------------------------- | --------------------------------------------------- | --------------------------- |
| Validation/OpenAPI                             | Unified Configuration                               | Has Redundant Configuration |
| DTO Infer and Generation                       | ✅                                                  | ❌                          |
| Multi-Tenant, Multi-Database, Multi-Datasource | Built-in                                            | Third-party                 |
| AOP Programming                                | Controller Aspect, Internal Aspect, External Aspect | Controller Aspect           |

- `Zod Schema`: Vona generates a unified schema based on Zod4, which can be used for `validation`, `Swagger/OpenAPI documentation generation`, `Form/Table dynamic rendering`, `Response data serialization`, and other scenarios
- `DTO Infer and Generation`: Vona dynamically infer and generate DTOs to eliminate redundant type definitions and boost development productivity
- `Multi-Tenant, Multi-Database, Multi-Datasource`: Vona has built-in capabilities for multi-tenancy, multi-database, and multi-datasource, making it easy to handle large-scale business system development
- `AOP Programming`: Vona provides more complete AOP programming capabilities, including `controller aspect`, `internal aspect`, and `external aspect`. Nest only implements `controller aspect`

> What is controller aspect?
>
> - Middleware, Guard, Interceptor, Pipe, and Filter are all designed to enhance the controller’s capabilities, so they are collectively referred to as `controller aspect`

## Comparison with Django Admin

| Feature                    | Vona                             | Django Admin                           |
| -------------------------- | -------------------------------- | -------------------------------------- |
| Backend Tech Stack         | NodeJS + Typescript              | Python + Server-side template language |
| Frontend Tech Stack        | Zova + Vue3 + Vite8 + Typescript | HTML + CSS + JS                        |
| SSR Mechanism              | Isomorphic SSR                   | Server-side template rendering         |
| Dual-layer Tabs Navigation | ✅                               | ❌                                     |

- Vona uses a frontend and backend separated architecture. The frontend uses the Zova framework, offering a more beautiful interface, cleaner code, and greater freedom to customize the interface and add new features
