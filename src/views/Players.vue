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
          ref="list_players"
          :items="myProviderGetPlayers"
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
            <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
            <b-button
              v-t="'addFine'"
              v-if="isBanker == true"
              size="sm"
              variant="success"
              v-b-modal.player-update-modal
              @click.stop="editPlayer(row.item)"
              class="mr-1"
            >
            </b-button>
            <b-button
              v-t="'history'"
              size="sm"
              v-b-modal.player-history-modal
              @click.stop="editHistory(row.item)"
              class="mr-1"
            >
            </b-button>
            <b-button
              v-t="'paidFine'"
              v-if="isBanker == true"
              size="sm"
              variant="danger"
              v-b-modal.player-checkout-modal
              @click.stop="editPlayer(row.item)"
              class="mr-1"
            >
            </b-button>
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
      <b-form @submit="onSubmitSendBill" @reset="onResetSendBill" class="w-100">
        <b-button v-t="'yes'" type="submit" variant="primary"></b-button>
        <b-button v-t="'no'" type="reset" variant="danger"></b-button>
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
          v-for="(item, index) in getHistory"
          v-bind:key="item"
        >
          {{ index }}
          <b-badge variant="primary" pill>{{ item }}</b-badge>
        </b-list-group-item>
      </b-list-group>
      <ul id="example-1"></ul>
      <b-form @submit="onResetHistory" class="w-100">
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
      <b-form @submit="onSubmitBillPaid" @reset="onResetBillPaid" class="w-100">
        <b-button type="submit" variant="primary">Yes</b-button>
        <b-button type="reset" variant="danger">No</b-button>
      </b-form>
    </b-modal>

    <b-modal
      ref="editPlayerModal"
      id="player-update-modal"
      :title="$t('addFine')"
      hide-footer
    >
      <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
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
import axios from "axios";
import { mapState, mapGetters } from "vuex";
import store from "@/store/store";

import EventService from "@/services/EventService";

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
      editForm: {
        uuid: "",
        first_name: "",
        last_name: ""
      },
      getHistory: [],
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
    finesHistory() {
      return `${this.getHistory}`;
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
    myProviderGetPlayers(ctx) {
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
      this.editForm = player;
      EventService.getHistory(this.editForm.uuid)
        .then(data => {
          this.getHistory = data.data.fines;
        })
        .catch(error => {
          this.messageError = `[${error.response.status}] ${
            error.response.data.message
          }`;
          this.showMessageError = true;
        });
    },
    addPlayer(payload) {
      const path = process.env.BaseURL.concat("/players");
      axios
        .post(path, payload)
        .then(() => {
          this.message = "Player added!";
          this.showMessage = true;
        })
        .catch(error => {
          this.messageError = `[${error.response.status}] ${
            error.response.data.message
          }`;
          this.showMessageError = true;
        });
    },
    initForm() {
      this.addPlayerForm.first_name = "";
      this.addPlayerForm.last_name = "";
      this.addPlayerForm.total = "";
      this.editForm.uuid = "";
      this.editForm.first_name = "";
      this.editForm.last_name = "";
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addPlayerModal.hide();
      const payload = {
        first_name: this.addPlayerForm.first_name,
        last_name: this.addPlayerForm.last_name
      };
      this.addPlayer(payload);
      this.initForm();
    },
    onSubmitUpdate(evt) {
      evt.preventDefault();
      this.$refs.editPlayerModal.hide();
      const payload = {
        first_name: this.editForm.first_name,
        last_name: this.editForm.last_name,
        fine_uuid: this.editForm.fine_uuid
      };
      this.updatePlayer(payload, this.editForm.uuid);
    },
    onSubmitSendBill(evt) {
      evt.preventDefault();
      this.$refs.sendBillModal.hide();
      this.sendBill();
    },
    onSubmitBillPaid(evt) {
      evt.preventDefault();
      this.$refs.checkoutPlayerModal.hide();
      this.billPaid(this.editForm.uuid);
    },
    playerBills(playerUUID) {
      const path = process.env.BaseURL.concat(`/bills/${playerUUID}`);
      axios
        .get(path)
        .then(() => {})
        .catch(error => {
          this.messageError = `[${error.response.status}] ${
            error.response.data.message
          }`;
          this.showMessageError = true;
        });
    },
    billPaid(playerUUID) {
      const path = process.env.BaseURL.concat(`/bills/${playerUUID}`);
      axios
        .delete(path)
        .then(() => {
          this.$refs.list_players.refresh();
          this.message = "Bill paid!";
          this.showMessage = true;
        })
        .catch(error => {
          this.messageError = `[${error.response.status}] ${
            error.response.data.message
          }`;
          this.showMessageError = true;
        });
    },
    sendBill() {
      const path = process.env.BaseURL.concat("/bills");
      axios
        .post(path)
        .then(() => {
          this.$refs.list_players.refresh();
          this.message = "Bills sent!";
          this.showMessage = true;
        })
        .catch(error => {
          this.messageError = `[${error.response.status}] ${
            error.response.data.message
          }`;
          this.showMessageError = true;
        });
    },
    updatePlayer(payload, playerUUID) {
      const path = process.env.BaseURL.concat(`/players/${playerUUID}`);
      axios
        .put(path, payload)
        .then(() => {
          this.$refs.list_players.refresh();
          this.message = "Player updated!";
          this.showMessage = true;
        })
        .catch(error => {
          this.message = error;
          this.showMessage = true;
        });
    },
    onResetSendBill(evt) {
      evt.preventDefault();
      this.$refs.sendBillModal.hide();
    },
    onResetBillPaid(evt) {
      evt.preventDefault();
      this.$refs.checkoutPlayerModal.hide();
    },
    onResetHistory(evt) {
      evt.preventDefault();
      this.$refs.playerHistoryModal.hide();
    },
    onResetUpdate(evt) {
      evt.preventDefault();
      this.$refs.editPlayerModal.hide();
    },
    removePlayer(playerUUID) {
      const path = process.env.BaseURL.concat(`/players/${playerUUID}`);
      axios
        .delete(path)
        .then(() => {
          this.$refs.list_players.refresh();
          this.message = "Player removed!";
          this.showMessage = true;
        })
        .catch(error => {
          this.messageError = `[${error.response.status}] ${
            error.response.data.message
          }`;
          this.showMessageError = true;
        });
    },
    onDeletePlayer(player) {
      this.removePlayer(player.uuid);
    }
  }
};
</script>
