"use client";
import React, { useState } from "react";

import Nav from "../components/Navbar";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={48}
    height={48}
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

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { data: session } = useSession();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res) {
        // Handle case where res is undefined
        setError("An error occurred while logging in.");
        return;
      }

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      // Set success message
      setError("Logged in successfully!");

      // Placeholder for redirection, you can add your redirection logic here
      console.log("Redirect to dashboard");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  // // Redirect to login page if user is logged in
  // if (session?.user) {
  //   window.location.href = "/";
  //   return null; // Return null to prevent rendering the signup page
  // }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="relative h-full">
          <div className="absolute -top-3/4 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-transparent to-fuchsia-300 w-full opacity-50% h-full rounded-full blur-[250px]"></div>
        </div>
      </div>
      <Nav />
      <div className="flex-grow flex items-center justify-center">
        <div className="container flex-col flex items-center m-12 md:mx-24">
          <div className="border bg-black/60 z-10 flex flex-col w-full sm:w-2/3 lg:w-1/2 rounded-lg py-12 px-6 lg:px-12">
            <div className="items-center flex-col flex mb-8">
              <div className="mb-3">
                <UserIcon />
              </div>
              <h1 className="text-3xl">Login</h1>
            </div>

            <div className="w-full">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 flex justify-between items-center text-purpur rounded-md px-5"
              >
                <input
                  className="text-purpur w-full bg-transparent border rounded-full px-4 py-1"
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="text-purpur w-full bg-transparent border rounded-full px-4 py-1"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="hover:text-black text-sm sm:text-lg hover:bg-white bg-purpur border-2 hover:border-white border-purpur text-black mt-8 py-1 px-6 rounded-full"
                  type="submit"
                >
                  Login
                </button>
                {error && <div className="text-white mt-2">{error}</div>}
              </form>
            </div>
          </div>
          <div className="flex text-xs sm:text-sm items-center mt-6 flex-col gap-2">
            <p>Don&apos;t have an account?</p>
            <Link
              href="signup"
              className="z-1000 hover:text-black hover:bg-purpur border-purpur border text-purpur py-1 px-4  rounded-full"
              onClick={() => console.log("Redirect to signup page")} // Placeholder for redirecting to signup page
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
