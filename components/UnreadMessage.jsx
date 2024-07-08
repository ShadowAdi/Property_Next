"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import { useEffect } from "react";

const UnreadMessage = ({ session }) => {
const {unread,setUnread}=useGlobalContext()
  useEffect(() => {
    if (!session) return;
    const fetchUnreadMessage = async () => {
      try {
        const res = await fetch("/api/messages/unread-count", {
          method: "GET",
        });
        if (res.status === 200) {
          const data = await res.json();
          setUnread(data?.count);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUnreadMessage();
  }, [session]);

  return (
    unread > 0 && (
      <span
        className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform
     translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
      >
        {unread}
      </span>
    )
  );
};

export default UnreadMessage;
