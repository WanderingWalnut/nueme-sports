import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>NueMe Sports</title>
        <meta
          name="description"
          content="Learn how to implement Google Firebase Authentication in your React, Next.js, TypeScript projects."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="from-primary-color m-0 bg-gradient-to-br to-blue-400 px-4 min-h-screen">
        <div className="flex justify-center items-center h-screen">
          <p className="font-poppins text-6xl ">
            Pick-Up Soccer. Anytime, Anywhere.{" "}
          </p>
        </div>
      </main>
    </>
  );
}
