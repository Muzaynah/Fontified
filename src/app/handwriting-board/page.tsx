"use client";
import React, { useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import Nav from "../components/Navbar";

const PenIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#ffffff"}
    fill={"none"}
    {...props}
  >
    <path
      d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 20H17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const EraserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#ffffff"}
    fill={"none"}
    {...props}
  >
    <path
      d="M8.73792 7.78021L4.84693 11.7574C3.67722 12.953 3.09236 13.5508 3.01263 14.2802C2.99579 14.4343 2.99579 14.5899 3.01263 14.744C3.09236 15.4733 3.67722 16.0711 4.84693 17.2668L4.99601 17.4191C5.62049 18.0575 5.93274 18.3766 6.30638 18.5911C6.5236 18.7157 6.75482 18.8134 6.99505 18.882C7.40827 19 7.85149 19 8.73792 19C9.62436 19 10.0676 19 10.4808 18.882C10.721 18.8134 10.9522 18.7157 11.1695 18.5911C11.5431 18.3766 11.8554 18.0575 12.4798 17.4191L15.3239 14.5121M8.73792 7.78021L12.3199 4.12313C13.7065 2.70754 14.3997 1.99974 15.2627 2C16.1256 2.00026 16.8185 2.70846 18.2042 4.12487L18.9473 4.8845C20.3159 6.28342 21.0002 6.98288 21 7.85008C20.9997 8.71728 20.315 9.41633 18.9456 10.8144L15.3239 14.5121M8.73792 7.78021L15.3239 14.5121"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 22L21 22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UndoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#ffffff"}
    fill={"none"}
    {...props}
  >
    <path
      d="M20 21V18.9231C20 16.9221 20 15.9217 19.8547 15.0846C19.0547 10.4765 15.0934 6.86243 10.0426 6.13259C9.12509 6 7.19318 6 5 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 3C6.39316 3.58984 4 5.15973 4 6C4 6.84027 6.39316 8.41016 7 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ColorPickerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#e1e1e1"}
    fill={"none"}
    {...props}
  >
    <path
      d="M13.435 7L7.15915 13.2759M7.15915 13.2759L4.82728 15.6077C3.92569 16.5093 3.47489 16.9601 3.23745 17.5334C3 18.1066 3 18.7441 3 20.0192V21H3.98082C5.25586 21 5.89338 21 6.46663 20.7626C7.03988 20.5251 7.49068 20.0743 8.39227 19.1727L14.2891 13.2759M7.15915 13.2759H14.2891M14.2891 13.2759L17 10.565"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.2087 8.38869L20.82 10M19.2087 8.38869L20.0705 7.52682C20.363 7.23431 20.5093 7.08805 20.611 6.94529C21.1297 6.21676 21.1297 5.23953 20.611 4.511C20.5093 4.36824 20.363 4.22198 20.0705 3.92947C19.778 3.63697 19.6318 3.4907 19.489 3.38905C18.7605 2.87032 17.7832 2.87032 17.0547 3.38905C16.912 3.4907 16.7657 3.63695 16.4732 3.92947L15.6113 4.79133M19.2087 8.38869L15.6113 4.79133M14 3.18002L15.6113 4.79133"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const RedoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#ffffff"}
    fill={"none"}
    {...props}
  >
    <path
      d="M4 21V18.9231C4 16.9221 4 15.9217 4.14533 15.0846C4.94529 10.4765 8.90656 6.86243 13.9574 6.13259C14.8749 6 16.8068 6 19 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 3C17.6068 3.58984 20 5.15973 20 6C20 6.84027 17.6068 8.41016 17 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DrawingBoard: React.FC = () => {
  const canvasRef = useRef<any>();
  const [selectedTool, setSelectedTool] = useState("pen");
  const [brushColor, setBrushColor] = useState("#ff0000"); // Default brush color is red

  const handleExportPNG = () => {
    if (canvasRef.current) {
      canvasRef.current
        .exportImage("png")
        .then((data: string) => {
          // Create a download link for the PNG image
          const link = document.createElement("a");
          link.href = data;
          link.download = "sketch.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error: Error) => {
          console.error("Error exporting PNG:", error);
        });
    }
  };

  const handleColorChange = (color: string) => {
    setBrushColor(color);
  };

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

  return (
    <div className="bg-black text-white  min-h-screen">
      <Nav />
      <div className="flex flex-col items-center justify-center py-12 px-8 lg:px-4">
        <h1 className="text-4xl font-bold mb-12">Custom Drawing Board</h1>
        <div className="w-full lg:max-w-screen-lg">
          <ReactSketchCanvas
            ref={canvasRef}
            strokeWidth={5}
            strokeColor={brushColor}
            canvasColor="transparent"
            exportWithBackgroundImage={false}
            height="500px"
            width="100%"
          />
          <div className="flex justify-center space-x-2 mt-4">
            <div>
              <button
                className={`border-2 border-purpur hover:bg-purpur text-white px-2 py-1 rounded-full lg:w-auto ${
                  selectedTool === "pen" ? "bg-purpur" : ""
                }`}
                onClick={switchToPenMode}
              >
                <PenIcon />
              </button>
              <button
                className={`border-2 border-purpur hover:bg-purpur text-white px-2 py-1 rounded-full lg:w-auto ${
                  selectedTool === "eraser" ? "bg-purpur" : ""
                }`}
                onClick={switchToEraserMode}
              >
                <EraserIcon />
              </button>
              <button
                className="border-2 border-purpur hover:bg-purpur text-white px-2 py-1 rounded-full lg:w-auto"
                onClick={undo}
              >
                <UndoIcon />
              </button>
              <button
                className="border-2 border-purpur hover:bg-purpur text-white px-2 py-1 rounded-full lg:w-auto"
                onClick={redo}
              >
                <RedoIcon />
              </button>
              <div className="flex items-center border-2 border-purpur rounded-full px-2 py-1 lg:w-auto">
                <ColorPickerIcon />
                <div className="relative ml-2">
                  <input
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    type="color"
                    value={brushColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                  />
                  <button
                    className="h-6 w-6 rounded-full"
                    style={{ backgroundColor: brushColor }}
                  ></button>
                </div>
              </div>
              <button
                className="border-2 border-purpur hover:bg-purpur text-white px-2 py-1 rounded-full lg:w-auto"
                onClick={handleExportSVG}
              >
                Export SVG
              </button>
              <button
                className="border-2 border-purpur hover:bg-purpur text-white px-2 py-1 rounded-full lg:w-auto"
                onClick={handleExportPNG}
              >
                Export PNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingBoard;
