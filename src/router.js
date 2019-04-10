import Vue from "vue";
import Router from "vue-router";
import store from "@/store/store";
import Players from "@/views/Players";
import Home from "@/views/Home";
import Fines from "@/views/Fines";
import NProgress from "nprogress";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Reception",
      component: Home
    },
    // {
    //   path: "/home",
    //   name: "Home",
    //   component: Home
    // },
    {
      path: "/players",
      name: "Players",
      component: Players,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch("team/fetchTeams")
          .then(teams => {
            routeTo.params.teams = teams;
            next();
          })
          .catch(() => {
            // if (error.response && error.response.status == 404) {
            //   next({ name: "404", params: { resource: "event" } });
            // } else {
            //   next({ name: "network-issue" });
            // }
          });
      }
    },
    {
      path: "/fines",
      name: "Fines",
      component: Fines
    }
  ],
  mode: "history"
});

router.beforeEach((routeTo, routeFrom, next) => {
  // Start the route progress bar.
  NProgress.start();
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
