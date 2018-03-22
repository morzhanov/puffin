import { types, flow } from 'mobx-state-tree';

const UserModel = types
  .model('UserModel', {
    name: types.maybe(types.string),
    avatar: types.maybe(types.string),
  })
  .views(self => ({}))
  .actions(self => ({}));

const RootStore = types
  .model('RootStore', {
    searchName: types.optional(types.string, ''),
    user: types.optional(types.maybe(UserModel), null),
    fetchingData: types.optional(types.boolean, false)
  })
  .views(self => ({
  }))
  .actions(self => {
  });

export default RootStore;
