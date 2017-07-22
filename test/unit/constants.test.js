const test = require('ava')

const constants = require('../../src/constants').default

test('constants should render proper values', t => {
  t.plan(11)
  const constLabels = Object.keys(constants).map(labels => constants[labels])
  const labels = [
    'Dashboard',
    'Users',
    'Settings',
    'Profile',
    'ID',
    'First Name',
    'Last Name',
    'Gender',
    'Email',
    'Add User',
    'Remove User'
  ]
  constLabels.map((label, index, array) => {
    t.is(label, labels[index])
  })
})
