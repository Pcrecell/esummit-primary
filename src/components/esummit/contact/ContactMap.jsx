import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: 'https://ik.imagekit.io/wlknxcf5m/line_10112299.png',
  iconRetinaUrl: 'https://ik.imagekit.io/wlknxcf5m/line_10112299.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -30],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
});

const PopupOpener = ({ markerRef }) => {
  const map = useMap();
  useEffect(() => {
    if (markerRef.current) {
      map.whenReady(() => {
        markerRef.current.openPopup();
      });
    }
  }, [map, markerRef]);
  return null;
};

const FixMapInteractions = ({ disableDragging }) => {
  const map = useMap();
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (disableDragging) {
      map.dragging.disable();
    } else {
      map.dragging.enable();
    }

    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    if (map.tap) map.tap.disable();

    const container = map.getContainer();

    const preventContextMenu = (e) => {
      e.preventDefault();
    };

    const handleMouseDown = (e) => {
      if (!disableDragging && e.button === 0) {
        isDraggingRef.current = true;
        container.style.cursor = 'grabbing';
        document.body.style.cursor = 'grabbing';
      }
    };

    const handleMouseUp = (e) => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        container.style.cursor = disableDragging ? 'default' : 'grab';
        document.body.style.cursor = 'default';

        setTimeout(() => {
          map.dragging.disable();
          if (!disableDragging) {
            map.dragging.enable();
          }
        }, 0);
      }
    };

    const handleMouseLeave = (e) => {
      if (isDraggingRef.current) {
        handleMouseUp(e);
      }
    };

    const handleGlobalMouseUp = (e) => {
      if (isDraggingRef.current) {
        handleMouseUp(e);
      }
    };

    container.addEventListener('contextmenu', preventContextMenu);
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    container.style.cursor = disableDragging ? 'default' : 'grab';
    if (disableDragging) {
      container.classList.add('dragging-disabled');
    } else {
      container.classList.remove('dragging-disabled');
    }

    return () => {
      container.removeEventListener('contextmenu', preventContextMenu);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [map, disableDragging]);

  return null;
};

const EcellMap = React.forwardRef(({ disableDragging = false }, ref) => {
  const markerRef = useRef(null);
  const [screenSize, setScreenSize] = useState('desktop');

  const markerPosition = useRef([20.353438244625394, 85.81957657593314]).current;
  const [mapCenter, setMapCenter] = useState(markerPosition);

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    if (width < 768) {
      setScreenSize('mobile');
      setMapCenter([20.347, 85.81957657593314]);
    } else if (width < 1024) {
      setScreenSize('tablet');
      setMapCenter([20.353438244625394, 85.828]);
    } else {
      setScreenSize('desktop');
      setMapCenter([20.356438244625394, 85.834]);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const getZoomLevel = () => {
    switch (screenSize) {
      case 'mobile': return 15;
      case 'tablet': return 14;
      default: return 15;
    }
  };

  return (
    <MapContainer
      center={mapCenter}
      zoom={getZoomLevel()}
      style={{ height: '100vh', width: '100%' }}
      scrollWheelZoom={false}
      dragging={!disableDragging}
      zoomControl={false}
      attributionControl={false}
      touchZoom={false}
      doubleClickZoom={false}
      boxZoom={false}
      keyboard={false}
      tap={false}
      key={`${screenSize}-${mapCenter[0]}-${mapCenter[1]}`}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
      />
  <Marker position={markerPosition} ref={markerRef} icon={customIcon}>
        <Popup
          className="custom-popup responsive-popup"
          autoClose={false}
          closeOnClick={false}
          closeButton={true}
          maxWidth={screenSize === 'mobile' ? 240 : 280}
          minWidth={screenSize === 'mobile' ? 180 : 200}
        >
          <div className="font-sans text-sm md:text-base">
            <div className="font-bold mb-1">
              <a
                href="https://maps.app.goo.gl/rdAHuPNZTztHkeY17"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base"
                style={{
                  background: 'linear-gradient(180deg, #F5E34C 0%, #DDAB3C 22.84%, #8A5F1C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  cursor: 'pointer',
                }}
              >
                KIIT University, Bhubaneswar
              </a>
            </div>
            <div className="text-xs md:text-sm text-gray-600 mb-2">
              KIIT Road, Patia, Odisha 751024, India
            </div>
            <div>
              <a
                href="mailto:pcr.ecell@kiit.ac.in"
                className="text-xs md:text-sm cursor-pointer"
                style={{
                  background: 'linear-gradient(180deg, #F5E34C 0%, #DDAB3C 22.84%, #8A5F1C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  cursor: 'pointer',
                }}
              >
                pcr.ecell@kiit.ac.in
              </a>
            </div>
          </div>
        </Popup>
      </Marker>
      <PopupOpener markerRef={markerRef} />
      <FixMapInteractions disableDragging={disableDragging} />
    </MapContainer>
  );
});

export default EcellMap;