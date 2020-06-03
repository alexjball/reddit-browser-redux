const {
  getWebPreset,
  getIOSPreset,
  getAndroidPreset,
} = require('jest-expo/config/getPlatformPreset');
const { withWatchPlugins } = require('jest-expo/config/withWatchPlugins');

module.exports = withWatchPlugins({
  projects: [
    // Create a new project for each platform.
    getWebPreset(),
    withReactNativeTestingLibrary(getIOSPreset()),
    withReactNativeTestingLibrary(getAndroidPreset()),
  ].map(withProjectConfig),
});

function withReactNativeTestingLibrary(project) {
  return Object.assign(project, {
    snapshotSerializers: [
      require.resolve(
        '@testing-library/react-native/dist/preset/serializer.js'
      ),
    ],
    setupFiles: [
      ...project.setupFiles,
      require.resolve('@testing-library/react-native/dist/preset/setup.js'),
    ],
  });
}

function withProjectConfig(project) {
  return Object.assign(project, {
    testPathIgnorePatterns: ['/node_modules/', '.*\\.conformance\\.test\\.js'],
    transformIgnorePatterns: [
      'node_modules/(?!' +
        '(jest-)?react-native' +
        '|@react-native-community' +
        '|expo(nent)?' +
        '|@expo(nent)?/.*' +
        '|react-navigation' +
        '|@react-navigation/.*' +
        '|@unimodules/.*' +
        '|unimodules' +
        '|sentry-expo' +
        '|native-base' +
        '|react-native-svg' +
        '|dom-accessibility-api' +
        ')',
    ],
    transform: {
      ...project.transform,
      '^.+\\.mjs$': 'babel-jest',
    },
    cacheDirectory: './.jest',
  });
}
