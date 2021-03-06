import { types } from 'mobx-state-tree'
import { api } from '../utils/api'
import _ from 'lodash'
import { preloadImage } from '../utils/utils'

export const UserModel = types
  .model('UserModel', {
    name: types.maybe(types.string)
  })

export const PhotoModel = types
  .model('PhotoModel', {
    id: types.number,
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
  loading: types.boolean,
  fetching: types.boolean,
  totalPages: types.number
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
    const saved = self.currentPhoto
    let current = _.findIndex(self.allPhotos, ['regular', saved])
    if (current === self.allPhotos.length - 1) {
      current = 0
    }
    preloadImage(self.allPhotos[current + 1].regular).then(
      self.currentPhoto = self.allPhotos[current + 1].regular
    )
  },
  prevImage () {
    const saved = self.currentPhoto
    let current = _.findIndex(self.allPhotos, ['regular', saved])
    if (current === 0) {
      current = self.allPhotos.length - 1
    }
    preloadImage(self.allPhotos[current - 1].regular).then(
      self.currentPhoto = self.allPhotos[current - 1].regular
    )
  },
  setPhotos (p) {
    self.photos = p
    self.setLoading(false)
    self.fetching = false
  },
  addPhotos (p) {
    self.photos = self.photos.concat(p)
    self.setLoading(false)
    self.fetching = false
  },
  closePhoto () {
    self.currentPhoto = null
    document.body.style.overflow = 'visible'
  },
  openPhoto (full) {
    self.currentPhoto = full
    document.body.style.overflow = 'hidden'
  },
  setTotalPages (total) {
    self.totalPages = total
  },
  setLoading (v) {
    if (v) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
    self.loading = v
  },
  performSearch () {
    _.throttle(() => {
      if (!self.search || (self.search === '') || self.fetching) {
        return
      }
      self.setLoading(true)
      self.fetching = true
      api.postSearch(self.search, 1).then(res => {
        self.setSavedSearch(self.search)
        self.setPage(1)
        self.setTotalPages(res.data.total_pages)
        let inc = self.photos.length
        const photos = _.map(res.data.results, r => ({
          id: ++inc,
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
      if (self.fetching || self.page === self.totalPages) {
        return
      }
      self.fetching = true
      self.setPage(self.page + 1)
      api.postSearch(self.search, self.page).then(res => {
        let inc = self.photos.length
        const photos = _.map(res.data.results, r => ({
          id: ++inc,
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
