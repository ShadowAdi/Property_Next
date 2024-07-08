import ConnectDB from "@/config/database";
import User from "@/models/User";
import { getUserSession } from "@/utils/getSession";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    await ConnectDB();

    const { propertyId } = await request.json();
    const sessionUser = await getUserSession();

    if (!sessionUser || !sessionUser?.userId) {
      return new Response("User Id is required", { status: 401 });
    }
    const { userId } = sessionUser;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return new Response("User Don't Exists", { status: 401 });
    }

    let isBookmarked = user?.bookmarks?.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", {
      status: 500,
    });
  }
};
