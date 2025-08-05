// Reexport the native module. On web, it will be resolved to NetinfoModule.web.ts
// and on native platforms to NetinfoModule.ts
export { default } from './NetinfoModule';
export { default as NetinfoView } from './NetinfoView';
export * from  './Netinfo.types';
