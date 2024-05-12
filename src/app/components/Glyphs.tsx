'use client'
import React, { useState } from 'react';

const Glyphs: React.FC =  ({ fontUrls }) => {
    const glyphs = [
        ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // Alphabet (A-Z)
        ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)), // Alphabet (a-z)
        ...Array.from({ length: 10 }, (_, i) => String(i)), // Numbers (0-9)
    ];

    const [hoveredGlyph, setHoveredGlyph] = useState<string>('');

    return (
        <div style={{ fontFamily: `${fontUrls?.fontFamily}, sans-serif` }} className="container mx-auto px-6 xl:px-40 pb-0 mb-o pt-20">
            <div className="flex flex-row justify-center items-start border-2 md:border-0 mx-8">
                <div className="overflow-hidden md:mr-8">
                    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-8 gap-0 md:gap-2 h-full border md:border-0">
                        {glyphs.map((glyph, index) => (
                            <div
                                key={index}
                                className="w-10 h-10 md:h-14 md:w-14 flex md:rounded-md items-center justify-center border border-white hover:text-black hover:bg-white cursor-crosshair"
                                onMouseEnter={() => setHoveredGlyph(glyph)}
                                onMouseLeave={() => setHoveredGlyph('')}
                            >
                                <div className="text-2xl">{glyph}</div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="flex-1 border-0 md:border md:rounded-md md:border-purpur overflow-auto h-[350px] md:h-[500px]">
                    <div className="flex justify-center items-center h-full">
                        <div className="text-11xl md:text-20xl">{hoveredGlyph}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Glyphs;