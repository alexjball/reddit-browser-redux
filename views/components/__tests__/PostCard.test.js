import React from 'react';

import { snapshots } from '../../../services/reddit';
import { render, events } from '../../../testing';
import { labels } from '../../accessibility';
import PostCard from '../PostCard';

jest.mock('../../../services/reddit');

it('renders correctly when collapsed', () => {
  const { baseElement } = render(
    <PostCard post={snapshots.canFetchRedditImagePosts} />
  );

  expect(baseElement).toMatchSnapshot();
});

it('renders image posts correctly when expanded', () => {
  const { baseElement, getByLabelText } = render(
    <PostCard post={snapshots.canFetchRedditImagePosts} />
  );

  events.press(getByLabelText(labels.expandContentButton));

  expect(baseElement).toMatchSnapshot();
});

it('renders self posts correctly when expanded', () => {
  const { baseElement, getByLabelText } = render(
    <PostCard post={snapshots.canFetchSelfPosts} />
  );

  events.press(getByLabelText(labels.expandContentButton));

  expect(baseElement).toMatchSnapshot();
});
