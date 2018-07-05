# Icons8-2.0

Icons8 applications with Vue 2.x + Nuxt.js + vue-router + vuex, with server-side rendering.

<p align="center">
  <a href="https://icons8.com/icon" target="_blank">
    <img src="http://dl4.joxi.net/drive/2017/06/06/0009/0967/594887/87/7da649d4f2.png" width="700px"><br>
    Live Demo
  </a>
</p>

## Features

- Server Side Rendering
  - Vue + vue-router + vuex working together
  - Server-side data pre-fetching and caching
  - Client-side state & DOM hydration
  - Automatically inlines CSS used by rendered components only
- Single-file Vue Components
  - Hot-reload in development
  - CSS extraction for production
- Using SVG icon files
  - Cached by browser
  - Extremely reduced API response size

## Architecture Overview

<img width="973" alt="screen shot 2016-08-11 at 6 06 57 pm" src="https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png">

## Development
**Requires Node.js 6+**
### Icon App
Icon App it's our https://icons8.com/icon application

This app need icons8 backend, so you need to config development for https://bitbucket.org/visualpharm/icons8

Also you need to add this to hosts:
```
127.0.0.1 fast.local-icons8.com

# if you need to test translations
127.0.0.1 fast.local-icons8.ru
127.0.0.1 fast.local-icons8.de
127.0.0.1 fast.local-icons8.it

192.168.101.127 api.local-icons8.ru
192.168.101.127 api.local-icons8.de
192.168.101.127 api.local-icons8.it
```
Then just run:
```
npm run dev
```
And open http://fast.local-icons8.com/icon

### Landings App
Landings App it's our more simple pages, like music https://icons8.com/music, search landing https://icons8.com/icon/set/home

This app need icons8 backend, so you need to config development for https://bitbucket.org/visualpharm/icons8

Also you need to add this to hosts:
```
127.0.0.1 fast.local-icons8.com

# if you need to test translations
127.0.0.1 fast.local-icons8.ru
127.0.0.1 fast.local-icons8.de
127.0.0.1 fast.local-icons8.it

192.168.101.127 api.local-icons8.ru
192.168.101.127 api.local-icons8.de
192.168.101.127 api.local-icons8.it
```
Then just run:
```
npm run landings:dev
```
And open http://localhost:3002/music

### Bro App
Bro App it's icon application for our designers https://bro.icons8.com

This app needs bro backend, so you need to config development for https://bitbucket.org/visualpharm/designer-icons8

Run:
```
npm run bro:dev
```
And open http://localhost:3003/upload


## Deployment
### Icon App
#### Demo server 
``` bash
# first start:
npm run build-demo
pm2 start npm --name "fast" -- run start-demo

# deploy:
npm run deploy-demo
```

#### Pre server
``` bash
### first start:
npm run build-pre
pm2 start npm --name "fast" -- run start-pre

# deploy:
npm run deploy-pre
```

#### Production server
``` bash
# first start:
npm run build
pm2 start npm --name "fast" -- run start

# deploy:
npm run deploy
```

### Landings App
#### Demo server 
``` bash
# first start:
npm run landings:build-demo
pm2 start npm --name "landings" -- run landings:start-demo

# deploy:
npm run landings:deploy-demo
```

#### Pre server
``` bash
# first start:
npm run landings:build-pre
pm2 start npm --name "landings" -- run landings:start-pre

# deploy:
npm run landings:deploy-pre
```

#### Production server
``` bash
# first start:
npm run landings:build
pm2 start npm --name "landings" -- run landings:start

# deploy:
npm run landings:deploy
```

### Bro App
#### Demo server 
``` bash
# first start:
npm run bro:build-demo
pm2 start npm --name "bro" -- run bro:start-demo

# deploy:
npm run bro:deploy-demo
```

#### Production server
``` bash
# first start:
npm run bro:build
pm2 start npm --name "bro" -- run bro:start

# deploy:
npm run bro:deploy
```
