import cloudinary from "@/config/cloudinary";
import ConnectDB from "@/config/database";
import Property from "@/models/Property";
import { getUserSession } from "@/utils/getSession";

export const GET = async (req, { params }) => {
  try {
    await ConnectDB();
    const userId = params?.userId;
    if (!userId) {
      return new Response("User Id is not required", {
        status: 400,
      });
    }

    const properties = await Property.find({ owner: userId });
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong...", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await ConnectDB();
    const sessionUser = await getUserSession();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is required", { status: 401 });
    }

    const { userId } = sessionUser;
    const formData = await request.formData();

    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        zipcode: formData.get("location.zipcode"),
        state: formData.get("location.state"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
      // images,
    };

    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      const imageBase64 = imageData.toString("base64");

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "NextJs",
        }
      );
      imageUploadPromises.push(result?.secure_url);

      const uploadedImages = await Promise.all(imageUploadPromises);

      propertyData.images = uploadedImages;
    }

    const newProperty = await Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty?._id}`
    );
  } catch (error) {
    console.log(error);
    return new Response("Failed to add property", { status: 500 });
  }
};
