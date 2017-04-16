import {imageFilter} from '../config/filter'
var commonFilter = {}
commonFilter.install = function (Vue, options) {
  Object.keys(imageFilter).forEach((name) => {
    Vue.filter(name, imageFilter[name])
  })
}

export default commonFilter
