import { createRouter, createWebHistory } from "vue-router";
import MapView from "../views/MapView.vue";
import KeyboardTemp from "@/components/KeyboardTemp";
import ConfigView from "@/views/ConfigView";

const routes = [
  {
    path: "/map",
    name: "map",
    components: {
      page: MapView,
    },
  },
  {
    path: "/config",
    name: "config",
    components: {
      page: ConfigView,
    },
  },
  {
    path: "/keyboardTemp",
    name: "keyboardTemp",
    components: {
      temp: KeyboardTemp,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
