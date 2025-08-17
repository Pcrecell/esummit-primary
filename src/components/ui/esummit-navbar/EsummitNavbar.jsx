"use client";
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../../ui/esummit-navbar/Esummit-resized";
import { useState, useEffect } from "react";
import { authAPI } from "@/lib/services/api.js";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";

export default function EsummitNavbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { userData, setUserData, profile, setProfile, loading} = useAuth();

  const leftItems = [
    { name: "Home", link: "/" },
    {
      name: "Events",
      link: "/events",
    },
    { name: "Theme", link: "/theme" },
  ];

  const navRight = [
    { name: "Contact", link: "/contact" },
    { name: "FAQ", link: "/faq" }
  ];

  const handleLogout = async () => {
    try {
      const response = await authAPI.logout();
      if (response.success) {
        setUserData(null)
        setProfile(null)
        router.push("/")
      }
    } catch (error) {
      // console.error("Logout error:", error);
    }
  };

  const handleToggleDropdown = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-[100]">
      <Navbar>
        {(visible) => (
          <>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex w-full">
              <NavBody
                leftItems={leftItems}
                rightItems={navRight}
                visible={visible}
              >
                {userData ? (
                  <div className="relative group">
                    <div className="cursor-pointer">
                      <img
                        src="https://ik.imagekit.io/ilgcom35w/profile.png?updatedAt=1755026433401"
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover hover:opacity-80 transition-opacity"
                      />
                    </div>
                    <div className="absolute backdrop-blur-3xl bg-black/40 rounded-xl right-0 mt-3 w-32 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <button
                        onClick={() => userData ? router.push("/dashboard") : router.push("/login")}
                        className="px-4 py-2 text-white cursor-pointer hover:bg-[#2EB24C] w-full flex items-center hover:text-white rounded"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-white cursor-pointer hover:bg-[#2EB24C] w-full flex items-center rounded"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <a onClick={() => {router.push("/login")}}>
                      <NavbarButton variant="secondary">Login</NavbarButton>
                    </a>
                    <a onClick={() => {router.push("/register")}}>
                      <NavbarButton variant="primary">Register</NavbarButton>
                    </a>
                  </>
                )}
              </NavBody>
            </div>

            {/* Mobile Navigation */}
            <div className="flex lg:hidden w-full">
              <MobileNav visible={visible}>
                <MobileNavHeader>
                  <NavbarLogo />
                  <MobileNavToggle
                    isOpen={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  />
                </MobileNavHeader>

                <MobileNavMenu
                  isOpen={isMobileMenuOpen}
                  onClose={() => setIsMobileMenuOpen(false)}
                >
                  {[...leftItems, ...navRight].map((item, idx) => (
                    <div key={idx}>
                      {item.link ? (
                        <button
                          // href={item.link}

                          // onClick={() => setIsMobileMenuOpen(false)}
                          onClick={() => {router.push(item.link); setIsMobileMenuOpen(false)}}
                          className="text-neutral-200 dark:text-neutral-300"
                        >
                          {item.name}
                        </button>
                      ) : item.dropdown ? (
                        <div>
                          <button
                            // onClick={() => handleToggleDropdown(idx)}
                            onClick={() => {router.push(item.link); handleToggleDropdown(idx)}}
                            className="text-neutral-300 font-bold w-full text-left"
                          >
                            {item.name}
                          </button>
                          {expandedIndex === idx && (
                            <div className="ml-4 mt-1 flex flex-col gap-1">
                              {item.dropdown.map((subItem, subIdx) => (
                                <button
                                  key={subIdx}
                                  // href={subItem.link}
                                  onClick={() => {router.push(subItem.link); setIsMobileMenuOpen(false)}}
                                  className="text-neutral-200 dark:text-neutral-400"
                                >
                                  {subItem.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : null}
                    </div>
                  ))}
                  {userData ? (
                    <>
                      <button
                        onClick={() => {router.push("/dashboard"); setIsMobileMenuOpen(false)}}
                        className="text-neutral-200 dark:text-neutral-300 w-full flex items-start"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className="text-left text-neutral-200 w-full flex items-start"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        onClick={() => {router.push("/login"); setIsMobileMenuOpen(false)}}
                      >
                        <NavbarButton variant="primary" className="w-full">
                          Login
                        </NavbarButton>
                      </a>
                      <a
                        onClick={() => {router.push("/register"); setIsMobileMenuOpen(false)}}
                      >
                        <NavbarButton variant="secondary" className="w-full">
                          Register
                        </NavbarButton>
                      </a>
                    </>
                  )}
                </MobileNavMenu>
              </MobileNav>
            </div>
          </>
        )}
      </Navbar>
    </div>
  );
}