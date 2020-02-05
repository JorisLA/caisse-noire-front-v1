<template>
  <div>
    <NotificationContainer />
    <NavBar />
    <FormAccount />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import NotificationContainer from "@/components/NotificationContainer.vue";
import FormAccount from "@/components/FormAccount.vue";

export default {
  components: {
    NotificationContainer,
    NavBar,
    FormAccount
  }
};
</script>

<style></style>
