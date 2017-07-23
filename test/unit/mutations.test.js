'use strict'

const test = require('ava')

const mutations = require('../../src/store/mutations')

test('mutations should render proper labels', t => {
  t.plan(3)
  const expectedLabel = [
    'REMOVE_USER',
    'ADD_USER',
    'EDIT_USER'
  ]
  Object.keys(mutations.default).map((label, index, array) => {
    t.is(label, expectedLabel[index])
  })
})
