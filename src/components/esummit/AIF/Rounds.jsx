"use client";
import { useState } from "react";

const FlippableRounds = () => {
  const [activeCards, setActiveCards] = useState({});

  const gameCards = [
    {
      id: "diamonds",
      suit: "diamonds",
      frontType: "overlay",
      overlayImg:
        "https://i.ibb.co/mLjq3xc/0d2df1170f576f8e4fd49e4d18c1031d-removebg-preview-5.png",
      backType: "image",
      contentImg:
        "https://i.ibb.co/8n876k00/Screenshot-2025-07-26-004030-removebg-preview-1.png",
      backText:
        "♢ The Billionaire Buzz-Off: You'll play solo and bid virtual money to answer questions. Make smart decisions to save money and stay in the game.",
    },
    {
      id: "clubs",
      suit: "clubs",
      frontType: "overlay",
      overlayImg:
        "https://i.ibb.co/gMyJ7s8J/9a28829e79ed21c4e74f284fb1557814-t-removebg-preview-1.png",
      backType: "image",
      contentImg:
        "https://i.ibb.co/8n876k00/Screenshot-2025-07-26-004030-removebg-preview-1.png",
      backText:
        "♣ The Idea Forge: You'll team up and pitch an idea. Be quick, clear, and convincing — your teamwork and communication will be key.",
    },
    {
      id: "hearts",
      suit: "hearts",
      frontType: "overlay",
      overlayImg:
        "https://i.ibb.co/gb71bhQr/0d2df1170f576f8e4fd49e4d18c1031d-removebg-preview-3.png",
      backType: "image",
      contentImg:
        "https://i.ibb.co/8n876k00/Screenshot-2025-07-26-004030-removebg-preview-1.png",
      backText:
        "♥ Founder Feud: Now you're on your own. You'll speak on a topic in front of others. This round tests your confidence and clarity.",
    },
    {
      id: "spades",
      suit: "spades",
      frontType: "overlay",
      overlayImg: "https://i.ibb.co/99007PHh/images-removebg-preview-2-1.png",
      backType: "image",
      contentImg:
        "https://i.ibb.co/8n876k00/Screenshot-2025-07-26-004030-removebg-preview-1.png",
      backText:
        "♠ The Founder's Gambit: You'll face a surprise business challenge. Think fast, present a solution, and deal with an unexpected twist.",
    },
  ];

  const flipCard = (cardId) => {
    setActiveCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  // Helper function for suit symbols - kept this from old version
  const getSuitDisplay = (suitName) => {
    const suits = {
      clubs: { symbol: "♣", color: "text-gray-800" },
      hearts: { symbol: "♥", color: "text-red-600" },
      spades: { symbol: "♠", color: "text-gray-800" },
      diamonds: { symbol: "♦", color: "text-red-600" },
    };

    return suits[suitName] || suits.spades;
  };

  const CardFront = ({ card }) => {
    const handleImgError = (e) => {
      e.target.style.display = "none";
      const fallback = e.target.nextElementSibling;
      if (fallback) fallback.style.display = "flex";
    };

    return (
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        {/* Main background */}
        <img
          src="https://i.ibb.co/Qjh4BV7Y/Screenshot-2025-07-26-002748-removebg-preview-2.png"
          alt={`${card.suit} card front`}
          className="w-full h-full object-cover"
          onError={handleImgError}
        />

        {/* Fallback for background */}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-600 text-white text-sm hidden">
          Loading background...
        </div>

        {/* Card suit overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <img
            src={card.overlayImg}
            alt={`${card.suit} symbol`}
            className={`object-contain drop-shadow-2xl ${
              card.suit === "clubs" ? "w-80 h-80" : "w-28 h-28"
            }`}
            onError={handleImgError}
          />

          {/* Fallback for overlay */}
          <div className="absolute inset-0 flex items-center justify-center text-white text-sm hidden">
            Loading symbol...
          </div>
        </div>
      </div>
    );
  };

  const CardBack = ({ card }) => {
    return (
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        {/* Background image */}
        <img
          src={card.contentImg}
          alt={`${card.suit} back content`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            const fallback = e.target.nextElementSibling;
            if (fallback) fallback.style.display = "flex";
          }}
        />

        {/* Fallback for background image */}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-600 text-white text-sm hidden">
          Content loading...
        </div>

        {/* Text overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <p className="text-black text-center text-xs font-medium leading-loose drop-shadow-lg font-['Poppins',sans-serif] max-w-full">
            {card.backText}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className="min-h-screen py-16 px-4 flex flex-col items-center relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/C5xnSp7v/Gemini-Generated-Image-v9fbx9v9fbx9v9fb-1.png')",
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "linear-gradient(to bottom, #011209 0%, rgba(0,0,0,0) 44%, #011209 100%)",
        }}
      />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Header decoration */}
        <div className="flex justify-center mb-8">
          <img
            src="https://i.ibb.co/nsBFDqTV/Gold-rule-lines-and-ornaments-set-for-elegant-design-decorative-elements-separators-Premium-Vector-r.png"
            alt="Decorative header"
            className="w-64 h-auto"
          />
        </div>

        {/* Main title with Cinzel font */}
        <h2
          className="text-5xl md:text-6xl font-bold text-yellow-400 text-center mb-12 tracking-widest drop-shadow-2xl"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          ROUNDS
        </h2>

        {/* Card grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-10 max-w-2xl w-full mx-auto px-4">
          {gameCards.map((card) => {
            const isFlipped = activeCards[card.id];

            return (
              <div
                key={card.id}
                className="h-52 cursor-pointer"
                style={{ perspective: "1000px" }}
                onClick={() => flipCard(card.id)}
              >
                {/* 3D card container */}
                <div
                  className="relative w-full h-full transition-transform duration-700 hover:scale-105"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front side */}
                  <div
                    className="absolute inset-0 w-full h-full shadow-2xl rounded-2xl"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <CardFront card={card} />
                  </div>

                  {/* Back side */}
                  <div
                    className="absolute inset-0 w-full h-full shadow-2xl rounded-2xl"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <CardBack card={card} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FlippableRounds;
