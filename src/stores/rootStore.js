import { types } from 'mobx-state-tree'
import { api } from '../utils/api'
import _ from 'lodash'

export const UserModel = types
  .model('UserModel', {
    name: types.maybe(types.string)
  })

export const PhotoModel = types
  .model('PhotoModel', {
    src: types.string,
    full: types.string,
    regular: types.string,
    width: types.number,
    height: types.number
  })

const RootStore = types.model('RootStore', {
  user: types.optional(types.maybe(UserModel), null),
  search: types.string,
  page: types.number,
  savedSearch: types.string,
  currentPhoto: types.maybe(types.string),
  photos: types.array(PhotoModel),
  loading: types.boolean
}).actions(self => ({
  changeSearch (v) {
    self.search = v
  },
  setSavedSearch (v) {
    self.savedSearch = v
  },
  setPage (v) {
    self.page = v
  },
  nextImage () {
    const current =
      _.findIndex(self.allPhotos, ['regular', self.currentPhoto])
    if (current !== self.allPhotos.length) {
      self.currentPhoto = self.allPhotos[current + 1].regular
    }
  },
  prevImage () {
    const current =
      _.findIndex(self.allPhotos, ['regular', self.currentPhoto])
    if (current !== 0) {
      self.currentPhoto = self.allPhotos[current - 1].regular
    }
  },
  setPhotos (p) {
    self.photos = p
    self.loading = false
  },
  addPhotos (p) {
    self.photos = self.photos.concat(p)
    self.loading = false
  },
  closePhoto () {
    self.currentPhoto = null
  },
  openPhoto (full) {
    self.currentPhoto = full
  },
  setLoading (v) {
    if (v) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    self.loading = v
  },
  performSearch () {
    _.throttle(() => {
      if (!self.search || (self.search === '')) {
        return
      }
      self.setLoading(true)
      api.postSearch(self.search, 1).then(res => {
        self.setSavedSearch(self.search)
        self.setPage(1)
        const photos = _.map(res.data.results, r => ({
          src: r.urls.small,
          full: r.urls.full,
          regular: r.urls.regular,
          width: r.width,
          height: r.height
        }))
        // enable to preload images before rendering them
        // preloadImages(photos)
        setTimeout(() => self.setPhotos(photos), 500)
      })
    }, 2000)()
  },
  loadMore () {
    _.throttle(() => {
      self.setLoading(true)
      self.setPage(self.page + 1)
      api.postSearch(self.search, self.page).then(res => {
        const photos = _.map(res.data.results, r => ({
          src: r.urls.small,
          full: r.urls.full,
          regular: r.urls.regular,
          width: r.width,
          height: r.height
        }))
        self.addPhotos(photos)
      })
    }, 2000)()
  }
})).views(self => ({
  get allPhotos () {
    return self.photos
  }
}))

export default RootStore
