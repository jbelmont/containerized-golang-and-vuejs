const test = require('ava')
const Vue = require('vue')

const Component = require('../../src/components/Index.vue')

test('Rendering the Index Component', t => {
  const vm = new Vue(Component).$mount()
  const tree = {
    $el: vm.$el.outerHTML
  }
  t.snapshot(tree)
})
