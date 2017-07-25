'use strict'

import * as types from '../mutationTypes'

export default {
  [types.NEW_USER] ({ state, user }) {
    state.users = [
      ...state.users,
      user
    ]
    return state
  },
  [types.GET_USER] ({ state }, users) {
    state.users = [
      ...state.users
    ]
  }
}
