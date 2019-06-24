<template>
  <!-- <div class="container">
    <div class="row mt-5">
      <div class="col-sm-12">
        <b-card no-body>
          <b-tabs pills card vertical>
            <b-tab title="Players" active
              ><b-card-text><ListPlayers /></b-card-text
            ></b-tab>
            <b-tab title="Fines"
              ><b-card-text><ListFines /></b-card-text
            ></b-tab>
            <b-tab title="Team"><b-card-text></b-card-text></b-tab>
            <b-tab title="Statistic">
              <b-card-text><ListStatistics /> </b-card-text
            ></b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div> -->
  <div>
    <b-tabs content-class="mt-3" align="center">
      <b-tab title="Players" active><ListPlayers /></b-tab>
      <b-tab title="Fines"><ListFines /></b-tab>
      <b-tab title="Team"><p>I'm the tab with the very, very long title</p></b-tab>
      <b-tab title="Statistics"><ListStatistics /> </b-tab>
    </b-tabs>
  </div>
  <!-- <div>
    <b-tabs content-class="mt-3" fill>
      <b-tab title="Players" active><ListPlayers /></b-tab>
      <b-tab title="Fines"><ListFines /></b-tab>
      <b-tab title="Team"><p>I'm the tab with the very, very long title</p></b-tab>
      <b-tab title="Statistics"><ListStatistics /> </b-tab>
    </b-tabs>
  </div> -->
</template>

<script>
import ListPlayers from "@/components/ListPlayers.vue";
import ListFines from "@/components/ListFines.vue";
import ListStatistics from "@/components/ListStatistics.vue";

export default {
  components: {
    ListPlayers,
    ListFines,
    ListStatistics
  }
};
</script>
