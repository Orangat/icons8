'use strict'

export default ({ app, req, store }) => {
  if (process.server) {
    app.head.link = app.head.link || []
    store.state.appInfo.activeLanguages.forEach(lang => {
      let alternateExists = false
      app.head.link.forEach(link => {
        if (link.hreflang === lang.code) {
          link.href = lang.url + req.originalUrl
          alternateExists = true
        }
      })
      if (!alternateExists) {
        app.head.link.push({
          rel: 'alternate',
          hreflang: lang.code,
          hid: `alternate-${lang.code}`,
          href: lang.url + req.originalUrl
        })
      }
    })
  }
}
