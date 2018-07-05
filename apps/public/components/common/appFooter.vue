<template lang="pug">
  footer.app-footer
    section.footer-categories
      .footer-container
        h4.footer-category-links__title
          a(href='/icon/') Browse {{iconsCount}} Icons by Category
        .footer-category-links__wrapper
          section.footer-category-links
            ul.footer-category-links-list
              li.footer-category-links-list__item(v-for="link in categoryLinksCol1")
                a(v-bind:href="link.src") {{link.title}}
          section.footer-category-links
            ul.footer-category-links-list
              li.footer-category-links-list__item(v-for="link in categoryLinksCol2")
                a(v-bind:href="link.src") {{link.title}}
          section.footer-category-links
            ul.footer-category-links-list
              li.footer-category-links-list__item(v-for="link in categoryLinksCol3")
                a(v-bind:href="link.src") {{link.title}}
          section.footer-category-links
            ul.footer-category-links-list
              li.footer-category-links-list__item(v-for="link in categoryLinksCol4")
                a(v-bind:href="link.src") {{link.title}}
          section.footer-category-links
            ul.footer-category-links-list
              li.footer-category-links-list__item(v-for="link in categoryLinksCol5")
                a(v-bind:href="link.src") {{link.title}}

    section.footer-links
      .footer-container
        section.footer-links-column
          h4.footer-links__title About
          ul.footer-category-links-list
            li.footer-category-links-list__item
              a(href='https://icons8.com/our-business-model/') Business Model
            li.footer-category-links-list__item
              a(href='https://icons8.com/about/') Team
            li.footer-category-links-list__item
              a(href='https://icons8.com/about/#open-source') Our Open Source Projects
        section.footer-links-column
          h4.footer-links__title News and Social
          ul.footer-category-links-list
            li.footer-category-links-list__item
              a(href='https://icons8.com/blog') Blog
            li.footer-category-links-list__item
              a(href='https://design-nation.icons8.com/') Medium
            li.footer-category-links-list__item
              a(href='https://www.facebook.com/Icons8') Facebook&nbsp;
              a(href='https://twitter.com/Icons_8') Twitter&nbsp;
              a(href='https://plus.google.com/+Icons8/posts') Google+&nbsp;
        section.footer-links-column
          h4.footer-links__title Ideas for Icons
          ul.footer-category-links-list
            li.footer-category-links-list__item
              a(href='/request-icon/free/popular/') Popular
            li.footer-category-links-list__item
              a(href='/request-icon/free/latest/') New
            li.footer-category-links-list__item
              a#smartvote-open.smartvote-open(href='/request-icon') Submit
        section.footer-links-column
          h4.footer-links__title Licenses
          ul.footer-category-links-list
            li.footer-category-links-list__item
              a(href='/license/') Free License
            li.footer-category-links-list__item
              a(href='/paid-license-99/') Buy Full License
        section.footer-links-column
          h4.footer-links__title Support
          ul.footer-category-links-list
            li.footer-category-links-list__item
              a(href='https://intercom.help/icons8', style='border-bottom: 0') FAQ
            li.footer-category-links-list__item
              a(href='/contact/') Contact us
        section.footer-links-column
          h4.footer-links__title Developers
          ul.footer-category-links-list
            li.footer-category-links-list__item
              a(href='/2013/09/23/weve-contributed-an-icon-to-imageoptim/') Free Icons for Open Source
            li.footer-category-links-list__item
              a(href='https://github.com/icons8') GitHub
            li.footer-category-links-list__item
              a(href='http://docs.icons8.apiary.io/') API
        section.footer-links-column.b-copyright
          span
            | ©
            | Icons8 LLC
        section.footer-links-column
          a(href='/privacy-policy/' class="privacy-policy") Privacy Policy&nbsp;
          a(href='/terms-and-conditions/') Terms and Conditions
        section.footer-links-column
          span(v-if="locale !== 'zh-CN'")
            | Accelerated by&nbsp;
            a(href='https://www.keycdn.com/') KeyCDN
          span(v-else)
            | Accelerated by&nbsp;
            a(href='http://www.miibeian.gov.cn/') 京 ICP 证 110745 号

</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'appFooter',
    data () {
      return {
        categoryLinks: [{
          title: 'Social Media Icons',
          src: '/icon/pack/Social-Networks'
        }, {
          title: 'Facebook Logo',
          src: '/icon/434/facebook'
        }, {
          title: 'YouTube Logo',
          src: '/icon/set/youtube/all'
        }, {
          title: 'Instagram',
          src: '/icon/set/instagram/all'
        }, {
          title: 'Twitter',
          src: '/icon/436/twitter'
        }, {
          title: 'Arrows',
          src: '/icon/pack/Arrows'
        }, {
          title: 'Calendar',
          src: '/icon/22/calendar'
        }, {
          title: 'Camera',
          src: '/icon/5376/camera'
        }, {
          title: 'Checkmark',
          src: '/icon/set/checkmark/all'
        }, {
          title: 'Edit',
          src: '/icon/pack/Editing'
        }, {
          title: 'Email',
          src: '/icon/1668/email'
        }, {
          title: 'Search',
          src: '/icon/131/search'
        }, {
          title: 'Settings',
          src: '/icon/364/settings'
        }, {
          title: 'Phone',
          src: '/icon/533/phone'
        }, {
          title: 'Heart',
          src: '/icon/set/heart/all'
        }, {
          title: 'Home',
          src: '/icon/set/home/all'
        }, {
          title: 'Sketch for Windows',
          src: '/lunacy'
        }, {
          title: 'Open Source Icons',
          src: '/welovesvg'
        }, {
          title: 'Our Free Icons',
          src: '/free-icons'
        }, {
          title: 'Other Design Freebies',
          src: 'https://icons8.com/articles/35-awesome-free-resources-for-ui-designer/'
        }]
      }
    },
    computed: {
      ...mapState({
        locale: state => state.lang.locale,
        iconsCount: state => state.appInfo.iconsCount
      }),
      categoryLinksCol1 () {
        return this.categoryLinks.slice(0, 4)
      },
      categoryLinksCol2 () {
        return this.categoryLinks.slice(4, 8)
      },
      categoryLinksCol3 () {
        return this.categoryLinks.slice(8, 12)
      },
      categoryLinksCol4 () {
        return this.categoryLinks.slice(12, 16)
      },
      categoryLinksCol5 () {
        return this.categoryLinks.slice(16, 20)
      }
    }
  }
</script>

<style lang="scss">
  $color-footer-title: #888888;
  $color-footer-background-1: #4a4a4a;
  $color-footer-background-2: #3c3c3c;
  .app-footer {
    min-height: 200px;
    color: $color-footer-title;

    a {
      transition: color 0.3s ease;
      color: inherit;
    }

    a:hover {
      color: white;
      text-decoration: none;
      text-shadow: 0 0 1px rgba(255, 255, 255, 0.7);
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 32px;
    }

    .footer-categories {
      padding-top: 42px;
      padding-bottom: 24px;
      background: $color-footer-background-1;
    }

    .footer-category-links__wrapper {
      display: flex;
      justify-content: space-between;
      padding: 24px 0;

      @media screen and (max-width: 575px) {
        flex-direction: column;
        flex-wrap: wrap;
      }
    }

    .footer-category-links-list {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    .footer-category-links__title {
      font-size: 24px;
      font-weight: 400;
      text-align: center;
      margin-top: 0px;
      margin-bottom: 10px;
    }

    .footer-category-links {
      width: 215px;
      font-size: 16px;
      text-align: left;
    }

    .footer-links {
      padding-top: 60px;
      padding-bottom: 32px;
      background-color: $color-footer-background-2;
    }

    .footer-links-column {
      display: inline-block;
      width: 33%;
      margin-bottom: 42px;
      padding-right: 16px;
      text-align: left;
      vertical-align: top;
      color: $color-footer-title;

      @media screen and (max-width: 575px) {
        display: block;
        width: 100%;
      }
    }

    .footer-links__title {
      font-size: 24px;
      font-weight: 400;
      margin-top: 0;
      margin-bottom: 8px;
      color: $color-footer-title;
    }

    .footer-links-column__copyright {
      color: rgba(255, 255, 255, 0.2);
    }

    .footer-links-column .footer-links-column--clr-grey {
      color: $color-footer-title;
    }
    .privacy-policy {
      padding-right: 16px;
    }
  }
</style>
