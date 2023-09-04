import styles from './PostBody.module.css';
import MDXRenderer from '../MDXRenderer';

const PostBody: React.FCC<{ content: string }> = ({ content }) => {
  return (
    <div className={`text-lg ${styles['PostBody']}`}>
      <MDXRenderer code={content} />
    </div>
  );
};

export default PostBody;
