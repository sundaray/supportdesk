const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    [
      "/api/users/tickets/create",
      "/api/users/login",
      "/api/users/register",
      "/api/users/all",
      "/api/users/tickets",
    ],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
