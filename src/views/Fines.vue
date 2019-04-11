<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-sm-12">
        <b-row>
          <b-col md="6" class="my-1">
            <b-input-group>
              <b-form-input v-model="filter" :placeholder="$t('barSearch')" />
              <b-input-group-append>
                <b-btn
                  v-t="'clear'"
                  :disabled="!filter"
                  @click="filter = ''"
                ></b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col md="6" class="my-1">
            <b-form-group horizontal :label="$t('perPage')" class="mb-0">
              <b-form-select :options="pageOptions" v-model="perPage" />
            </b-form-group>
          </b-col>
        </b-row>
        <br /><br />
        <b-table
          show-empty
          ref="finesList"
          :items="myProviderGetFines"
          :fields="$t('fieldsFines')"
          :filter="filter"
          :per-page="perPage"
          :current-page="currentPage"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
        >
          <template slot="label" slot-scope="row">{{ row.value }}</template>
          <template slot="cost" slot-scope="row">{{ row.value }}</template>
          <template slot="actions" slot-scope="row">
            <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
            <b-button
              v-t="'updateFine'"
              v-if="isBanker == true"
              size="sm"
              variant="success"
              v-b-modal.fine-update-modal
              @click.stop="editFine(row.item)"
              class="mr-1"
            >
            </b-button>
            <b-button
              v-t="'deleteFine'"
              variant="danger"
              size="sm"
              v-if="isBanker == true"
              class="mr-1"
              v-b-modal.fine-delete-modal
              @click.stop="editFine(row.item)"
            >
            </b-button>
          </template>
        </b-table>
        <b-row>
          <b-col md="6" class="my-1">
            <b-pagination
              :total-rows="totalRows"
              :per-page="perPage"
              v-model="currentPage"
              class="my-0"
            />
          </b-col>
          <b-col md="6" class="my-1">
            <button
              v-t="'addFine'"
              type="button"
              v-if="isBanker == true"
              style="float: right"
              class="btn btn-success btn-sm"
              v-b-modal.fine-modal
            ></button>
          </b-col>
        </b-row>
      </div>
    </div>

    <b-modal
      ref="addFineModal"
      id="fine-modal"
      :title="$t('addFine')"
      hide-footer
    >
      <b-form @submit.prevent="addFine" @reset.prevent="onResetAddFine" class="w-100">
        <b-form-group
          id="form-title-group"
          :label="$t('labelFine')"
          label-for="form-title-input"
        >
          <b-form-input
            id="form-title-input"
            type="text"
            v-model="addFineForm.label"
            required
            :placeholder="$t('enterLabelFine')"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="form-author-group"
          :label="$t('costFine')"
          label-for="form-author-input"
        >
          <b-form-input
            id="form-author-input"
            type="number"
            v-model="addFineForm.cost"
            required
            :placeholder="$t('enterCostFine')"
          >
          </b-form-input>
        </b-form-group>
        <b-button v-t="'submit'" type="submit" variant="primary"></b-button>
        <b-button v-t="'cancel'" type="reset" variant="danger"></b-button>
      </b-form>
    </b-modal>

    <b-modal
      ref="editFineModal"
      id="fine-update-modal"
      :title="$t('updateFine')"
      hide-footer
    >
      <b-form @submit.prevent="updateFine" @reset.prevent="onResetUpdate" class="w-100">
        <b-form-group
          id="form-title-edit-group"
          :label="$t('labelFine')"
          label-for="form-title-edit-input"
        >
          <b-form-input
            id="form-title-edit-input"
            type="text"
            v-model="editForm.label"
            required
            :placeholder="$t('enterLabelFine')"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="form-author-edit-group"
          :label="$t('costFine')"
          label-for="form-author-edit-input"
        >
          <b-form-input
            id="form-author-edit-input"
            type="number"
            v-model="editForm.cost"
            required
            :placeholder="$t('enterCostFine')"
          >
          </b-form-input>
        </b-form-group>
        <b-button v-t="'submit'" type="submit" variant="primary"></b-button>
        <b-button v-t="'cancel'" type="reset" variant="danger"></b-button>
      </b-form>
    </b-modal>

    <b-modal
      ref="fineDeleteModal"
      id="fine-delete-modal"
      :title="$t('deleteFine')"
      hide-footer
    >
      <p class="my-2">{{ $t("isDeleted", { fine: editForm.label }) }}</p>
      <b-form
        @submit.prevent="removeFine"
        @reset.prevent="onResetFineDelete"
        class="w-100"
      >
        <b-button v-t="'yes'" type="submit" variant="primary"></b-button>
        <b-button v-t="'no'" type="reset" variant="danger"></b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapGetters } from "vuex";
import store from "@/store/store";

export default {
  data() {
    return {
      fines: [],
      addFineForm: this.createFreshFineObject(),
      message: "",
      messageError: "",
      editForm: this.createFreshFineObject(),
      options: [],
      totalRows: 0,
      perPage: 5,
      currentPage: 1,
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      pageOptions: [5, 10, 15]
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields.filter(f => f.sortable).map(f => ({
        text: f.label,
        value: f.key
      }));
    },
    ...mapGetters("player", ["isBanker"]),
    ...mapState(["player"]),
    ...mapState(["fine"])
  },
  methods: {
    createFreshFineObject() {
      return {
        label: "",
        cost: "",
        uuid: "",
      };
    },
    myProviderGetFines(ctx) {
      let path = "/fines";
      if (ctx.sortBy && !ctx.filter) {
        path = `${path}?_sort=${ctx.sortBy}&_order=${
          ctx.sortDesc ? "desc" : "asc"
        }&_currentPage=${ctx.currentPage}&_perPage=${ctx.perPage}&_lastUuid=${
          this.fine.lastUuid
        }`;
      } else if (ctx.filter) {
        path = `${path}?_filter=${ctx.filter}`;
      } else if (ctx.currentPage) {
        path = `${path}?_currentPage=${ctx.currentPage}&_perPage=${
          ctx.perPage}&_lastUuid=${this.fine.lastUuid}`;
      }
      return store.dispatch("fine/fetchFines", path);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      store.dispatch("fine/setTotalRows", filteredItems.length);
      this.currentPage = 1;
    },
    editFine(fine) {
      this.editForm = fine;
    },
    addFine() {
      store
        .dispatch("fine/addFine", this.addFineForm)
        .then(() => {
          this.$refs.addFineModal.hide();
          this.$refs.finesList.refresh();
        })
        .catch(() => {
          // NProgress.done();
        });
    },
    updateFine() {
    // NProgress.start();
      store
        .dispatch("fine/updateFine", this.editForm)
        .then(() => {
          this.$refs.editFineModal.hide();
          this.$refs.finesList.refresh();
        })
        .catch(() => {
          // NProgress.done();
        });
    },
    removeFine() {
    // NProgress.start();
      store
        .dispatch("fine/deleteFine", this.editForm)
        .then(() => {
          this.$refs.fineDeleteModal.hide();
          this.$refs.finesList.refresh();
        })
        .catch(() => {
          // NProgress.done();
        });
    },    
    onResetAddFine(evt) {
      this.$refs.addFineModal.hide();
    },
    onResetUpdate(evt) {
      this.$refs.editFineModal.hide();
    },
    onResetFineDelete(evt) {
      this.$refs.fineDeleteModal.hide();
    }
  }
};
</script>
