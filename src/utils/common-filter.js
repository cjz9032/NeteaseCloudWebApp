var commonFilter = {}
commonFilter.install = function (Vue, options) {
  Vue.filter('toDefImg', function (src) {
    return src || 'def.jpg'
  })
  Vue.filter('toCoverSizeImg', function (src) {
    return src + '?param=230y230'
  })
}

export default commonFilter
