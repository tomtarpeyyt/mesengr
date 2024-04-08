'use client';

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";


export default function New() {
    const otherUsers = useQuery(api.users.listOthers, {});

    if (otherUsers === undefined || otherUsers === null) return <div>Loading...</div>;
 
    return (
      <main className="flex flex-col">
        <h1 className="text-4xl font-bold w-full text-center py-12">Select a user to start a chat with.</h1>
        <div className="grid grid-cols-5 gap-10">
            {otherUsers?.map((otherUser) => (
                <div>hello</div>
            ))}
        </div>
      </main>
    );
  }
  