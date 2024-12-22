import { z } from 'zod';

export const SymbolOpenApiOptions = Symbol('SymbolOpenApiOptions');
export interface IOpenApiOptions {
  description?: string;
  summary?: string;
  contentType?: TypeResponseContentType;
  bodySchema?: z.ZodSchema;
}

export type TypeResponseContentType =
  | 'application/json'
  | 'application/xml'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
  | 'text/plain'
  | 'text/html'
  | 'application/octet-stream'
  | 'application/pdf'
  | 'image/png'
  | 'image/jpeg'
  | 'image/gif'
  | 'image/webp'
  | 'image/svg+xml'
  | 'image/bmp'
  | 'image/tiff'
  | 'image/vnd.microsoft.icon'
  | 'image/vnd.wap.wbmp'
  | 'image/x-icon'
  | 'image/x-jng'
  | 'image/x-ms-bmp'
  | 'image/x-portable-bitmap'
  | 'image/x-portable-graymap'
  | 'image/x-portable-pixmap'
  | 'image/x-xbitmap'
  | 'image/x-xpixmap'
  | 'image/x-xwindowdump'
  | 'image/bmp'
  | 'image/x-bmp'
  | 'image/x-xbitmap'
  | 'image/x-win-bitmap'
  | 'image/x-windows-bmp'
  | 'image/ms-bmp'
  | 'image/x-ms-bmp'
  | 'image/x-icon'
  | 'image/x-ico'
  | 'image/vnd.microsoft.icon'
  | 'image/ico'
  | 'image/icon'
  | 'text/css'
  | 'text/csv'
  | 'text/html'
  | 'text/javascript'
  | 'text/plain'
  | 'text/xml'
  | 'application/javascript'
  | 'application/ecmascript'
  | 'application/json'
  | 'application/ld+json'
  | 'application/manifest+json'
  | 'application/javascript'
  | 'application/x-javascript'
  | 'application/x-json'
  | 'application/x-ms-application';
