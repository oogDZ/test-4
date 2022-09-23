module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: "http://localhost",
    port: 3000,
  },
};
