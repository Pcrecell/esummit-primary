"use client";

import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/esummit/auth/AuthLayout";
import { getCookie } from "@/lib/utils/getCookie";
import { useAuth } from "@/lib/context/AuthContext";
import { auth } from "@/lib/utils/firebase/firebase"; // <-- use your initialized auth
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hostelType, setHostelType] = useState(null);
  const [hostelEmail, setHostelEmail] = useState("");
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { userData, setUserData, profile, setProfile, loading} = useAuth();

useEffect(() => {
  if (userData) {
    router.replace("/dashboard");
    return;
  }

}, [userData, profile,,loading, router]);

if ( loading) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-green-900 text-white text-2xl font-bold tracking-widest animate-pulse">
      Loading...
    </div>
  );
}


  const gmailRegex = /@(gmail|googlemail)\.com$/i;
  const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
  const collegeNameRegex = /^[a-zA-Z\s]*$/;

  // Restrict phone input to digits and max 10 chars

  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 10) input = input.slice(0, 10);
    setPhone(input);
  };

  // Restrict firstname and lastname input to alphabets and spaces
  const handleFirstnameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setFirstname(value);
    }
  };

  const handleLastnameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setLastname(value);
    }
  };

  const handleEmailChange = (e) => setEmail(e.target.value);

  // ----------- FORM VALIDATION ----------- //
  const validateForm = () => {
    if (!nameRegex.test(firstname.trim()) || !nameRegex.test(lastname.trim())) {
      setError(
        "First and last name must only contain letters and single spaces between words."
      );
      return false;
    }

    if (phone.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return false;
    }

    if (!email.endsWith(".ac.in")) {
      setError(
        "Students must use their KIIT/KISS/KLS/KIMS/KSOM email ID (e.g., example@kiit.ac.in)."
      );
      return false;
    }

    if (hostelType === null) {
      setError("Please select whether you are a Hostelite or Dayboarder.");
      return false;
    }

    if (hostelType === true) {
      if (hostelEmail.trim() === "") {
        setError("Please enter your hostel email ID.");
        return false;
      }
      if (
        !hostelEmail
          .trim()
          .endsWith(
            "@kiit.ac.in" ||
              "@kims.ac.in" ||
              "@ksom.ac.in" ||
              "@kls.ac.in" ||
              "@kiss.ac.in"
          )
      ) {
        setError(
          "Hostel email must end with @kiit.ac.in, @kims.ac.in, @ksom.ac.in, @kls.ac.in, @kiss.ac.in"
        );
        return false;
      }
    }

    setError(""); // Clear error on successful validation
    return true;
  };

  // ----------- HANDLE REGISTER SUBMIT ----------- //
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      const idToken = await user.getIdToken();
      const userData = {
        uid: user.uid,
        email,
        firstname,
        lastname,
        isKiitCollege: true,
        phone,
        college: "KIIT",
        hostelType,
        hostelEmail,
        idToken,
      };
      const csrfToken = getCookie("csrfToken");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "x-csrf-token": csrfToken,
          },
          body: JSON.stringify(userData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Registration failed.");
        setLoading(false);
        return;
      }

      const Data = {
        name: `${firstname} ${lastname}`,
        email: email,
        phone: phone,
        uid: user.uid,
      };
      router.push("/") // or any route that uses the navbar
      // navigate.push("/payment", { state: Data });
      setLoading(false);
    } catch (err) {
      if((err.toString()).includes("email-already-in-use")) {
        setError("This Email is Already Registered. Please Try Again.");
      } else if((err.toString()).includes("weak-password")) {
        setError("Password Must Be At Least 6 Characters.");
      }    
      else {
        setError("Failed to register. Please try again.");
      }
      console.error("Registration error:", err);
    }

    setLoading(false);
  };

  // ----------- DYNAMIC EMAIL PLACEHOLDER ----------- //
  const emailPlaceholder =
    "Enter your KIIT/KISS/KLS/KIMS/KSOM mail ID (e.g : @kiit.ac.in)";

  return (
    <AuthLayout>
      <form
        onSubmit={handleRegister}
        className="rounded-2xl shadow-xl p-6 flex flex-col gap-3"
      >
        <h2 className="text-3xl font-bold text-white mb-1">Create Account</h2>
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 rounded px-3 py-2 text-sm">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-gray-300 mb-0.5 text-xs pl-1">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="w-full rounded px-4 py-2 bg-[#181818] text-white border border-gray-600 focus:border-green-500 outline-none placeholder-gray-500"
              value={firstname}
              onChange={handleFirstnameChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-0.5 text-xs pl-1">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="w-full rounded px-4 py-2 bg-[#181818] text-white border border-gray-600 focus:border-green-500 outline-none placeholder-gray-500"
              value={lastname}
              onChange={handleLastnameChange}
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-300 mb-0.5 text-xs pl-1">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            className="w-full rounded px-4 py-2 bg-[#181818] text-white border border-gray-600 focus:border-green-500 outline-none placeholder-gray-500"
            value={phone}
            onChange={handlePhoneChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-0.5 text-xs pl-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder={emailPlaceholder}
            className="w-full rounded px-4 py-2 bg-[#181818] text-white border border-gray-600 focus:border-green-500 outline-none placeholder-gray-500"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        {/* ----------- Conditional hostelType field ----------- */}

        <div>
          <label className="block text-gray-300 mb-0.5 text-xs pl-1">
            Are you a Hostelite or Dayboarder?
          </label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 text-white">
              <input
                type="radio"
                name="hostelType"
                value="true"
                checked={hostelType === true}
                onChange={() => setHostelType(true)}
                required
              />
              Hostelite
            </label>
            <label className="flex items-center gap-2 text-white">
              <input
                type="radio"
                name="hostelType"
                value="false"
                checked={hostelType === false}
                onChange={() => setHostelType(false)}
              />
              Dayboarder
            </label>
          </div>
        </div>

        {/* ----------- Conditional hostelEmail field ----------- */}
        {hostelType === true && (
          <div>
            <label className="block text-gray-300 mb-0.5 text-xs pl-1">
              Hostel Email ID
            </label>
            <input
              type="email"
              placeholder="Enter your hostel email ID"
              className="w-full rounded px-4 py-2 bg-[#181818] text-white border border-gray-600 focus:border-green-500 outline-none placeholder-gray-500"
              value={hostelEmail}
              onChange={(e) => setHostelEmail(e.target.value)}
              required
            />
          </div>
        )}

        <div>
          <label className="block text-gray-300 mb-0.5 text-xs pl-1">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full rounded px-4 py-2 bg-[#181818] text-white border border-gray-600 focus:border-green-500 outline-none placeholder-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="mt-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="accent-green-600"
            />
            <label htmlFor="showPassword" className="text-sm text-gray-400">
              Show Password
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={Loading}
          className={`mt-3 w-full py-2 rounded bg-green-600 text-white font-semibold ${
            Loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
          }`}
        >
          {Loading ? "Creating Account..." : "SIGN UP"}
        </button>

        <div className="flex justify-center">
          <p className="text-sm text-gray-400 mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-green-400 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}