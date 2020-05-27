import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, TextInput } from 'react-native';
import { connect } from 'react-redux';

import { fetchPosts } from '../../state/posts';

const SubredditPicker = ({ currentSubreddit, fetchPosts }) => {
  const [subreddit, setSubreddit] = useState(currentSubreddit);
  return (
    <View style={styles.container}>
      <Text>Showing hot posts from</Text>
      <TextInput
        style={styles.input}
        value={subreddit}
        onChangeText={setSubreddit}
        onBlur={() => fetchPosts(subreddit)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    maxWidth: 500,
  },
  input: {
    fontWeight: 'bold',
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: Platform.select({ ios: 5, web: 5, android: 0 }),
    width: 100,
    textAlign: 'center',
  },
});

export default connect(({ subreddit }) => ({ currentSubreddit: subreddit }), {
  fetchPosts,
})(SubredditPicker);
