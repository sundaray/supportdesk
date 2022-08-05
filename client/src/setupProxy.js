const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api/users/login", "/api/users/register", "/api/users/all"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
