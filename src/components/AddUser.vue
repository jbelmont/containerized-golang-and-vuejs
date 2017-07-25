<template>
  <div class="add__user-component">
    <button class="btn btn-primary" @click.stop.prevent="addUser" type="button">{{addUserLabel}}</button>
  </div>
</template>

<script>
export default {
  props: [
    'addUserLabel'
  ],
  methods: {
    addUser () {
      this.$emit('showPopover')
    }
  }
}
</script>

<style scoped lang="scss">
.add__user-component {
  display: flex;
}

.btn-primary {
  color: #fff;
  background-color: #337ab7;
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
