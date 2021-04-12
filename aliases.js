const path = require('path')
const root = path.resolve(__dirname)

const alias = {
  components: `${root}/components`,
  common:     `${root}/components/common`,
  cronjob:    `${root}/components/cronjob`,
  workflow:   `${root}/components/workflow`,
  utils:      `${root}/utils`,
  theme:      `${root}/theme`,
  hooks:      `${root}/hooks`,
  services:   `${root}/services`,
  constants:  `${root}/constants`,
  providers:  `${root}/providers`,
  models:     `${root}/models`,
  root
}

module.exports = alias