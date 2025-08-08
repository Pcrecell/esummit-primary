"use client";

import React, { useState } from "react";
import img from "../../../../public/images/esummit/footer/logo.png";
import {
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  return (
    <footer className="bg-black text-white z-20">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Mobile Layout */}
        <div className="block md:hidden w-full text-sm space-y-6">
          {/* Mobile: Logo + Info */}
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <Image src={img} alt="E-Summit Logo" className="w-32 h-10 object-contain" />
            </div>
            <h3 className="font-bold uppercase tracking-wider text-sm">
              KIIT E-Cell
            </h3>
          </div>

          {/* Mobile: Useful Links + Initiatives */}
          <div className="flex flex-row w-full gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2 text-green-400 tracking-wider uppercase text-center">
                Useful Links
              </h3>
              <ul className="space-y-3 text-sm text-center">
                <a href="/esummit"><li className="hover:text-green-300">Home</li></a>
                <a href="/aboutus"><li className="hover:text-green-300">About Us</li></a>
                <a href="/gallery"><li className="hover:text-green-300">Gallery</li></a>
                <a href="/contactus"><li className="hover:text-green-300">Contact Us</li></a>
              </ul>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2 text-green-400 tracking-wider uppercase text-center">
                Our Initiatives
              </h3>
              <ul className="space-y-2 text-sm text-center">
                <a href="/esummit">
                  <li className="hover:text-green-200 transition-colors duration-150 cursor-pointer">
                    E-summit
                  </li>
                </a>
                <a href="/i-camp">
                  <li className="hover:text-green-200 transition-colors duration-150 cursor-pointer">
                    I-Camp
                  </li>
                </a>
                <a href="/build-school">
                  <li className="hover:text-green-200 transition-colors duration-150 cursor-pointer mt-1">
                    BuildSchool
                  </li>
                </a>
                <a href="/hult-prize">
                  <li className="hover:text-green-200 transition-colors duration-150 cursor-pointer mt-1">
                    Hult Prize
                  </li>
                </a>
                <a href="/maverick/">
                  <li className="hover:text-green-200 transition-colors duration-150 cursor-pointer mt-1">
                    Maverick
                  </li>
                </a>
              </ul>
            </div>
          </div>

          {/* Mobile: Contact */}
          <div className="text-center">
            <h3 className="text-green-400 font-bold mb-4 text-base uppercase tracking-wider">
              CONTACT
            </h3>
            <div className="space-y-4 text-sm flex flex-col items-center">
              <div className="flex items-start space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-1 ml-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-left">E-cell KIIT<br />Bhubaneswar, Odisha</p>
              </div>
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=pcr.ecell@kiit.ac.in" target="_blank" rel="noopener noreferrer" className="hover:text-green-200">
                  pcr.ecell@kiit.ac.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-24">
          {/* Column 1: Logo & Socials */}
          <div className="space-y-6">
            <div>
              <Image src={img} alt="E-Summit Logo" className="object-contain" />
            </div>
            <div>
              <h4 className="font-medium text-white mb-2 text-sm">Connect with us:</h4>
              <div className="flex space-x-3">
                <a href="https://www.linkedin.com/company/kiit-e-cell/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-400 text-white p-2 rounded-full">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="https://www.instagram.com/ecell_kiit?igsh=amJ6eGR3YXB6ZDhp" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-400 text-white p-2 rounded-full">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="https://www.youtube.com/@KIIT-ECELL" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-400 text-white p-2 rounded-full">
                  <Youtube className="h-4 w-4" />
                </a>
                <a href="https://www.facebook.com/kiitecell" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-400 text-white p-2 rounded-full">
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Initiatives */}
          <div>
            <h3 className="font-bold mb-4 text-base uppercase tracking-wider">
              OUR INITIATIVES
            </h3>
              <ul className="space-y-2 flex flex-col text-sm">
                <a href="/esummit">
                  <li className="hover:text-green-200 transition-colors duration-150 cursor-pointer">
                    E-summit
                  </li>
                </a>
                <a href="/i-camp">
                  <li className="hover:text-green-200 transition-colors duration-150 cursor-pointer">
                    I-Camp
                  </li>
                </a>
                <a href="/build-school">
                  <li className="hover:text-green-200 transition-colors duration-150 cursor-pointer mt-1">
                    BuildSchool
                  </li>
                </a>
                <a href="/hult-prize">
                  <li className="hover:text-green-200 transition-colors duration-150 cursor-pointer mt-1">
                    Hult Prize
                  </li>
                </a>
                <a href="/maverick/">
                  <li className="hover:text-green-200 transition-colors duration-150 cursor-pointer mt-1">
                    Mavericks
                  </li>
                </a>
              </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div>
            <h3 className="font-bold mb-4 text-base uppercase tracking-wider">
              USEFUL LINKS
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/esummit" className="hover:text-green-200">Home</a></li>
              <li><a href="/aboutus" className="hover:text-green-200">About Us</a></li>
              <li><a href="/gallery" className="hover:text-green-200">Gallery</a></li>
              <li><a href="/contactus" className="hover:text-green-200">Contact Us</a></li>
              <li><a href="/tos" className="hover:text-green-200">Terms of Service</a></li>
              <li><a href="/pp" className="hover:text-green-200">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-bold mb-4 text-base uppercase tracking-wider">
              CONTACT
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p>
                  E-cell KIIT<br />Bhubaneswar, Odisha
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=pcr.ecell@kiit.ac.in" target="_blank" rel="noopener noreferrer" className="hover:text-green-200">
                  pcr.ecell@kiit.ac.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-green-500 mt-10 pt-6 text-center text-white/80 text-sm">
          <p>© 2025 Copyright: KIIT E-Cell</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
