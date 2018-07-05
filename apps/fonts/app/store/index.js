import Vuex from 'vuex'
import fontsApi from '../api'
import config from '~/config.js'
import seo from '../../../icon/store/seo'

export default () => new Vuex.Store({
  state: {
    fonts: [],
    mainFonts: [],
    mainFont: null,
    pairedFont: null,
    siteYears: [],
    sites: [],
    fontsSites: [],
    excludedSites: [],
    excludedFonts: [],
    loadedFonts: [],
    seoData: {
      title: 'Cool Fonts vs. Best Fonts',
      description: 'We’ve analyzed the fonts that the greatest startups have used. We’ve got top 50 fonts + combinations for each of them. The results were amazing.',
      image: '//cdnd.icons8.com/download/web-app-demo.gif'
    }
  },
  getters: {
    mainFonts: state => state.mainFonts,
    pairedFonts: state => state.mainFont ? state.mainFont.pairings : [],
    mainFont: state => state.mainFont,
    pairedFont: state => state.pairedFont,
    siteYears: state => state.siteYears,
    sites: state => state.sites,
    stats: state => state.stats,
    fontsSites: state => state.fontsSites,
    fonts: state => state.fonts,
    excludedSites: state => state.excludedSites,
    excludedFonts: state => state.excludedFonts,
    getSeoData: state => state.seoData,
    generateTitle: state => {
      if (state.mainFont && state.pairedFont) {
        return `${state.mainFont.title} + ${state.pairedFont.title}`.split(/\s+/).map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
      }

      return state.seoData.title
    },
    generateDescription: state => {
      if (state.mainFont && state.pairedFont) {
        return `How to use the font pair of ${state.mainFont.title} and ${state.pairedFont.title}. Examples of the best websites for this font pair.`
      }

      return state.seoData.description
    },
    getSourceLink: () => font => {
      let link = ''
      switch (font.source.title) {
        case config.googleSourceTitle:
          link = config.googleFontsLink + font.title.replace(/\s/g, '+')
          break
        case config.typekitSourceTitle:
          link = config.typekitLink + font.title.toLowerCase().replace(/\s/g, '-')
          break
        case config.fontsSquirrelSourceTitle:
          link = config.fontsSquirrelLink + font.title.toLowerCase().replace(/\s/g, '-')
          break
      }

      return link
    },
    getSourceLinkText: () => font => {
      let title = ''
      switch (font.source.title) {
        case config.googleSourceTitle:
          title = 'Google Fonts'
          break
        case config.typekitSourceTitle:
          title = 'Adobe Typekit'
          break
        case config.fontsSquirrelSourceTitle:
          title = 'Fonts Squirrel'
          break
      }

      return title
    },
    isSourceService: state => font => {
      if (font && font.source) {
        const services = [config.googleSourceTitle, config.typekitSourceTitle, config.fontsSquirrelSourceTitle]
        return services.includes(font.source.title)
      }

      return false
    },
    getIconLink: state => font => {
      return require(`../static/vue-static/fonts-app/icons/${font.source.title}.png`)
    }
  },
  actions: {
    getFontsSites ({commit, state}, payload) {
      const callback = (sites) => {
        payload.callback(sites)
        commit('setFontsSites', sites)
      }
      fontsApi.getFontsSites(payload.mainFontId, payload.pairedFontId, callback)
    },
    getStatsData ({commit, state}, payload) {
      const callback = statsData => {
        payload.callback(statsData.sitesPages, statsData.fontsPages)
        commit('setSites', statsData.sites)
        commit('setFonts', statsData.fonts)
        commit('setStats', statsData.stats)
        commit('setExcludedSites', statsData.excludedSites)
        commit('setExcludedFonts', statsData.excludedFonts)
      }
      fontsApi.getStatsData(callback)
    },
    getMainData ({commit}, payload) {
      const callback = payload.callback
      const mainFontTitle = payload.mainFontTitle
      const pairedFontTitle = payload.pairedFontTitle

      fontsApi.getMainData(mainData => {
        commit('setMainFonts', mainData.fonts)
        commit('setSiteYears', mainData.years)
        commit('setFontsSites', mainData.sites)

        if (callback) {
          callback()
        }
      }, mainFontTitle, pairedFontTitle)
    }
  },
  mutations: {
    setExcludedSites (state, excludedSites) {
      state.excludedSites = excludedSites
    },
    setExcludedFonts (state, excludedFonts) {
      state.excludedFonts = excludedFonts
    },
    setFonts (state, fonts) {
      state.fonts = fonts
    },
    setStats (state, stats) {
      state.stats = stats
    },
    setFontsSites (state, sites) {
      state.fontsSites = sites
    },
    setSites (state, sites) {
      state.sites = sites
    },
    setMainFonts (state, fonts) {
      fonts.forEach(font => {
        font.familyLoaded = false
      })
      state.mainFonts = fonts
    },
    setSiteYears (state, years) {
      state.siteYears = years
    },
    setMainFont (state, font) {
      state.mainFont = font
    },
    setPairedFont (state, font) {
      state.pairedFont = font
    },
    addLoadedFont (state, fontTitle) {
      if (!state.loadedFonts.find(font => font.title === fontTitle)) {
        state.loadedFonts.push({ title: fontTitle })
      }
    }
  },
  modules: {
    seo: seo()
  }
})
