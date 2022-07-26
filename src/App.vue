<template>
  <div>
    <h1>hola mundo</h1>
    <nav v-if="!userStore.loadingSession">
      <router-link to="/" v-if="userStore.userData">Home </router-link> |
      <router-link to="/login" v-if="!userStore.userData">login </router-link> |
      <router-link to="/register" v-if="!userStore.userData">register </router-link>| 
      <!-- <router-link to="/editar/dfvdf" v-if="userStore.userData">editar </router-link> <router-link to="/register" v-if="!userStore.userData">register </router-link>  -->

      <button @click="userStore.logoutUser">logout</button>
    </nav>
    <div v-else>
      loading user....
  </div>
    <router-view></router-view>
    
  </div>
</template>

<script setup>
  import { useUserStore } from './stores/user';
  const userStore = useUserStore();
</script>

<style lang="scss" scoped>

</style>