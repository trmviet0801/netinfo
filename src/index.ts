// Reexport the native module. On web, it will be resolved to NetinfoModule.web.ts
// and on native platforms to NetinfoModule.ts
export { default } from './NetinfoModule';
export * from  './Netinfo.types';
