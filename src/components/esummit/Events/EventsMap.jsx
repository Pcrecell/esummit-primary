"use client"

import React, { useEffect, useRef, useState } from 'react'
import Frame from "../../../../public/images/esummit/events/EventsMapFrame.png";

const EventsMap = () => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1024); // Tailwind's 'lg' = 1024px
        };

        handleResize(); // Check on mount
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Cleanup any existing map instance first
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        }

        const leafletCSS = document.createElement("link");
        leafletCSS.rel = "stylesheet";
        leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        leafletCSS.id = "leaflet-css"; // Add ID for easier cleanup
        
        // Check if CSS is already loaded
        if (!document.getElementById("leaflet-css")) {
            document.head.appendChild(leafletCSS);
        }

        const leafletScript = document.createElement("script");
        leafletScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        leafletScript.async = true;
        leafletScript.id = "leaflet-script"; // Add ID for easier cleanup
        
        leafletScript.onload = () => {
            const L = window.L;
            if (!L || !mapRef.current) return;

            try {
                // Clear any existing content in the map container
                mapRef.current.innerHTML = '';
                
                const map = L.map(mapRef.current, {
                    zoomControl: true,
                    attributionControl: false,
                });
                
                // Store the map instance for cleanup
                mapInstanceRef.current = map;
                
                map.setView([20.3534, 85.8195], 16);
                
                // Apply background styling
                if (mapRef.current) {
                    mapRef.current.style.backgroundImage =
                        "linear-gradient(rgba(102, 51, 0, 0.35), rgba(102, 51, 0, 0.35)), url('https://i.ibb.co/8Dx532tD/grunge-paper-background-1-1.jpg')";
                    mapRef.current.style.backgroundSize = "cover";
                    mapRef.current.style.backgroundPosition = "center";
                }
                
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    opacity: 0.45,
                    attribution: '&copy; OpenStreetMap contributors',
                }).addTo(map);
                
                // Hide unwanted markers with a timeout
                setTimeout(() => {
                    const markerIcons = document.querySelectorAll('.leaflet-marker-icon');
                    markerIcons.forEach(icon => {
                        const alt = icon.getAttribute('alt') || '';
                        if (/hospital|pharmacy|shop|market|supermarket/i.test(alt)) {
                            icon.style.display = 'none';
                        }
                    });
                }, 500);
                
                // Create custom icons
                const icon = L.icon({
                    iconUrl: "https://cdn-icons-png.flaticon.com/512/616/616494.png",
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                });
                
                L.marker([20.3534, 85.8195], { icon }).addTo(map)
                    .bindPopup("You are here! 🏴‍☠️");
                
                const pinpointIcon = L.icon({
                    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                });
                
                L.marker([20.3534, 85.8195], { icon: pinpointIcon }).addTo(map)
                    .bindPopup("Pinpoint Location!<br>20.3534, 85.8195");
                    
            } catch (error) {
                console.error("Error initializing map:", error);
            }
        };
        
        // Check if script is already loaded
        if (!document.getElementById("leaflet-script")) {
            document.body.appendChild(leafletScript);
        } else if (window.L) {
            // If Leaflet is already loaded, initialize immediately
            leafletScript.onload();
        }

        // Cleanup function
        return () => {
            // Remove map instance
            if (mapInstanceRef.current) {
                try {
                    mapInstanceRef.current.remove();
                } catch (error) {
                    console.warn("Error removing map:", error);
                }
                mapInstanceRef.current = null;
            }
            
            // Clear map container
            if (mapRef.current) {
                mapRef.current.innerHTML = '';
            }
            
            // Remove scripts and styles (only if they exist and we added them)
            const existingCSS = document.getElementById("leaflet-css");
            const existingScript = document.getElementById("leaflet-script");
            
            if (existingCSS && existingCSS === leafletCSS) {
                existingCSS.remove();
            }
            if (existingScript && existingScript === leafletScript) {
                existingScript.remove();
            }
        };
    }, []); // Empty dependency array to run only once

    return (
        <div className="flex justify-center items-center">
            <div className="relative w-full h-[500px] mx-auto">
                {/* Frame overlays everything, perfectly centered */}
                <img
                    src={"https://ik.imagekit.io/fhervghik/E-Cell%20Website/EventsMapFrame.png?updatedAt=1754584709196"}
                    alt="Map Frame"
                    className="absolute left-1/2 top-1/2 w-[80%] h-[80%] object-contain pointer-events-none z-10 select-none"
                    style={{ transform: `translate(-50%, ${isSmallScreen ? '-80%' : '-60%'}) rotate(90deg)` }}
                    draggable={false}
                />
                {/* Map is smaller and centered */}
                <div
                    ref={mapRef}
                    className="absolute left-1/2 top-1/2 w-[80%] h-[40%] lg:w-[70%] lg:h-[50%] -translate-x-1/2 lg:-translate-y-[65%] -translate-y-[110%] rounded-[18px] overflow-hidden z-0"
                />
            </div>
        </div>
    )
}

export default EventsMap