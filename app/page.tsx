'use client';
import Image from "next/image";
import "../spellblade/TextBorder.png";
import appHeader from "@/components/appHeader";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  function toCharacter() {
    router.push("/character")
  }

  function toPlay() {
    router.push("/play")
  }

  return (
    <main className="main">
      {appHeader( session, status)}

      <div className="content">
        <div onClick={() => signIn("cognito")} className="login">
          Sign In
        </div>

        <div onClick={toCharacter} className="create">
          Create a Character
        </div>

        <div onClick={toPlay} className="play">
          Play the Game
        </div>
      </div>
      
      <div className="footerbar">
        Footer
      </div>
    </main>
  );
}