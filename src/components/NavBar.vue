<template>
  <div>
    <SignupPlayer :teams="teams"></SignupPlayer>
    <SigninPlayer></SigninPlayer>
    <b-navbar toggleable="lg" type="light" variant="info">
      <b-navbar-brand href="#">{{
        isConnected ? getTeam : "Black Box"
      }}</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown v-if="isConnected == true">
            <template slot="button-content">
              <font-awesome-icon class="fa-1x" icon="plus-circle" />
            </template>
            <b-dropdown-item
              v-for="routes in $t('links')"
              v-bind:key="routes.id"
              :to="`${routes.page}`"
              v-html="routes.text"
            >
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <font-awesome-icon class="fa-1x" icon="globe-europe" />
            </template>
            <b-dropdown-item
              @click="$i18n.locale = lang"
              v-for="(lang, i) in langs"
              :key="`Lang${i}`"
              :value="lang"
            >
              {{ lang }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <b-dropdown-item
              v-t="'logout'"
              v-if="isConnected == true"
              v-on:click="signout"
            >
            </b-dropdown-item>
            <b-dropdown-item v-t="'signin'" v-else v-b-modal.TheSignin-modal>
            </b-dropdown-item>
            <b-dropdown-item
              v-t="'signup'"
              v-if="isConnected == false"
              v-b-modal.TheSignup-modal
            >
            </b-dropdown-item>
            <template slot="button-content">
              <font-awesome-icon class="fa-1x" icon="cog" />
              {{ $t("myAccount") }}
            </template>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import SigninPlayer from "@/components/SigninPlayer";
import SignupPlayer from "@/components/SignupPlayer";
import { mapState, mapGetters } from "vuex";
import store from "@/store/store";

export default {
  components: {
    SigninPlayer,
    SignupPlayer
  },
  data() {
    return {
      langs: this.$store.state.langs
    };
  },
  computed: {
    ...mapState("team", ["teams"]),
    ...mapGetters("player", ["isConnected"]),
    ...mapGetters("team", ["getTeam"])
  },
  created() {
    store.dispatch("team/fetchTeams");
  },
  methods: {
    signout() {
      store
        .dispatch("player/signoutPlayer")
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {});
    }
  }
};
</script>
<style>
.spacing {
  margin-right: 10px;
}
</style>
