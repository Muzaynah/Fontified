'use client'
import React, { useState } from 'react';

import Nav from '../components/Navbar'

const DeleteIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"currentColor"} fill={"none"} {...props}>
      <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={48} height={48} color={"#ffffff"} fill={"none"} {...props}>
      <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14.75 9.5C14.75 11.0188 13.5188 12.25 12 12.25C10.4812 12.25 9.25 11.0188 9.25 9.5C9.25 7.98122 10.4812 6.75 12 6.75C13.5188 6.75 14.75 7.98122 14.75 9.5Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.49994 19.0001L6.06034 18.0194C6.95055 16.4616 8.60727 15.5001 10.4016 15.5001H13.5983C15.3926 15.5001 17.0493 16.4616 17.9395 18.0194L18.4999 19.0001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  

const ProfilePage: React.FC = () => {
    const [profileData] = useState({
        name: 'Muzaynah Farrukh',
        email: 'muzaynah19@example.com',
    });

    const [favorites, setFavorites] = useState<string[]>(['Favorite Font 1', 'Favorite Font 2', 'Favorite Font 3']);

    const removeFavorite = (index: number) => {
        const updatedFavorites = favorites.filter((_, idx) => idx !== index);
        setFavorites(updatedFavorites);
    };

    return (
        <div className="bg-black text-white min-h-screen relative">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-3/4 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-transparent to-fuchsia-300 w-full opacity-50% h-full rounded-full blur-[250px] z-0"></div>
            </div>
            <Nav />
            <div className="container border-2 z-10 rounded-lg my-16 flex-col flex items-center justify-center text-center mx-auto sm:w-full lg:w-2/3 pt-12 p-12 bg-black/60 relative">
                <div className="mb-4">
                    <UserIcon />
                </div>
                <h1 className="text-4xl mb-2">
                    <span className="font-bold"></span> {profileData.name}
                </h1>
                <div className="mb-12">
                    <p className="text-lg">
                        <span className="font-bold"></span> {profileData.email}
                    </p>
                </div>
                <div className="mb-12 w-full">
                    <h2 className="text-3xl mb-8">Favorited Fonts</h2>
                    <ul>
                        {favorites.map((favorite, index) => (
                            <li key={index} className="flex justify-between items-center border-2 border-purpur hover:border-white hover:bg-white hover:text-black text-purpur rounded-md px-4 py-2 mb-4">
                                <span>{favorite}</span>
                                <button
                                    className="text-black hover:text-red-500 text-xl text-bold"
                                    onClick={() => removeFavorite(index)}
                                >
                                    <DeleteIcon />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <button
                        className="hover:text-black text-lg hover:bg-white border-2 border-white text-white py-2 px-4 rounded-full"
                        onClick={() => console.log('Logout clicked')}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
    
};

export default ProfilePage;
