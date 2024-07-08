"use client";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SavedProperties = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const getProperties = async () => {
      try {
        const data = await fetch("/api/bookmarks/saved");
        const res = await data?.json();
        if (data?.status === 200) {
          setProperties(res);
        } else {
          console.log(data?.statusText);
          toast.error("Failed to fetch saved properties");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch saved properties");
      } finally {
        setLoading(false);
      }
    };
    getProperties();
  }, [properties?._id]);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 xl:py-24 py-4">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <PropertyCard property={property} key={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedProperties;
