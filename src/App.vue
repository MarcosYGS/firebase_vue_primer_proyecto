<template>
  <a-layout>
    <a-layout-header v-if="!userStore.loadingSession" >
      <a-menu 
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }">

        <a-menu-item v-if="userStore.userData" key="home">
          <router-link to="/">Home </router-link>
        </a-menu-item>
        <a-menu-item v-if="!userStore.userData" key="login">
          <router-link to="/login">login </router-link>
        </a-menu-item>
        <a-menu-item v-if="!userStore.userData" key="register">
          <router-link to="/register">register </router-link>
        </a-menu-item>
        <a-menu-item 
        @click="userStore.logoutUser" 
        v-if="userStore.userData"
        key="logout">
          logout
        </a-menu-item>
      </a-menu>
    </a-layout-header>

    <a-layout-content>
      <div v-if="userStore.loadingSession">
        loading user....
      </div>
      <router-view></router-view>
    </a-layout-content>
    
  </a-layout>
</template>

<script setup>
  import { useUserStore } from './stores/user';
  import { ref, watch } from "vue"
  import {useRoute} from "vue-router"

  const userStore = useUserStore();
 const route = useRoute();
  const selectedKeys = ref ([])

  watch(
    () => route.name,
    () => {
      selectedKeys.value=[route.name];
    }
  )
</script>
