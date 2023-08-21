import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
// import Link from "next/link";
import router from "next/router";
// import { api } from "~/utils/api";

import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Button } from "~/components/ui/button";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>TodoApp</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <main className="flex min-h-screen flex-col items-center justify-center "> */}
      {/* bg-gradient-to-b from-[#2e026d] to-[#15162c] */}
      <AspectRatio ratio={16 / 9}>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight  sm:text-[5rem]">
            Galery AI
          </h1>
          <div className="flex flex-col items-center gap-2">
            {/* <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p> */}
            <AuthShowcase />
          </div>
        </div>
      </AspectRatio>
      {/* </main> */}
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined }
  // );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl ">
        {sessionData && (
          <span>
            Logged in as {sessionData.user?.name} with role{" "}
            {sessionData.user.role}
          </span>
        )}
        <br />
        <br />
        {/* {secretMessage && <span> - {secretMessage}</span>} */}
        {sessionData && (
          <Button
            onClick={() => {
              void router.push("/todos/generateImage");
            }}
          >
            Generate
          </Button>
          // <button
          //   className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          //   onClick={() => {
          //     void router.push("/todos/show");
          //   }}
          // >
          //   CRUD
          // </button>
        )}
      </p>
      <Button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
      {/* <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button> */}
    </div>
  );
}