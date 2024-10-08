import ConnectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (request) => {
  try {
    await ConnectDB();

    const properties = await Property.find({
      is_featured: true,
    });

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong...", { status: 500 });
  }
};
