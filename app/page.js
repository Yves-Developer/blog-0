import FeaturedPost from "@/components/featured-post";
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
    </Wrapper>
  );
};

export default Home;
