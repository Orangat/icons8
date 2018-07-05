'use strict'

import axios from '../../../public/plugins/axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.fontsApiUrl

export default axios
