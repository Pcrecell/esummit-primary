import React from "react";

function EventCard({ time, date, title, subtitle, onKnowMore }) {
  return (
    <div
      className="w-full max-w-xs md:max-w-md lg:max-w-full mx-auto rounded-[16px] p-px box-border"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0,255,0,0.4), rgba(0,255,0,0.1), rgba(0,255,0,0), rgba(0,255,0,0.3), rgba(0,255,0,0.4), rgba(0,200,0,0.8))",
      }}
    >
      <div className="rounded-[16px] bg-black text-white flex flex-col md:flex-row items-center justify-between p-2 md:p-3 space-y-3 md:space-y-0 md:space-x-3 w-full box-border">
        <div className="flex flex-col items-center md:items-start min-w-[70px]">
          <span className="font-bold text-sm md:text-base">{time}</span>
          <span className="text-xs md:text-sm">{date}</span>
        </div>
        <div className="flex items-center space-x-1 flex-1 min-w-0">
          <div className="hidden md:block w-px h-8 md:h-10 bg-white"></div>
          <div className="flex flex-col text-center md:text-left pl-2 flex-1 min-w-0">
            <div className="flex items-center space-x-1 justify-center md:justify-start mb-1 flex-wrap">
              <div className="hidden md:block w-2 h-2 bg-white rounded-full shrink-0 ml-1"></div>
              <span className="font-bold text-sm md:text-base break-words whitespace-normal flex-1 min-w-0">{title}</span>
            </div>
            <span className="text-xs md:text-sm break-words whitespace-normal">{subtitle}</span>
          </div>
        </div>
        <button
          onClick={onKnowMore}
          className="bg-black text-white py-1 px-3 rounded-[16px] border border-white hover:shadow-[0_0_8px_2px_rgba(255,255,255,0.8)] transition text-xs whitespace-nowrap"
        >
          Know More ↗
        </button>
      </div>
    </div>
  );
}

export default EventCard;