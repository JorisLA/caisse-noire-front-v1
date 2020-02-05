import Vue from "vue";
import Router from "vue-router";
// import store from "@/store/store";
// import Home from "@/views/Home";
import Index from "@/views/Index";
import NProgress from "nprogress";
import NotFound from "@/views/NotFound.vue";
import NetworkIssue from "@/views/NetworkIssue.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Reception",
      component: Index
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
