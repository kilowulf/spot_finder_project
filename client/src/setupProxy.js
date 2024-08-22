const { createProxyMiddleware } = require("http-proxy-middleware"); // allows for proxy between server and client server services
module.exports = function(app) {
  // allow local development http communications between frontend and backend
  app.use(
    ["/api", "/auth/github", "/github-search", "/graphql"],
    createProxyMiddleware({
      target: "http://localhost:5000"
    })
  );
};
