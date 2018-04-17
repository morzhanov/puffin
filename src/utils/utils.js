export const preloadImages = (array) => {
  if (!preloadImages.list) {
    preloadImages.list = []
  }
  const list = preloadImages.list
  for (let i = 0; i < array.length; i++) {
    const img = new window.Image()
    img.onload = function () {
      const index = list.indexOf(this)
      if (index !== -1) {
        // remove image from the array once it's loaded
        // for memory consumption reasons
        list.splice(index, 1)
      }
    }
    list.push(img)
    img.src = array[i].src
  }
}

export const preloadImage = (src) => {
  return new Promise((resolve) => {
    const img = new window.Image()
    img.onloadend = () => {
      resolve()
    }
    img.src = src
  })
}
