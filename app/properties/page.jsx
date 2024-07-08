import AllProperties from "@/components/AllProperties";
import InputComponent from "@/components/InputComponent";

const PropertiesPage = async () => {
  return (
    <>
      <section className="bg-blue-700 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <InputComponent />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <AllProperties />
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;
