"use client";

import React, { useRef, useEffect } from "react";

const Popup = ({ imageUrl, onClose, children }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black/70 z-9999">
     <div
  ref={modalRef}
  className="relative w-[90%] max-w-md rounded-2xl shadow-lg flex items-center justify-center"
  style={{
    height: "400px", // add height so image is fully visible
    backgroundImage: `url("https://i.postimg.cc/N0tMvzMp/Asset-3.png")`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
     <img
          src={"https://i.postimg.cc/9QghJg9D/Asset-2.png"} 
          alt="Close"
          className="absolute top-12 -right-4 w-16 h-16 cursor-pointer"
          onClick={onClose}
        />
  <div className="text-white text-center text-lg font-bold">
    Payment Coming Soon
  </div>
</div>

    </div>
  );
};

export default Popup;
