# Comparison with Other Frameworks

## Comparison with Next

1. Vona provides more powerful and complete backend capabilities, easily handling the development of large-scale business systems
2. Vona works perfectly with Zova, continuing the frontend-backend separation architecture. Zova is a more intuitive framework with the pros of Vue3, React and Angular, empowers developers to build elegant, fast and reliable applications. Frontend projects built with Zova can run independently or have their JS bundle copied into the Vona backend for SSR rendering directly on the backend
   - Vona can generate a complete Openapi Schema, which can then generate an API SDK in Zova
   - Zova can generate types for routes and components to provide type hints in Vona

## Comparison with Nest

1. Vona generates unified schemas based on Zod4, which can be used for parameter validation, Swagger documentation generation, dynamic Form/Table rendering, and response data serialization
2. Vona pioneered DTO dynamic inference and generation capabilities, significantly improving development efficiency and experience
3. Vona has built-in support for multi-tenancy, multi-database, and multi-datasource, easily handling large-scale business system development
4. Vona provides more complete AOP programming capabilities, including controller aspect, internal aspect, and external aspect, whereas Nest only implements controller aspect

## Comparison with Django Admin

1. Vona implements CRUD with a frontend-backend separation architecture. The frontend uses Zova, providing a more beautiful interface, cleaner code, and greater freedom to customize the interface and add new features
2. Vona can implement `SSR/SPA/Website/Admin-Dashboard` in the same codebase
3. Provides full SSR support for the `Admin-Dashboard` applications. Interface elements such as the `sidebar`, `multi-language`, `light and dark themes`, and `brand color themes` all support SSR, significantly reducing interface flicker when refreshing the page and improving user interaction experience
