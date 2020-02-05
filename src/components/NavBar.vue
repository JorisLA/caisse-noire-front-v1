<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="#" v-if="isConnected"
        >{{ getTeam }}
      </b-navbar-brand>
      <b-navbar-brand href="#" v-else
        ><img src="../assets/index.png" />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
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
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      langs: this.$store.state.langs
    };
  }
};
</script>
<style>
.spacing {
  margin-right: 10px;
}
</style>
