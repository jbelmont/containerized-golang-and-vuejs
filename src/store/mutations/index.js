'use strict'

export default {
  addUser ({ state, user }) {
    state.users = [
      ...state.users,
      user
    ]
    return state
  }
}
