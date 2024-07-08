import FeaturedFeatured from "@/components/FeaturedProperties";
import Home from "@/components/Home";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";
import React from "react";

const HomePage = () => {
  return (
    <>
      <Home />
      <InfoBoxes/>
      <FeaturedFeatured/>
      <HomeProperties/>
    </>
  );
};

export default HomePage;
