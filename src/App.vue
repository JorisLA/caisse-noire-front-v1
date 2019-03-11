<template>
  <div id="app">
    <div id="nav">
      <NotificationContainer />
      <NavBar />
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
import NotificationContainer from "@/components/NotificationContainer.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NotificationContainer,
    NavBar
  }
};
</script>
