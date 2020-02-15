import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  //TODO res.locals.variables_name = "variables_value";
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  next(); //! middlewares are between codes so to next to the function.
};
