import 'muse-el/styles/base.less'
import appBar from 'muse-el/appBar'
import avatar from 'muse-el/avatar'
import badge from 'muse-el/badge'
import divider from 'muse-el/divider'
import drawer from 'muse-el/drawer'
import icon from 'muse-el/icon'
import iconButton from 'muse-el/iconButton'
import floatButton from 'muse-el/floatButton'
import * as list from 'muse-el/list'
import paper from 'muse-el/paper'
import refreshControl from 'muse-el/refreshControl'
import infiniteScroll from 'muse-el/infiniteScroll'
import * as tabs from 'muse-el/tabs'
import circularProgress from 'muse-el/circularProgress'
import * as flexbox from 'muse-el/flexbox'
import bottomSheet from 'muse-el/bottomSheet'
import {retina} from 'muse-el/utils'

const components = {
  appBar,
  avatar,
  badge,
  divider,
  drawer,
  icon,
  iconButton,
  floatButton,
  ...list,
  refreshControl,
  infiniteScroll,
  paper,
  ...tabs,
  circularProgress,
  ...flexbox,
  bottomSheet
}

export default {
  install (Vue) {
    Object.keys(components).forEach((key) => {
      Vue.component(components[key].name, components[key])
    })
    retina()
  }
}
