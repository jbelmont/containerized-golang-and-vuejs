'use strict'

import axios from 'axios'

import * as types from '../mutationTypes'

export const newUser = ({ commit }, user) => {
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  this.$http = user.http
  delete user.http
  this.$http.post('/api/v1/addUser', user, options)
  .then(() => {
    commit(types.NEW_USER, user)
  })
}

export const getUsers = ({ commit }, users) => {
  commit(types.GET_USER, users)
}

export const getAllUsers = ({ commit }) => {
  axios.get('api/v1/users').then(function ({ data }) {
    commit(types.GET_USER, data)
  }, function (err) {
    console.error(err)
  })
}

export const removeUser = ({ commit }, user) => {
  commit(types.REMOVE_USER, user)
}
