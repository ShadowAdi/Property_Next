"use client";
import { fetchProperties } from "@/utils/requestGet";
import PropertyCard from "./PropertyCard";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalProperties, setTotalProperties] = useState(0);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const properties = await fetchProperties(page, pageSize);
        setTotalProperties(properties?.total);
        setProperties(
          properties.properties?.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, [page, pageSize]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties?.length === 0 ? (
          <p>No Properties Found</p>
        ) : (
          properties?.map((property) => {
            return <PropertyCard property={property} key={property?._id} />;
          })
        )}
      </div>
      <Pagination
        page={page}
        pageSize={pageSize}
        totalProperties={totalProperties}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default AllProperties;
