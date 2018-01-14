<template>
  <div class="containerized-golang-and-vuejs">
    <div class="navbar-component">
      <div class="navbar area">
        <add-user :addUserLabel="ADD_USER" v-on:showPopover="showPopover"></add-user>
        <div class="modal-mask" v-show="show" transition="modal">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                  <h4>{{ADD_A_NEW_USER_LABEL}}</h4>
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                  <div class="form-group validate has-error">
                    <label class="control-label">{{ID_LABEL}}</label>
                    <input id="newUserId" class="form-control" type="text" title=" (required)" required="">
                  </div>
                  <div class="form-group validate has-error">
                    <label class="control-label">{{FIRSTNAME_LABEL}}</label>
                    <input id="newUserFirstName" class="form-control" type="text" title=" (required)" required="">
                  </div>
                  <div class="form-group validate has-error">
                    <label class="control-label">{{LASTNAME_LABEL}}</label>
                    <input id="newUserLastName" class="form-control" type="text" title=" (required)" required="">
                  </div>
                  <div class="form-group validate has-error">
                    <label class="control-label">{{GENDER_LABEL}}</label>
                    <input id="newUserGender" class="form-control" type="text" title=" (required)" required="">
                  </div>
                  <div class="form-group validate has-error">
                    <label class="control-label">{{EMAIL_LABEL}}</label>
                    <input id="newUserEmail" class="form-control" type="text" title=" (required)" required="">
                  </div>
                </slot>
              </div>

              <div class="modal-action">
                <slot name="action">
                  <input class="btn btn-primary" type="button" @click="show = false" value="Close">
                  <input class="btn btn-primary" type="button" @click="addingUser" value="Add a User">
                </slot>
              </div>
            </div>
          </div>
        </div>
        <a href="#" class="dashboard">{{DASHBOARD}}</a>
      </div>
    </div>
    <div class="users-area">
      <table class="users-area-table">
        <thead>
          <tr>
            <td>{{ID}}</td>
            <td>{{FIRST_NAME}}</td>
            <td>{{LAST_NAME}}</td>
            <td>{{GENDER}}</td>
            <td>{{EMAIL}}</td>
            <td>{{REMOVE_USER}}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users"
              v-bind:key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.first_name }}</td>
            <td>{{ user.last_name }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.email }}</td>
            <td><button class="btn btn-danger" :data-index=index :data-id=user.id v-on:click="removeUser">{{REMOVE_USER}}</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AddUser from './AddUser.vue'
import constants from '../constants'
import { mapState, mapGetters, mapActions, store } from 'vuex'
const {
  DASHBOARD,
  ID,
  ADD_USER,
  FIRST_NAME,
  LAST_NAME,
  GENDER,
  EMAIL,
  REMOVE_USER,
  ID_LABEL,
  FIRSTNAME_LABEL,
  LASTNAME_LABEL,
  GENDER_LABEL,
  EMAIL_LABEL,
  ADD_A_NEW_USER_LABEL
} = constants

export default {
  name: 'index',
  components: {
    AddUser
  },
  data () {
    return {
      users: [],
      show: false,
      DASHBOARD,
      ID,
      ADD_USER,
      FIRST_NAME,
      LAST_NAME,
      GENDER,
      EMAIL,
      REMOVE_USER,
      ID_LABEL,
      FIRSTNAME_LABEL,
      LASTNAME_LABEL,
      GENDER_LABEL,
      EMAIL_LABEL,
      ADD_A_NEW_USER_LABEL
    }
  },
  mounted: function () {
    return this.getUsers()
  },
  methods: {
    getUsers: function () {
      this.$http.get('/api/v1/users').then(function (data) {
        this.users = data.body
      }, function (err) {
        console.error(err)
      })
    },
    resetFields: function () {
      document.getElementById('newUserId').value = ''
      document.getElementById('newUserFirstName').value = ''
      document.getElementById('newUserLastName').value = ''
      document.getElementById('newUserGender').value = ''
      document.getElementById('newUserEmail').value = ''
    },
    showPopover: function () {
      this.resetFields()
      this.show = true
    },
    addingUser: function () {
      this.show = false
      const addUser = {
        id: Number(document.getElementById('newUserId').value),
        first_name: document.getElementById('newUserFirstName').value,
        last_name: document.getElementById('newUserLastName').value,
        gender: document.getElementById('newUserGender').value,
        email: document.getElementById('newUserEmail').value
      }
      const options = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      this.$http.post('/api/v1/users', addUser, options)
      .then(function() {
        addUser["id"] = addUser["id"].toString()
        const users2 = this.users
        users2.push(addUser)
        this.users = users2
      }.bind(this))
    },
    removeUser: function (event) {
      const id = +event.currentTarget.dataset["id"]
      const index = event.currentTarget.dataset["index"]
      const options = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      this.$http.delete(`/api/v1/users/${id}`, options)
        .then(function() {
          const users3 = [
            ...this.users.slice(0, index - 1),
            ...this.users.slice(index, this.users.length - 1)
          ]
          this.users = users3
        }.bind(this))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../scss/variables';
// Scaffolding
*, *:before, *:after {
  box-sizing: border-box;
}

body {
  background-color: #f5f5f5;
  color: #333;
  font-size: 14px;
  font-family: Verdana, Arial, sans-serif;
  line-height: 20px;
}
a {
  text-decoration: none; transition: all 0.3s linear 0s;
}

.users-area {
  display: flex;
  flex-direction: row;

  &-table {
    width: 100%;
  }
}

.area {
  display: flex; flex-flow: row wrap; align-items: stretch; margin-left: auto; margin-right: auto;
  @media (min-width: 768px) { width: 750px; }
  @media (min-width: 992px) { width: 970px; }
  @media (min-width: 1200px) { width: 1140px; }
}

// Navigation component
// ----------

// Component skeleton
.navbar-component {
  background-color: $navbar-background;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16), 0 2px 10px rgba(0, 0, 0, 0.12);

  & > .navbar.area {
    align-items: center;
    justify-content: space-between;
  }
}

td, th {
  text-align: center;
  border: solid 1px #ccc;
  font-size: 22px;
  padding: 6px;
  word-wrap: break-word;
}

.navbar {
  .add__user-btn {
    justify-content: flex-start;
    align-items: flex-start;
    cursor: pointer;
  }

  & > .dashboard {
    display: flex;
    font-size: 22px;
    color: #777;
    margin: round(($navbar-height - 20) / 2);
    justify-content: center;
    align-items: center;
    cursor: default;
  }

  // Toggle button
  & > .toggle {
    border: 0;
    background-color: transparent;
    outline: none;
    border: 0;
    display: inline-block;
    background-color: transparent;
    background-image: none;
    vertical-align: middle;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    touch-action: manipulation;
    user-select: none;
    padding: round(($navbar-height - 20) / 2);

     @media (min-width: $navbar-collapse-breakpoint) {
       display: none;
     }
  }

  & > .toggle > .icon {
    position: relative;
    margin-top: 8px;
    margin-bottom: 8px;

    &, &:before, &:after {
      display: block;
      width: 24px;
      height: 3px;
      transition: background-color 0.3s linear, transform 0.3s linear;
      background-color: #555555;
    }

    &:before, &:after {
      position: absolute; content: "";
    }
    &:before {
      top: -8px;
    }
    &:after {
      top: 8px;
    }
  }

  & > .toggle.-active > .icon {
    background-color: transparent;

    &:before { transform: translateY(8px) rotate(45deg); }
    &:after { transform: translateY(-8px) rotate(-45deg); }
  }

  // List of items
  & > .list {
    display: none;
    flex-flow: row nowrap;
    align-items: center;
    white-space: nowrap;

    @media (min-width: $navbar-collapse-breakpoint) {
      display: flex;
    }

    @media (max-width: $navbar-collapse-breakpoint) {
      position: fixed;
      top: $navbar-height;
      left: 0;
      width: 100%;
      overflow-y: hidden;
      overflow-x: auto;
      border-top: 1px solid $navbar-border;
      background-color: $navbar-background;
    }

    &.-on {
      display: flex;
    }
  }

  & > .list > .item {
    display: block;
    flex-shrink: 0;
    height: $navbar-height;
    line-height: $navbar-height;
    padding-left: round(($navbar-height - 20) / 2);
    padding-right: round(($navbar-height - 20) / 2);
    text-transform: uppercase;
    color: $navbar-item-color;
    font-size: $navbar-item-font-size;
  }

  & > .list > .item.-link {
    line-height: $navbar-height + $navbar-item-border-width;
    color: $navbar-item-color;
    border-bottom: $navbar-item-border-width solid $navbar-item-border;

    &.-active, &:hover, &:focus {
      color: $navbar-item-active-color;
      border-bottom-color: $navbar-item-active-border;
    }
  }
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 60%;
  margin: 0px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter, .modal-leave {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: 700;
}

.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}

.btn-primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}

.btn-danger {
  color: #fff;
  background-color: #d9534f;
  border-color: #2e6da4;
}

.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}
</style>
