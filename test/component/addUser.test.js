import test from 'ava'
import Vue from 'vue/dist/vue.common.js'
Vue.config.productionTip = false

import Component from '../../src/components/AddUser.vue'

let addUserComponent
test.before(() => {
  addUserComponent = {
    template: '<div class="add__user-component"><button class="btn btn-primary" @click.stop.prevent="addUser" type="button">{{addUserLabel}}</button></div>',
    components: {
      'index': Component
    },
    props: [
      'addUserLabel'
    ],
    propsData: {
      'addUserLabel': 'Add User'
    }
  }
})

test('Rendering the Index Component', t => {
  const vm = new Vue(addUserComponent).$mount()
  const tree = {
    $el: vm.$el.outerHTML
  }
  t.snapshot(tree)
})
