// Type declarations for Workbox module
declare module 'workbox-window' {
  export class Workbox {
    constructor(scriptURL: string, options?: object);
    register(): Promise<any>;
    addEventListener(event: string, callback: Function): void;
  }
}
