import React from 'react';
import { Post } from 'contentlayer/generated';

import PostBody from './PostBody';
import PostHeader from './PostHeader';

const Post: React.FCC<{
  post: Post;
  content: string;
}> = ({ post, content }) => {
  return (
    <div className={'mx-auto max-w-2xl my-8'}>
      <PostHeader post={post} />

      <article className={'mx-auto flex justify-center'}>
        <PostBody content={content} />
      </article>
    </div>
  );
};

export default Post;
