'use client'
import React, { useState } from 'react';
import Image from 'next/image';

const ProfileImg = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Define your image URLs
  const defaultImageUrl = '/assets/profile.png';
  const hoverImageUrl = '/assets/profilehover.png';

  return (
    <li 
      className="text-sm bg-white hover:bg-white hover:text-black rounded-full border-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href="#" className="nav-link">
        <Image 
          src={isHovered ? hoverImageUrl : defaultImageUrl} 
          alt="Profile Icon" 
          width={35} 
          height={35} 
        />
      </a>
    </li>
  );
};

export default ProfileImg;
