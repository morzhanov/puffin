import { types } from 'mobx-state-tree'

export const UserModel = types
  .model('UserModel', {
    name: types.maybe(types.string)
  })

const RootStore = types
  .model('RootStore', {
    user: types.optional(types.maybe(UserModel), null),
    search: types.string
  }).actions(self => ({
    changeSearch (v) {
      self.search = v
    }
  }))

export default RootStore
