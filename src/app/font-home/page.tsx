'use client'

import React, { useState, useEffect } from 'react';
import Editor from '../components/Editor';
import Glyphs from '../components/Glyphs';


const ResetIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(2 2)">
            <path d="m4.5 1.5c-2.4138473 1.37729434-4 4.02194088-4 7 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8"/>
            <path d="m4.5 5.5v-4h-4"/>
        </g>
    </svg>
);

const filledSVG = (
    <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h256v256H0z"></path><path d="M176 32a60 60 0 0 0-48 24A60 60 0 0 0 20 92c0 71.9 99.9 128.6 104.1 131a7.8 7.8 0 0 0 3.9 1 7.6 7.6 0 0 0 3.9-1 314.3 314.3 0 0 0 51.5-37.6C218.3 154 236 122.6 236 92a60 60 0 0 0-60-60Z" fill="#7c54c7" class="fill-000000"></path></svg>
  );
  
  const unfilledSVG = (
    <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h256v256H0z"></path><path d="M128 216S28 160 28 92a52 52 0 0 1 100-20h0a52 52 0 0 1 100 20c0 68-100 124-100 124Z" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" class="stroke-000000"></path></svg>
  );

const Page: React.FC = () => {
    const [isBold, setIsBold] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [showPrompts, setShowPrompts] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false); // State to track favorite icon status

    // Function to toggle favorite icon status
    const toggleFavorite = () => {
        setIsFavorite(prevIsFavorite => !prevIsFavorite);
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
        setTextInput('');
        setShowPrompts(true);
    };

    return (
        <div id="top" className=" bg-black text-white min-h-screen pb-60">
            <div className="sticky top-0 z-50 mx-8 px-12 py-8 flex justify-center gap-2 items-center">
                <a href="#editor" className="text-sm bg-black hover:bg-white hover:text-black text-purpur hover:border-white border-purpur px-4 py-2 rounded-full border-2">
                    Tester
                </a>
                <a href="#glyphs" className="text-sm bg-black hover:bg-white hover:text-black px-4 py-2 rounded-full border-2 text-purpur hover:border-white border-purpur ">
                    Glyphs
                </a>
                <a href="#styles" className="text-sm bg-black hover:bg-white hover:text-black px-4 py-2 rounded-full border-2 text-purpur hover:border-white border-purpur ">
                    Styles
                </a>
                <a href="#top" className="text-sm bg-black hover:bg-white hover:text-black px-4 py-2 rounded-full border-2 text-purpur hover:border-white border-purpur ">
                    Top
                </a>
            </div>
            <div className="container mx-auto px-12 pt-6 pb-20 text-center">
                <div className="text-white text-7xl md:text-8xl lg:text-9xl mb-10">Font Name</div>
                <div className="flex justify-center items-center">
                <button className="text-xl hover:text-purpur w-12 h-12 rounded-full mr-4 border-white text-white" onClick={toggleFavorite}>
                        {isFavorite ? filledSVG : unfilledSVG}
                    </button>
                <button className="text-xl hover:text-purpur hover:border-purpur border-2 px-4 h-12 rounded-full border-white text-white">
                Download
                </button>
                </div>
            </div>

            <div className="container mx-auto px-16 text-center">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 rounded-lg shadow-md border-2 border-purpur lg:border-0">
                    <div className="lg:border-2 rounded-lg lg:border-purpur p-8 flex flex-col justify-center">
                        <div className="text-5xl text-left">This is a generic heading.</div>
                    </div>
                    <div className="lg:border-2 rounded-lg lg:border-purpur h-52 lg:h-auto flex flex-col justify-center">
                        <div className={`text-10xl ${isBold ? 'font-bold' : 'font-normal'} transition-all duration-[3000ms]`}>
                            Aa
                        </div>
                    </div>
                    <div className="lg:border-2 rounded-lg lg:border-purpur p-8 flex flex-col justify-center">
                        <p className="text-md text-right">This is a generic paragraph meant to illustrate how the font will appear in regular text. Choosing the right typeface is crucial for conveying your message effectively. Whether it's for a website, brochure, or document, the font plays a significant role in readability and visual appeal.</p>
                    </div>
                </div>
            </div>

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
                        onClick={handleReset}>
                            <ResetIcon/>
                    </button>
                </div>

                <table className="mx-auto mt-4 border-separate border-spacing-4 text-2xl rounded-md text-left w-full text-white border-purpur border-2">
                    <tbody>
                        <tr className="">
                            <td>{textInput || 'This is Style 1'}</td>
                        </tr>
                        <tr className="">
                            <td>{textInput || 'This is Style 2'}</td>
                        </tr>
                        <tr className="">
                            <td>{textInput || 'This is Style 3'}</td>
                        </tr>
                        <tr className="">
                            <td>{textInput || 'This is Style 4'}</td>
                        </tr>
                        {/* Add more rows for additional styles */}
                    </tbody>
                </table>
            </div>

            <div id="glyphs">
                <Glyphs />
            </div>
            <div id="editor">
                <Editor />
            </div>
        </div>
    );
};

export default Page;
