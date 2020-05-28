import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';

import { fetchPosts } from '../../state/posts';
import { labels } from '../accessibility';
import PostCard from '../components/PostCard';
import SubredditPicker from '../components/SubredditPicker';

const initialSubreddit = 'popular';

const Browser = ({ posts, loading, error, fetchPosts }) => {
  useEffect(() => {
    fetchPosts(initialSubreddit);
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        accessibilityLabel={labels.loadingIcon}
        style={styles.spinner}
        size="large"
      />
    );
  } else if (error) {
    return <Text>Error fetching posts: {String(error)}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<SubredditPicker />}
        contentContainerStyle={styles.listContainer}
        data={posts}
        keyExtractor={post => post.id}
        renderItem={({ item }) => <PostCard post={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: { paddingHorizontal: 10 },
  spinner: { flex: 1 },
});

export default connect(state => state, { fetchPosts })(Browser);
