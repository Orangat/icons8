export default {
  init (config) {
    Object.assign(this, config)
  },
  appInfoUrl: process.env.appInfoUrl,
  translationsUrl: process.env.translationsUrl,
  apiUrl: process.env.apiUrl,
  cdnApiUrl: process.env.apiUrl,
  backendUrl: process.env.backendUrl,
  searchUrl: process.env.searchUrl,
  iconsUrl: process.env.iconsUrl,
  broUrl: process.env.broUrl,
  staticCdn: process.env.staticCdn,
  fontsApiUrl: process.env.fontsApiUrl,

  redis: process.env.redis,
  redisHost: process.env.redisHost,
  redisPort: process.env.redisPort,

  language: process.env.language,

  intercomAppId: process.env.intercomAppId
}
