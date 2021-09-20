module.exports = function(api) {
  api.cache(true);
  const presets =  ['babel-preset-expo'];
  const plugins =  [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    // ["@babel/plugin-proposal-class-properties", { "loose": false }],
    ["module-resolver",
    {
      root: ["."],
      alias: {
        "app" : "./app",
      },
    }],
  ];
  return {
    presets,
    plugins
  };
};
