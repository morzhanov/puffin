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
    width: types.number,
    height: types.number
  })

const RootStore = types.model('RootStore', {
  user: types.optional(types.maybe(UserModel), null),
  search: types.string,
  photos: types.array(PhotoModel)
}).actions(self => ({
  changeSearch (v) {
    self.search = v
  },
  setPhotos (p) {
    self.photos = p
  },
  performSearch (v) {
    self.search &&
    (self.search !== '') &&
    api.postSearch(self.search).then(res => {
      const photos = _.map(res.data.results, r => ({
        src: r.urls.thumb,
        width: r.width,
        height: r.height
      }))
      self.setPhotos(photos)
      _.each(photos, p => {
        console.log(p)
      })
    })
  }
})).views(self => ({
  get allPhotos () {
    return self.photos
  }
}))

export default RootStore
