module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['@babel/plugin-transform-flow-strip-types'],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        root: ['.'],
        alias: {
          '@app': './src',
          '@assets': './src/assets/',
          '@components': './src/components',
          '@constants': './src/constants',
          '@context': './src/context',
          '@common': './src/common',
          '@screens': './src/screens',
          '@api': './src/api',
          '@utils': './src/utils',
          '@storage': './src/storage',
        },
      },
    ],
  ],
  exclude: ['**/*.png', '**/*.jpg', '**/*.gif', '**/*.svg', '**/*.webp'],
};
