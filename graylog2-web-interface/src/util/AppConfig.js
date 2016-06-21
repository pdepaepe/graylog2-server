const AppConfig = {
  gl2ServerUrl() {
    return window.appConfig.gl2ServerUrl;
  },

  gl2AppPathPrefix() {
    return window.appConfig.gl2AppPathPrefix;
  },

  rootTimeZone() {
    return window.appConfig.rootTimeZone;
  },
  customUsername() {
    return window.appConfig.customUsername;
  }
};

export default AppConfig;
