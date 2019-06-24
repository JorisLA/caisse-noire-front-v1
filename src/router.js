import Vue from "vue";
import Router from "vue-router";
import store from "@/store/store";
import Players from "@/views/Players";
import Home from "@/views/Home";
import Statistic from "@/views/Statistic";
import Fines from "@/views/Fines";
import NProgress from "nprogress";
import NotFound from "@/views/NotFound.vue";
import NetworkIssue from "@/views/NetworkIssue.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Reception",
      component: Home,
      children: [
        {
          path: "/players",
          name: "Players",
          component: Players,
          props: true,
          meta: { requiresAuth: true },
          beforeEnter(routeTo, routeFrom, next) {
            if (routeTo.matched.some(record => record.meta.requiresAuth)) {
              // this route requires auth, check if logged in
              // if not, redirect to login page.
              if (!store.getters["player/isConnected"]) {
                next({
                  path: "/"
                });
              } else {
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
            } else {
              next(); // make sure to always call next()!
            }
          }
        },
        {
          path: "/fines",
          name: "Fines",
          component: Fines,
          meta: { requiresAuth: true },
          beforeEnter(routeTo, routeFrom, next) {
            if (routeTo.matched.some(record => record.meta.requiresAuth)) {
              // this route requires auth, check if logged in
              // if not, redirect to login page.
              if (!store.getters["player/isConnected"]) {
                next({
                  path: "/"
                });
              } else {
                next(); // make sure to always call next()!
              }
            } else {
              next(); // make sure to always call next()!
            }
          }
        },
        {
          path: "/statistic",
          name: "Statistic",
          component: Statistic,
          meta: { requiresAuth: true },
          beforeEnter(routeTo, routeFrom, next) {
            if (routeTo.matched.some(record => record.meta.requiresAuth)) {
              // this route requires auth, check if logged in
              // if not, redirect to login page.
              if (!store.getters["player/isConnected"]) {
                next({
                  path: "/"
                });
              } else {
                next(); // make sure to always call next()!
              }
            } else {
              next(); // make sure to always call next()!
            }
          }
        }
      ]
    },
    {
      path: "/notfound",
      name: "404",
      component: NotFound,
      props: true
    },
    {
      path: "/network-issue",
      name: "network-issue",
      component: NetworkIssue
    },
    {
      // Here's the new catch all route
      path: "*",
      redirect: { name: "404", params: { resource: "page" } }
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
