'use client'
import React, { useState, useEffect, useRef } from 'react';



const ResetIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(2 2)">
            <path d="m4.5 1.5c-2.4138473 1.37729434-4 4.02194088-4 7 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8"/>
            <path d="m4.5 5.5v-4h-4"/>
        </g>
    </svg>
);

const TextUnderlineIcon = ({ color, ...props }: { color: string } & React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={color} fill="none" {...props}>
        <path d="M5.5 3V11.5C5.5 15.0899 8.41015 18 12 18C15.5899 18 18.5 15.0899 18.5 11.5V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 21H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const TextItalicIcon = ({ color, ...props }: { color: string } & React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={color} fill="none" {...props}>
        <path d="M12 4H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 20L16 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M5 20H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const TextAlignCenterIcon = ({ color, ...props }: { color: string } & React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={color} fill="none" {...props}>
        <path d="M3 3H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 9H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 15H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 21H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const TextAlignLeftIcon = ({ color, ...props }: { color: string } & React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={color} fill="none" {...props}>
        <path d="M3 3H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 9H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 15H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 21H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const TextAlignRightIcon = ({ color, ...props }: { color: string } & React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={color} fill="none" {...props}>
        <path d="M3 3H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 9H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 15H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 21H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Editor = () => {
    const [randomText, setRandomText] = useState<string>('Add filler text or click here to start typing.');
    const [fontSize, setFontSize] = useState<number>(100);
    const [letterSpacing, setLetterSpacing] = useState<number>(0);
    const [fillerTextAmount, setFillerTextAmount] = useState<number>(0);
    const [isUnderline, setIsUnderline] = useState<boolean>(false);
    const [isItalic, setIsItalic] = useState<boolean>(false);
    const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('center');

    const defaultParagraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet elit nisi. Morbi et dui tempor justo ultrices aliquet sit amet ut turpis. Vivamus aliquam tristique velit, non molestie odio commodo at. Nulla facilisi. Aliquam lobortis ultricies tortor, nec consectetur est. Phasellus sit amet mauris metus. Phasellus aliquam turpis porttitor, iaculis arcu at, porttitor ante. Mauris metus mi, egestas non molestie tempus, imperdiet sit amet diam. Nullam pretium, lorem vel mattis ultrices, diam mauris volutpat purus, eu dignissim mauris odio nec nulla. Aenean consequat ornare gravida. Nam auctor quis ante ut efficitur. Nullam id orci rhoncus, luctus nisl sed, aliquam nisi. Phasellus quis nisi feugiat, hendrerit nulla nec, hendrerit diam. Morbi imperdiet eleifend sapien eleifend tristique. Suspendisse laoreet, odio ac placerat gravida, erat lectus commodo urna, ut malesuada justo nibh a mi. Vivamus vulputate iaculis dui non pretium. Curabitur condimentum nunc enim, a vulputate orci tristique sed. Praesent varius, augue eu sagittis vehicula, mauris risus interdum ex, quis suscipit est est porta nulla. Vivamus mattis, turpis ac efficitur scelerisque, massa nisl ornare lacus, quis viverra erat quam a orci."

    const generateRandomTexts = (wordCount: number): string => {
        const words = defaultParagraph.split(' ');
        return words.slice(0, wordCount).join(' ');
    };

    useEffect(() => {
        setRandomText(generateRandomTexts(fillerTextAmount));
    }, [fillerTextAmount]);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRandomText(event.target.value);
        adjustTextareaHeight();
    };

    const handleReset = () => {
        setRandomText('Add filler text or click here to start typing.');
        setFontSize(100);
        setLetterSpacing(0);
        setFillerTextAmount(0);
        setIsUnderline(false);
        setIsItalic(false);
        setAlignment('center');
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
        adjustTextareaHeight();
    };

    const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFontSize(parseInt(event.target.value));
        adjustTextareaHeight();
    };

    const handleLetterSpacingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLetterSpacing(parseInt(event.target.value));
        adjustTextareaHeight();
    };

    const handleFillerTextAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFillerTextAmount(parseInt(event.target.value));
    };

    const handleAlignmentChange = (alignment: 'left' | 'center' | 'right') => {
        setAlignment(alignment);
    };

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };
    
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.addEventListener('input', adjustTextareaHeight);
        }
        return () => {
            if (textareaRef.current) {
                textareaRef.current.removeEventListener('input', adjustTextareaHeight);
            }
        };
    }, []);

    useEffect(() => {
        adjustTextareaHeight();
    }, [randomText, fontSize, letterSpacing]);

    return (
        <div className="container mx-auto px-8 sm:px-12 md:px-16 xl:px-48 mb-6 pb-8 pt-24">
            <div className="max-w-full mx-auto pb-4">
                <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div className="mb-2 sm:mb-0 sm:flex items-center">
                        <label htmlFor="font-size" className="font-sans text-xs lg:text-md sm:mx-2">Size</label>
                        <input
                            type="range"
                            id="font-size"
                            value={fontSize}
                            onChange={handleFontSizeChange}
                            min="10"
                            max="200"
                            step="1"
                            className="w-full sm:w-30 lg:w-40 h-1  bg-white accent-purpur rounded-full outline-none"
                        />
                    </div>
                    <div className="mb-2 sm:mb-0 sm:flex items-center">
                        <label htmlFor="letter-spacing" className="font-sans text-xs lg:text-md sm:mx-2">Spacing</label>
                        <input
                            type="range"
                            id="letter-spacing"
                            value={letterSpacing}
                            onChange={handleLetterSpacingChange}
                            min="-10"
                            max="10"
                            step="1"
                            className="w-full sm:w-30 lg:w-40 h-1 bg-white accent-purpur rounded-full outline-none"
                        />
                    </div>
                    <div className="mb-2 sm:mb-0 sm:flex items-center">
                        <label htmlFor="filler-text-amount" className="font-sans text-xs lg:text-md sm:mx-2">Text</label>
                        <input
                            type="range"
                            id="filler-text-amount"
                            value={fillerTextAmount}
                            onChange={handleFillerTextAmountChange}
                            min="1"
                            max="200"
                            step="1"
                            className="w-full sm:w-30 lg:w-40 h-1 bg-white accent-purpur rounded-full outline-none"
                        />
                    </div>
                </div>
                <div className="my-6 flex flex-col items-center sm:flex-row justify-center py-2 sm:py-0">
                    
                    <div className="sm:flex sm:justify-center items-center">
                        <div className="sm:w-auto mb-4 sm:mb-0 sm:mr-8">
                            <select
                                className="px-1 py-2 w-full sm:w-auto bg-black border border-white rounded-md focus:outline-none font-sans focus:ring-purpur focus:border-purpur"
                            >
                                <option value="" disabled selected>Select Font Style</option>
                                <option value="Arial">Style 1</option>
                                <option value="Times New Roman">Style 2</option>
                                <option value="Courier New">Style 3</option>
                                {/* Add more font options as needed */}
                            </select>
                        </div>
                        <div className="">
                        <button
                            onClick={() => handleAlignmentChange('left')}
                            className={` mr-2 px-1 py-1 border rounded-sm ${alignment === 'left' ? 'bg-gray-200 text-black' : 'border-gray-200 text-gray-600'}`}
                        >
                            <TextAlignLeftIcon color={alignment === 'left' ? '#000000' : '#ffffff'} />
                        </button>
                        <button
                            onClick={() => handleAlignmentChange('center')}
                            className={`mr-2 px-1 py-1 border rounded-sm ${alignment === 'center' ? 'bg-gray-200 text-black' : 'border-gray-200 text-gray-600'}`}
                        >
                            <TextAlignCenterIcon color={alignment === 'center' ? '#000000' : '#ffffff'} />
                        </button>
                        <button
                            onClick={() => handleAlignmentChange('right')}
                            className={`mr-8 px-1 py-1 border rounded-sm ${alignment === 'right' ? 'bg-gray-200 text-black' : 'border-gray-200 text-gray-600'}`}
                        >
                            <TextAlignRightIcon color={alignment === 'right' ? '#000000' : '#ffffff'} />
                        </button>
                        <button
                            onClick={() => setIsUnderline(!isUnderline)}
                            className={`px-1 py-1 border rounded-sm mr-2 ${isUnderline ? 'bg-gray-200 text-black' : 'border-gray-200 text-gray-600'}`}
                        >
                            <TextUnderlineIcon color={isUnderline ? '#000000' : '#ffffff'} />
                        </button>
                        <button
                            onClick={() => setIsItalic(!isItalic)}
                            className={`px-1 py-1 mr-8 border rounded-sm ${isItalic ? 'bg-gray-200 text-black' : 'border-gray-200 text-gray-600'}`}
                        >
                            <TextItalicIcon color={isItalic ? '#000000' : '#ffffff'} />
                        </button>
                        <button onClick={handleReset} className="hover:bg-white hover:text-black hover:border-white border-purpur bg-purpur text-white px-1 py-1 border-2 rounded-full">
                            <ResetIcon/>
                        </button>
                        </div>
                    </div>
                </div>
            </div>
            <textarea
                ref={textareaRef}
                className="bg-black text-whiterounded-md p-4 w-full resize-none"
                value={randomText}
                onChange={handleTextChange}
                style={{
                    fontSize: `${fontSize}px`,
                    letterSpacing: `${letterSpacing}px`,
                    textDecoration: isUnderline ? 'underline' : 'none',
                    fontStyle: isItalic ? 'italic' : 'normal',
                    textAlign: alignment,
                    minHeight: '100px',
                }}
                rows={1}
            />
        </div>
    );
};

export default Editor;
