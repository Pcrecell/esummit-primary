"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';

const EventsMap = () => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const loadLeaflet = () => {
        return new Promise((resolve, reject) => {
            // Check if Leaflet is already available
            if (window.L) {
                resolve(window.L);
                return;
            }

            // Load CSS first
            const leafletCSS = document.createElement("link");
            leafletCSS.rel = "stylesheet";
            leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
            leafletCSS.id = "leaflet-css";
            
            if (!document.getElementById("leaflet-css")) {
                document.head.appendChild(leafletCSS);
            }

            // Load JavaScript
            const leafletScript = document.createElement("script");
            leafletScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
            leafletScript.id = "leaflet-script";
            
            leafletScript.onload = () => {
                // Wait a bit for Leaflet to fully initialize
                setTimeout(() => {
                    if (window.L) {
                        resolve(window.L);
                    } else {
                        reject(new Error('Leaflet failed to load'));
                    }
                }, 100);
            };
            
            leafletScript.onerror = () => {
                reject(new Error('Failed to load Leaflet script'));
            };
            
            if (!document.getElementById("leaflet-script")) {
                document.body.appendChild(leafletScript);
            } else if (window.L) {
                resolve(window.L);
            }
        });
    };

    const initializeMap = async () => {
        try {
            // Clean up any existing map instance
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }

            if (!mapRef.current) return;

            const L = await loadLeaflet();
            
            // Clear map container
            mapRef.current.innerHTML = '';
            
            // Create map with better mobile settings
            const map = L.map(mapRef.current, {
                zoomControl: true,
                attributionControl: false,
                touchZoom: true,
                dragging: true,
                tap: true,
                boxZoom: false,
                doubleClickZoom: true,
                // scrollWheelZoom: false, // Disable on mobile to prevent conflicts
                // preferCanvas: true, // Better performance on mobile
            });
            
            mapInstanceRef.current = map;
            
            // Set view with error handling
            map.setView([20.3534, 85.8195], 16);
            
            // Apply background styling
            if (mapRef.current) {
                mapRef.current.style.backgroundImage =
                    "linear-gradient(rgba(102, 51, 0, 0.35), rgba(102, 51, 0, 0.35)), url('https://i.ibb.co/8Dx532tD/grunge-paper-background-1-1.jpg')";
                mapRef.current.style.backgroundSize = "cover";
                mapRef.current.style.backgroundPosition = "center";
            }
            
            // Add tile layer with error handling
            const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                opacity: 0.45,
                attribution: '&copy; OpenStreetMap contributors',
                maxZoom: 19,
                detectRetina: true,
            });
            
            tileLayer.addTo(map);
            
            // Wait for map to be fully loaded before adding markers
            map.whenReady(() => {
                try {
                    // Create custom icons with error handling
                    const icon = L.icon({
                        iconUrl: "https://cdn-icons-png.flaticon.com/512/616/616494.png",
                        iconSize: [32, 32],
                        iconAnchor: [16, 32],
                        popupAnchor: [0, -32],
                    });
                    
                    const marker1 = L.marker([20.3534, 85.8195], { icon }).addTo(map);
                    marker1.bindPopup("You are here! 🏴‍☠️");
                    
                    const pinpointIcon = L.icon({
                        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                        iconSize: [32, 32],
                        iconAnchor: [16, 32],
                        popupAnchor: [0, -32],
                    });
                    
                    const marker2 = L.marker([20.3534, 85.8195], { icon: pinpointIcon }).addTo(map);
                    marker2.bindPopup("Pinpoint Location!<br>20.3534, 85.8195");
                    
                    setMapLoaded(true);
                    
                    // Force map resize for mobile
                    setTimeout(() => {
                        map.invalidateSize();
                    }, 250);
                    
                } catch (markerError) {
                    console.error("Error adding markers:", markerError);
                }
            });
            
            // Hide unwanted markers after map loads
            setTimeout(() => {
                const markerIcons = document.querySelectorAll('.leaflet-marker-icon');
                markerIcons.forEach(icon => {
                    const alt = icon.getAttribute('alt') || '';
                    if (/hospital|pharmacy|shop|market|supermarket/i.test(alt)) {
                        icon.style.display = 'none';
                    }
                });
            }, 1000);
            
        } catch (error) {
            console.error("Error initializing map:", error);
            setMapLoaded(false);
        }
    };

    useEffect(() => {
        // Use a timeout to ensure the DOM is ready
        const timer = setTimeout(() => {
            initializeMap();
        }, 100);

        return () => {
            clearTimeout(timer);
            
            // Cleanup map instance
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
        };
    }, []);

    // Handle resize events
    useEffect(() => {
        const handleMapResize = () => {
            if (mapInstanceRef.current) {
                setTimeout(() => {
                    mapInstanceRef.current.invalidateSize();
                }, 100);
            }
        };

        window.addEventListener('resize', handleMapResize);
        return () => window.removeEventListener('resize', handleMapResize);
    }, []);

    return (
        <div className="flex justify-center items-center">
            <div className="relative w-full h-[450px] mx-auto">
                <Image
                    src={"https://ik.imagekit.io/fhervghik/E-Cell%20Website/EventsMapFrame.png"}
                    alt="Map Frame"
                    width={400}
                    height={400}
                    className="absolute left-1/2 top-1/2 w-[90%] h-[80%] object-contain pointer-events-none z-10 select-none"
                    style={{ transform: `translate(-50%, ${isSmallScreen ? '-80%' : '-60%'}) rotate(90deg)` }}
                    draggable={false}
                />
                
                {/* Loading indicator */}
                {/* {!mapLoaded && (
                    <div className="absolute left-1/2 top-1/2 w-[80%] h-[40%] lg:w-[75%] lg:h-[55%] -translate-x-1/2 lg:-translate-y-[65%] -translate-y-[110%] rounded-[18px] bg-gradient-to-br from-amber-900/20 to-amber-700/20 flex items-center justify-center z-0">
                        <div className="text-amber-200 text-sm animate-pulse">Loading map...</div>
                    </div>
                )} */}
                
                <div
                    ref={mapRef}
                    className={`absolute left-1/2 top-1/2 w-[80%] h-[40%] lg:w-[75%] lg:h-[55%] -translate-x-1/2 lg:-translate-y-[65%] -translate-y-[110%] rounded-[18px] overflow-hidden z-0 ${!mapLoaded ? 'opacity-0' : 'opacity-100'}`}
                    style={{ 
                        minHeight: '200px',
                        transition: 'opacity 0.3s ease-in-out'
                    }}
                />
            </div>
        </div>
    )
}

export default EventsMap