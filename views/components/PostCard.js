import * as WebBrowser from 'expo-web-browser';
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import InlineHtml from './InlineHtml';

export default ({ post }) => {
  const [expanded, setExpanded] = useState(false);
  const onExpand = useCallback(() => setExpanded(!expanded), [expanded]);

  return (
    <View style={styles.container}>
      <Header post={post} />
      <Preview post={post} onExpand={onExpand} />
      <Content post={post} expanded={expanded} />
      <Footer post={post} />
    </View>
  );
};

const Header = ({ post: { author, authorLink, subreddit, subredditLink } }) => (
  <View style={styles.header}>
    <Link url={subredditLink} label={`r/${subreddit}`} />
    <Link url={authorLink} label={`u/${author}`} />
  </View>
);

const Preview = ({ post: { thumbnail, title }, onExpand }) => (
  <TouchableOpacity style={styles.preview} onPress={onExpand}>
    <Text style={styles.title}>{title}</Text>
    {thumbnail.startsWith('http') && (
      <Image
        resizeMode="contain"
        style={styles.thumbnail}
        source={{
          uri: thumbnail,
        }}
      />
    )}
  </TouchableOpacity>
);

const Content = ({ post, expanded }) => {
  if (!expanded) {
    return null;
  }

  const source = post.preview?.images?.[0]?.source;
  const selfBody = post.selftext_html;

  return (
    <View style={styles.content}>
      {!!source && (
        <Image source={{ uri: source.url }} style={styles.contentImage} />
      )}
      {!!selfBody && <InlineHtml html={selfBody} style={styles.selfContent} />}
    </View>
  );
};

const Footer = ({ post: { permalinkUrl, numComments } }) => (
  <View style={{ flexDirection: 'row' }}>
    <Link url={permalinkUrl} label={`${numComments} comments`} />
  </View>
);

const Link = ({ url, label }) => (
  <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(url)}>
    <Text style={styles.link}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  title: { fontSize: 15, fontWeight: 'bold', flex: 1, marginRight: 10 },
  header: { flexDirection: 'row', marginBottom: 5 },
  preview: { flexDirection: 'row', marginBottom: 5 },
  content: { marginBottom: 5 },
  selfContent: { height: 500 },
  container: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 500,
  },
  contentImage: {
    resizeMode: 'contain',
    paddingTop: '100%',
    position: 'relative',
    width: '100%',
  },
  link: {
    marginRight: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
});
