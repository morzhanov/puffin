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
    width: types.number,
    height: types.number
  })

const RootStore = types.model('RootStore', {
  user: types.optional(types.maybe(UserModel), null),
  search: types.string,
  page: types.number,
  savedSearch: types.string,
  photos: types.array(PhotoModel)
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
  setPhotos (p) {
    self.photos = p
  },
  addPhotos (p) {
    self.photos = self.photos.concat(p)
  },
  performSearch () {
    _.throttle(() => {
      self.search &&
      (self.search !== '') &&
      api.postSearch(self.search, 1).then(res => {
        self.setSavedSearch(self.search)
        self.setPage(1)
        const photos = _.map(res.data.results, r => ({
          src: r.urls.small,
          full: r.urls.full,
          width: r.width,
          height: r.height
        }))
        self.setPhotos(photos)
        console.log(self.photos)
      })
    }, 2000)()
  },
  loadMore () {
    _.throttle(() => {
      self.setPage(self.page + 1)
      api.postSearch(self.search, self.page).then(res => {
        const photos = _.map(res.data.results, r => ({
          src: r.urls.small,
          full: r.urls.full,
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
