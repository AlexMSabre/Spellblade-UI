import { signOut } from "@workos-inc/authkit-nextjs";
import Link from "next/link";
//this is the base landing page.  (/) right now it is just links and signin/out.  
// you can put whatever you want in the Home function as long as it returns a "JSX" element - basically just HTML5 formatting

//the basic app layout for any NEXT.js project is that folders/packages are the URL routes, and then page.tsx files determine what goes at those routes.
//route.tsx files are for simple redirects
export default function Home() {
  return (
    //there is some css styling done by the classnames here. i forgot what this is called, but it can be a good alternative to .css files for every element.
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        
        <div className="flex flex-col item s-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome to the Spell Blade landing page!
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            to create a character, click  
            <Link
              href="/character"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              here
            </Link>{" "}<br/>
            to login, click 
            <Link
              href="/login"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              here
            </Link>{" "}<br/>
            to select a character, click 
            <Link
              href="/character/select"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              here
            </Link>{" "}
          </p>

            <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
        </div>
      </main>
    </div>
  );
}
