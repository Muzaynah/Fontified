"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Circle from "./components/Circle";
import AuthenticationPopup from "./components/AuthenticationPopup";

import { useSession } from "next-auth/react";

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={30}
    height={30}
    color={"#ffffff"}
    fill={"none"}
    {...props}
  >
    <path
      d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M14.75 9.5C14.75 11.0188 13.5188 12.25 12 12.25C10.4812 12.25 9.25 11.0188 9.25 9.5C9.25 7.98122 10.4812 6.75 12 6.75C13.5188 6.75 14.75 7.98122 14.75 9.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M5.49994 19.0001L6.06034 18.0194C6.95055 16.4616 8.60727 15.5001 10.4016 15.5001H13.5983C15.3926 15.5001 17.0493 16.4616 17.9395 18.0194L18.4999 19.0001"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default function Home() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [blurIntensity, setBlurIntensity] = useState(15);
  const [loaded, setLoaded] = useState(false);
  const [hideScrollbar, setHideScrollbar] = useState(true); // State to control scrollbar visibility

  const { data: session } = useSession();

  useEffect(() => {
    // When component mounts, set hideScrollbar to false after a delay
    const timeout = setTimeout(() => {
      setHideScrollbar(false);
    }, 5000); // Adjust delay as needed
    return () => clearTimeout(timeout); // Cleanup on unmount
  }, []);

  useEffect(() => {
    // Gradually decrease blur intensity to 0 over 3 seconds
    const interval = setInterval(() => {
      if (blurIntensity > 0) {
        setBlurIntensity(blurIntensity - 1);
      } else {
        clearInterval(interval);
        setImageLoaded(true);
      }
    }, 80);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [blurIntensity]);

  useEffect(() => {
    // Set loaded to true after a short delay to allow the button to animate on load
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 50);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-14 ${
        hideScrollbar ? "overflow-y-hidden" : ""
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="relative h-full">
          <div className="absolute -top-3/4 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-transparent to-fuchsia-300 w-full opacity-50% h-full rounded-full blur-[250px]"></div>
        </div>
      </div>
      <div className="z-10 w-full max-w-5xl items-end justify-end font-sans text-xs lg:flex">
        <div
          className="flex mt-24 mb-4 lg:mb-0 lg:mt-2 justify-end items-end flex-col lg:flex-row gap-2 transform-gpu opacity-100 transition-all duration-300 ease-in-out"
          style={{ transitionDuration: "1s", transitionDelay: "2s" }}
        >
          {session && session.user && session.user.name ? (
            <div className="z-1000 flex-row text-sm flex">
              <div className="px-3 cursor-default">
                <UserIcon />
              </div>

              <Link
                className="text-white hover:text-purpur"
                href="UserDashboard"
                target="_blank"
              >
                <p>{session.user.name}</p>
              </Link>
            </div>
          ) : (
            <div className="z-1000 flex-row text-sm lg:text-lg flex">
              <div className="px-3 cursor-default">
                <UserIcon />
              </div>
              <Link
                className="pt-1 lg-pt-0 text-white hover:text-purpur"
                href="login"
                target="_blank"
              >
                <p>Login</p>
              </Link>
              <p className="px-1 pt-1 lg-pt-none">/</p>
              <Link
                className="pt-1 lg-pt-0 text-white hover:text-purpur"
                href="signup"
                target="_blank"
              >
                <p>Signup</p>
              </Link>
            </div>
          )}
        </div>
        <p className="fixed lg:hidden left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <Image
            src="/assets/fontified.png"
            alt="Logo"
            width={200}
            height={100}
          />
        </p>
        <div className="fixed lg:hidden bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <Link
            href="fonts"
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            © 2024 Fontified | All Rights Reserved
          </Link>
        </div>
      </div>

      <div className="relative z-1 hidden lg:block flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <div className="relative">
          <div
            className="transition-all"
            style={{ filter: `blur(${blurIntensity}px)` }}
          >
            <Image
              src="/assets/fontified.png"
              alt="Logo"
              width={1050}
              height={100}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>
      </div>

      <div
        className={`mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl gap-4 lg:grid-cols-3 lg:text-left
      transform-gpu ${
        loaded ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      } transition-all duration-200 ease-in-out`}
        style={{ transitionDuration: "2s", transitionDelay: "1s" }}
      >
        <Link
          href="fonts-library"
          className="group rounded-lg border border-neutral-800 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Fonts Library{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore our English and Urdu fonts.
          </p>
        </Link>

        <Link
          href="handwriting-board"
          className="group rounded-lg border border-neutral-800 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Signature Board{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Handwriting and signature board.
          </p>
        </Link>

        <Link
          href="document-editor"
          className="group rounded-lg border border-neutral-800 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Document Editor{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Create, edit, and download documents.
          </p>
        </Link>
      </div>
    </main>
  );
}
