import { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";

const Registration = () => {
  const { userData, profile, loading } = useAuth();
  const [form, setForm] = useState({
    companyName: "",
    teamLeadName: "",
    elixir: "",
    phoneNumber: "",
    yourIdea: "",
    teammates: [
      { name: "", elixir: "" },
      { name: "", elixir: "" },
    ], // Initial two teammate fields as objects
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [registrationError, setRegistrationError] = useState("");

  // Form field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Teammate change handler
  const handleTeammateChange = (index, field, value) => {
    const newTeammates = [...form.teammates];
    newTeammates[index][field] = value;
    setForm({ ...form, teammates: newTeammates });
  };

  // Add teammate field
  const addTeammate = () => {
    setForm({
      ...form,
      teammates: [...form.teammates, { name: "", elixir: "" }],
    });
  };

  const checkElixirAndName = async (elixir, name) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/expo/verifyForm?elixir=${encodeURIComponent(
          elixir
        )}&name=${encodeURIComponent(name)}`
      );
      const data = await res.json();

      if (res.ok) {
        return { exists: data.exists, nameMatch: data.nameMatch, payment: data.payment };
      } else {
        return { exists: false, nameMatch: false, payment: false };
      }
    } catch (error) {
      return { exists: false, nameMatch: false, payment: false };
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check lead elixir and name
    const leadCheck = await checkElixirAndName(form.elixir, form.teamLeadName);
    if (!leadCheck.exists || !leadCheck.nameMatch || !leadCheck.payment) {
      let message = "users not exists or not paid";
      alert(message);
      setIsSubmitting(false);
      return;
    }

    // Check teammate unique IDs and names
    for (let i = 0; i < form.teammates.length; i++) {
      const teammate = form.teammates[i];
      if (teammate.elixir && teammate.name) {
        const teammateCheck = await checkElixirAndName(
          teammate.elixir,
          teammate.name
        );
        if (!teammateCheck.exists || !teammateCheck.nameMatch || !teammateCheck.payment) {
          alert(
            `Teammate ${i + 1} not exists or not paid`
          );
          setIsSubmitting(false);
          return;
        }
      }
    }

    // Remove empty teammates
    const filteredTeammates = form.teammates.filter(
      (tm) => tm.name.trim() !== "" && tm.elixir.trim() !== ""
    );

    const registrationData = {
      companyName: form.companyName,
      name: form.teamLeadName,
      elixir: form.elixir,
      idea: form.yourIdea,
      phone: form.phoneNumber,
      teammates: filteredTeammates,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/expo/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registrationData),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Registration successful!");
        setForm({
          companyName: "",
          teamLeadName: "",
          elixir: "",
          phoneNumber: "",
          yourIdea: "",
          teammates: [
            { name: "", elixir: "" },
            { name: "", elixir: "" },
          ],
        });
      } else {
        alert(result.error || "Registration failed. Please try again.");
      }
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error:", error);
      setRegistrationError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="relative min-h-[60vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden lg:block"
          style={{
            backgroundImage:
              "url('https://ik.imagekit.io/admr8uj75/Frame%20258.png?tr=w-1920,q-100,fo-auto&updatedAt=1755023127771')",
          }}
        ></div>
        <div className="relative flex items-center justify-center min-h-screen">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!userData) {
    return (
      <div className="relative min-h-[60vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden lg:block"
          style={{
            backgroundImage:
              "url('https://ik.imagekit.io/admr8uj75/Frame%20258.png?tr=w-1920,q-100,fo-auto&updatedAt=1755023127771')",
          }}
        ></div>
        <div className="relative flex items-center justify-center min-h-screen px-4">
          <div className="text-center bg-red-900/30 border border-red-500 rounded-lg p-6 max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">
              Authentication Required
            </h2>
            <p className="text-red-400 mb-4">
              Please log in to access the registration form.
            </p>
            <a
              href="/login"
              className="inline-block bg-gradient-to-r from-[#06671C] to-[#B7AD97] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Go to Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Check if user has payment status (assuming it's stored in profile.paymentStatus or profile.isPaid)
  if (!profile?.payment) {
    return (
      <div className="relative min-h-[60vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden lg:block"
          style={{
            backgroundImage:
              "url('https://ik.imagekit.io/admr8uj75/Frame%20258.png?tr=w-1920,q-100,fo-auto&updatedAt=1755023127771')",
          }}
        ></div>
        <div className="relative flex items-center justify-center min-h-screen px-4">
          <div className="text-center bg-yellow-900/30 border border-yellow-500 rounded-lg p-6 max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">
              Payment Required
            </h2>
            <p className="text-yellow-400 mb-4">
              You need to complete your payment before accessing the expo
              registration.
            </p>
            <a
              href="/dashboard"
              className="inline-block bg-gradient-to-r from-[#06671C] to-[#B7AD97] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[60vh] w-full">
      {/* Mobile Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat sm:hidden"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/admr8uj75/Register%20phone%20(1).png?updatedAt=1755081336691')",
        }}
      ></div>

      {/* Tablet Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden sm:block lg:hidden"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/admr8uj75/Register%20phone%20(1).png?updatedAt=1755081336691')",
        }}
      ></div>

      {/* Desktop Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden lg:block"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/admr8uj75/Frame%20258.png?tr=w-1920,q-100,fo-auto&updatedAt=1755023127771')",
        }}
      ></div>

      {/* Content Container */}
      <div className="relative flex items-center justify-center min-h-screen px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Top black gradient overlay */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-24 sm:h-32 md:h-40 lg:h-48 bg-gradient-to-b from-black to-transparent z-10"></div>

        <div className="relative z-50 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              Register
            </h1>

            {/* Error Message */}
            {(isAlreadyRegistered || registrationError) && (
              <div className="mt-3 p-3 bg-red-900/30 border border-red-500 rounded-lg">
                <p className="text-red-400 text-sm sm:text-base font-medium">
                  {isAlreadyRegistered
                    ? "You are already registered!"
                    : registrationError}
                </p>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-3 sm:space-y-4 md:space-y-6"
          >
            {/* Company Name */}
            <div className="relative">
              <label className="block text-white text-xs sm:text-sm mb-1 sm:mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-400 py-1.5 sm:py-2 px-0 focus:outline-none focus:border-white transition-colors text-sm sm:text-base"
                required
              />
            </div>

            {/* Team Lead Name */}
            <div className="relative">
              <label className="block text-white text-xs sm:text-sm mb-1 sm:mb-2">
                Team Lead Name
              </label>
              <input
                type="text"
                name="teamLeadName"
                value={form.teamLeadName}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-400 py-1.5 sm:py-2 px-0 focus:outline-none focus:border-white transition-colors text-sm sm:text-base"
                required
              />
            </div>

            {/* Unique ID */}
            <div className="relative">
              <label className="block text-white text-xs sm:text-sm mb-1 sm:mb-2">
                Unique ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="elixir"
                  value={form.elixir}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-400 py-1.5 sm:py-2 px-0 pr-6 sm:pr-8 focus:outline-none focus:border-white transition-colors text-sm sm:text-base"
                  required
                />
                <div className="absolute right-0 top-1.5 sm:top-2">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div className="relative">
              <label className="block text-white text-xs sm:text-sm mb-1 sm:mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder=""
                className="w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-400 py-1.5 sm:py-2 px-0 focus:outline-none focus:border-white transition-colors text-sm sm:text-base"
                required
              />
            </div>

            {/* Your Idea */}
            <div className="relative">
              <label className="block text-white text-xs sm:text-sm mb-1 sm:mb-2">
                Your Idea
              </label>
              <textarea
                name="yourIdea"
                value={form.yourIdea}
                onChange={handleChange}
                placeholder=""
                rows="3"
                className="w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-400 py-1.5 sm:py-2 px-0 focus:outline-none focus:border-white transition-colors text-sm sm:text-base resize-none"
                required
              />
            </div>

            {/* Teammates */}
            <div className="relative">
              <label className="block text-white text-xs sm:text-sm mb-1 sm:mb-2">
                Teammates
              </label>
              <div className="space-y-3 mb-4">
                {form.teammates.map((teammate, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={teammate.name}
                      onChange={(e) =>
                        handleTeammateChange(index, "name", e.target.value)
                      }
                      placeholder={`Teammate ${index + 1} Name`}
                      className="w-1/2 bg-transparent border border-gray-400 rounded-md text-white placeholder-gray-400 py-2 px-3 focus:outline-none focus:border-white transition-colors text-sm"
                    />
                    <input
                      type="text"
                      value={teammate.elixir}
                      onChange={(e) =>
                        handleTeammateChange(index, "elixir", e.target.value)
                      }
                      placeholder={`Teammate ${index + 1} Unique ID`}
                      className="w-1/2 bg-transparent border border-gray-400 rounded-md text-white placeholder-gray-400 py-2 px-3 focus:outline-none focus:border-white transition-colors text-sm"
                    />
                  </div>
                ))}
              </div>
              {form.teammates.length < 5 && (
                <button
                  type="button"
                  onClick={addTeammate}
                  className="text-white text-sm sm:text-base hover:text-green-300 transition-colors"
                >
                  +Add Teammate
                </button>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-white transition-all duration-200 text-sm sm:text-base ${
                isSubmitting
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#06671C] to-[#B7AD97] hover:from-[#06671C] hover:to-[#8e8a7a] shadow-lg hover:shadow-xl"
              }`}
              style={{
                backgroundImage: isSubmitting
                  ? undefined
                  : "linear-gradient(to right, #06671C, #B7AD97)",
              }}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
        <div className="pointer-events-none absolute inset-0 z-30">
          <div className="absolute top-0 left-0 w-full h-60 bg-gradient-to-b from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-50 bg-gradient-to-t from-black to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
