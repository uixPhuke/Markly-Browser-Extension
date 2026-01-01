declare module "webextension-polyfill" {
  const browser: typeof globalThis.browser;
  export default browser;
}
