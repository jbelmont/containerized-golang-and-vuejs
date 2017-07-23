import test from 'ava'
import Vue from 'vue/dist/vue.common.js'
Vue.config.productionTip = false
import sinon from 'sinon'

import Component from '../../src/components/Index.vue'

import mockUsers from '../data/users'

let sandbox, indexComponent
test.before(() => {
  sandbox = sinon.sandbox.create()
  indexComponent = {
    template: '<div class="containerized-golang-and-vuejs"><div class="navbar-component"><div class="navbar area"><a href="#" class="dashboard">{{DASHBOARD}}</a><nav role="navigation" id="navigation" class="list"><a href="#" class="item -link">{{USERS}}</a><a href="#" class="item -link">{{SETTINGS}}</a><a href="#" class="item -link">{{PROFILE}}</a><span class="item"><i class="fa fa-search"></i></span></nav><button data-collapse data-target="#navigation" class="toggle"><span class="icon"></span></button></div></div><div class="users-area"><table class="users-area-table"><thead><tr><td>{{ID}}</td><td>{{FIRST_NAME}}</td><td>{{LAST_NAME}}</td><td>{{GENDER}}</td><td>{{EMAIL}}</td><td>{{REMOVE_USER}}</td></tr></thead><tbody><tr v-for="user in users" v-bind:key="user.id"><td>{{ user.id }}</td><td>{{ user.first_name }}</td><td>{{ user.last_name }}</td><td>{{ user.gender }}</td><td>{{ user.email }}</td><td><button :data-id=user.id v-on:click="removeUser">{{REMOVE_USER}}</button></td></tr></tbody></table></div></div>',
    components: {
      'index': Component
    },
    data: {
      users: mockUsers,
      DASHBOARD: 'Dashboard',
      USERS: 'Users',
      SETTINGS: 'Settings',
      PROFILE: 'Profile',
      ID: 'ID',
      FIRST_NAME: 'First Name',
      LAST_NAME: 'Last Name',
      GENDER: 'Gender',
      EMAIL: 'Email',
      REMOVE_USER: 'Remove User'
    },
    methods: {
      getUsers: sandbox.stub(),
      removeUser: sandbox.stub()
    }
  }
})

test.after(() => {
  sandbox.restore()
})

test('Rendering the Index Component', t => {
  Vue.nextTick(() => {
    const vm = new Vue(indexComponent).$mount()
    const tree = {
      $el: vm.$el.outerHTML
    }
    t.is(indexComponent.methods.getUsers.called, true)
    t.snapshot(tree)
  })
})
