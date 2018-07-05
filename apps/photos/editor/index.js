'use strict'

import exportApi from './export'
import importApi from './import'

export default {
  ...exportApi,
  ...importApi
}
