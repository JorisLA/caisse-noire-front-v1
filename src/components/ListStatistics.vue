<template>
  <div class="container">
    <div
      class="row mt-5"
      v-if="this.bestContributor.total && this.mostRecurrentFine.total"
    >
      <div class="col-sm-4">
        <b-list-group>
          <b-list-group-item
            v-if="this.bestContributor"
            class="d-flex justify-content-between align-items-center"
          >
            {{
              $t("bestContributor", {
                first_name: bestContributor.first_name,
                last_name: bestContributor.last_name,
                total: bestContributor.total
              })
            }}
            <b-badge v-t="'bestContributorTitle'" variant="primary" pill>
            </b-badge>
          </b-list-group-item>
        </b-list-group>
      </div>
      <div class="col-sm-5">
        <b-list-group>
          <b-list-group-item
            v-if="this.mostRecurrentFine"
            class="d-flex justify-content-between align-items-center"
          >
            {{
              $t("mostRecurrentFine", {
                label: mostRecurrentFine.label,
                total: mostRecurrentFine.total
              })
            }}
            <b-badge v-t="'mostRecurrentFineTitle'" variant="primary" pill>
            </b-badge>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
    <div class="row mt-5" v-else>
      <div class="col-sm-12">
        <alertError
          :messageError="messageError"
          v-if="showMessageError"
        ></alertError>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store/store";

export default {
  data() {
    return {
      bestContributor: {
        total: "",
        first_name: "",
        last_name: ""
      },
      mostRecurrentFine: {
        label: "",
        total: ""
      },
      showMessageError: false
    };
  },
  created() {
    // NProgress.start();
    store
      .dispatch("statistic/fetchStatistics")
      .then(response => {
        this.bestContributor.total = response.bestContributor.total;
        this.bestContributor.first_name = response.bestContributor.first_name;
        this.bestContributor.last_name = response.bestContributor.last_name;
        this.mostRecurrentFine.label = response.mostRecurrentFine.label;
        this.mostRecurrentFine.total = response.mostRecurrentFine.total;
      })
      .catch(() => {
        // NProgress.done();
      });
  },
  beforeUpdate() {
    store
      .dispatch("statistic/fetchStatistics")
      .then(response => {
        this.bestContributor.total = response.bestContributor.total;
        this.bestContributor.first_name = response.bestContributor.first_name;
        this.bestContributor.last_name = response.bestContributor.last_name;
        this.mostRecurrentFine.label = response.mostRecurrentFine.label;
        this.mostRecurrentFine.total = response.mostRecurrentFine.total;
      })
      .catch(() => {
        // NProgress.done();
      });
  }
};
</script>
