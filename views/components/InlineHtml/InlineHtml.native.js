import React from 'react';
import WebView from 'react-native-webview';

const html = body => `
<style type="text/css">
html {
  font-family: sans-serif;
  font-size: 2.5rem;
}
</style>
${body}
`;

export default ({ html: body, style }) => (
  <WebView
    originWhitelist={['*']}
    source={{ html: html(body) }}
    style={style}
    textZoom={100}
  />
);
