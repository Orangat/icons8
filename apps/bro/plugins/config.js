'use strict'

import config from '../../public/plugins/config'

config.backendUrl = config.broUrl
config.loginUrl = '/api/v1/getAccessToken'
config.logoutUrl = ''
config.jwtLogin = true

export default config
