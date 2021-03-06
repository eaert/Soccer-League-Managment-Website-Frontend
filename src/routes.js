import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/team",
    name: "team",
    component: () => import("./pages/TeamPage")
  },
  {
    path: "/player",
    name: "player",
    component: () => import("./pages/PlayerPage")
  },
  {
    path: "/league",
    name: "league",
    component: () => import("./pages/LeaguePage")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage")
  },
  {
    path: "/management",
    name: "management",
    component: () => import("./pages/ManagementPage")
  },
  {
    path: "/favorites",
    name: "managefavoritesent",
    component: () => import("./pages/FavoritesPage")
  },
  {
    path: "/switch",
    name: "switch",
    component: () => import("./pages/emptyPage")
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
