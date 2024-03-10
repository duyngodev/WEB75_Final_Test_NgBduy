import { loginRouter } from "./loginSignup/loginSignup.js";
import { movieRouter } from "./movieRoute/movieRoute.js";


const routes = [
  {
    route: "/movies",
    router: movieRouter,
  },
  {
    route: "/users",
    router: loginRouter,
  },
];

export const routeFactory = (app) => {
  routes.map((route) => {
    app.use(route.route, route.router);
  });
};
