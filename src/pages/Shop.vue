<template>
  <div class="fixed-center text-center">
    <q-btn
        color="secondary full-width"
        @click="getUser"
        label="获取用户"
        size="lg"
    />
    <p class="text-faded">This is SHop</p>
    <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
            <router-view />
        </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'Account',
  methods: {
      getUser(){
          console.log(this.$router.options.routes);
      }
  }
}
</script>
