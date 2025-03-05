import FeaturedPost from "@/components/featured-post";
import Header from "@/components/header";
import LatestPosts from "@/components/latest-posts";
import Panel from "@/components/panel";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper";
import { Car } from "lucide-react";

const Home = () => {
  return (
    <Wrapper classNames="py-10">
      <div className="flex gap-10">
        <FeaturedPost />
        <Panel />
      </div>
      <Header title="Latest Post" />
      <div className="flex gap-10">
        <LatestPosts />
        <div className="w-1/3 flex flex-col">
          <Panel className="w-full mt-3" />
          <Panel className="w-full mt-3" />
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
