'use client'
import React, { useRef, useState, useEffect } from 'react';
import ProfileImg from '../components/profileimage';
import { ReactSketchCanvas } from "react-sketch-canvas";

const PenIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"none"} {...props}>
      <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 20H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

const EraserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"none"} {...props}>
      <path d="M8.73792 7.78021L4.84693 11.7574C3.67722 12.953 3.09236 13.5508 3.01263 14.2802C2.99579 14.4343 2.99579 14.5899 3.01263 14.744C3.09236 15.4733 3.67722 16.0711 4.84693 17.2668L4.99601 17.4191C5.62049 18.0575 5.93274 18.3766 6.30638 18.5911C6.5236 18.7157 6.75482 18.8134 6.99505 18.882C7.40827 19 7.85149 19 8.73792 19C9.62436 19 10.0676 19 10.4808 18.882C10.721 18.8134 10.9522 18.7157 11.1695 18.5911C11.5431 18.3766 11.8554 18.0575 12.4798 17.4191L15.3239 14.5121M8.73792 7.78021L12.3199 4.12313C13.7065 2.70754 14.3997 1.99974 15.2627 2C16.1256 2.00026 16.8185 2.70846 18.2042 4.12487L18.9473 4.8845C20.3159 6.28342 21.0002 6.98288 21 7.85008C20.9997 8.71728 20.315 9.41633 18.9456 10.8144L15.3239 14.5121M8.73792 7.78021L15.3239 14.5121" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 22L21 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const UndoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"none"} {...props}>
      <path d="M20 21V18.9231C20 16.9221 20 15.9217 19.8547 15.0846C19.0547 10.4765 15.0934 6.86243 10.0426 6.13259C9.12509 6 7.19318 6 5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 3C6.39316 3.58984 4 5.15973 4 6C4 6.84027 6.39316 8.41016 7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const RedoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"none"} {...props}>
      <path d="M4 21V18.9231C4 16.9221 4 15.9217 4.14533 15.0846C4.94529 10.4765 8.90656 6.86243 13.9574 6.13259C14.8749 6 16.8068 6 19 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 3C17.6068 3.58984 20 5.15973 20 6C20 6.84027 17.6068 8.41016 17 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

const Page: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState("All");
  const [windowWidth, setWindowWidth] = useState<number>(1024);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const canvasRef = useRef<any>();
  const [selectedTool, setSelectedTool] = useState("pen");


  const handleExportSVG = () => {
    if (canvasRef.current) {
      canvasRef.current
        .exportSvg()
        .then((svg: string) => {
          const blob = new Blob([svg], { type: "image/svg+xml" });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "sketch.svg";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch((error: Error) => {
          console.error("Error exporting SVG:", error);
        });
    }
  };

  const switchToPenMode = () => {
    if (canvasRef.current) {
      canvasRef.current.eraseMode(false);
      setSelectedTool("pen");
    }
  };

  const switchToEraserMode = () => {
    if (canvasRef.current) {
      canvasRef.current.eraseMode(true);
      setSelectedTool("eraser");
    }
  };

  const undo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  };

  const redo = () => {
    if (canvasRef.current) {
      canvasRef.current.redo();
    }
  };

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
        {isMenuOpen && (
        <div className="lg:hidden w-64 fixed top-0 right-0 h-full bg-black text-white transition-transform transform -translate-x-0 ease-in-out z-10">
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

      {/*slider
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
      */}

      <div className={`container mx-auto px-4 ${shouldStackButtons ? 'py-10' : 'pt-14 pb-16'} text-center`}>
        <h1 className="text-4xl font-bold">Turn your Handwriting to a Typeface</h1>
      </div>

      <div className="flex flex-col items-center justify-center">
      <ReactSketchCanvas
        ref={canvasRef}
        strokeWidth={5}
        strokeColor="white"
        canvasColor="transparent"
        exportWithBackgroundImage={false}
        height="400px"
        width="600px"
      />
      <div className="flex justify-center mt-4 space-x-4">
        <button
          className={`border-2 border-purpur hover:bg-purpur text-white px-4 py-2 rounded-full ${selectedTool === "pen" ? "bg-purpur" : ""}`}
          onClick={switchToPenMode}
        >
          <PenIcon/>
        </button>
        <button
          className={`border-2 border-purpur hover:bg-purpur text-white px-4 py-2 rounded-full ${selectedTool === "eraser" ? "bg-purpur" : ""}`}
          onClick={switchToEraserMode}
        >
          <EraserIcon/>
        </button>
        <button
          className="border-2 border-purpur hover:bg-purpur text-white px-4 py-2 rounded-full"
          onClick={undo}
        >
          <UndoIcon/>
        </button>
        <button
          className="border-2 border-purpur hover:bg-purpur text-white px-4 py-2 rounded-full"
          onClick={redo}
        >
          <RedoIcon/>
        </button>
      </div>
      <button
        className="border-2 border-white hover:bg-white text-white hover:text-black mt-8 px-6 py-2 rounded-full"
        onClick={handleExportSVG}
      >
        Export SVG
      </button>
    </div>

    </div>
  );
};

export default Page;