<template>
  <div>
    <NotificationContainer />
    <NavBar />
    <b-nav v-if="isConnected == true" tabs>
      <b-nav-item
        v-for="(routes, index) in $t('links')"
        v-bind:key="routes.id"
        :to="`${routes.path}`"
        :active="activeIndex === index"
        @click.stop="setActive(index)"
      >
        {{ routes.text }}
      </b-nav-item>
    </b-nav>

    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import NotificationContainer from "@/components/NotificationContainer.vue";
import { mapGetters } from "vuex";
import store from "@/store/store";

export default {
  components: {
    NotificationContainer,
    NavBar
  },
  data() {
    return {
      activeIndex: undefined
    };
  },
  created() {
    console.log("HELLO");
    let path = "/fines?_currentPage=1&_perPage=100&_lastUuid=";
    store.dispatch("fine/fetchFines", path);
  },
  computed: {
    ...mapGetters("player", ["isConnected"])
  },
  methods: {
    setActive(index) {
      this.activeIndex = index;
    }
  }
};
</script>
