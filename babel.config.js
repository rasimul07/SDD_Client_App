module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          "@components": "./src/components",
          "@views": ["./src/views"],
          "@utils": ["./src/utils"],
          "@ui": ["./src/ui"],
          "@src": ["./src"]
        }
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
