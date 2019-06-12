<template>
  <div class="fixed-center text-center">
    <q-btn
        color="secondary full-width"
        @click="getUser"
        label="获取用户"
        size="lg"
    />
    <p class="text-faded">This is SHop</p>
  </div>
</template>

<script>
export default {
  name: 'Account',
  methods: {
      getUser(){
          console.log(this.$auth.user());
      }
  }
}
</script>
