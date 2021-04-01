const path = require('path')
const root = path.resolve(__dirname)

const alias = {
  components: `${root}/components`,
  common: `${root}/components/common`,
  home: `${root}/components/home`,
  utils: `${root}/utils`,
  theme: `${root}/theme`,
  hooks: `${root}/hooks`,
  services: `${root}/services`,
  root
}

module.exports = alias