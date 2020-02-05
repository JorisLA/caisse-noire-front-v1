<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-sm-12">
        <b-form @submit="createAccount" @reset="onReset" v-if="show">
        <b-form-group
            id="input-group-1"
            label="Entity id:"
            label-for="input-1"
        >
            <b-form-input
            id="input-1"
            v-model="form.entity_id"
            required
            ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="login:" label-for="input-2">
            <b-form-input
            id="input-2"
            v-model="form.login"
            required
            ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="password:" label-for="input-3">
            <b-form-input
            id="input-3"
            v-model="form.password"
            required
            ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Tenant domain:" label-for="input-4">
            <b-form-input
            id="input-4"
            v-model="form.tenant_domain"
            required
            ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-5" label="Firstname:" label-for="input-5">
            <b-form-input
            id="input-5"
            v-model="form.firstname"
            required
            ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-6" label="Lastname:" label-for="input-6">
            <b-form-input
            id="input-6"
            v-model="form.lastname"
            required
            ></b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-7"
            label="Email:"
            label-for="input-7"
        >
            <b-form-input
            id="input-7"
            v-model="form.email"
            required
            ></b-form-input>
        </b-form-group>

        <b-button v-t="'createAccount'" type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store/store";
export default {
    data() {
        return {
        form: {
            entity_id: '',
            login: '',
            password: '',
            tenant_domain: '',
            firstname: '',
            lastname: '',
            email: ''
        },
        show: true
        }
    },
    methods: {
        createAccount(evt) {
            evt.preventDefault()
            store
              .dispatch("account/addAccount", this.form)
              .then(() => {
              // this.$refs.addFineModal.hide();
              // this.$refs.finesList.refresh();
              })
              .catch(() => {
              // NProgress.done();
            });
        },
        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.form.entity_id = ''
            this.form.login = ''
            this.form.password = ''
            this.form.tenant_domain = ''
            this.form.firstname = ''
            this.form.lastname = ''
            this.form.email = ''
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        }
    }
}
</script>
