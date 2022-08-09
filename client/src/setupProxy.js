const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    [
      "/api/users/login",
      "/api/users/register",
      "/api/users/all",
      "/api/users/tickets",
      "/api/users/tickets/create",
    ],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
