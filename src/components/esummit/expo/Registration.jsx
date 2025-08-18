import { useEffect, useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";

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
  const [registeredUserData, setRegisteredUserData] = useState(null);
  const [registrationError, setRegistrationError] = useState("");
  const { toast, showSuccess, showError, hideToast } = useToast();

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

  const checkElixirAndName = async (elixir) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/expo/verifyForm?elixir=${encodeURIComponent(elixir)}`
      );
      const data = await res.json();
      console.log("Verification response:", data);

      if (res.ok) {
        return { exists: data.exists, payment: true };
      } else {
        return { exists: false, payment: false, error: data.error };
      }
    } catch (error) {
      return { exists: false, payment: false, error: "Network error" };
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check lead elixir
    const leadCheck = await checkElixirAndName(form.elixir);
    if (!leadCheck.exists || !leadCheck.payment) {
      let message =
        leadCheck.error ||
        "User not found, not paid, or already registered for event.";
      showError(message);
      setIsSubmitting(false);
      return;
    }

    // Check teammates
    for (let i = 0; i < form.teammates.length; i++) {
      const teammate = form.teammates[i];
      if (teammate.elixir) {
        const teammateCheck = await checkElixirAndName(teammate.elixir);
        if (!teammateCheck.exists || !teammateCheck.payment) {
          showError(
            teammateCheck.error ||
              `Teammate ${i + 1} not found, not paid, or already registered for event.`
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
        showSuccess("Registration successful!");
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
        showError(result.error || "Registration failed. Please try again.");
      }
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error:", error);
      setRegistrationError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeTeammate = (indexToRemove) => {
    const newTeammates = form.teammates.filter(
      (_, index) => index !== indexToRemove
    );
    setForm({
      ...form,
      teammates: newTeammates,
    });
  };

  const checkIfRegistered = async (elixir) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/expo/${elixir}`
      );

      if (res.ok) {
        // console.log(await res.json())
        setIsAlreadyRegistered(true);
        const data = await res.json();
        setRegisteredUserData(data);
        console.log(data);
      } else {
        //
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRegister = async (elixir) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/expo/delete/${elixir}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setIsAlreadyRegistered(false);
        setRegisteredUserData(false);
      } else {
        showError("Error In Deleting Team");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkIfRegistered(profile?.elixir);
  }, []);

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
              {!isAlreadyRegistered ? "Register" : "Already Registered"}
            </h1>
          </div>

          {!isAlreadyRegistered ? (
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
                      <button
                        type="button"
                        onClick={() => removeTeammate(index)}
                        className="text-red-400 hover:text-red-300 transition-colors p-1 rounded-md hover:bg-red-900/20 flex-shrink-0"
                        title="Remove teammate"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
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
          ) : (
            <div>
              <div>
                <div className="flex flex-col gap-3 justify-center items-center text-center text-2xl">
                  {registeredUserData?.role === "leader" ? (
                    <p>Name: {registeredUserData?.data?.name}</p>
                  ) : (
                    registeredUserData?.data?.teammates
                      ?.filter(
                        (teammate) => teammate.elixir === profile?.elixir
                      )
                      ?.map((teammate, index) => (
                        <p key={index}>Name: {teammate.name}</p>
                      ))
                  )}

                  <p>Leader Phone: {registeredUserData?.data?.phone}</p>
                  <p>Company Name: {registeredUserData?.data?.companyName}</p>
                  <p className="capitalize">
                    Your Role: {registeredUserData?.role}
                  </p>
                  <p>Your Idea: {registeredUserData?.data?.idea}</p>
                </div>

                {registeredUserData?.role === "leader" ? (
                  <div
                    className="text-center mt-24 underline hover:text-white/50 cursor-pointer"
                    onClick={() => deleteRegister(profile?.elixir)}
                  >
                    Click to disband your team from expo
                  </div>
                ) : (
                  <div className="text-center mt-24">
                    If you want to unregister ask your team leader
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 z-30">
          <div className="absolute top-0 left-0 w-full h-60 bg-gradient-to-b from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-50 bg-gradient-to-t from-black to-transparent"></div>
        </div>
      </div>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
};

export default Registration;
