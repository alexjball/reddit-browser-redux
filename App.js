import React from 'react';
import { SafeAreaView, Platform, StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import store from './state';
import Browser from './views/layouts/Browser';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView
        style={[
          styles.container,
          Platform.OS === 'android' && { paddingTop: StatusBar.currentHeight },
        ]}
      >
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}

        <Browser />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
