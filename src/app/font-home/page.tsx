"use client";
import React, { useState, useEffect, useCallback } from "react";
import Editor from "../components/Editor";
import Nav from "../components/Navbar";
import Glyphs from "../components/Glyphs";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import AuthenticationPopup from "../components/AuthenticationPopup";
const ResetIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    height="21"
    viewBox="0 0 21 21"
    width="21"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(2 2)"
    >
      <path d="m4.5 1.5c-2.4138473 1.37729434-4 4.02194088-4 7 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8" />
      <path d="m4.5 5.5v-4h-4" />
    </g>
  </svg>
);
const filledSVG = (
  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <path fill="none" d="M0 0h256v256H0z"></path>
    <path
      d="M176 32a60 60 0 0 0-48 24A60 60 0 0 0 20 92c0 71.9 99.9 128.6 104.1 131a7.8 7.8 0 0 0 3.9 1 7.6 7.6 0 0 0 3.9-1 314.3 314.3 0 0 0 51.5-37.6C218.3 154 236 122.6 236 92a60 60 0 0 0-60-60Z"
      fill="#7c54c7"
    ></path>
  </svg>
);

const unfilledSVG = (
  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <path fill="none" d="M0 0h256v256H0z"></path>
    <path
      d="M128 216S28 160 28 92a52 52 0 0 1 100-20h0a52 52 0 0 1 100 20c0 68-100 124-100 124Z"
      fill="none"
      stroke="#ffffff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    ></path>
  </svg>
);

interface Font {
  family: string;
  variants: string[];
}

const Page: React.FC = () => {
  const { data: session } = useSession();
  const [isBold, setIsBold] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [showPrompts, setShowPrompts] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [fontFamily, setFontFamily] = useState<string | null>(null);
  const [fonts, setFonts] = useState<Font[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const [showPopup, setShowPopup] = useState(false);
  const search = searchParams.get("family");
  // console.log(search)

  const [fontUrls, setFontUrls] = useState<any>({});
  const fontFamilyName = search;
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBold((prevIsBold) => !prevIsBold);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
    return debouncedValue;
  };

  const debouncedSearch = useDebounce(search, 500);

  const toggleFavorite = async () => {
    if (!session || !session.user || !fontUrls?.fontFamily) {
      setShowPopup(true);
      return;
    }
    try {
      const userEmail = session.user.email;
      const fontFamily = fontUrls.fontFamily;
      const isCurrentlyFavorite = favorites.includes(fontFamily);
      if (isCurrentlyFavorite) {
        await axios.delete(
          `http://localhost:3001/api/user-favorites/${userEmail}/${encodeURIComponent(
            fontFamily
          )}`
        );
        setFavorites(favorites.filter((fav) => fav !== fontFamily));
      } else {
        await axios.post("http://localhost:3001/api/user-favorites", {
          email: userEmail,
          fontFamily,
        });
        setFavorites([...favorites, fontFamily]);
      }
      setIsFavorite(!isCurrentlyFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBold((prevIsBold) => !prevIsBold);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
    setShowPrompts(false);
  };

  const handleReset = () => {
    setTextInput("");
    setShowPrompts(true);
  };

  useEffect(() => {
    const fetchFontFamily = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/font-family?search=${debouncedSearch}`
        );
        setFontUrls(response.data);
      } catch (error) {
        console.error("Error fetching font family:", error);
      }
    };
    if (debouncedSearch) {
      fetchFontFamily();
    }
  }, [debouncedSearch]);

  const fetchUserFavorites = useCallback(async () => {
    try {
      if (session && session.user) {
        const response = await axios.get(
          `http://localhost:3001/api/user-favorites/${session.user.email}`
        );
        setFavorites(response.data.favorites);
      }
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  }, [session]);

  useEffect(() => {
    fetchUserFavorites();
  }, [session, fetchUserFavorites]);

  useEffect(() => {
    // Apply @font-face CSS rule when fontUrls are available
    if (
      fontUrls &&
      fontUrls.fontFamily &&
      fontUrls.woff2Url &&
      fontUrls.woffUrl
    ) {
      const cssText = `
        @font-face {
          font-family: '${fontUrls.fontFamily}';
          src: url('${fontUrls.woff2Url}') format('woff2'),
               url('${fontUrls.woffUrl}') format('woff');
        }
      `;

      const styleElement = document.createElement("style");
      styleElement.textContent = cssText;
      document.head.appendChild(styleElement);

      return () => {
        document.head.removeChild(styleElement);
      };
    }
  }, [fontUrls]);

  function handleDownload(url: string) {
    // Create an anchor element
    const anchor = document.createElement("a");
    // Set the href attribute to the URL of the TTF file
    anchor.href = url;
    // Set the download attribute to specify the filename for the downloaded file
    anchor.download = "font.ttf";
    // Programmatically trigger a click event on the anchor element
    anchor.click();
  }

 
  
  const MemoizedGlyphs = React.memo(() => <Glyphs fontUrls={fontUrls} />);
  const MemoizedEditor = React.memo(() => <Editor />);

  return (
    <div id="top" className=" bg-black text-white min-h-screen pb-60">
      <div className="absolute z-0 top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="fixed top-0 left-0 w-full h-full">
          <div className="absolute z-0 -top-3/4 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-transparent to-fuchsia-400 w-full opacity-40% h-full rounded-full blur-[250px]"></div>
        </div>
      </div>

      <Nav />
      <div className="sticky top-0 z-50 mx-8 px-12 py-8 flex justify-center gap-2 items-center">
        <a
          href="#glyphs"
          className="text-sm bg-purpur hover:bg-white px-4 py-2 rounded-full border-2 text-black hover:border-white border-purpur "
        >
          Glyphs
        </a>
        <a
          href="#editor"
          className="text-sm bg-purpur hover:bg-white text-black hover:border-white border-purpur px-4 py-2 rounded-full border-2"
        >
          Type
        </a>
        <a
          href="#top"
          className="text-sm bg-purpur hover:bg-white text-black hover:border-white border-purpur px-4 py-2 rounded-full border-2"
        >
          Download
        </a>
      </div>
      <div className="container z-100  mx-auto px-12 pt-6 pb-20 text-center">
        <div
          className="text-white text-7xl md:text-8xl lg:text-9xl mb-10"
          style={{ fontFamily: `${fontUrls?.fontFamily}, sans-serif` }}
        >
          {search}
        </div>
        <div className="flex justify-center items-center">
          <span onClick={toggleFavorite}>
            <button className="text-xl hover:text-purpur w-12 h-12 rounded-full mr-4 border-white text-white">
              {favorites.includes(fontUrls?.fontFamily)
                ? filledSVG
                : unfilledSVG}
            </button>
          </span>
          <button
            className="text-xl hover:text-purpur hover:border-purpur border-2 px-4 h-12 rounded-full border-white text-white"
            onClick={() => {
              if (fontUrls.ttfUrl) {
                handleDownload(fontUrls.ttfUrl);
              } else {
                console.error("TTF URL not found.");
              }
            }}
          >
            Download
          </button>
        </div>
      </div>

      <div className="z-100 container mx-auto px-8 sm:px-12 md:px-16 xl:px-48 text-center">
        <div
          className="z-50 grid grid-cols-1 lg:grid-cols-3 gap-8 rounded-lg shadow-md border-2  border-purpur lg:border-0"
          style={{ fontFamily: `${fontUrls?.fontFamily}, sans-serif` }}
        >
          <div className="lg:border-2 bg-black rounded-lg lg:border-purpur p-8 flex flex-col justify-center">
            <div className="text-5xl text-left">This is a generic heading.</div>
          </div>
          <div className="lg:border-2 rounded-lg lg:border-purpur h-52 lg:h-auto flex flex-col justify-center">
            <div
              className={`text-10xl ${
                isBold ? "font-bold" : "font-normal"
              } transition-all duration-[3000ms]`}
            >
              Aa
            </div>
          </div>
          <div className="lg:border-2 rounded-lg lg:border-purpur p-8 flex flex-col justify-center">
            <p className="text-md text-right">
              This is a generic paragraph meant to illustrate how the font will
              appear in regular text. Choosing the right typeface is crucial for
              conveying your message effectively. Whether it's for a website,
              brochure, or document, the font plays a significant role in
              readability and visual appeal.
            </p>
          </div>
        </div>
      </div>
      {/*
      <div id="styles" className="container mx-auto px-20 pt-20 text-center">
        <div className="flex flex-row w-full mb-6 mt-4">
          <input
            type="text"
            className="bg-black px-4 pr-40 border-2 border-purpur py-2 rounded-full text-white w-full sm:w-auto mr-4"
            placeholder="Type something..."
            value={textInput}
            onChange={handleInputChange}
          />
          <button
            className="text-md px-2.5 bg-black hover:bg-purpur border-purpur hover:text-white text-purpur w-auto rounded-full border-2"
            onClick={handleReset}
          >
            <ResetIcon />
          </button>
        </div>
       
        <table className="mx-auto mt-4 border-separate border-spacing-4 text-2xl rounded-md text-left w-full text-white border-purpur border-2">
          <tbody>
            <tr className="">
              <td>{textInput || "This is Style 1"}</td>
            </tr>
            <tr className="">
              <td>{textInput || "This is Style 2"}</td>
            </tr>
            <tr className="">
              <td>{textInput || "This is Style 3"}</td>
            </tr>
            <tr className="">
              <td>{textInput || "This is Style 4"}</td>
            </tr>
            
          </tbody>
        </table>
        
      </div>
      */}
      <div id="glyphs">
        <Glyphs fontUrls={fontUrls} />
      </div>
      <div
        id="editor"
        style={{ fontFamily: `${fontUrls?.fontFamily}, sans-serif` }}
      >
        <Editor />
      </div>
      {showPopup && <AuthenticationPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Page;
