import React, { useState } from "react";

const AuthenticationPopup: React.FC = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleCardClick = async () => {
    try {
      // Redirect to the login page
      window.location.href = "/login"; // Corrected URL format
    } catch (error) {
      console.error("Error handling card click:", error);
      // Handle error here
    }
  };

  const handleCardClick1 = async () => {
    try {
      // Redirect to the signup page
      window.location.href = "/signup"; // Corrected URL format
    } catch (error) {
      console.error("Error handling card click:", error);
      // Handle error here
    }
  };

  return (
    <>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
          <div className="container flex flex-col items-center m-12">
            <div className="border bg-black/90 z-10 flex flex-col w-full sm:w-3/4 md:w-2/3 lg:w-1/2 rounded-lg py-12 px-12 lg:py-16 lg:px-16 relative">
              <button
                className="absolute top-0 right-0 mt-4 mr-4 text-white"
                onClick={handleClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.293 3.293a1 1 0 0 1 1.414 0L10 8.586l5.293-5.293a1 1 0 1 1 1.414 1.414L11.414 10l5.293 5.293a1 1 0 0 1-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L8.586 10 3.293 4.707a1 1 0 0 1 0-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="items-left text-left flex-col flex mb-8">
                <h1 className="text-3xl mb-6">
                  You need an account to access this feature
                </h1>
                <h1 className="text-sm">
                  Sign up now or login if you already have an account to
                  continue.
                </h1>
              </div>

              <div className="w-full flex flex-col gap-3 flex justify-between items-center text-purpur rounded-md">
                <button
                  className="border-purpur hover:border-white text-purpur hover:text-white w-full bg-transparent border rounded-full px-4 py-1"
                  onClick={handleCardClick1}
                >
                  Signup
                </button>
                <button
                  className="border-purpur hover:border-white text-purpur text-center hover:text-white w-full bg-transparent border rounded-full px-4 py-1"
                  onClick={handleCardClick} // Corrected onClick handler
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthenticationPopup;
