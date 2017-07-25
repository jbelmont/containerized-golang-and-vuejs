const test = require('ava')

const constants = require('../../src/constants').default

test('constants should render proper values', t => {
  t.plan(17)
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
    'Remove User',
    'ID: ',
    'First Name: ',
    'Last Name: ',
    'Gender: ',
    'Email: ',
    'Add a New User'
  ]
  constLabels.map((label, index, array) => {
    t.is(label, labels[index])
  })
})
