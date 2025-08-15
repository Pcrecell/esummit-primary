"use client"

import React, { useEffect, useRef, useState } from 'react'

const EventsMap = ({ coordinates = [20.3534, 85.8195], label = "Event Location", campus = "Campus" }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Cleanup any existing map instance first
        if (mapInstanceRef.current) {
            try {
                mapInstanceRef.current.remove();
            } catch (error) {
                console.warn("Error removing existing map:", error);
            }
            mapInstanceRef.current = null;
        }

        // Clear any existing Leaflet resources
        const existingCSS = document.getElementById("leaflet-css");
        const existingScript = document.getElementById("leaflet-script");
        
        if (existingCSS) existingCSS.remove();
        if (existingScript) existingScript.remove();

        const leafletCSS = document.createElement("link");
        leafletCSS.rel = "stylesheet";
        leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        leafletCSS.id = "leaflet-css";
        document.head.appendChild(leafletCSS);

        const leafletScript = document.createElement("script");
        leafletScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        leafletScript.async = true;
        leafletScript.id = "leaflet-script";
        
        leafletScript.onload = () => {
            const L = window.L;
            if (!L || !mapRef.current) {
                console.error("Leaflet not loaded or map ref not available");
                return;
            }

            try {
                // Clear any existing content
                mapRef.current.innerHTML = '';
                
                // Create map with specific options for mobile
                const map = L.map(mapRef.current, {
                    zoomControl: isSmallScreen ? false : true,
                    attributionControl: false,
                    scrollWheelZoom: !isSmallScreen,
                    doubleClickZoom: true,
                    touchZoom: isSmallScreen,
                    dragging: true
                });
                
                mapInstanceRef.current = map;
                
                // Set view with appropriate zoom for mobile
                map.setView(coordinates, isSmallScreen ? 15 : 16);
                
                // Apply background styling
                if (mapRef.current) {
                    mapRef.current.style.backgroundImage =
                        "linear-gradient(rgba(102, 51, 0, 0.35), rgba(102, 51, 0, 0.35)), url('https://i.ibb.co/8Dx532tD/grunge-paper-background-1-1.jpg')";
                    mapRef.current.style.backgroundSize = "cover";
                    mapRef.current.style.backgroundPosition = "center";
                }
                
                // Add tile layer
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    opacity: 0.45,
                    attribution: '&copy; OpenStreetMap contributors',
                }).addTo(map);
                
                // Force map to resize properly
                setTimeout(() => {
                    if (map && mapInstanceRef.current) {
                        map.invalidateSize();
                        setIsLoaded(true);
                    }
                }, 200);
                
                // Add custom markers
                const pinpointIcon = L.icon({
                    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                    iconSize: isSmallScreen ? [24, 24] : [32, 32],
                    iconAnchor: isSmallScreen ? [12, 24] : [16, 22],
                });
                
                L.marker(coordinates, { icon: pinpointIcon }).addTo(map)
                    .bindPopup(`${label}<br>${campus}`);

                // Hide unwanted markers
                setTimeout(() => {
                    const markerIcons = document.querySelectorAll('.leaflet-marker-icon');
                    markerIcons.forEach(icon => {
                        const alt = icon.getAttribute('alt') || '';
                        if (/hospital|pharmacy|shop|market|supermarket/i.test(alt)) {
                            icon.style.display = 'none';
                        }
                    });
                }, 500);
                    
            } catch (error) {
                console.error("Error initializing map:", error);
            }
        };
        
        leafletScript.onerror = () => {
            console.error("Failed to load Leaflet script");
        };
        
        document.body.appendChild(leafletScript);

        return () => {
            if (mapInstanceRef.current) {
                try {
                    mapInstanceRef.current.remove();
                } catch (error) {
                    console.warn("Error cleaning up map:", error);
                }
                mapInstanceRef.current = null;
            }
            
            if (mapRef.current) {
                mapRef.current.innerHTML = '';
            }
        };
    }, [isSmallScreen, coordinates, label]);

    return (
        <div className="w-full flex justify-center items-center">
            <div className="relative w-full max-w-md lg:max-w-lg">
                {/* Container with proper aspect ratio */}
                <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                    {/* Frame image */}
                    <img
                        src="https://ik.imagekit.io/fhervghik/E-Cell%20Website/EventsMapFrame.png"
                        alt="Map Frame"
                        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 select-none"
                        style={{ transform: 'rotate(90deg)' }}
                        draggable={false}
                    />
                    
                    {/* Map container - positioned to fit within the frame */}
                    <div
                        ref={mapRef}
                        className="absolute inset-0 m-auto w-[70%] h-[70%] rounded-lg overflow-hidden z-0"
                        style={{
                            top: '65%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                    
                    {/* Loading indicator */}
                    {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="text-[#f8d6a4] text-sm">Loading map...</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EventsMap