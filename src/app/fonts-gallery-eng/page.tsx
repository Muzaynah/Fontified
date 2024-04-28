'use client'
import React, { useState, useEffect } from 'react';
import ProfileImg from '../components/profileimage';
import Circle from '../components/Circle';

const Page: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState("All");
  const [windowWidth, setWindowWidth] = useState<number>(1024);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
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

  const shouldStackButtons = windowWidth < 600;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
                <a href="#" className="nav-link">Browse Fonts</a>
              </li>
              <li className="text-sm hover:bg-white hover:text-black px-4 py-2 rounded-full border-2">
                <a href="#" className="nav-link">Handwriting</a>
              </li>
              <li className="text-sm hover:bg-white hover:text-black px-4 py-2 rounded-full border-2">
                <a href="#" className="nav-link">Editor</a>
              </li>
              {!shouldStackButtons && (
                <ProfileImg/>
              )}
            </ul>
          )}
        </div>
        {isMenuOpen && (<div className="lg:hidden w-64 fixed top-0 right-0 h-full bg-black text-white transition-transform transform -translate-x-0 ease-in-out z-10">
        <div className="relative px-10 pt-24 text-right justify-right items-right">
          <ul className="pl-0">
            <li className="text-md pt-4 px-2 hover:text-purpur">
              <span className="border-b border-white block pb-4">Browse Fonts</span>
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

      {selectedLanguage=='English'&&(

      <div className={`container mx-auto text-purpur ${shouldStackButtons ? 'w-40' : 'w-auto'} ${shouldStackButtons ? 'flex flex-col space-y-4 items-center pb-8' : 'flex justify-center space-x-4 pb-12'}`}>
        <button 
          className={`btn transition duration-200 ease-in-out btn-secondary ${selectedButton === "All" ? "bg-purpur text-white border-2 border-purpur" : "hover:bg-purpur hover:text-white border-2 border-purpur"} rounded-full px-6 py-3 text-lg h-12 flex items-center justify-center`}
          onClick={() => handleButtonClick("All")}
        >
          All
        </button>
        <button 
          className={`btn transition duration-200 ease-in-out btn-secondary ${selectedButton === "Serif" ? "bg-purpur text-white border-2 border-purpur" : "hover:bg-purpur hover:text-white border-2 border-purpur"} rounded-full px-6 py-3 text-lg h-12 flex items-center justify-center`}
          onClick={() => handleButtonClick("Serif")}
        >
          Serif
        </button>
        <button 
          className={`btn transition duration-200 ease-in-out btn-secondary ${selectedButton === "Sans Serif" ? "bg-purpur text-white border-2 border-purpur" : "hover:bg-purpur hover:text-white border-2 border-purpur"} rounded-full px-6 py-3 text-lg h-12 flex items-center justify-center`}
          onClick={() => handleButtonClick("Sans Serif")}
        >
          Sans Serif
        </button>
        <button 
          className={`btn transition duration-200 ease-in-out btn-secondary ${selectedButton === "Monospaced" ? "bg-purpur text-white border-2 border-purpur" : "hover:bg-purpur hover:text-white border-2 border-purpur"} rounded-full px-6 py-3 text-lg h-12 flex items-center justify-center`}
          onClick={() => handleButtonClick("Monospaced")}
        >
          Monospaced
        </button>
      </div>
      )}

      {selectedLanguage=='English' && (
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="bg-transparent border-purpur border-2 p-6 rounded-lg shadow-md hover:text-black flex flex-col justify-between hover:bg-purpur transition duration-200 ease-in-out relative group">
            <div>
              <h1 className="text-2xl group-hover:text-black text-purpur mb-4">Font Name</h1>
              <h2 className="text-3xl mb-4">The quick brown fox jumps over a lazy dog</h2>
              <p className=" text-lg mb-6">By [name]</p>
            </div>
            <div className="flex justify-between mt-4">
              <button className="btn btn-secondary text-purpur bg-black hover:text-black border-2 border-purpur hover:bg-white rounded-full w-14 h-14 font-bold transition duration-200 ease-in-out">+</button>
              <button className="btn btn-secondary text-purpur bg-black hover:text-black border-2 border-purpur hover:bg-white rounded-full px-6 h-14 font-bold transition duration-200 ease-in-out">Download</button>
            </div>
          </div>
        ))}
      </div>)}

      {selectedLanguage=='اردو' && (
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