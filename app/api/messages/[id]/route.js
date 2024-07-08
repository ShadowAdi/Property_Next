import ConnectDB from "@/config/database";
import Message from "@/models/Message";
import { getUserSession } from "@/utils/getSession";

export const dynamic = "force-dynamic";

export const PUT = async (request, { params }) => {
  try {
    await ConnectDB();
    const { id } = params;
    const sessionUser = await getUserSession();
    if (!sessionUser || !sessionUser?.userId) {
      return new Response(JSON.stringify({ message: "User Id is required" }), {
        status: 401,
      });
    }
    const { userId } = sessionUser;
    const message = await Message.findById(id);
    if (!message) {
      return new Response("Message Not Found", { status: 404 });
    }
    if (message.recipent.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    message.read = !message.read;
    await message.save();
    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong...", { status: 401 });
  }
};


export const DELETE = async (request, { params }) => {
    try {
      await ConnectDB();
      const { id } = params;
      const sessionUser = await getUserSession();
      if (!sessionUser || !sessionUser?.userId) {
        return new Response(JSON.stringify({ message: "User Id is required" }), {
          status: 401,
        });
      }
      const { userId } = sessionUser;
      const message = await Message.findById(id);
      if (!message) {
        return new Response("Message Not Found", { status: 404 });
      }
      if (message.recipent.toString() !== userId) {
        return new Response("Unauthorized", { status: 401 });
      }
      await message.deleteOne()
      return new Response("Message Has Been Deleted", { status: 200 });
    } catch (error) {
      console.log(error);
      return new Response("Something Went Wrong...", { status: 401 });
    }
  };