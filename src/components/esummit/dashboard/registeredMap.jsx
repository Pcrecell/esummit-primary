import React, { useEffect, useRef, useState } from 'react'

const EventsMap = ({ coordinates = [20.3534, 85.8195], label = "Event Location" }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const newIsSmallScreen = window.innerWidth < 1024;
            setIsSmallScreen(newIsSmallScreen);
            
            // Invalidate map size when screen size changes
            if (mapInstanceRef.current) {
                setTimeout(() => {
                    mapInstanceRef.current.invalidateSize();
                    // Adjust zoom based on screen size
                    mapInstanceRef.current.setZoom(newIsSmallScreen ? 15 : 16);
                }, 100);
            }
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
                    preferCanvas: true, // Better performance
                    maxZoom: 18,
                    minZoom: 10
                });
                
                // Store the map instance for cleanup
                mapInstanceRef.current = map;
                
                // Set initial view
                map.setView(coordinates, isSmallScreen ? 15 : 16);
                
                // Force resize after a short delay to ensure proper rendering
                setTimeout(() => {
                    if (map && mapRef.current) {
                        map.invalidateSize();
                    }
                }, 100);
                
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
                
                const pinpointIcon = L.icon({
                    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                });
                
                L.marker(coordinates, { icon: pinpointIcon }).addTo(map)
                    .bindPopup(`<a href="https://www.google.com/maps/place/${coordinates[0]},${coordinates[1]}">${label}</a>`);
                    
            } catch (error) {
                // console.error("Error initializing map:", error);
            }
        };
        
        // Handle script loading
        if (window.L) {
            // If Leaflet is already loaded, initialize immediately
            leafletScript.onload();
        } else if (!document.getElementById("leaflet-script")) {
            document.body.appendChild(leafletScript);
        } else {
            // Script exists but may not be loaded yet, attach to existing script
            const existingScript = document.getElementById("leaflet-script");
            if (existingScript.complete || window.L) {
                leafletScript.onload();
            } else {
                existingScript.addEventListener('load', leafletScript.onload);
            }
        }

        // Cleanup function
        return () => {
            // Remove map instance
            if (mapInstanceRef.current) {
                try {
                    mapInstanceRef.current.remove();
                } catch (error) {
                    // console.warn("Error removing map:", error);
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
    }, [coordinates, label]); // Re-run when coordinates or label change

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