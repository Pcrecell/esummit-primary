"use client"
import { cn } from "../../../lib/utils/cn.js"
import { IconMenu2, IconX } from "@tabler/icons-react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"
import logo from "../../../../public/Images/esummit/navbar/logo.png"
import cell from "../../../../public/images/esummit/navbar/ecell-logo.png"
import React, { useRef, useState } from "react"
import Image from "next/image.js"
import { Skeleton } from '@mui/material';

export const Navbar = ({ children, className }) => {
    const ref = useRef(null)
    const { scrollY } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    })
    const [visible, setVisible] = useState(false)

    useMotionValueEvent(scrollY, "change", (latest) => {
        setVisible(latest > 100)
    })

    return (
        <motion.div
            ref={ref}
            className={cn("sticky inset-x-0 top-4 z-40 w-full", className)}
        >
            {typeof children === "function" ? children(visible) : children}
        </motion.div>
    )
}

export const NavBody = ({ leftItems = [], rightItems = [], children, className, visible }) => {
    const [cellLoaded, setCellLoaded] = useState(false);
    const [cellErrored, setCellErrored] = useState(false);

    return (
        <motion.div
            animate={{
                backdropFilter: visible ? "blur(10px)" : "none",
                boxShadow: visible
                    ? "0 0 24px rgba(34,42,53,0.06), 0 1px 1px rgba(0,0,0,0.05), 0 0 0 1px rgba(34,42,53,0.04), 0 0 4px rgba(34,42,53,0.08), 0 16px 68px rgba(47,48,55,0.05), 0 1px 0 rgba(255,255,255,0.1) inset"
                    : "none",
                width: visible ? "70%" : "90%",
                y: visible ? 20 : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 50 }}
            className={cn(
                "relative z-[60] mx-auto flex max-w-7xl items-center justify-between rounded-full bg-black/40 px-8 py-2",
                className
            )}
        >
            <div className="flex items-center gap-8 flex-grow">
                <a href="/" className="flex items-center px-2 py-1">
                  {(!cellLoaded && !cellErrored) && (
                    <Skeleton
                      variant="circular"
                      animation="pulse"
                      width={50}
                      height={50}
                      sx={{ position: 'absolute', left: 0, top: 0 }}
                    />
                  )}
                  <Image
                    src={cell}
                    alt="logo"
                    width={50}
                    height={50}
                    className={`transition-opacity duration-700 ${cellLoaded ? 'opacity-100' : 'opacity-0'} ${cellErrored ? 'hidden' : ''}`}
                    onLoad={() => setCellLoaded(true)}
                    onError={() => setCellErrored(true)}
                    style={{ position: 'relative', zIndex: 1 }}
                    draggable={false}
                  />
                  {cellErrored && (
                    <Skeleton
                      variant="circular"
                      animation="pulse"
                      width={50}
                      height={50}
                      sx={{ position: 'absolute', left: 0, top: 0 }}
                    />
                  )}
                </a>
                <NavItems items={leftItems} />
            </div>


            <div className="absolute left-1/2 -translate-x-1/2">
                <NavbarLogo />
            </div>

            <div className="flex items-center gap-10">
                <div className="flex items-center gap-4">
                    <NavItems items={rightItems} />
                </div>
                <div className="flex items-center gap-2">
                    {children}
                </div>
            </div>

        </motion.div>
    )
}

export const NavItems = ({ items = [], className }) => {
    const [hovered, setHovered] = useState(null);
    const [clicked, setClicked] = useState(null);

    return (
        <motion.div
            onMouseLeave={() => setHovered(null)}
            className={cn("flex flex-row items-center text-sm font-medium space-x-1", className)}
        >
            {items.map((item, idx) => {
                const isActive = hovered === idx || clicked === idx;
                const isDropdown = !!item.dropdown;
                return (
                    <div
                        key={`nav-${idx}`}
                        className="relative"
                        onMouseEnter={() => setHovered(idx)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => setClicked(clicked === idx ? null : idx)}
                    >
                        {/* Use Link here for items with a direct link */}
                        {item.link && !isDropdown ? (
                            <a
                                href={item.link}
                                className={cn(
                                    "relative px-3 py-1",
                                    isActive
                                        ? "text-neutral-900 dark:text-white"
                                        : "text-neutral-300 hover:text-neutral-700 dark:text-neutral-300"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="hovered"
                                        className="absolute inset-0 rounded-full bg-gray-100 dark:bg-neutral-800"
                                    />
                                )}
                                <span className="relative z-10">{item.name}</span>
                            </a>
                        ) : (
                            // For dropdown items and top-level button that opens dropdown
                            <button
                                className={cn(
                                    "relative px-3 py-1",
                                    isActive && isDropdown
                                        ? "text-neutral-900 dark:text-white"
                                        : "text-neutral-300 hover:text-neutral-700 dark:text-neutral-300"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="hovered"
                                        className="absolute inset-0 rounded-full bg-gray-100 dark:bg-neutral-800"
                                    />
                                )}
                                <span className="relative z-10">{item.name}</span>
                            </button>
                        )}

                        {/* Dropdown menu */}
                        <AnimatePresence>
                            {isActive && item.dropdown && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                                    className="absolute left-1/2 top-full z-50 mt-3 w-max -translate-x-1/2 rounded-xl border border-white/10 bg-black/90 p-4 backdrop-blur-xl shadow-xl"
                                >
                                    <div className="flex flex-col gap-2">
                                        {item.dropdown.map((subItem, subIdx) => (
                                            <a
                                                key={`dropdown-${subIdx}`}
                                                href={subItem.link}
                                                className="text-white hover:text-neutral-300 text-sm"
                                            >
                                                {subItem.name}
                                            </a>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </motion.div>
    );
};

export const NavbarLogo = () => {
    return (
        <a href="/esummit">
            <button className="flex items-center px-2 py-1">
                <Image src={logo} alt="logo" width={100} height={100} />
            </button>
        </a>
    )
}

export const NavbarButton = ({
    href,
    as: Tag = "button",
    children,
    className,
    variant = "primary",
    ...props
}) => {
    const baseStyles =
        "px-4 py-2 rounded-md text-sm font-bold transition duration-200 inline-block text-center cursor-pointer"

    const variantStyles = {
        primary: "bg-black text-white hover:scale-105",
        secondary: "bg-white text-black hover:scale-105",
    }

    return (
        <Tag
            href={href}
            className={cn(baseStyles, variantStyles[variant], className)}
            {...props}
        >
            {children}
        </Tag>
    )
}

export const MobileNav = ({ children, className, visible }) => {
    return (
        <motion.div
            animate={{
                backdropFilter: visible ? "blur(10px)" : "none",
                boxShadow: visible
                    ? "0 0 24px rgba(34,42,53,0.06), 0 1px 1px rgba(0,0,0,0.05), 0 0 0 1px rgba(34,42,53,0.04), 0 0 4px rgba(34,42,53,0.08), 0 16px 68px rgba(47,48,55,0.05), 0 1px 0 rgba(255,255,255,0.1) inset"
                    : "none",
                y: visible ? 20 : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 50 }}
            className={cn(
                "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-4 py-2 lg:hidden",
                visible && "bg-black/10 dark:bg-neutral-950/80",
                className
            )}
        >
            {children}
        </motion.div>
    )
}

export const MobileNavHeader = ({ children, className }) => (
    <div className={cn("flex w-full justify-between items-center", className)}>{children}</div>
)

export const MobileNavMenu = ({ children, className, isOpen }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cn("w-full py-4 flex flex-col gap-4", className)}
            >
                {children}
            </motion.div>
        )}
    </AnimatePresence>
)

export const MobileNavToggle = ({ isOpen, onClick }) =>
    isOpen ? (
        <IconX className="text-white dark:text-white" onClick={onClick} />
    ) : (
        <IconMenu2 className="text-white dark:text-white" onClick={onClick} />
    )
