import ConnectDB from "@/config/database";
import Message from "@/models/Message";
import { getUserSession } from "@/utils/getSession";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  try {
    await ConnectDB();

    const sessionUser = await getUserSession();
    if (!sessionUser || !sessionUser?.userId) {
      return new Response(JSON.stringify({ message: "User Id is required" }), {
        status: 401,
      });
    }
    const { userId } = sessionUser;

    const unreadMessagesCount = await Message.countDocuments({recipent:userId,read:false})

    return new Response(JSON.stringify({count:unreadMessagesCount}), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Error in Sending Message" }),
      {
        status: 500,
      }
    );
  }
};
