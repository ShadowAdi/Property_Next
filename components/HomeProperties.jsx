import PropertyCard from "./PropertyCard";
import Link from "next/link";
import { fetchHomeProperties } from "@/utils/requestGet";

const HomeProperties = async () => {
  let properties = await fetchHomeProperties();

  properties = properties
    ?.sort(() => Math.random() - Math.random())
    ?.slice(0, 3);
  return (
    <section className="px-4 py-6 mb-14 sm:pb-16">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Recent Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties?.map((property, i) => {
            return <PropertyCard key={i} property={property} />;
          })}
        </div>
      </div>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl
           hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </section>
  );
};

export default HomeProperties;
