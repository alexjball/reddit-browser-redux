import React from 'react';
import { View } from 'react-native';

export default ({ html, style }) => (
  <View style={style}>
    <div
      style={{ overflow: 'scroll', fontFamily: 'sans-serif' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  </View>
);
