import { types } from 'mobx-state-tree'

const UserModel = types
  .model('UserModel', {
    name: types.maybe(types.string),
    avatar: types.maybe(types.string)
  })

const RootStore = types
  .model('RootStore', {
    searchName: types.optional(types.string, ''),
    user: types.optional(types.maybe(UserModel), null),
    fetchingData: types.optional(types.boolean, false)
  })

export default RootStore
