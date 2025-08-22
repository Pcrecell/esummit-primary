"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import   BarcodeScannerComponent  from "react-qr-barcode-scanner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/utils/firebase/firebase";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";

export default function AdminVerifyPortal() {
  const router = useRouter();
  const { userData, profile, loading } = useAuth();
  const { toast, showSuccess, showError, hideToast } = useToast();
  
  // State management
  const [qrResult, setQrResult] = useState("");
  const [scannedUid, setScannedUid] = useState("");
  const [scannedUserData, setScannedUserData] = useState(null);
  const [editFields, setEditFields] = useState({ 
    delegate_kiit: "", 
    id_card: "", 
    wrist_band: "" 
  });
  const [isScanning, setIsScanning] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [autoScanTimer, setAutoScanTimer] = useState(null);

  // Admin access control
  useEffect(() => {
    if (!loading) {
      if (!userData || !profile) {
        router.replace("/login");
        return;
      }
      
      if (profile.role !== "admin") {
        showError("Access denied. Admin privileges required.");
        router.replace("/dashboard");
        return;
      }
    }
  }, [loading, userData, profile, router, showError]);

  // Auto-scan timer effect
  useEffect(() => {
    if (autoScanTimer) {
      const timer = setTimeout(() => {
        resetForNextScan();
      }, autoScanTimer);
      
      return () => clearTimeout(timer);
    }
  }, [autoScanTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoScanTimer) clearTimeout(autoScanTimer);
    };
  }, [autoScanTimer]);

  // Extract UID from scanned URL
  const extractUidFromUrl = (url) => {
    try {
      // Handle different URL formats
      let path = url;
      if (url.includes('http')) {
        const urlObj = new URL(url);
        path = urlObj.pathname;
      }
      
      // Extract UID from /verify/<uid> pattern
      const match = path.match(/\/verify\/([^\/\?]+)/);
      if (match && match[1]) {
        return match[1];
      }
      
      // If no /verify/ pattern, assume the entire string is the UID
      if (path.length > 10 && path.length < 50) {
        return path.replace(/[\/\?]/g, '');
      }
      
      return null;
    } catch (error) {
      console.error("Error extracting UID:", error);
      return null;
    }
  };

  // Handle QR scan result
  const handleScan = async (err, result) => {
    if (result) {
      const scannedData = result.text;
      setQrResult(scannedData);
      
      const uid = extractUidFromUrl(scannedData);
      if (!uid) {
        showError("Invalid QR code format. Expected URL with /verify/<uid>");
          return;
        }

      setScannedUid(uid);
      await fetchUserData(uid);
      setIsScanning(false);
    } else if (err) {
      showError("QR scan error: " + (err?.message || "Unknown error"));
    }
  };

  // Fetch user data from Firestore
  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'Users', uid));
      
      if (!userDoc.exists()) {
        showError("User not found with UID: " + uid);
        setScannedUserData(null);
        return;
      }

      const user = userDoc.data();
      setScannedUserData(user);
      
      // Set edit fields with current values
      setEditFields({
        delegate_kiit: user.delegate_kiit || "",
        id_card: user.id_card || "",
        wrist_band: user.wrist_band || ""
      });
      
      showSuccess("User data loaded successfully");
    } catch (error) {
      console.error("Error fetching user:", error);
      showError("Failed to fetch user data");
      setScannedUserData(null);
    }
  };

  // Handle field changes
  const handleFieldChange = (field, value) => {
    setEditFields(prev => ({ ...prev, [field]: value }));
  };

  // Update user data via backend API
  const handleUpdateUser = async () => {
          if (!scannedUserData || !scannedUid) return;
    
    setIsUpdating(true);
    try {
      console.log(await userData.getIdToken());
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/user/${scannedUid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await userData.getIdToken()}`
        },
        body: JSON.stringify(editFields)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Update failed');
      }
      
      const result = await response.json();
      showSuccess("User updated successfully!");
      
      // Set auto-scan timer (5 seconds)
      setAutoScanTimer(15000);
      
    } catch (error) {
      console.error("Update error:", error);
      showError(error.message || "Failed to update user");
    } finally {
      setIsUpdating(false);
    }
  };

  // Reset for next scan
  const resetForNextScan = () => {
    setQrResult("");
    setScannedUid("");
    setScannedUserData(null);
    setEditFields({ delegate_kiit: "", id_card: "", wrist_band: "" });
    setIsScanning(true);
    setAutoScanTimer(null);
  };

  // Manual reset button
  const handleManualReset = () => {
    resetForNextScan();
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-green-900 text-white text-2xl font-bold tracking-widest animate-pulse">
        Loading...
      </div>
    );
  }

  // Access denied
  if (!userData || profile?.role !== "admin") {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-2">Admin Verification Portal</h1>
          <p className="text-gray-300">Scan QR codes to verify and update user data</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* QR Scanner Section */}
          {isScanning && (
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-center">Scan QR Code</h2>
              <div className="flex justify-center mb-4">
                <BarcodeScannerComponent
                  width={400}
                  height={300}
                  onUpdate={handleScan}
                />
              </div>
              {qrResult && (
                <div className="text-center">
                  <p className="text-green-400 mb-2">Scanned Data:</p>
                  <p className="text-sm text-gray-300 break-all">{qrResult}</p>
                </div>
              )}
            </div>
          )}

          {/* User Data Section */}
          {scannedUserData && (
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-green-400">User Details</h2>
                <button
                  onClick={handleManualReset}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold transition"
                >
                  Scan Next QR
                </button>
              </div>

              {/* User Info Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-700 p-4 rounded">
                  <h3 className="font-semibold text-green-400 mb-2">Basic Information</h3>
                  <p><span className="font-medium">Name:</span> {scannedUserData.firstname} {scannedUserData.lastname}</p>
                  <p><span className="font-medium">Email:</span> {scannedUserData.email}</p>
                  <p><span className="font-medium">Elixir ID:</span> {scannedUserData.elixir}</p>
                  <p><span className="font-medium">firebase UID :</span> {scannedUid}</p>
                </div>
                
                <div className="bg-gray-700 p-4 rounded">
                  <h3 className="font-semibold text-green-400 mb-2">Event Status</h3>
                  <p><span className="font-medium">Payment:</span> {scannedUserData.payment ? "✅ Completed" : "❌ Pending"}</p>
                  <p><span className="font-medium">Event:</span> {scannedUserData.eventName || "Not registered"}</p>
                </div>
        </div>

              {/* Editable Fields */}
              <div className="bg-gray-700 p-6 rounded">
                <h3 className="font-semibold text-green-400 mb-4">
                  Update Verification Status
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* Delegate KIIT */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editFields.delegate_kiit === true}
                      onChange={(e) =>
                        handleFieldChange("delegate_kiit", e.target.checked)
                      }
                      className="w-5 h-5 text-green-500 bg-gray-600 border-gray-500 rounded focus:ring-green-400 focus:ring-2"
                    />
                    <label className="text-sm font-medium">Delegate KIIT</label>
                  </div>

                  {/* ID Card */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editFields.id_card === true}
                      onChange={(e) => handleFieldChange("id_card", e.target.checked)}
                      className="w-5 h-5 text-green-500 bg-gray-600 border-gray-500 rounded focus:ring-green-400 focus:ring-2"
                    />
                    <label className="text-sm font-medium">ID Card</label>
                  </div>

                  {/* Wrist Band */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editFields.wrist_band === true}
                      onChange={(e) => handleFieldChange("wrist_band", e.target.checked)}
                      className="w-5 h-5 text-green-500 bg-gray-600 border-gray-500 rounded focus:ring-green-400 focus:ring-2"
                    />
                    <label className="text-sm font-medium">Wrist Band</label>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleUpdateUser}
                    disabled={isUpdating}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-8 py-3 rounded-lg font-semibold text-lg transition disabled:cursor-not-allowed"
                  >
                    {isUpdating ? "Updating..." : "Update User Data"}
                  </button>
                </div>
              </div>


              {/* Auto-scan countdown */}
              {autoScanTimer && (
                <div className="text-center mt-4">
                  <p className="text-green-400">
                    Auto-scanning for next QR code in {Math.ceil(autoScanTimer / 1000)} seconds...
                  </p>
                </div>
              )}
        </div>
      )}
        </div>
      </div>
      
      {/* Toast notifications */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.isVisible} 
        onClose={hideToast} 
      />
    </div>
  );
}
