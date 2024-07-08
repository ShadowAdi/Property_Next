import ConnectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (request) => {
  try {
    await ConnectDB();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    const locationPatter = new RegExp(location, "i");

    let query = {
      $or: [
        { name: locationPatter },
        { description: locationPatter },
        { "location.street": locationPatter },
        { "location.city": locationPatter },
        { "location.state": locationPatter },
        { "location.zipcode": locationPatter },
      ],
    };

    if (propertyType && propertyType !== "All") {
      const typePatter = new RegExp(propertyType, "i");
      query.type = typePatter;
    }
    const properties = await Property.find(query);
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("Get error"), { status: 500 });
  }
};
