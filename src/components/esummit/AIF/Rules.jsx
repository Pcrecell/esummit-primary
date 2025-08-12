import React from "react";

const Rules = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background */}
      <div
        className="relative w-full h-full p-4"
        style={{
          backgroundImage: `url('https://i.ibb.co/Y7LJ8NCb/image-11.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 w-full h-full flex items-center
        justify-center">
        <img
          src="https://i.ibb.co/bjhQqcpX/Rectangle-63.png"
          alt="Background overlay"
          className="w-full h-full object-cover opacity-100"
        />
        </div>
        {/* Main Frame Container - Increased size */}
        <div
          className="relative z-10 w-full h-full flex flex-col justify-center items-center scale-y-110"
          style={{
            backgroundImage: `url('https://i.ibb.co/j96BdzCk/Borde-Fondo-Vintage-Verde-Plantilla-PSD-Descarga-Gratuita-Pikbest-removebg-preview-2.png')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Content Container */}
          <div className="relative z-10 flex flex-col h-full w-full max-w-6xl">
            {/* Red Banner at Top */}
            <div className="flex justify-center -mt-16 pb-8">
              <div className="relative">
                <img
                  src="https://i.ibb.co/RpKdWJps/Three-Kingdoms-Blade-GUI-Art-JH-Kim-removebg-preview-1.png"
                  alt="Rules Banner"
                  className="w-auto max-w-2xl h-auto object-contain"
                />
                {/* Banner Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h1
                    className="text-4xl md:text-5xl font-bold text-center"
                    style={{
                      fontFamily: "Firlest, serif",
                      fontWeight: 700,
                      color: "#BCA13A",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    RULES AND
                  </h1>
                  <h2
                    className="text-4xl md:text-5xl font-bold text-center"
                    style={{
                      fontFamily: "Firlest, serif",
                      fontWeight: 700,
                      color: "#BCA13A",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    REGULATIONS
                  </h2>
                </div>
              </div>
            </div>

            {/* Rules Content Image */}
            <div className="flex-1 flex items-center justify-center px-8 py-6 -mt-36">
              <div className="w-full max-w-xl flex justify-center">
                <img
                  src="https://i.ibb.co/RkNfXpV0/1-Only-registered-participants-may-compete-2-Be-on-time-latecomers-will-be-disqualified-3-Maintain-d.png"
                  alt="Rules and Regulations Content"
                  className="w-auto h-auto max-w-xs object-contain drop-shadow-lg"
                  style={{
                    filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
                  }}
                />
              </div>
            </div>

            {/* Playing Cards at Bottom of Frame */}
            <div className="flex justify-center -mt-12 pb-12">
              <img
                src="https://i.ibb.co/QvgrcWjC/1000138557-1-1-1.png"
                alt="Playing Cards"
                className="w-auto h-24 md:h-28 object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
