module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.tsx', '.ts'],
        alias: {
          '~': './src',
        },
      },
    ],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    'react-native-reanimated/plugin',
  ],
};
