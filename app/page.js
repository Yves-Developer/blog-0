import About from "@/components/about";
import Category from "@/components/category";
import Email from "@/components/email";
import FeaturedPost from "@/components/featured-post";
import Header from "@/components/header";
import LatestPosts from "@/components/latest-posts";
import Panel from "@/components/panel";
import Wrapper from "@/components/wrapper";

const Home = () => {
  return (
    <Wrapper classNames="py-10">
      {/* Row with two columns */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Column - takes 8/12 width on large screens and full width on small screens */}
        <div className="lg:w-8/12 w-full flex flex-col gap-6">
          <FeaturedPost />
          <Header title="Latest Posts" />
          <LatestPosts />
        </div>

        {/* Right Column - takes 4/12 width on large screens and full width on small screens */}
        <div className="lg:w-4/12 w-full flex flex-col gap-6">
          <About />
          <Panel />
          <Category />
          <Email />
          <Email />
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
