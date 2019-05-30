module.exports = {
  apps: [
    {
      name: "ChainX scan server",
      script: "src/index.js",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
