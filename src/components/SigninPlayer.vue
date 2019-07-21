<template>
  <div>
    <b-modal
      ref="TheSigninUserModal"
      id="TheSignin-modal"
      :title="$t('signin')"
      hide-footer
    >
      <b-form @submit.prevent="TheSigninPlayer" class="w-100">
        <b-form-group
          id="form-email-group"
          label="Email:"
          label-for="form-email-input"
        >
          <b-form-input
            id="form-email-input"
            type="text"
            v-model="TheSigninUserForm.email"
            :placeholder="$t('enterEmail')"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group
          id="form-password-group"
          :label="$t('password')"
          label-for="form-password-input"
        >
          <b-form-input
            id="form-password-input"
            type="password"
            v-model="TheSigninUserForm.password"
            :placeholder="$t('enterPassword')"
          >
          </b-form-input>
        </b-form-group>

        <b-button v-t="'signin'" type="submit" variant="primary"> </b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import NProgress from "nprogress";
import store from "@/store/store";

export default {
  name: "TheSignin",
  data() {
    return {
      showMessageError: false,
      TheSigninUserForm: this.createFreshPlayerObject()
    };
  },
  computed: mapState(["player"]),
  methods: {
    TheSigninPlayer() {
      // NProgress.start();
      store
        .dispatch("player/signinPlayer", this.TheSigninUserForm)
        .then(() => {
          this.$router.push("/home");
          this.$refs.TheSigninUserModal.hide();
          this.TheSigninUserForm = this.createFreshPlayerObject();
        })
        .catch(() => {
          // NProgress.done();
        });
    },
    createFreshPlayerObject() {
      return {
        email: "",
        password: ""
      };
    }
  }
};
</script>
