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
                // console.warn("Error removing existing map:", error);
            }
            mapInstanceRef.current = null;
        }

        // Only add Leaflet resources if they don't already exist
        let leafletCSS = document.getElementById("leaflet-css");
        if (!leafletCSS) {
            leafletCSS = document.createElement("link");
            leafletCSS.rel = "stylesheet";
            leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
            leafletCSS.id = "leaflet-css";
            document.head.appendChild(leafletCSS);
        }

        let leafletScript = document.getElementById("leaflet-script");
        if (!leafletScript) {
            leafletScript = document.createElement("script");
            leafletScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
            leafletScript.async = true;
            leafletScript.id = "leaflet-script";
            document.body.appendChild(leafletScript);
        }
        
        const initializeMap = () => {
            const L = window.L;
            if (!L || !mapRef.current) {
                // console.error("Leaflet not loaded or map ref not available");
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
                    .bindPopup(`<a href="https://www.google.com/maps/place/${coordinates[0]},${coordinates[1]}">${label}<br>${campus}</a>`);

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
                // console.error("Error initializing map:", error);
            }
        };
        
        // If Leaflet is already loaded, initialize immediately
        if (window.L) {
            initializeMap();
        } else {
            leafletScript.onload = initializeMap;
            leafletScript.onerror = () => {
                // console.error("Failed to load Leaflet script");
            };
        }

        return () => {
            if (mapInstanceRef.current) {
                try {
                    mapInstanceRef.current.remove();
                } catch (error) {
                    // console.warn("Error cleaning up map:", error);
                }
                mapInstanceRef.current = null;
            }
            
            if (mapRef.current) {
                mapRef.current.innerHTML = '';
            }
        };
    }, [isSmallScreen, coordinates, label]);

    return (
        <div className="w-full h-full flex justify-center items-center relative">
            <div
                ref={mapRef}
                className="w-full h-full z-0"
                style={{ minHeight: '240px', minWidth: '224px' }} // Ensure minimum size for mobile
            />
        </div>
    )
}

export default EventsMap