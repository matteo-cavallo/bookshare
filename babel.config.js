module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
        'inline-dotenv',
        ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blacklist": null,
        "whitelist": null,
        "safe": false,
        "allowUndefined": true
      },],
        [
          "module-resolver",
          {
            root: "./src",
            alias: {
                components: './src/components',
                highOrderComponents: './src/highOrderComponents',
                model: './src/model',
                navigators: './src/navigators',
                providers: './src/providers',
                screens: './src/screens',
                services: './src/services',
                store: './src/store',
                styles: './src/styles',
                utils: './src/utils',
            }
          },
        ]
      ],
  };
};
