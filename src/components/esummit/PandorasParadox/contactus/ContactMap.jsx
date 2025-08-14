"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const position = [20.364544820535293, 85.81718000708452]; // campus 25 ka hai

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

const useMap = dynamic(
  () => import("react-leaflet").then((mod) => mod.useMap),
  { ssr: false }
);

const ContactMap = () => {
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState(null);
  const markerRef = useRef(null);

  // Ensure component only renders on client side
  useEffect(() => {
    setIsClient(true);
    
    // Dynamically import Leaflet
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);
      
      // Import CSS
      import("leaflet/dist/leaflet.css");
    });
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const style = document.createElement('style');
    style.innerHTML = `
      .leaflet-container {
        background: #0a1a0a !important;
        outline: none !important;
        border-radius: 1rem;
        /* This filter makes roads green and buildings darkish on CartoDB dark tiles */
        filter: grayscale(0.2) sepia(1) hue-rotate(90deg) saturate(6) brightness(0.8) contrast(1.2);
      }
      .leaflet-popup-content-wrapper {
        background: #0a2a0a;
        color: #fff !important;
        border-radius: 0.5rem;
        font-size: 0.95rem;
        box-shadow: 0 2px 16px 0 #20ff2088;
        border: 1.5px solid #20ff20;
      }
      .leaflet-popup-content, .leaflet-tooltip, .leaflet-tooltip-content, .leaflet-control, .leaflet-control-attribution, .leaflet-control-zoom, .leaflet-control-zoom-in, .leaflet-control-zoom-out {
        color: #fff !important;
        text-shadow: 0 1px 2px #000a;
      }
      .leaflet-popup-tip {
        background: #0a2a0a;
      }
      .leaflet-marker-icon, .leaflet-marker-shadow {
        filter: hue-rotate(120deg) saturate(3) brightness(1.2) drop-shadow(0 0 4px #20ff20);
      }
      .leaflet-control {
        filter: hue-rotate(120deg) saturate(2) brightness(1.1);
      }
      .leaflet-control-zoom {
        display: none !important;
      }
      .leaflet-control-attribution {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => { 
      if (document.head.contains(style)) {
        document.head.removeChild(style); 
      }
    };
  }, [isClient]);

  // Create marker icon only on client side
  const getMarkerIcon = () => {
    if (!L) return null;
    
    return new L.Icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
      iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  function RecenterButton() {
    const RecenterButtonInner = dynamic(
      () => import("react-leaflet").then((mod) => {
        return function RecenterComponent() {
          const map = mod.useMap();
          const handleRecenter = () => {
            map.setView(position, 16, { animate: true });
          };
          return (
            <button
              onClick={handleRecenter}
              className="absolute bottom-3 right-3 z-[1000] bg-white/90 hover:bg-green-300 hover:text-black text-black font-bold py-2 px-4 rounded-lg shadow transition-colors duration-200 text-xs md:text-sm"
              style={{textDecoration: 'none'}}
            >
              Recenter
            </button>
          );
        };
      }),
      { ssr: false }
    );
    return <RecenterButtonInner />;
  }

  useEffect(() => {
    if (markerRef.current && isClient) {
      // Small delay to ensure popup opens after map is fully loaded
      setTimeout(() => {
        if (markerRef.current) {
          markerRef.current.openPopup();
        }
      }, 100);
    }
  }, [isClient, L]);

  // Show loading state while client-side components load
  if (!isClient || !L) {
    return (
      <div className="w-full h-full rounded-2xl overflow-hidden bg-neutral-900 relative flex items-center justify-center" style={{ minHeight: 250 }}>
        <div className="text-green-500 text-sm animate-pulse">Loading map...</div>
      </div>
    );
  }

  const markerIcon = getMarkerIcon();

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-neutral-900 relative" style={{ minHeight: 250 }}>
      <div style={{width: '100%', height: '100%', position: 'relative'}}>
        <MapContainer
          center={position}
          zoom={16}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100%", borderRadius: '1rem' }}
          dragging={true}
          doubleClickZoom={true}
          zoomControl={true}
          attributionControl={true}
          className="outline-none border-none"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
          />
          {markerIcon && (
            <Marker position={position} icon={markerIcon} ref={markerRef}>
              <Popup autoOpen={true} autoClose={false} closeOnClick={false}>
                <span className="text-xs font-semibold text-green-400">
                  Pandora's Paradox<br />
                  KIIT Campus 25
                </span>
              </Popup>
            </Marker>
          )}
          <RecenterButton />
        </MapContainer>
      </div>
    </div>
  );
};

export default ContactMap;