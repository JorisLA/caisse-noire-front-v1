<template>
  <div>
    <NotificationContainer />
    <NavBar />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import NotificationContainer from "@/components/NotificationContainer.vue";

export default {
  components: {
    NotificationContainer,
    NavBar
  }
};
</script>

<style></style>
