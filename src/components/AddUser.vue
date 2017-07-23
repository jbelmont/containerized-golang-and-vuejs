<template>
  <div class="add__user-component">
    <button @click.stop.prevent="addUser" type="button">{{addUserLabel}}</button>
  </div>
</template>

<script>
export default {
  props: [
    'addUserLabel'
  ],
  methods: {
    addUser (event) {
      this.$emit("addUserEvent", event)
    }
  }
}
</script>

<style scoped lang="scss">
.add__user-component {
  display: flex;
}
</style>
