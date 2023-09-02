import aboutImg from "@/assets/tweets.png";

export function About(): JSX.Element {
  return (
    <div className="about-main">
      <h2 data-test="heading">About TweetApp</h2>
      <p data-test="paragraph">
        TweetApp is a social networking service. Users can post and interact
        with short messages called "tweets".
      </p>
      <img className="about-img" src={aboutImg} data-test="image" />
    </div>
  );
}
