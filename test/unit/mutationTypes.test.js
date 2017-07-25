'use strict'

const test = require('ava')

const mutations = require('../../src/store/mutationTypes')

test('mutations should render proper labels', t => {
  t.plan(4)
  const expectedLabel = [
    'REMOVE_USER',
    'NEW_USER',
    'EDIT_USER',
    'GET_USER'
  ]
  Object.keys(mutations).map((label, index, array) => {
    t.is(label, expectedLabel[index])
  })
})
