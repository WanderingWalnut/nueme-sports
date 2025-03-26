"use client";
import Head from "next/head";
import { RiUserAddFill } from "react-icons/ri";
import { PiSoccerBallFill } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";

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
      {/* <header className="sticky top-0 bg-white z-10">
        <nav className="flex space-x-4 p-4">
          <a href="#hero">Home</a>
          <a href="#HowItWorks">How It Works</a>
        </nav>
      </header> */}
      {/* <main className="from-primary-color m-0 bg-gradient-to-br to-blue-400 px-4 min-h-screen"> */}
      <section
        id="hero"
        className="from-primary-color m-0 bg-gradient-to-br to-blue-400 px-4 min-h-screen"
      >
        <div className="flex flex-col justify-center items-center h-screen">
          <p className="font-semibold text-6xl text-white">
            Pick-Up Soccer. Anytime, Anywhere.{" "}
          </p>
          <p className="mt-[50] text-lg text-white">
            Join Calgary's most accesible drop-in soccer sessions
          </p>
          <button
            className="bg-white text-black rounded-full px-4 py-2 mt-[50] transition duration-300 ease-in-out transform hover:bg-gray-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={() => (window.location.href = "/login")}
          >
            View Upcoming Sessions
          </button>
        </div>
      </section>
      <section id="How-It-Works" className="min-h-screen bg-white py-12">
        <h2 className="text-center text-5xl font-bold mb-8 text-black">
          How It Works
        </h2>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center text-center p-6">
            <RiUserAddFill className="text-7xl mb-6 text-black" />
            <h3 className="text-2xl font-semibold text-black">Sign Up</h3>
            <p className="text-lg text-black">Create an account</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <FaRegCalendarAlt className="text-7xl mb-6 text-black" />
            <h3 className="text-2xl font-semibold text-black">Pick a Session</h3>
            <p className="text-lg text-black">Browse & RSVP</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <PiSoccerBallFill className="text-7xl mb-6 text-black" />
            <h3 className="text-2xl font-semibold text-black">Show Up & Play</h3>
            <p className="text-lg text-black">No cost, just fun</p>
          </div>
        </div>
      </section>
      {/* </main> */}
    </>
  );
}
