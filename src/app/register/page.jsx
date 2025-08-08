"use client"

import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/esummit/auth/AuthLayout";
import { getCookie } from "@/lib/utils/getCookie";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hostelType, setHostelType] = useState(null);
  const [hostelEmail, setHostelEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useRouter();
  const [showPassword, setShowPassword] = useState(false);


  const gmailRegex = /@(gmail|googlemail)\.com$/i;
  const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
  const collegeNameRegex = /^[a-zA-Z\s]*$/;

  // Determine if college is KIIT (case insensitive)
  const isKiitCollege =
    college.trim().toLowerCase() === "kiit" ||
    college.trim().toLowerCase() === "kalinga institute of industrial technology" ||
    college.trim().toLowerCase() === "kiit university";

  // Restrict phone input to digits and max 10 chars
  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 10) input = input.slice(0, 10);
    setPhone(input);
  };

  // Restrict college input to alphabets and spaces
  const handleCollegeChange = (e) => {
    const value = e.target.value;
    if (collegeNameRegex.test(value)) {
      setCollege(value);
    }
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
      setError("First and last name must only contain letters and single spaces between words.");
      return false;
    }

    if (phone.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return false;
    }

    if (isKiitCollege && !email.endsWith(".ac.in")) {
      setError("KIIT students must use their KIIT email ID (e.g., example@kiit.ac.in).");
      return false;
    }

    if (!isKiitCollege && !gmailRegex.test(email)) {
      setError("Only Gmail addresses (@gmail.com or @googlemail.com) are allowed.");
      return false;
    }

    if (isKiitCollege && hostelType === null) {
      setError("Please select whether you are a Hostelite or Dayboarder.");
      return false;
    }

    if (isKiitCollege && hostelType === true) {
      if (hostelEmail.trim() === "") {
        setError("Please enter your hostel email ID.");
        return false;
      }
      if (!hostelEmail.trim().endsWith("@kiit.ac.in")) {
        setError("Hostel email must end with @kiit.ac.in.");
        return false;
      }
    }

    setError("");  // Clear error on successful validation
    return true;
  };

  // ----------- HANDLE REGISTER SUBMIT ----------- //
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;
    setLoading(true);
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      const idToken = await user.getIdToken();
      
      console.log("User registered successfully:", user);
      const userData = {
        firstname,
        lastname,
        phone,
        isKiitCollege,
        college,
        email,
        password,
        hostelType,
        hostelEmail,
        uid: user.uid,
      };
      const csrfToken = getCookie('csrfToken');

      console.log("Registration data");

      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify(userData),
      });

      console.log("Registration response:", response);
      if (response.error) {
        setError(response.error);
        setLoading(false); // Loading OFF on error
        return;
      } 
      const Data = {
        name: `${firstname} ${lastname}`,
        email: email,
        phone:phone,
        uid:user.uid
      }
    
    // Set session cookie in backend
    await fetch(`${process.env.REACT_APP_API_URL}/auth/sessionLogin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
      },
      body: JSON.stringify({ idToken }),
    });
      navigate("/esummit/paymentchoice", { state: Data });
      setLoading(false); // Loading OFF after success
    } catch (err) {
      setError("Failed to register. Please try again.");
      console.error("Registration error:", err);
    }

    setLoading(false);
  };

  // ----------- DYNAMIC EMAIL PLACEHOLDER ----------- //
  const emailPlaceholder = isKiitCollege
    ? "Enter your KIIT mail ID (e.g : @kiit.ac.in)"
    : "Enter your Gmail ID";

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
            <label className="block text-gray-300 mb-0.5 text-xs pl-1">First Name</label>
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
            <label className="block text-gray-300 mb-0.5 text-xs pl-1">Last Name</label>
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
          <label className="block text-gray-300 mb-0.5 text-xs pl-1">Phone Number</label>
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
          <label className="block text-gray-300 mb-0.5 text-xs pl-1">College Name</label>
          <input
            type="text"
            placeholder="Enter your college name"
            className="w-full rounded px-4 py-2 bg-[#181818] text-white border border-gray-600 focus:border-green-500 outline-none placeholder-gray-500"
            value={college}
            onChange={handleCollegeChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-0.5 text-xs pl-1">Email Address</label>
          <input
            type="email"
            placeholder={emailPlaceholder}
            className="w-full rounded px-4 py-2 bg-[#181818] text-white border border-gray-600 focus:border-green-500 outline-none placeholder-gray-500"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {isKiitCollege && (
            <p className="text-xs text-yellow-400 mt-1">KIIT students must use their KIIT Email ID.</p>
          )}
        </div>

        {/* ----------- Conditional hostelType field ----------- */}
        {isKiitCollege && (
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
        )}

        {/* ----------- Conditional hostelEmail field ----------- */}
        {isKiitCollege && hostelType === true && (
          <div>
            <label className="block text-gray-300 mb-0.5 text-xs pl-1">Hostel Email ID</label>
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
  <label className="block text-gray-300 mb-0.5 text-xs pl-1">Password</label>
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
          disabled={loading}
          className={`mt-3 w-full py-2 rounded bg-green-600 text-white font-semibold ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
          }`}
        >
          {loading ? "Creating Account..." : "SIGN UP"}
        </button>

      <div className="flex justify-center">
       <p className="text-sm text-gray-400 mt-4 text-center">
       Already have an account?{" "}
       <a href="/esummit/login" className="text-green-400 hover:underline">
       Login here
      </a>
      </p>
    </div>

      </form>
    </AuthLayout>
  );
}