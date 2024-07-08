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

    const readMessages = await Message.find({ recipent: userId, read: true })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");

    const unreadMessages = await Message.find({ recipent: userId, read: false })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");
    const messages = [...unreadMessages, ...readMessages];

    return new Response(JSON.stringify(messages), {
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

export const POST = async (request) => {
  try {
    await ConnectDB();

    const { email, name, body, recipent, property, phone } =
      await request.json();

    const sessionUser = await getUserSession();
    if (!sessionUser || !sessionUser?.userId) {
      return new Response(JSON.stringify({ message: data?.message }), {
        status: 401,
      });
    }
    const { user } = sessionUser;

    if (user?.id === recipent) {
      return new Response(
        JSON.stringify({ message: "Can't Send Message to Yourself" }),
        { status: 400 }
      );
    }

    const newMessage = new Message({
      sender: user?.id,
      email: email,
      name: name,
      body: body,
      recipent: recipent,
      property: property,
      phone: phone,
      read: false,
    });

    await newMessage.save();
    return new Response(JSON.stringify({ message: "Message Sent" }), {
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
