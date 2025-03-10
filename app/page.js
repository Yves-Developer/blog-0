import FeaturedPost from "@/components/featured-post";
import Header from "@/components/header";
import LatestPosts from "@/components/latest-posts";

const Home = () => {
  return (
    <>
      <FeaturedPost />
      <Header title="Latest Posts" />
      <LatestPosts />
    </>
  );
};

export default Home;
