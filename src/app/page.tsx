'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Circle from './components/Circle';
import AuthenticationPopup from './components/AuthenticationPopup';


export default function Home() {

  const [imageLoaded, setImageLoaded] = useState(false);
  const [blurIntensity, setBlurIntensity] = useState(15);
  const [loaded, setLoaded] = useState(false);
  const [hideScrollbar, setHideScrollbar] = useState(true); // State to control scrollbar visibility

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



      
    <main className={`flex min-h-screen flex-col items-center justify-between p-14 ${hideScrollbar ? 'overflow-y-hidden' : ''}`}>
    <Circle circleColor="#380356" radius={250} />
    <AuthenticationPopup/>
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="relative h-full">
          <div className="absolute -top-3/4 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-transparent to-fuchsia-300 w-full opacity-50% h-full rounded-full blur-[250px]"></div>
        </div>
      </div>
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-xs lg:flex">
        
        <p className="fixed lg:hidden left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <Image src="/assets/fontified.png" alt="Logo" width={200} height={100} />
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
      <div>
        <div className="relative lg:mt-28 z-1 hidden lg:block flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <div className="relative">
              <div className="transition-all" style={{ filter: `blur(${blurIntensity}px)` }}>
                <Image src="/assets/fontified.png" alt="Logo" width={950} height={100} onLoad={() => setImageLoaded(true)} />
              </div>
            </div>
        </div>
        <div className={`flex mt-24 mb-12 lg:mb-10 lg:mt-2 justify-center flex-col lg:flex-row gap-4 transform-gpu ${
          loaded ? 'opacity-100' : 'opacity-0'
          } transition-all duration-300 ease-in-out`}
          style={{ transitionDuration: '1s',
          transitionDelay: '2s',
          }}
        >
            <Link
            href="loginpage"
            target="_blank"
            >
              <button className="text-lg hover:text-black hover:bg-white hover:border-white border-2 w-28 py-1 border-opacity-30 border-purpur rounded-md">
                <p className="">Login</p>
              </button>
            </Link>
            <Link
            href="register"
            target="_blank"
            >
              <button className="text-lg hover:text-black hover:bg-white hover:border-white border-2 w-28 py-1 border-opacity-30 border-purpur rounded-md">
                <p className="">Sign Up</p>
              </button>
            </Link>
        </div>
      </div>
      

      <div className={`mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl gap-4 lg:grid-cols-3 lg:text-left
      transform-gpu ${
        loaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        } transition-all duration-200 ease-in-out`}
        style={{ transitionDuration: '2s', 
        transitionDelay: '1s'
        }}
        
      >
        <Link
          href="fonts-gallery-eng"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
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
            Explore our vast collection of english and urdu fonts. 
          </p>
        </Link>

        <Link
          href=""
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Handwriting Font{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Turn your handwriting into a font 
          </p>
        </Link>

        <Link
          href=""
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
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
            Use your handwriting to type 
          </p>
        </Link>

      </div>
    </main>
  );
}