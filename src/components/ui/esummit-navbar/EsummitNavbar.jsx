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

export default function EsummitNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check session on mount
    (async () => {
      try {
        const res = await authAPI.verifyToken();
        setIsAuthenticated(res.success);
      } catch {
        setIsAuthenticated(false);
      }
    })();
  }, []);

  const leftItems = [
    { name: "Home", link: "/" },
    {
      name: "Events",
      link: "/events",
    },
    { name: "Theme", link: "/theme" },
  ];

  const navRight = [{ name: "Contact", link: "/contact" }];

  const handleLogout = async () => {
    try {
      const response = await authAPI.logout();
      if (response.success) {
        setIsAuthenticated(false);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout error:", error);
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
                {isAuthenticated ? (
                  <div className="relative group">
                    <div className="cursor-pointer">
                      <img
                        src="https://ik.imagekit.io/ilgcom35w/profile.png?updatedAt=1755026433401"
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover hover:opacity-80 transition-opacity"
                      />
                    </div>
                    <div className="absolute backdrop-blur-3xl bg-black/40 rounded-xl right-0 mt-3 w-32 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <a
                        href="/dashboard"
                        className="block px-4 py-2 text-white hover:bg-[#2EB24C] hover:text-white rounded"
                      >
                        Dashboard
                      </a>
                      <a
                        href=""
                        onClick={handleLogout}
                        className="block px-4 py-2 text-white hover:bg-[#2EB24C] rounded"
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                ) : (
                  <>
                    <a href="/login">
                      <NavbarButton variant="secondary">Login</NavbarButton>
                    </a>
                    <a href="/register">
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
                        <a
                          href={item.link}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-neutral-200 dark:text-neutral-300"
                        >
                          {item.name}
                        </a>
                      ) : item.dropdown ? (
                        <div>
                          <button
                            onClick={() => handleToggleDropdown(idx)}
                            className="text-neutral-300 font-bold w-full text-left"
                          >
                            {item.name}
                          </button>
                          {expandedIndex === idx && (
                            <div className="ml-4 mt-1 flex flex-col gap-1">
                              {item.dropdown.map((subItem, subIdx) => (
                                <a
                                  key={subIdx}
                                  href={subItem.link}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="text-neutral-200 dark:text-neutral-400"
                                >
                                  {subItem.name}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : null}
                    </div>
                  ))}
                  {isAuthenticated ? (
                    <>
                      <a
                        href="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-neutral-200 dark:text-neutral-300"
                      >
                        Dashboard
                      </a>
                      <button
                        onClick={async () => {
                          const response = await authAPI.logout();
                          if (response.success) {
                            setIsAuthenticated(false);
                            // Redirect to home or login page
                            window.location.href = "/";
                          }
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-left text-neutral-200"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <NavbarButton variant="primary" className="w-full">
                          Login
                        </NavbarButton>
                      </a>
                      <a
                        href="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
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
