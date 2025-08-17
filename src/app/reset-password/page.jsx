// src/auth/ResetPassword.jsx
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '@/lib/utils/firebase/firebase';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import AuthLayout from '@/components/esummit/auth/AuthLayout';

// Separate component that uses useSearchParams
function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState('');
  const [oobCode, setOobCode] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { width, height } = useWindowSize();

  useEffect(() => {
    const code = searchParams.get('oobCode');
    if (code) {
      setOobCode(code);
    } else {
      setError('Invalid or missing password reset code.');
    }
  }, [searchParams]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (!oobCode) {
      setError('Password reset code is missing.');
      return;
    }

    setLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setShowConfetti(true);
      setTimeout(() => {
        router.push('/login?message=Password reset successful! Please log in.');
      }, 3000);
    } catch (error) {
      // console.error("Password Reset Error:", error);
      if (error.code === 'auth/expired-action-code') {
        setError('The password reset link has expired. Please request a new one.');
      } else if (error.code === 'auth/invalid-action-code') {
        setError('The password reset link is invalid. It may have already been used.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters long.');
      } else {
        setError('Failed to reset password. Please try again.');
      }
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    evaluateStrength(password);
  };

  const evaluateStrength = (password) => {
    let score = 0;
    if (!password) { setStrength(''); return; }
    if (password.length >= 8) score++;
    if (password.match(/[a-z]/)) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^A-Za-z0-9]/)) score++;
    if (score < 3) setStrength('Weak');
    else if (score < 5) setStrength('Moderate');
    else setStrength('Strong');
  };

  const strengthColors = {
    Weak: 'text-red-500',
    Moderate: 'text-yellow-500',
    Strong: 'text-green-500',
  };

  return (
    <>
      {showConfetti && (
        <Confetti width={width} height={height} recycle={false} numberOfPieces={300} />
      )}
      <form
        onSubmit={handleResetPassword}
        className="rounded-2xl shadow-xl px-8 py-4 flex flex-col gap-2.5"
      >
        <h2 className="text-2xl font-semibold text-gray-200 mb-0">Reset your password</h2>
        <p className="text-xs text-gray-400 mb-1">Type in your new password</p>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 rounded px-3 py-1.5 text-xs my-1">
            {error}
          </div>
        )}

        {/* New Password */}
        <div className="relative mt-1">
          <label className="block text-gray-400 mb-0.5 text-xs pl-1">
            New Password <span className="text-red-500">*</span>
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter new password"
            className="w-full rounded px-3 py-1.5 bg-[#181818] text-white border border-gray-600 focus:border-green-500 focus:ring-0 outline-none placeholder-gray-500 pr-10 text-sm"
            value={newPassword}
            onChange={handlePasswordChange}
            required
          />
          <span
            className="absolute right-1 top-[1.125rem] h-8 flex items-center justify-center px-2 cursor-pointer text-gray-400 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              // Eye-off icon
              <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 
                  19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 
                  6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 
                  3.162 10.065 7.498a10.522 10.522 0 
                  01-4.293 5.774M6.228 6.228L3 3m3.228 
                  3.228l3.65 3.65m7.894 7.894L21 
                  21m-3.228-3.228l-3.65-3.65m0 
                  0a3 3 0 10-4.243-4.243m4.242 
                  4.242L9.88 9.88" />
              </svg>
            ) : (
              // Eye icon
              <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 
                  010-.639C3.423 7.51 7.36 4.5 12 
                  4.5c4.638 0 8.573 3.007 9.963 
                  7.178.07.207.07.431 0 
                  .639C20.577 16.49 16.64 19.5 12 
                  19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 
                  016 0z" />
              </svg>
            )}
          </span>
        </div>

        {/* Password Strength */}
        {newPassword && (
          <div className="text-xs text-gray-400 pl-1 mt-0.5">
            Password Strength:{' '}
            <strong className={strengthColors[strength] || 'text-gray-400'}>
              {strength}
            </strong>
          </div>
        )}

        {/* Confirm Password */}
        <div className="mt-1">
          <label className="block text-gray-400 mb-0.5 text-xs pl-1">
            Confirm New Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full rounded px-3 py-1.5 bg-[#181818] text-white border border-gray-600 focus:border-green-500 focus:ring-0 outline-none placeholder-gray-500 text-sm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 mt-3">
          <div className="flex justify-start">
            <button
              type="submit"
              disabled={loading || !oobCode}
              className="flex items-center justify-center gap-1 bg-[#2F8D46] hover:bg-[#256e36] text-black font-semibold rounded py-1.5 px-4 text-sm transition disabled:opacity-50"
            >
              {loading ? "Resetting..." : "RESET"}
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
    </>
  );
}

// Loading fallback component
function ResetPasswordLoading() {
  return (
    <div className="rounded-2xl shadow-xl px-8 py-4 flex flex-col gap-2.5">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-gray-700 rounded mb-4"></div>
        <div className="h-10 bg-gray-700 rounded mb-2"></div>
        <div className="h-10 bg-gray-700 rounded mb-4"></div>
        <div className="h-10 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}

// Main component wrapped with Suspense
export default function ResetPassword() {
  return (
    <AuthLayout hideGreenBox={true}>
      <Suspense fallback={<ResetPasswordLoading />}>
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
