"use client"
import appHeader from "@/components/appHeader";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session, status } = useSession({ required: true });
  
  return (
    <div>
      <main className="main">
        WIP
        {appHeader(session, status)}
      </main>
    </div>
  );
}