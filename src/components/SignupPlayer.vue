<template>
  <div>
    <b-modal
      ref="addUserModal"
      id="TheSignup-modal"
      :title="$t('signupTitle')"
      hide-footer
    >
      <b-form
        @submit.prevent="TheSignupPlayer"
        @reset.prevent="onReset"
        class="w-100"
      >
        <b-form-group
          id="form-firstname-group"
          :label="$t('firstName')"
          label-for="form-firstname-input"
        >
          <b-form-input
            id="form-firstname-input"
            type="text"
            v-model="TheSignupUserForm.first_name"
            required
            :placeholder="$t('enterFirstName')"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group
          id="form-lastname-group"
          :label="$t('lastName')"
          label-for="form-lastname-input"
        >
          <b-form-input
            id="form-lastname-input"
            type="text"
            v-model="TheSignupUserForm.last_name"
            required
            :placeholder="$t('enterLastName')"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group
          id="form-email-group"
          label="Email:"
          label-for="form-email-input"
        >
          <b-form-input
            id="form-email-input"
            type="text"
            v-model="TheSignupUserForm.email"
            required
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
            v-model="TheSignupUserForm.password"
            required
            :placeholder="$t('enterPassword')"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group :label="$t('chooseStatus')">
          <b-form-radio-group
            v-model="selected"
            :options="$t('optionsRadio')"
            name="radioInline"
          >
          </b-form-radio-group>
        </b-form-group>

        <b-form-group
          v-if="selected == 'first'"
          id="form-get_team-group"
          :label="$t('chooseTeam')"
          label-for="form-get_team-input"
        >
          <b-form-select
            id="form-get_team-group"
            required
            v-model="TheSignupUserForm.get_team"
            :options="teams"
            class="mb-3"
          />
        </b-form-group>

        <b-form-group
          v-if="selected == 'second'"
          id="form-add_team-group"
          :label="$t('createTeam')"
          label-for="form-add_team-input"
        >
          <b-form-input
            id="form-add_team-input"
            type="text"
            v-model="TheSignupUserForm.add_team"
            required
            :placeholder="$t('enterTeam')"
          >
          </b-form-input>
        </b-form-group>

        <b-button v-t="'submit'" type="submit" variant="primary"> </b-button>
        <b-button v-t="'cancel'" type="reset" variant="danger"> </b-button>
      </b-form>
    </b-modal>

    <b-modal
      ref="confirmationTheSignup"
      hide-footer
      size="sm"
      id="confirm-modal"
      title="Confirmation"
    >
      <p class="my-4">Your account has been created</p>
    </b-modal>
  </div>
</template>

<script>
import store from "@/store/store";

export default {
  name: "TheSignup",
  props: {
    teams: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selected: "first",
      TheSignupUserForm: this.createFreshPlayerObject()
    };
  },
  methods: {
    createFreshPlayerObject() {
      return {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        get_team: "",
        add_team: ""
      };
    },
    TheSignupPlayer() {
      this.$refs.addUserModal.hide();
      if (this.TheSignupUserForm.get_team) {
        delete this.TheSignupUserForm["add_team"];
      } else {
        delete this.TheSignupUserForm["get_team"];
      }
      store
        .dispatch("player/signupPlayer", this.TheSignupUserForm)
        .then(() => {
          // this.$refs.confirmationTheSignup.show();
          this.TheSignupUserForm = this.createFreshPlayerObject();
        })
        .catch(() => {});
    },
    onReset() {
      this.$refs.addUserModal.hide();
      this.TheSignupUserForm = this.createFreshPlayerObject();
    }
  }
};
</script>
