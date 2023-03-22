module.exports = function(api) {
  api.cache(true);
  const presets = ['babel-preset-expo']
  const plugins = [["module:react-native-dotenv", {
      "envName": "APP_ENV",
      "moduleName": "@env",
      "path": ".env",
      "safe": false,
      "allowUndefined": true,
      "verbose": false
    }
  ]]

  return {
    presets,
    plugins 
  };
}
