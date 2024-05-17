"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import ProfileImg from "../components/profileimage";
import AuthenticationPopup from "../components/AuthenticationPopup";
import Circle from "../components/Circle";
import Link from "next/link";
import Nav from "../components/Navbar";

const filledSVG = (
  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h256v256H0z"></path><path d="M176 32a60 60 0 0 0-48 24A60 60 0 0 0 20 92c0 71.9 99.9 128.6 104.1 131a7.8 7.8 0 0 0 3.9 1 7.6 7.6 0 0 0 3.9-1 314.3 314.3 0 0 0 51.5-37.6C218.3 154 236 122.6 236 92a60 60 0 0 0-60-60Z" fill="#7c54c7"></path></svg>
);

const unfilledSVG = (
  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h256v256H0z"></path><path d="M128 216S28 160 28 92a52 52 0 0 1 100-20h0a52 52 0 0 1 100 20c0 68-100 124-100 124Z" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" ></path></svg>
);

interface Font {
  family: string;
  variants: string[];
}
interface ArabicFont {
  family: string;
  variants: string[];
}

const Page: React.FC = () => {
  const { data: session } = useSession();
  const [fonts, setFonts] = useState<Font[]>([]);
  const [showAuthenticationPopup, setShowAuthenticationPopup] = useState(false);
  const [fontsArabic, setFontsArabic] = useState<ArabicFont[]>([]); // State for Arabic fonts
  const [userEmail, setUserEmail] = useState<string | null>(null); // State to store user's email
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedButton, setSelectedButton] = useState("All");
  const [windowWidth, setWindowWidth] = useState<number>(1024);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<
    "English" | "Arabic"
  >("English"); // Set default language to English
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categoryFinished, setCategoryFinished] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredFonts, setFilteredFonts] = useState<Font[]>([]);
  const [favoriteFonts, setFavoriteFonts] = useState<{ [key: string]: boolean }>({});



  // Update the fetchFonts function to include searchQuery in the URL if it's not empty
  const fetchFonts = async (page: number, category?: string) => {
    try {
      let url = `http://localhost:3001/api/fonts?page=${page}`;

      if (category && category !== "All") {
        url += `&category=${category}`;
      }

      // Add searchQuery to the URL if it's not empty
      if (searchQuery) {
        url += `&search=${searchQuery}`;
      }

      const response = await axios.get<Font[]>(url);

      if (page === 1) {
        setFonts(response.data); // Replace fonts if page is 1
      } else {
        setFonts((prevFonts) => [...prevFonts, ...response.data]); // Append fonts otherwise
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching fonts:", error);
      setLoading(false);
    }
  };
  const fetchFilteredFonts = useCallback(async () => {
    if (!searchQuery) {
      setFilteredFonts([]); // Clear the filtered fonts
      return;
    }

    try {
      const response = await axios.get<Font[]>(`http://localhost:3001/api/search-fonts?search=${searchQuery}`);
      setFilteredFonts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching filtered fonts:", error);
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchFilteredFonts();
  }, [searchQuery, fetchFilteredFonts]);

  useEffect(() => {
    if (!searchQuery) {
      if (selectedLanguage === "English") {
        fetchFonts(currentPage, selectedButton); // Fetch English fonts
      } else {
        setLoading(true); // Set loading to true before fetching Arabic fonts
        fetchArabicFonts(currentPage, selectedButton); // Fetch Arabic fonts
      }
    }
  }, [currentPage, selectedButton, selectedLanguage, searchQuery]);

  const handleButtonClick = async (buttonName: string) => {
    setSelectedButton(buttonName);
    setCurrentPage(1); // Reset current page when a category button is clicked
    try {
      if (selectedLanguage === "English") {
        await fetchFonts(1, buttonName); // Fetch English fonts for page 1 with selected category
      } else {
        await fetchArabicFonts(1, buttonName); // Fetch Arabic fonts for page 1 with selected category
      }
    } catch (error) {
      console.error("Error fetching fonts:", error);
    }
    setCategoryFinished(false);
  };

  const handleLanguageToggle = () => {
    setSelectedLanguage(selectedLanguage === "English" ? "Arabic" : "English");
  };

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    const timeoutId = setTimeout(updateWindowWidth, 100);
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);
  
  function user_info(session: any) {}
  function handleDownload(url: string) {
    // Create an anchor element
    const anchor = document.createElement("a");
    // Set the href attribute to the URL of the file
    anchor.href = url;
    // Set the download attribute to the filename you want the file to be saved as
    anchor.download = "filename.ttf";
    // Programmatically trigger a click event on the anchor element
    anchor.click();
  }

  useEffect(() => {
    const cssText = fonts
      .map(
        (font) =>
          `@font-face {
         font-family: '${font.family}';
         src: url('${font.variants[0]}') format('woff2'),
              url('${font.variants[1]}') format('woff');
       }`
      )
      .join("\n");

    const styleElement = document.createElement("style");
    styleElement.textContent = cssText;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [fonts]);

  useEffect(() => {
    const cssText = fontsArabic
      .map(
        (fontsArabic) =>
          `@font-face {
         font-family: '${fontsArabic.family}';
         src: url('${fontsArabic.variants[0]}') format('woff2'),
              url('${fontsArabic.variants[1]}') format('woff');
       }`
      )
      .join("\n");

    const styleElement = document.createElement("style");
    styleElement.textContent = cssText;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [fontsArabic]);

  const shouldStackButtons = windowWidth < 600;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoadMoreFonts = () => {
    if (!categoryFinished) {
      setCurrentPage((prevPage) => prevPage + 1); // Increment current page to load next set of fonts
    }
  };
 
  const handleCardClick = async (font: Font) => {
    try {
      const { family, variants } = font;

      // Redirect to the font-home page with the selected font family
      window.location.href = `/font-home?family=${family}`;
    } catch (error) {
      console.error("Error handling card click:", error);
      // Handle error here
    }
  };

  const fetchArabicFonts = async (page: number, category?: string) => {
    try {
      let url = `http://localhost:3001/api/arabic-fonts?page=${page}`;

      if (category && category !== "All") {
        url += `&category=${category}`;
      }

      const response = await axios.get<ArabicFont[]>(url);

      if (page === 1) {
        setFontsArabic(response.data); // Replace Arabic fonts if page is 1
      } else {
        setFontsArabic((prevFonts) => [...prevFonts, ...response.data]); // Append Arabic fonts otherwise
      }
    } catch (error) {
      console.error("Error fetching Arabic fonts:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching fonts
    }
  };
 
  const fetchUserFavorites = useCallback(async () => {
    try {
      if (session && session.user) {
        const response = await axios.get(`http://localhost:3001/api/user-favorites/${session.user.email}`);
        const favoritesArray = response.data.favorites || [];
        const favoritesObject = favoritesArray.reduce((acc: { [x: string]: boolean; }, fontFamily: string | number) => {
          acc[fontFamily] = true;
          return acc;
        }, {});
        setFavoriteFonts(favoritesObject);
      }
    } catch (error) {
      console.error("Error fetching user favorites:", error);
      setFavoriteFonts({});
    } finally {
      setLoading(false);
    }
  }, [session]);

 
  const toggleFavorite = async (fontFamily: string) => {
    if (!session || !session.user) {
      alert("Please sign in to add fonts to favorites.");
      return;
    }

    try {
      const userEmail = session.user.email;

      const response = favoriteFonts[fontFamily]
        ? await axios.delete(`http://localhost:3001/api/user-favorites/${userEmail}/${fontFamily}`)
        : await axios.post("http://localhost:3001/api/user-favorites", {
            email: userEmail,
            fontFamily,
          });

      setFavoriteFonts((prevFavoriteFonts) => ({
        ...prevFavoriteFonts,
        [fontFamily]: !prevFavoriteFonts[fontFamily],
      }));

      console.log(`Font ${favoriteFonts[fontFamily] ? 'removed from' : 'added to'} favorites:`, response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating favorites. Please try again later.");
    }
  }; 
  useEffect(() => {
    fetchUserFavorites();
  }, [fetchUserFavorites]);

  const heartIcon = (fontFamily: string) => (favoriteFonts[fontFamily] ? filledSVG : unfilledSVG);
  

  return (
    <div className="bg-black text-white px-8 py-10 min-h-screen">
      {/*<Circle circleColor="#380356" radius={250} />*/}
      <Nav />
      {showAuthenticationPopup && <AuthenticationPopup />}

      {/*slider*/}
      <div className="container mx-auto px-4 pt-8 text-center">
        <label htmlFor="languageSwitch" className="sr-only">
          Language Switch
        </label>
        <input type="checkbox" id="languageSwitch" className="sr-only" />
        <div className="relative inline-block w-60 h-14">
          <div className="block border-2 w-full h-full rounded-full border-purpur flex justify-between items-center px-2 relative">
            <span className="absolute left-5 text-white pl-2">English</span>
            <span className="absolute right-5 text-white pr-2">اردو</span>
            <div
              className={`dot bg-purpur w-28 h-10 rounded-full transition-transform`}
              style={{
                transition: "transform 0.3s",
                cursor: "pointer",
                transform:
                  selectedLanguage === "English"
                    ? "translateX(0)"
                    : "translateX(calc(110px))",
              }}
              onClick={handleLanguageToggle}
            >
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                {selectedLanguage === "English" ? "English" : "اردو"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* i added fn */}
      <div className="container mx-auto px-4 pt-8 text-center">
      <input
              type="text"
              placeholder="Search fonts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-4 bg-gray-800 text-white rounded-md"
            />
      </div>
      {/* i added fn */}

      <div
        className={`container mx-auto px-4 ${
          shouldStackButtons ? "py-10" : "pt-14 pb-16"
        } text-center`}
      >
        <h1 className="text-4xl font-bold">Explore our Font Collection</h1>
      </div>

      {selectedLanguage === "English" && (
        <div
          className={`container mx-auto text-purpur ${
            shouldStackButtons ? "w-40" : "w-auto"
          } ${
            shouldStackButtons
              ? "flex flex-col space-y-4 items-center pb-8"
              : "flex justify-center space-x-4 pb-12"
          }`}
        >
          <button
            className={`btn transition duration-200 ease-in-out btn-secondary ${
              selectedButton === "All"
                ? "bg-purpur text-white border-2 border-purpur"
                : "hover:bg-purpur hover:text-white border-2 border-purpur"
            } rounded-full px-6 py-3 text-lg h-12 flex items-center justify-center`}
            onClick={() => handleButtonClick("All")}
          >
            All
          </button>
          <button
            className={`btn transition duration-200 ease-in-out btn-secondary ${
              selectedButton === "serif"
                ? "bg-purpur text-white border-2 border-purpur"
                : "hover:bg-purpur hover:text-white border-2 border-purpur"
            } rounded-full px-6 py-3 text-lg h-12 flex items-center justify-center`}
            onClick={() => handleButtonClick("serif")}
          >
            Serif
          </button>
          <button
            className={`btn transition duration-200 ease-in-out btn-secondary ${
              selectedButton === "sans-serif"
                ? "bg-purpur text-white border-2 border-purpur"
                : "hover:bg-purpur hover:text-white border-2 border-purpur"
            } rounded-full px-6 py-3 text-lg h-12 flex items-center justify-center`}
            onClick={() => handleButtonClick("sans-serif")}
          >
            Sans Serif
          </button>
          <button
            className={`btn transition duration-200 ease-in-out btn-secondary ${
              selectedButton === "monospace"
                ? "bg-purpur text-white border-2 border-purpur"
                : "hover:bg-purpur hover:text-white border-2 border-purpur"
            } rounded-full px-6 py-3 text-lg h-12 flex items-center justify-center`}
            onClick={() => handleButtonClick("monospace")}
          >
            Monospaced
          </button>
          <button
            className={`btn transition duration-200 ease-in-out btn-secondary ${
              selectedButton === "display"
                ? "bg-purpur text-white border-2 border-purpur"
                : "hover:bg-purpur hover:text-white border-2 border-purpur"
            } rounded-full px-6 py-3 text-lg h-12 flex items-center justify-center`}
            onClick={() => handleButtonClick("display")}
          >
            Display
          </button>
          <button
            className={`btn transition duration-200 ease-in-out btn-secondary ${
              selectedButton === "handwriting"
                ? "bg-purpur text-white border-2 border-purpur"
                : "hover:bg-purpur hover:text-white border-2 border-purpur"
            } rounded-full px-6 py-3 text-lg h-12 flex items-center justify-center`}
            onClick={() => handleButtonClick("handwriting")}
          >
            Handwriting
          </button>
        </div>
      )}

{selectedLanguage === "English" && (
   <div className="container mx-auto px-4 py-10">
   {loading ? (
     <p>Loading fonts...</p>
   ) : (
     <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
       {(searchQuery && filteredFonts.length > 0 ? filteredFonts : fonts).map((font, index) => (
         <div
           key={index}
           className="bg-transparent border-purpur border-2 p-6 rounded-lg shadow-md hover:text-black flex flex-col justify-between hover:bg-purpur transition duration-200 ease-in-out relative group"
         >
           <div onClick={() => handleCardClick(font)}>
             <h1 className="text-2xl group-hover:text-black text-purpur mb-4" style={{ fontFamily: `${font.family}, sans-serif` }}>
               {font.family}
             </h1>
             <div>
               <h2 className="text-3xl mb-4" style={{ fontFamily: `${font.family}, sans-serif` }}>
                 The quick brown fox jumps over a lazy dog
               </h2>
             </div>
           </div>
           <div className="flex justify-between mt-4">
             <span onClick={() => toggleFavorite(font.family)}>
               <button className="text-xl hover:text-purpur w-12 h-12 rounded-full mr-4 border-white text-white">
                 {heartIcon(font.family)}
               </button>
             </span>
             <button
               className="btn btn-secondary text-purpur bg-black hover:text-black border-2 border-purpur hover:bg-white rounded-full px-6 h-14 font-bold transition duration-200 ease-in-out"
               onClick={() => handleDownload(font.variants[2])}
             >
               Download
             </button>
           </div>
         </div>
       ))}
     </div>
   )}
 </div>
)}

      {selectedLanguage === "Arabic" && (
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8">
          {fontsArabic.map((font, index) => (
            <div
              key={index}
              className="bg-transparent border-purpur border-2 p-8 text-right rounded-lg shadow-md hover:text-black flex flex-col justify-between hover:bg-purpur transition duration-200 ease-in-out relative group"
            >
              <div>
                <h1
                  className="text-3xl group-hover:text-black text-purpur mb-8"
                  style={{ fontFamily: `${font.family}, sans-serif` }}
                >
                  {font.family}
                </h1>
                <h2
                  className="text-4xl mb-8"
                  style={{ fontFamily: `${font.family}, sans-serif` }}
                >
                  ٹھنڈ میں ایک قحط زدہ گاؤں سے گذرتے وقت ایک چڑچڑےباأثر و فارغ
                  شخص کو بعض جل پری نما اژدہے نظر آئے۔
                </h2>
              </div>
              <div className="flex justify-between mt-4">
                <button className="btn btn-secondary text-purpur bg-black hover:text-black border-2 border-purpur hover:bg-white rounded-full px-6 h-14 font-bold transition duration-200 ease-in-out">
                  Download
                </button>
                <span onClick={() => toggleFavorite(font.family)}>
  <button className="text-xl hover:text-purpur w-12 h-12 rounded-full mr-4 border-white text-white">
    {heartIcon(font.family)}
  </button>
</span>

              </div>
            </div>
          ))}
        </div>
      )}

{!loading && !searchQuery && (
            <button
              onClick={handleLoadMoreFonts}
              className="py-2 px-4 bg-purple-500 text-white rounded-md mt-8 mx-auto"
            >
              Load More
            </button>
          )}
    </div>
  );
};

export default Page;
