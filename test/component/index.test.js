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
    const expected = '<div class="containerized-golang-and-vuejs"><div class="navbar-component"><div class="navbar area"><a href="#" class="dashboard">Dashboard</a><nav role="navigation" id="navigation" class="list"><a href="#" class="item -link">Users</a><a href="#" class="item -link">Settings</a><a href="#" class="item -link">Profile</a><span class="item"><i class="fa fa-search"></i></span></nav><button data-collapse="" data-target="#navigation" class="toggle"><span class="icon"></span></button></div></div><div class="users-area"><table class="users-area-table"><thead><tr><td>ID</td><td>First Name</td><td>Last Name</td><td>Gender</td><td>Email</td><td>Remove User</td></tr></thead><tbody><tr><td>1</td><td>Timothy</td><td>Cox</td><td>Male</td><td>tcox0@dion.ne.jp</td><td><button data-id="1">Remove User</button></td></tr><tr><td>2</td><td>Sean</td><td>Medina</td><td>Male</td><td>smedina1@addthis.com</td><td><button data-id="2">Remove User</button></td></tr><tr><td>3</td><td>Jonathan</td><td>Tucker</td><td>Male</td><td>jtucker2@tripadvisor.com</td><td><button data-id="3">Remove User</button></td></tr><tr><td>4</td><td>Donna</td><td>Payne</td><td>Female</td><td>dpayne3@cdbaby.com</td><td><button data-id="4">Remove User</button></td></tr><tr><td>5</td><td>Emily</td><td>Elliott</td><td>Female</td><td>eelliott4@pen.io</td><td><button data-id="5">Remove User</button></td></tr><tr><td>6</td><td>Howard</td><td>Wallace</td><td>Male</td><td>hwallace5@latimes.com</td><td><button data-id="6">Remove User</button></td></tr><tr><td>7</td><td>Jacqueline</td><td>George</td><td>Female</td><td>jgeorge6@soup.io</td><td><button data-id="7">Remove User</button></td></tr><tr><td>8</td><td>Heather</td><td>Kelly</td><td>Female</td><td>hkelly7@hubpages.com</td><td><button data-id="8">Remove User</button></td></tr><tr><td>9</td><td>Kenneth</td><td>Fisher</td><td>Male</td><td>kfisher8@wunderground.com</td><td><button data-id="9">Remove User</button></td></tr><tr><td>10</td><td>Joan</td><td>Flores</td><td>Female</td><td>jflores9@icq.com</td><td><button data-id="10">Remove User</button></td></tr><tr><td>11</td><td>Wanda</td><td>Hunt</td><td>Female</td><td>whunta@linkedin.com</td><td><button data-id="11">Remove User</button></td></tr><tr><td>12</td><td>Alice</td><td>Gordon</td><td>Female</td><td>agordonb@mozilla.com</td><td><button data-id="12">Remove User</button></td></tr><tr><td>13</td><td>Nicholas</td><td>Harrison</td><td>Male</td><td>nharrisonc@fastcompany.com</td><td><button data-id="13">Remove User</button></td></tr><tr><td>14</td><td>Timothy</td><td>Hudson</td><td>Male</td><td>thudsond@bloomberg.com</td><td><button data-id="14">Remove User</button></td></tr><tr><td>15</td><td>Nancy</td><td>Lynch</td><td>Female</td><td>nlynche@163.com</td><td><button data-id="15">Remove User</button></td></tr><tr><td>16</td><td>Ryan</td><td>Stevens</td><td>Male</td><td>rstevensf@dedecms.com</td><td><button data-id="16">Remove User</button></td></tr><tr><td>17</td><td>Shawn</td><td>Little</td><td>Male</td><td>slittleg@cnet.com</td><td><button data-id="17">Remove User</button></td></tr><tr><td>18</td><td>Frances</td><td>Garrett</td><td>Female</td><td>fgarretth@cargocollective.com</td><td><button data-id="18">Remove User</button></td></tr><tr><td>19</td><td>Brian</td><td>Nelson</td><td>Male</td><td>bnelsoni@eepurl.com</td><td><button data-id="19">Remove User</button></td></tr><tr><td>20</td><td>Harry</td><td>Anderson</td><td>Male</td><td>handersonj@about.com</td><td><button data-id="20">Remove User</button></td></tr><tr><td>21</td><td>Michelle</td><td>Nelson</td><td>Female</td><td>mnelsonk@tiny.cc</td><td><button data-id="21">Remove User</button></td></tr><tr><td>22</td><td>Scott</td><td>Palmer</td><td>Male</td><td>spalmerl@canalblog.com</td><td><button data-id="22">Remove User</button></td></tr><tr><td>23</td><td>Helen</td><td>Day</td><td>Female</td><td>hdaym@geocities.com</td><td><button data-id="23">Remove User</button></td></tr><tr><td>24</td><td>Aaron</td><td>Torres</td><td>Male</td><td>atorresn@rediff.com</td><td><button data-id="24">Remove User</button></td></tr><tr><td>25</td><td>Cheryl</td><td>Morris</td><td>Female</td><td>cmorriso@theglobeandmail.com</td><td><button data-id="25">Remove User</button></td></tr><tr><td>26</td><td>Heather</td><td>Sims</td><td>Female</td><td>hsimsp@about.me</td><td><button data-id="26">Remove User</button></td></tr><tr><td>27</td><td>Andrew</td><td>Morales</td><td>Male</td><td>amoralesq@cbsnews.com</td><td><button data-id="27">Remove User</button></td></tr><tr><td>28</td><td>Kevin</td><td>Lane</td><td>Male</td><td>klaner@epa.gov</td><td><button data-id="28">Remove User</button></td></tr><tr><td>29</td><td>Karen</td><td>Perkins</td><td>Female</td><td>kperkinss@geocities.com</td><td><button data-id="29">Remove User</button></td></tr><tr><td>30</td><td>Jane</td><td>Jackson</td><td>Female</td><td>jjacksont@icq.com</td><td><button data-id="30">Remove User</button></td></tr><tr><td>31</td><td>Roy</td><td>Green</td><td>Male</td><td>rgreenu@csmonitor.com</td><td><button data-id="31">Remove User</button></td></tr><tr><td>32</td><td>Louis</td><td>Berry</td><td>Male</td><td>lberryv@so-net.ne.jp</td><td><button data-id="32">Remove User</button></td></tr><tr><td>33</td><td>Donald</td><td>Kennedy</td><td>Male</td><td>dkennedyw@umich.edu</td><td><button data-id="33">Remove User</button></td></tr><tr><td>34</td><td>Edward</td><td>Schmidt</td><td>Male</td><td>eschmidtx@seattletimes.com</td><td><button data-id="34">Remove User</button></td></tr><tr><td>35</td><td>Brenda</td><td>Bennett</td><td>Female</td><td>bbennetty@cargocollective.com</td><td><button data-id="35">Remove User</button></td></tr><tr><td>36</td><td>Bonnie</td><td>Carr</td><td>Female</td><td>bcarrz@desdev.cn</td><td><button data-id="36">Remove User</button></td></tr><tr><td>37</td><td>Tammy</td><td>Bailey</td><td>Female</td><td>tbailey10@technorati.com</td><td><button data-id="37">Remove User</button></td></tr><tr><td>38</td><td>Peter</td><td>Murray</td><td>Male</td><td>pmurray11@mozilla.com</td><td><button data-id="38">Remove User</button></td></tr><tr><td>39</td><td>Kathryn</td><td>Peterson</td><td>Female</td><td>kpeterson12@bandcamp.com</td><td><button data-id="39">Remove User</button></td></tr><tr><td>40</td><td>Linda</td><td>Carter</td><td>Female</td><td>lcarter13@redcross.org</td><td><button data-id="40">Remove User</button></td></tr><tr><td>41</td><td>Scott</td><td>Howell</td><td>Male</td><td>showell14@sogou.com</td><td><button data-id="41">Remove User</button></td></tr><tr><td>42</td><td>Lillian</td><td>Nichols</td><td>Female</td><td>lnichols15@a8.net</td><td><button data-id="42">Remove User</button></td></tr><tr><td>43</td><td>Frank</td><td>Wells</td><td>Male</td><td>fwells16@google.es</td><td><button data-id="43">Remove User</button></td></tr><tr><td>44</td><td>Jean</td><td>Wheeler</td><td>Female</td><td>jwheeler17@mlb.com</td><td><button data-id="44">Remove User</button></td></tr><tr><td>45</td><td>Phyllis</td><td>Arnold</td><td>Female</td><td>parnold18@deliciousdays.com</td><td><button data-id="45">Remove User</button></td></tr><tr><td>46</td><td>Irene</td><td>Mills</td><td>Female</td><td>imills19@nhs.uk</td><td><button data-id="46">Remove User</button></td></tr><tr><td>47</td><td>Rose</td><td>Anderson</td><td>Female</td><td>randerson1a@google.pl</td><td><button data-id="47">Remove User</button></td></tr><tr><td>48</td><td>Harry</td><td>Little</td><td>Male</td><td>hlittle1b@google.fr</td><td><button data-id="48">Remove User</button></td></tr><tr><td>49</td><td>Ruby</td><td>Rogers</td><td>Female</td><td>rrogers1c@digg.com</td><td><button data-id="49">Remove User</button></td></tr><tr><td>50</td><td>Jonathan</td><td>Carpenter</td><td>Male</td><td>jcarpenter1d@furl.net</td><td><button data-id="50">Remove User</button></td></tr></tbody></table></div></div>'
    t.is(indexComponent.methods.getUsers.called, true)
    t.is(tree.$el, expected)
  })
})
