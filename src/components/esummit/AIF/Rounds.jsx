"use client";
import { useState } from "react";

const FlippableRounds = () => {
  const [flippedCards, setFlippedCards] = useState({});

  const cards = [
    {
      id: "diamonds",
      frontType: "overlay",
      overlayImage:
        "https://i.ibb.co/mLjq3xc/0d2df1170f576f8e4fd49e4d18c1031d-removebg-preview-5.png",
      backType: "image",
      backImage:
        "https://i.ibb.co/8n876k00/Screenshot-2025-07-26-004030-removebg-preview-1.png",
    },
    {
      id: "clubs",
      frontType: "overlay",
      overlayImage:
        "https://i.ibb.co/gMyJ7s8J/9a28829e79ed21c4e74f284fb1557814-t-removebg-preview-1.png",
      backType: "image",
      backImage:
        "https://i.ibb.co/8n876k00/Screenshot-2025-07-26-004030-removebg-preview-1.png",
    },
    {
      id: "hearts",
      frontType: "overlay",
      overlayImage:
        "https://i.ibb.co/gb71bhQr/0d2df1170f576f8e4fd49e4d18c1031d-removebg-preview-3.png",
      backType: "image",
      backImage:
        "https://i.ibb.co/8n876k00/Screenshot-2025-07-26-004030-removebg-preview-1.png",
    },
    {
      id: "spades",
      frontType: "overlay",
      overlayImage: "https://i.ibb.co/99007PHh/images-removebg-preview-2-1.png",
      backType: "image",
      backImage:
        "https://i.ibb.co/8n876k00/Screenshot-2025-07-26-004030-removebg-preview-1.png",
    },
  ];

  const handleCardFlip = (cardId) => {
    setFlippedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const renderSuit = (suit) => {
    const suitConfig = {
      clubs: { symbol: "♣", color: "text-gray-800" },
      hearts: { symbol: "♥", color: "text-red-600" },
      spades: { symbol: "♠", color: "text-gray-800" },
      diamonds: { symbol: "♦", color: "text-red-600" },
    };

    const config = suitConfig[suit];

    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
        <span className={`text-8xl font-bold drop-shadow-2xl text-white`}>
          {config.symbol}
        </span>
      </div>
    );
  };

  const renderCardFront = (card) => {
    return (
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        {/* Background Image - new front image for all cards */}
        <img
          src="https://i.ibb.co/Qjh4BV7Y/Screenshot-2025-07-26-002748-removebg-preview-2.png"
          alt={`${card.id} front background`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gray-600 text-white text-sm hidden">
          Background Loading...
        </div>

        {/* Overlay Image */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <img
            src={card.overlayImage}
            alt={`${card.id} overlay`}
            className={`object-contain drop-shadow-2xl ${card.id === "clubs" ? "w-80 h-80" : "w-28 h-28"}`}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-white text-sm hidden">
            Overlay Loading...
          </div>
        </div>
      </div>
    );
  };

  const renderCardBack = (card) => {
    return (
      <div className="w-full h-full overflow-hidden rounded-2xl">
        <img
          src={card.backImage}
          alt={`${card.id} content`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gray-600 text-white text-sm hidden">
          Image Loading...
        </div>
      </div>
    );
  };

  return (
    <section
      className="min-h-screen py-16 px-4 flex flex-col items-center"
      style={{ backgroundColor: "#011209" }}
    >
      {/* Decorative Header Image */}
      <div className="w-full max-w-md mb-8">
        <img
          src="https://i.ibb.co/nsBFDqTV/Gold-rule-lines-and-ornaments-set-for-elegant-design-decorative-elements-separators-Premium-Vector-r.png"
          alt="Ornate decorative header"
          className="w-full h-auto object-contain"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>

      {/* Title */}
      <h2 className="text-5xl md:text-6xl font-bold text-yellow-500 text-center mb-12 tracking-widest drop-shadow-2xl">
        ROUNDS
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-10 max-w-2xl w-full mx-auto px-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="h-52 cursor-pointer"
            style={{ perspective: "1000px" }}
            onClick={() => handleCardFlip(card.id)}
          >
            {/* Card Container */}
            <div
              className="relative w-full h-full transition-transform duration-700 hover:scale-105"
              style={{
                transformStyle: "preserve-3d",
                transform: flippedCards[card.id]
                  ? "rotateY(180deg)"
                  : "rotateY(0deg)",
              }}
            >
              {/* Front Face */}
              <div
                className="absolute inset-0 w-full h-full shadow-2xl rounded-2xl"
                style={{ backfaceVisibility: "hidden" }}
              >
                {renderCardFront(card)}
              </div>

              {/* Back Face */}
              <div
                className="absolute inset-0 w-full h-full shadow-2xl rounded-2xl"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                {renderCardBack(card)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FlippableRounds;
