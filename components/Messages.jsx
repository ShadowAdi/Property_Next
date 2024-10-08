"use client";

import { useEffect, useState } from "react";
import Message from "./Message";
import Spinner from "./Spinner";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(`/api/messages`);
        if (res.status === 200) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.log("Error Fetching Messages: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    getMessages();
  }, []);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          {isLoading ? (
            <Spinner loading={isLoading} />
          ) : (
            <div className="space-y-4">
              {messages?.length === 0 ? (
                <p>You Have no Messages</p>
              ) : (
                <>
                  {messages?.map((message, i) => {
                    return <Message key={i} message={message} />;
                  })}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Messages;
