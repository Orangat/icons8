let env = {
  appInfoUrl: 'https://api.icons8.com',
  translationsUrl: 'https://icons8.com',
  apiUrl: 'https://api.icons8.com',
  backendUrl: 'https://icons8.com',
  searchUrl: 'https://search.icons8.com',
  iconsUrl: 'https://png.icons8.com',
  staticCdn: 'https://maxst.icons8.com',
  broUrl: 'https://bro.icons8.com',
  fontsApiUrl: 'https://icons8.com/fonts/api',

  redis: true,
  redisHost: '127.0.0.1',
  redisPort: 6379,

  language: 'en-US',

  intercomAppId: 'v9guv1i0'
}

// assign config for demo environment
if (process.env.NODE_ENV === 'demo') {
  Object.assign(env, require('./demo.env.js'))
  console.info('Using demo env')
}

// assign config for pre environment
if (process.env.NODE_ENV === 'pre') {
  Object.assign(env, require('./pre.env.js'))
  console.info('Using pre env')
}

try {
  // assign local config if exists
  const localEnv = require('./local.env.js')
  Object.assign(env, localEnv)
  console.info('Using local env')
} catch (e) {}

console.info(env)

module.exports = env
