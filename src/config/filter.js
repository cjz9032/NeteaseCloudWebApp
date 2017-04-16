const imageFilter = {
  toDefImg (src) {
    return src || 'def.jpg'
  },
  toCoverSizeImg (src) {
    return src + '?param=230y230'
  }
}

export {imageFilter}
