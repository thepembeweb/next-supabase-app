import Script from 'next/script';

const TweetEmbed: React.FCC = ({ children }) => {
  return (
    <>
      <div>{children}</div>

      <Script async defer src={'https://platform.twitter.com/widgets.js'} />
    </>
  );
};

export default TweetEmbed;
