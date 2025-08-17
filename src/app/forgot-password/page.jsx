// src/auth/ForgotPassword.jsx
"use client"
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/utils/firebase/firebase";
import { useRouter } from "next/navigation";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import AuthLayout from "../../components/esummit/auth/AuthLayout";
import Link from "next/link";

const db = getFirestore();



export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useRouter();

  const checkEmailExists = async (email) => {
    const usersRef = collection(db, "Users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccessMessage("");
    try {
      const exists = await checkEmailExists(email);
      if (exists) {
        await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/reset-password`,
        handleCodeInApp: true,
      });

        setSuccessMessage("Recovery email sent.");
      } else {
        setError("Email address not found in our records.");
      }
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
      // console.error("Error sending reset email:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSupport = () => {
    // window.location.href = 'mailto:support@example.com?subject=Password Reset Issue';
  };

  const buttonState = successMessage ? "support" : loading ? "sending" : "next";

  // Define common transition style for spans
  const spanTransitionStyle = {
    transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
  };

  return (
    <AuthLayout hideGreenBox={true}>
      <form
        onSubmit={!successMessage ? handleForgotPassword : (e) => e.preventDefault()}
        className="rounded-2xl shadow-xl px-8 py-4 flex flex-col gap-2.5"
      >
        <h2 className="text-2xl font-semibold text-gray-200 mb-0">
          {!successMessage ? "Reset your password" : "Recovery Email Sent!"}
        </h2>
        <p className="text-xs text-gray-400 mb-1">
          {!successMessage
            ? "Type in your registered email address to reset password"
            : "Please check your email for next steps to reset your password"}
        </p>

        {error && !successMessage && (
          <div className="bg-red-900 border border-red-700 text-red-100 rounded px-3 py-1.5 text-xs my-1">{error}</div>
        )}

        {!successMessage && (
          <div className="mt-1">
            <input
              type="email"
              id="email"
              placeholder="Email Address *"
              className="w-full rounded px-3 py-1.5 bg-[#181818] text-white border border-gray-600 focus:border-green-500 focus:ring-0 outline-none placeholder-gray-500 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={!successMessage}
              disabled={loading}
            />
          </div>
        )}

        <div className="flex flex-col gap-2 mt-3">
          <div className="flex justify-start">
            <button
              type={!successMessage ? "submit" : "button"}
              onClick={successMessage ? handleContactSupport : undefined}
              style={{ transition: 'width 0.3s ease-in-out' }}
              className="relative inline-flex items-center justify-center gap-1 bg-[#2F8D46] hover:bg-[#256e36] text-black font-semibold rounded py-1.5 px-4 text-sm transition-colors duration-200 whitespace-nowrap overflow-hidden"
              disabled={!successMessage && loading}
            >
              <span className="invisible" aria-hidden="true">
                {buttonState === "support" ? "CONTACT SUPPORT" : buttonState === "sending" ? "Sending..." : "NEXT ↗"}
              </span>
              <span
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  ...spanTransitionStyle,
                  opacity: buttonState === 'next' ? 1 : 0,
                  transform: buttonState === 'next' ? 'translateX(0%)' : 'translateX(-100%)', // Slide left when inactive
                }}
                aria-hidden={buttonState !== 'next'}
              >
                NEXT
              </span>
              <span
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  ...spanTransitionStyle,
                  opacity: buttonState === 'sending' ? 1 : 0, 
                  transform: buttonState === 'sending'
                    ? 'translateX(0%)' // Center when active
                    : buttonState === 'next'
                      ? 'translateX(100%)' // Start right if previous was 'next'
                      : 'translateX(-100%)', // Slide left if previous was 'support' (or initial)
                }}
                aria-hidden={buttonState !== 'sending'}
              >
                Sending...
              </span>
              <span
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  ...spanTransitionStyle,
                  opacity: buttonState === 'support' ? 1 : 0,
                  transform: buttonState === 'support' ? 'translateX(0%)' : 'translateX(100%)', // Slide in from right when inactive
                }}
                aria-hidden={buttonState !== 'support'}
              >
                CONTACT SUPPORT
              </span>
            </button>
          </div>

          <Link
            href="/login"
            className="bg-white hover:bg-gray-200 text-black font-semibold rounded py-2 text-center transition"
          >
            BACK TO LOGIN
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}