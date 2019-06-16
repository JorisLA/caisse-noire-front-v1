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
          ref="playersList"
          :items="providerFetchPlayers"
          :fields="$t('fieldsPlayer')"
          :filter="filter"
          :per-page="perPage"
          :current-page="currentPage"
          :sort-by.sync="sortBy"
          @filtered="onFiltered"
        >
          <template slot="first_name" slot-scope="row">{{
            row.value
          }}</template>
          <template slot="total" slot-scope="row">{{ row.value }}</template>
          <template slot="actions" slot-scope="row">
            <b-dropdown right size="sm">
              <template slot="button-content">
                <font-awesome-icon class="fa-1x" icon="ellipsis-h" />
              </template>
              <b-dropdown-item>
                <b-button
                  v-t="'addFine'"
                  v-if="isBanker == true"
                  variant="success"
                  v-b-modal.player-update-modal
                  @click.stop="editPlayer(row.item)"
                >
                </b-button>
              </b-dropdown-item>
              <b-dropdown-item>
                <b-button
                  class="btn-block"
                  v-t="'history'"
                  v-b-modal.player-history-modal
                  @click.stop="editHistory(row.item)"
                >
                </b-button>
              </b-dropdown-item>
              <b-dropdown-item>
                <b-button
                  class="btn-block"
                  v-t="'paidFine'"
                  v-if="isBanker == true"
                  variant="danger"
                  v-b-modal.player-checkout-modal
                  @click.stop="editPlayer(row.item)"
                >
                </b-button>
              </b-dropdown-item>
            </b-dropdown>
            <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
          </template>
        </b-table>
        <b-row>
          <b-col md="6" class="my-1">
            <b-pagination
              :total-rows="player.totalRows"
              :per-page="perPage"
              v-model="currentPage"
              class="my-0"
            />
          </b-col>
          <b-col md="6" class="my-1">
            <button
              v-t="'sendBills'"
              v-if="isBanker == true"
              type="button"
              class="btn btn-primary btn-sm"
              style="float: right"
              v-b-modal.confirm-sendbills-modal
            ></button>
          </b-col>
        </b-row>
      </div>
    </div>

    <b-modal
      ref="sendBillModal"
      hide-footer
      size="sm"
      id="confirm-sendbills-modal"
      title="Confirmation"
    >
      <p v-t="'confirmationBills'" class="my-4"></p>
      <b-form
        @submit.prevent="sendBill"
        @reset.prevent="onResetSendBill"
        class="w-100"
      >
        <b-button-group size="sm">
          <b-button v-t="'yes'" type="submit" variant="primary"></b-button>
          <b-button v-t="'no'" type="reset" variant="danger"></b-button>
        </b-button-group>
      </b-form>
    </b-modal>

    <b-modal
      ref="playerHistoryModal"
      id="player-history-modal"
      :title="$t('history')"
      hide-footer
    >
      <p>{{ fullName }}</p>
      <b-list-group>
        <b-list-group-item
          class="d-flex justify-content-between align-items-center"
          v-for="(item, index) in player.history"
          v-bind:key="item"
        >
          {{ index }}
          <b-badge variant="primary" pill>{{ item }}</b-badge>
        </b-list-group-item>
      </b-list-group>
      <ul id="example-1"></ul>
      <b-form @submit.prevent="onResetHistory" class="w-100">
        <b-button type="submit" variant="primary">Ok</b-button>
      </b-form>
    </b-modal>

    <b-modal
      ref="checkoutPlayerModal"
      id="player-checkout-modal"
      :title="$t('payment')"
      hide-footer
    >
      <p class="my-2">{{ $t("isPaid", { player: fullName }) }}</p>
      <b-form
        @submit.prevent="billPaid"
        @reset.prevent="onResetBillPaid"
        class="w-100"
      >
        <b-button-group size="sm">
          <b-button type="submit" variant="primary">Yes</b-button>
          <b-button type="reset" variant="danger">No</b-button>
        </b-button-group>
      </b-form>
    </b-modal>

    <b-modal
      ref="editPlayerModal"
      id="player-update-modal"
      :title="$t('addFine')"
      hide-footer
    >
      <b-form
        @submit.prevent="updatePlayer"
        @reset.prevent="onResetUpdate"
        class="w-100"
      >
        <p>{{ fullName }}</p>
        <b-form-group
          id="form-fine-edit-group"
          :label="$t('fine')"
          label-for="form-fine-edit-input"
        >
          <b-form-select
            id="form-fine-edit-group"
            v-model="editForm.fine_uuid"
            :options="player.playerFines"
            class="mb-3"
          />
        </b-form-group>
        <b-button v-t="'submit'" type="submit" variant="primary"> </b-button>
        <b-button v-t="'cancel'" type="reset" variant="danger"> </b-button>
      </b-form>
    </b-modal>
    <alertError
      :messageError="messageError"
      v-if="showMessageError"
    ></alertError>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import store from "@/store/store";

export default {
  data() {
    return {
      addPlayerForm: {
        first_name: "",
        last_name: "",
        total: ""
      },
      message: "",
      showMessageError: false,
      editForm: this.createFreshPlayerObject(),
      selected: null,
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
    fullName() {
      return `${this.editForm.first_name} ${this.editForm.last_name}`;
    },
    sortOptions() {
      // Create an options list from our fields
      return this.fields.filter(f => f.sortable).map(f => ({
        text: f.label,
        value: f.key
      }));
    },
    ...mapState(["player"]),
    ...mapGetters("player", ["isBanker"])
  },
  methods: {
    createFreshPlayerObject() {
      return {
        uuid: "",
        first_name: "",
        last_name: ""
      };
    },
    providerFetchPlayers(ctx) {
      let path = "/players";
      if (ctx.sortBy && !ctx.filter) {
        path = `${path}?_sort=${ctx.sortBy}&_order=${
          ctx.sortDesc ? "desc" : "asc"
        }&_currentPage=${ctx.currentPage}&_perPage=${ctx.perPage}&_lastUuid=${
          this.player.lastUuid
        }`;
      } else if (ctx.filter) {
        path = `${path}?_filter=${ctx.filter}`;
      } else if (ctx.currentPage) {
        path = `${path}?_currentPage=${ctx.currentPage}&_perPage=${
          ctx.perPage
        }&_lastUuid=${this.player.lastUuid}`;
      }
      return store.dispatch("player/fetchPlayers", path);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      store.dispatch("player/setTotalRows", filteredItems.length);
      this.currentPage = 1;
    },
    editPlayer(player) {
      this.editForm = player;
    },
    editHistory(player) {
      store.dispatch("player/fetchHistoryPlayer", player.uuid);
    },
    updatePlayer() {
      // NProgress.start();
      store
        .dispatch("player/updatePlayer", this.editForm)
        .then(() => {
          this.$refs.editPlayerModal.hide();
          this.$refs.playersList.refresh();
        })
        .catch(() => {
          // NProgress.done();
        });
    },
    billPaid() {
      // NProgress.start();
      store
        .dispatch("fine/paidFines", this.editForm.uuid)
        .then(() => {
          this.$refs.checkoutPlayerModal.hide();
          this.$refs.playersList.refresh();
        })
        .catch(() => {
          // NProgress.done();
        });
    },
    sendBill() {
      // NProgress.start();
      store
        .dispatch("fine/sendFines")
        .then(() => {
          this.$refs.sendBillModal.hide();
          this.$refs.playersList.refresh();
        })
        .catch(() => {
          // NProgress.done();
        });
    },
    onResetSendBill() {
      this.$refs.sendBillModal.hide();
    },
    onResetBillPaid() {
      this.$refs.checkoutPlayerModal.hide();
    },
    onResetHistory() {
      this.$refs.playerHistoryModal.hide();
    },
    onResetUpdate() {
      this.$refs.editPlayerModal.hide();
    }
  }
};
</script>

<style>
@media (max-width: 768px) {
  .btn {
    width: 100%;
  }
}
</style>
