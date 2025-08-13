"use client"

import React, { useState, useEffect } from "react";
// import DashBoardCard from "./DashBoardCard";
import MapComponent from "./MapComponent";
// import { authAPI } from "../../services/api";
import DashBoardCard from "../../../../public/images/esummit/dashboard/Dashboard Card.svg";
import QuestionMark from "../../../../public/images/esummit/dashboard/Question-Mark.svg";
import PaymentStart from "./paymentStart";
import PaymentEnd from "./paymentEnd";
import Particles from './Particles';
import Image from "next/image";
import { useRouter } from "next/navigation";

const EsummitDashBoard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentDone, setPaymentDone] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [registeredEventId, setRegisteredEventId] = useState(null);
  const qrCode = "https://ik.imagekit.io/fhervghik/E-Cell%20Website/Group%2013.png";

const router = useRouter();
  useEffect(() => {
    const isAuthenticated = false;
    if (!isAuthenticated) {
      window.location.replace("/login");
    }
  }, [router]);
  const handleEventClick = (eventId) => {
    setSelectedEventId(eventId);
    setShowConfirmationPopup(true);
  }; 

  // Handle payment action from PaymentStart popup
  const handlePaymentFromPopup = () => {
    setPaymentDone(true);
  };

  // Handle registration confirmation
  const handleConfirmRegistration = () => {
    console.log("Confirming registration for event:", selectedEventId);
    setRegisteredEventId(selectedEventId);
    setShowConfirmationPopup(false);
    console.log("Registration completed, should show PaymentEnd now");
    console.log("registeredEventId state:", selectedEventId);
  };

  // Handle popup cancellation
  const handleCancelRegistration = () => {
    setSelectedEventId(null);
    setShowConfirmationPopup(false);
  };

  // useEffect(() => {
  //   let mounted = true;
  //   (async () => {
  //     try {
  //       const userResponse = await authAPI.verifyToken();
  //       if (mounted && userResponse && userResponse.user) {
  //         setUserData(userResponse.user);
  //       }
  //     } catch (err) {
  //       // handle error
  //     } finally {
  //       if (mounted) setLoading(false);
  //     }
  //   })();
  //   return () => { mounted = false; };
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-green-900 text-white text-2xl font-bold tracking-widest animate-pulse">
  //       Loading...
  //     </div>
  //   );
  // }

  return (
    <div>
      <div className="relative">
        <div className="absolute inset-0 z-10 " style={{ width: '100%', height: '100%' }}>
          <Particles
            particleColors={['#b3d11c', '#b3d11c']}
            particleCount={2000}
            particleSpread={10}
            speed={0.2}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={true}
          />
        </div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover z-[-1] bg-[#010b04]"
          style={{
            objectPosition: "calc(50% + 23px) center"
          }}
        >
          <source
            src="https://ik.imagekit.io/ilgcom35w/theme-bg-esummit.mp4?updatedAt=1754759044375"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-20 w-full pointer-events-none">
          <div className="flex flex-col font-bold w-full justify-center pt-24 sm:pt-[35vh] ml-4 pointer-events-auto">
            <h1 className="font-tourney text-5xl sm:text-5xl text-start" style={{ 
              color: '#FFFFFF', 
              WebkitTextStroke: '1px #FFFFFF',
              paintOrder: 'stroke fill'
            }}>Hey!</h1>
            <h1 className="font-tourney text-8xl sm:text-8xl text-start" style={{ 
              color: '#FFFFFF', 
              WebkitTextStroke: '2px #FFFFFF',
              paintOrder: 'stroke fill'
            }}>User</h1>
          </div>
        </div>
        <div
          className="relative min-h-[80vh] font-sans text-white hero-container"
        />   

        <div className="absolute top-[120vh] sm:top-[130vh] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-80">
          <div className="relative">
            <div className="relative">
              <Image src={DashBoardCard} alt="card" className="w-full"  />
              {!paymentDone && (
                <div className="absolute inset-0 bg-black/50 rounded-lg" 
                style={{
                  top: '21%',
                  left: '0',
                  right: '0',
                  bottom: '0'
                }}
                ></div>
              )}
            </div>
            
            <div className="absolute bottom-[10vh]">
              {paymentDone ?                 
              <Image src={qrCode} alt="qr-code" className="scale-75"  width={400} height={400}
                style={{
                  transition: "all",
                  animationDuration: "500ms"
                }}
              /> : 
              <Image src={QuestionMark} alt="Question Mark" className="scale-100" 
                style={{
                  transition: "all",
                  animationDuration: "500ms",
                }}
              />
              }
            </div>
          </div>
          <div className="flex items-center justify-center w-full mt-8">
            {/* <button 
              onClick={() => setPaymentDone(true)} 
              className="py-4 px-8 bg-gradient-to-br font-poppins from-black to-green-600 text-white shadow-lg shadow-[#abd65d] border-b-2 border-white text-2xl rounded-2xl hover:shadow-[#abd65d] hover:shadow-2xl transition-all duration-[1000ms]"
            >
              Pay Now
            </button> */}
          </div>
        </div>

        <div className="relative min-h-[80vh] sm:min-h-[50vh] font-sans text-white background-container">   
        </div>
      </div>
      {/* {console.log("Current registeredEventId:", registeredEventId)}
      {registeredEventId ? (
        <div>
          <PaymentEnd eventId={registeredEventId} />
        </div>
      ) : (
        <div>
          <PaymentStart 
            onEventSelect={handleEventClick} 
            paymentEnabled={paymentDone}
            onPayNow={handlePaymentFromPopup}
          />
        </div>
      )} */}

      {/* Confirmation Popup */}
           {/* Confirmation Popup */}
      {/* {showConfirmationPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md mx-4">
            <h3 className="text-xl font-bold text-black mb-4">Confirm Registration</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to register for this event?
            </p>
            <div className="flex gap-4 justify-end">
              <button 
                onClick={handleCancelRegistration}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmRegistration}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default EsummitDashBoard;
