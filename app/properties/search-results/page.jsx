"use client";
import InputComponent from "@/components/InputComponent";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchResults = () => {
  const searchParams = useSearchParams();

  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
    setLoading(false);
  }, [location,propertyType]);

  properties.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))


  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <InputComponent />
        </div>
      </section>
      <>
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <h1 className="text-2xl  mb-4">Searched Properties</h1>
            {loading && (
              <>
                <Spinner loading={loading} />
                <p>Please Wait...</p>
              </>
            )}

            {!loading && properties?.length === 0 ? (
              <h1 className="text-center font-bold ">No properties found </h1>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((property, index) => (
                  <PropertyCard property={property} key={index} />
                ))}
              </div>
            )}
          </div>
        </section>
      </>
      
    </>
  );
};

export default SearchResults;
