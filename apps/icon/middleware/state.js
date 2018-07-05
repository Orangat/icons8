'use strict'

export default ({ store, error }) => {
  if (store.state.serverError) {
    error(store.state.serverError)
  }
}
