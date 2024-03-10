import { movieRouter } from "./movieRoute/movieRoute.js";

const routes = [
  {
    route: "/movies",
    router: movieRouter,
  },
];

export const routeFactory = (app) => {
  routes.map((route) => {
    app.use(route.route, route.router);
  });
};
