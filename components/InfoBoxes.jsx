import React from "react";
import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <section className="w-[100%]">
      <div className="container-xl  lg:container m-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg px-12 mx-auto ">
          <InfoBox
            heading={"For Renters"}
            backgroundColor="bg-gray-100"
            buttonInfo={{
              text: "Browse Properties",
              link: "/properties",
              backgroundColor: "bg-black",
            }}
            textColor="text-gray-800"
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox
            heading={"For Property Owners"}
            backgroundColor="bg-blue-100"
            buttonInfo={{
              text: "Add Property",
              link: "/properties/add",
              backgroundColor: "bg-blue-500",
            }}
            textColor="text-gray-800"
          >
             List your properties and reach potential tenants. Rent as an Airbnb
             or long term.
          </InfoBox>

        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
