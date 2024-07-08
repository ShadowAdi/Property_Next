"use client"
import { fetchFeaturedProperties } from "@/utils/requestGet";
import React, { useEffect, useState } from "react";
import FeaturedPropertyCard from "./FeaturedPropertyCard";

const FeaturedFeatured = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProperties = await fetchFeaturedProperties();
        setProperties(fetchedProperties);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    properties?.length > 0 && (
      <section className="bg-blue-50 px-4 pt-6 pb-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties?.map((property, i) => {
              return <FeaturedPropertyCard property={property} key={i} />;
            })}
          </div>
        </div>
      </section>
    )
  );
};

export default FeaturedFeatured;
