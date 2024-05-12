'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react";
import ProfileImg from '../components/profileimage';
import Circle from '../components/Circle';
import Link from 'next/link';
interface Font {
  family: string;
  variants: string[];
}


const Page: React.FC = () => {
  const { data: session } = useSession();
  const [fonts, setFonts] = useState<Font[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null); // State to store user's email

  const [loading, setLoading] = useState<boolean>(true);
  const [selectedButton, setSelectedButton] = useState("All");
  const [windowWidth, setWindowWidth] = useState<number>(1024);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categoryFinished, setCategoryFinished] = useState(false);

  // Function to fetch fonts from the server
  const fetchFonts = async (page: number, category?: string) => {
  try {
    let url = `http://localhost:3001/api/fonts?page=${page}`;

    if (category && category !== 'All') {
      url += `&category=${category}`;
    }

    const response = await axios.get<Font[]>(url);

    if (page === 1) {
      setFonts(response.data); // Replace fonts if page is 1
    } else {
      setFonts(prevFonts => [...prevFonts, ...response.data]); // Append fonts otherwise
    }

    setLoading(false);
  } catch (error) {
    console.error('Error fetching fonts:', error);
    setLoading(false);
  }
};
  useEffect(() => {
    fetchFonts(currentPage, selectedButton); // Fetch fonts for initial page with the selected category
  }, [currentPage, selectedButton]);

  const handleButtonClick = async (buttonName: string) => {
    setSelectedButton(buttonName);
    setCurrentPage(1); // Reset current page when a category button is clicked
  
    try {
      await fetchFonts(1, buttonName); // Fetch fonts for page 1 with selected category
    } catch (error) {
      console.error('Error fetching fonts:', error);
    }
    setCategoryFinished(false);
  };
  
  const handleLanguageToggle = () => {
    setSelectedLanguage(selectedLanguage === 'English' ? 'اردو' : 'English');
  };

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    const timeoutId = setTimeout(updateWindowWidth, 100);
    window.addEventListener('resize', updateWindowWidth);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);
  function user_info(session: any) {

  }
  function handleDownload(url: string) {
    // Create an anchor element
    const anchor = document.createElement('a');
    // Set the href attribute to the URL of the file
    anchor.href = url;
    // Set the download attribute to the filename you want the file to be saved as
    anchor.download = 'filename.ttf';
    // Programmatically trigger a click event on the anchor element
    anchor.click();
  }

  useEffect(() => {
    const cssText = fonts.map(font => (
      `@font-face {
         font-family: '${font.family}';
         src: url('${font.variants[0]}') format('woff2'),
              url('${font.variants[1]}') format('woff');
       }`
    )).join('\n');
  
    const styleElement = document.createElement('style');
    styleElement.textContent = cssText;
    document.head.appendChild(styleElement);
  
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [fonts]);
  
  const shouldStackButtons = windowWidth < 600;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoadMoreFonts = () => {
    if (!categoryFinished) {
      setCurrentPage(prevPage => prevPage + 1); // Increment current page to load next set of fonts
    }
  };
  const handleAddToFavorites = async (fontFamily: string) => {
    if (!session || !session.user) {
      // If user is not logged in, notify them to sign in
      alert('Please sign in to add fonts to favorites.');
      return;
    }
  
    try {
      // Fetch user's email from session
      const userEmail = session.user.email;
  
      // Call backend API to add font to user-favs collection
      const response = await axios.post('http://localhost:3001/api/user-favorites', {
        email: userEmail,
        fontFamily: fontFamily,
      });
  
      // Handle success response
      console.log('Font added to favorites:', response.data);
      // Notify the user that the font has been added to favorites
      alert('Font added to favorites.');
    } catch (error) {
      // Handle error
      console.error('Error adding font to favorites:', error);
      // Notify the user about the error
      alert('An error occurred while adding the font to favorites. Please try again later.');
    }
  };
  
  const handleCardClick = async (font: Font) => {
    try {
        const { family, variants } = font;

        // Redirect to the font-home page with the selected font family
        window.location.href = `/font-home?family=${family}`;
    } catch (error) {
        console.error('Error handling card click:', error);
        // Handle error here
    }
};


  return (

    <div className="bg-black text-white px-8 py-10 min-h-screen">
      {/*<Circle circleColor="#380356" radius={250} />*/}
      <nav className="relative">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-xl font-bold text-white">Fontified</div>
          {shouldStackButtons ? (
            <button className="block lg:hidden z-20" onClick={toggleMenu}>
              <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M4 6h16a1 1 0 1 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zm0 5h16a1 1 0 1 1 0 2H4a1 1 0 0 1 0-2z" clipRule="evenodd" />
              </svg>
            </button>
          ) : (
            <ul className="flex space-x-2">
              <li className="text-sm hover:bg-white hover:text-black px-4 py-2 rounded-full border-2">
                <a href="#" className="nav-link">{session?.user?.name}</a>
              </li>
              <li className="text-sm hover:bg-white hover:text-black px-4 py-2 rounded-full border-2">
                <a href="#" className="nav-link">Handwriting</a>
              </li>
              <li className="text-sm hover:bg-white hover:text-black px-4 py-2 rounded-full border-2">
                <a href="#" className="nav-link">Editor</a>
              </li>
              {!shouldStackButtons && (
                <ProfileImg />
              )}
            </ul>
          )}
        </div>
        {isMenuOpen && (<div className="lg:hidden w-64 fixed top-0 right-0 h-full bg-black text-white transition-transform transform -translate-x-0 ease-in-out z-10">
          <div className="relative px-10 pt-24 text-right justify-right items-right">
            <ul className="pl-0">
              <li className="text-md pt-4 px-2 hover:text-purpur">
                <span className="border-b border-white block pb-4">{session?.user?.name}</span>
              </li>
              <li className="text-md pt-4 px-2 hover:text-purpur">
                <span className="border-b border-white block pb-4">Handwriting</span>
              </li>
              <li className="text-md pt-4 px-2 hover:text-purpur">
                <span className="border-b border-white block pb-4">Editor</span>
              </li>
              <li className="text-md pt-4 px-2 hover:text-purpur">
                <span className="border-b border-white block pb-4">Profile</span>
              </li>
            </ul>
          </div>
        </div>

        )}
      </nav>

      {/*slider*/}
      <div className="container mx-auto px-4 pt-8 text-center">
        <label htmlFor="languageSwitch" className="sr-only">Language Switch</label>
        <input type="checkbox" id="languageSwitch" className="sr-only" />
        <div className="relative inline-block w-60 h-14">
          <div className="block border-2 w-full h-full rounded-full border-purpur flex justify-between items-center px-2 relative">
            <span className="absolute left-5 text-white pl-2">English</span>
            <span className="absolute right-5 text-white pr-2">اردو</span>
            <div className={`dot bg-purpur w-28 h-10 rounded-full transition-transform`} style={{ transition: "transform 0.3s", cursor: "pointer", transform: selectedLanguage === 'English' ? 'translateX(0)' : 'translateX(calc(110px))' }} onClick={handleLanguageToggle}>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                {selectedLanguage === 'English' ? 'English' : 'اردو'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={`container mx-auto px-4 ${shouldStackButtons ? 'py-10' : 'pt-14 pb-16'} text-center`}>
        <h1 className="text-4xl font-bold">Explore our Font Collection</h1>
      </div>

      {selectedLanguage === 'English' && (
        <div className={`container mx-auto text-purpur ${shouldStackButtons ? 'w-40' : 'w-auto'} ${shouldStackButtons ? 'flex flex-col space-y-4 items-center pb-8' : 'flex justify-center space-x-4 pb-12'}`}>
          <button
            className={`btn transition duration-200 ease-in-out btn-secondary ${selectedButton === 'All' ? 'bg-purpur text-white border-2 border-purpur' : 'hover:bg-purpur hover:text-white border-2 border-purpur'} rounded-full px-6 py-3 text-lg h-12 flex items-center justify-center`}
            onClick={() => handleButtonClick('All')}
          >
            All
          </button>
          <button
            className={`btn transition duration-200 ease-in-out btn-secondary ${selectedButton === 'serif' ? 'bg-purpur text-white border-2 border-purpur' : 'hover:bg-purpur hover:text-white border-2 border-purpur'} rounded-full px-6 py-3 text-lg h-12 flex items-center justify-center`}
            onClick={() => handleButtonClick('serif')}
          >
            Serif
          </button>
          <button
            className={`btn transition duration-200 ease-in-out btn-secondary ${selectedButton === 'sans-serif' ? 'bg-purpur text-white border-2 border-purpur' : 'hover:bg-purpur hover:text-white border-2 border-purpur'} rounded-full px-6 py-3 text-lg h-12 flex items-center justify-center`}
            onClick={() => handleButtonClick('sans-serif')}
          >
            Sans Serif
          </button>
          <button
            className={`btn transition duration-200 ease-in-out btn-secondary ${selectedButton === 'monospace' ? 'bg-purpur text-white border-2 border-purpur' : 'hover:bg-purpur hover:text-white border-2 border-purpur'} rounded-full px-6 py-3 text-lg h-12 flex items-center justify-center`}
            onClick={() => handleButtonClick('monospace')}
          >
            Monospaced
          </button>
          <button
            className={`btn transition duration-200 ease-in-out btn-secondary ${selectedButton === 'display' ? 'bg-purpur text-white border-2 border-purpur' : 'hover:bg-purpur hover:text-white border-2 border-purpur'} rounded-full px-6 py-3 text-lg h-12 flex items-center justify-center`}
            onClick={() => handleButtonClick('display')}
          >
            Display
          </button>
          <button
            className={`btn transition duration-200 ease-in-out btn-secondary ${selectedButton === 'handwriting' ? 'bg-purpur text-white border-2 border-purpur' : 'hover:bg-purpur hover:text-white border-2 border-purpur'} rounded-full px-6 py-3 text-lg h-12 flex items-center justify-center`}
            onClick={() => handleButtonClick('handwriting')}
          >
            Handwriting
          </button>
        </div>
      )
      }

      {selectedLanguage == 'English' && (
        <div className="container mx-auto px-4 py-10">
          {loading ? ( // Render loading message if fonts are still loading
            <p>Loading fonts...</p>
          ) : (
            <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fonts.map((font, index) => (
                <div key={index} className="bg-transparent border-purpur border-2 p-6 rounded-lg shadow-md hover:text-black flex flex-col justify-between hover:bg-purpur transition duration-200 ease-in-out relative group">
               <div onClick={() => handleCardClick(font)}> {/* Handle card click */}

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
                    <button className="btn btn-secondary text-purpur bg-black hover:text-black border-2 border-purpur hover:bg-white rounded-full w-14 h-14 font-bold transition duration-200 ease-in-out" onClick={() => handleAddToFavorites(font.family)}>+</button>
                    <button className="btn btn-secondary text-purpur bg-black hover:text-black border-2 border-purpur hover:bg-white rounded-full px-6 h-14 font-bold transition duration-200 ease-in-out" onClick={() => handleDownload(font.variants[2])}>
                      Download
                    </button>

                  </div>
                  </div>
              ))}
            </div>
          )}
        </div>
      )}
      {!loading && (
        <div className="flex justify-center mt-8">
          <button
            className="btn btn-secondary text-purpur bg-black hover:text-black border-2 border-purpur hover:bg-white rounded-full px-6 h-14 font-bold transition duration-200 ease-in-out"
            onClick={handleLoadMoreFonts}
          >
            Load More Fonts
          </button>
        </div>
      )}

      {selectedLanguage == 'اردو' && (
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="bg-transparent border-purpur border-2 p-8 text-right rounded-lg shadow-md hover:text-black flex flex-col justify-between hover:bg-purpur transition duration-200 ease-in-out relative group">
              <div>
                <h1 className="text-3xl group-hover:text-black text-purpur mb-8">فونٹ کا نام</h1>
                <h2 className="text-4xl mb-8">ٹھنڈ میں ایک قحط زدہ گاؤں سے گذرتے وقت ایک چڑچڑےباأثر و فارغ شخص کو بعض جل پری نما اژدہے نظر آئے۔</h2>
              </div>
              <div className="flex justify-between mt-4">
                <button className="btn btn-secondary text-purpur bg-black hover:text-black border-2 border-purpur hover:bg-white rounded-full px-6 h-14 font-bold transition duration-200 ease-in-out">Download</button>
                <button className="btn btn-secondary text-purpur bg-black hover:text-black border-2 border-purpur hover:bg-white rounded-full w-14 h-14 font-bold transition duration-200 ease-in-out">+</button>
              </div>
            </div>
          ))}
        </div>)}
    </div>
  );
};

export default Page;

