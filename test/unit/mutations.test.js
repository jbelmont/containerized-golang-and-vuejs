'use strict'

const test = require('ava')

const mutations = require('../../src/store/mutations').default

test('NEW_USER should add User to state', t => {
  const state = {
    users: [
      {
        'id': 1,
        'first_name': 'John',
        'last_name': 'Rambo',
        'email': 'john.rambo@badass.net',
        'gender': 'Male'
      }
    ]
  }
  const user = {
    'id': 2,
    'firstname': 'Diana',
    'lastname': 'Prince',
    'email': 'wonderwoman@messyouup.com',
    'gender': 'Female'
  }
  const args = {
    state,
    user
  }
  const actual = mutations.NEW_USER(args)
  const expected = [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Rambo',
      email: 'john.rambo@badass.net',
      gender: 'Male'
    },
    {
      id: 2,
      firstname: 'Diana',
      lastname: 'Prince',
      email: 'wonderwoman@messyouup.com',
      gender: 'Female'
    }
  ]
  t.deepEqual(actual.users, expected)
})
