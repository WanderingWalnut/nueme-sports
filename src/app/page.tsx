"use client";
import Head from "next/head";
import { RiUserAddFill } from "react-icons/ri";
import { PiSoccerBallFill } from "react-icons/pi";
import { FaRegCalendarAlt, FaArrowDown } from "react-icons/fa";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href")!);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
        className="from-primary-color m-0 bg-gradient-to-br to-blue-400 px-4 min-h-screen flex flex-col justify-center items-center relative"
      >
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-semibold text-6xl text-white mb-6 animate-fade-in">
            Pick-Up Soccer. Anytime, Anywhere.
          </h1>
          <p className="text-xl text-white mb-8 animate-fade-in-up">
            Join Calgary&apos;s most accessible drop-in soccer sessions
          </p>
          <button
            className="bg-white text-black rounded-full px-8 py-3 text-lg font-medium transition-all duration-300 ease-in-out transform hover:bg-gray-100 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 animate-fade-in-up"
            onClick={() => {
              if (user?.uid) {
                router.push("/dashboard");
              } else {
                router.push("/login");
              }
            }}
          >
            View Upcoming Sessions
          </button>
        </div>
        <a
          href="#How-It-Works"
          className="absolute bottom-10 animate-bounce text-white"
        >
          <FaArrowDown className="text-3xl" />
        </a>
      </section>
      <section id="How-It-Works" className="min-h-screen bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-center text-4xl font-bold mb-12 text-black">
            How It Works
          </h2>
          <div className="flex flex-col space-y-12">
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-all duration-300">
              <div className="bg-blue-50 p-4 rounded-full mb-4">
                <RiUserAddFill className="text-6xl text-blue-500" />
              </div>
              <h3 className="text-2xl font-semibold text-black mb-3">
                Sign Up
              </h3>
              <p className="text-lg text-gray-600 max-w-md">
                Create an account in seconds and join our soccer community
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-all duration-300">
              <div className="bg-blue-50 p-4 rounded-full mb-4">
                <FaRegCalendarAlt className="text-6xl text-blue-500" />
              </div>
              <h3 className="text-2xl font-semibold text-black mb-3">
                Pick a Session
              </h3>
              <p className="text-lg text-gray-600 max-w-md">
                Browse through our available sessions and RSVP to your preferred
                time slot
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-all duration-300">
              <div className="bg-blue-50 p-4 rounded-full mb-4">
                <PiSoccerBallFill className="text-6xl text-blue-500" />
              </div>
              <h3 className="text-2xl font-semibold text-black mb-3">
                Show Up & Play
              </h3>
              <p className="text-lg text-gray-600 max-w-md">
                No cost, just pure soccer fun with fellow enthusiasts
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* </main> */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-20px);
          }
          60% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </>
  );
}
