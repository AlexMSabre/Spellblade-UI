import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-left justify-left bg-zinc-50 font-sans dark:bg-black">
      <main className="main">
        <div className="headerBar">
          
          <ul>
            <li><a href="/">Spellblade TTRPG</a></li>
            <li><a href="/mycharacters">My Characters</a></li>
            <li><a href="/mygames">My Games</a></li>
            <li><a href="/rules">Rules</a></li>
          </ul>

        <div>
          Rules
        </div>

        </div>
      </main>
    </div>
  );
}